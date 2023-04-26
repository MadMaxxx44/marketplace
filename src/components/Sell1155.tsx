import React, { useState, useEffect } from "react"
import {ethers} from "ethers"
import NFTCard1155 from "./NFTCard1155"
import Confirmation from "./Confirmation"
import { getMarketplace, getContractAbi, NFT_Object1155 } from "./functionalityConfig"

export default function Sell1155() {
  const [nftAddr, setAddr] = useState("")
  const [tokenIds, setTokenIds] = useState<number[]>([])
  const [amounts, setAmounts] = useState<number[]>([])
  const [price, setPrice] = useState("")
  const [errorMessage, setError] = useState("")
  const [nonce, setNonce] = useState(0)
  const [nft1155Data, setNftData1155] = useState<NFT_Object1155[]>([])
  const [uriArr, setUriArr] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isActive, setIsActive] = useState(false)

  let nfts = nft1155Data.map(item => { 
    return (
      <section>
        <NFTCard1155 
        img={item.image}
        contractAddress={item.contractAddress}
        tokenIds={item.tokenIds}
        amounts={item.amounts}
        network={item.network}
        nonce={item.nonce}
        price={item.price}
        />
      </section>
    )
  })

  useEffect(() => {
    async function fetchMetadata() {
      const uriPromises = uriArr.map(async (link: any) => {
        const response = await fetch(link)
        const data = await response.json()
        return {
          image: data.image,
        }
      })
      const imageURIs = await Promise.all(uriPromises)
      const stringArr = imageURIs.map(imageObject => {
        return imageObject.image
      })
      let obj: NFT_Object1155 = {
        image: stringArr,
        contractAddress: nftAddr,
        tokenIds: tokenIds,
        amounts: amounts,
        network: "Ethereum",
        nonce: nonce,
        price: price
      } 
      if(price) {
        setNftData1155((nft1155Data) => [...nft1155Data, obj])
      }
    }
    fetchMetadata()
  }, [uriArr])

  useEffect(() => {
    const storedData = localStorage.getItem("nft1155Data")
    if (storedData) {
      setNftData1155(JSON.parse(storedData))
    }
  }, [nonce])

  useEffect(() => {
    localStorage.setItem("nft1155Data", JSON.stringify(nft1155Data))
  }, [nft1155Data])
    
  async function handleSell() {  
    try {
      setIsLoading(true)
      const { marketplace, provider } = getMarketplace()
      const tx = await marketplace.sell1155NFTs(nftAddr, tokenIds, amounts, price)
      const nonce = await marketplace.nonce()
      setNonce(nonce.toNumber())
      const nftABI = await getContractAbi(nftAddr) 
      const contract2 = new ethers.Contract(nftAddr, nftABI, provider) 
      let temp = []
      for (let i = 0; i < tokenIds.length; i++) {
        let uri = await contract2.uri(tokenIds[i])
        temp.push(uri)
      }
      setUriArr(temp)
      if(tx) {
        await tx.wait() 
        setIsActive(true)
        setTimeout(() => {
          setIsActive(false)
        }, 9000)
        setIsLoading(false)
      }
    } catch(error) {
      if(error.reason) {
        setError(error.reason)
        setIsLoading(false)
        setTimeout(() => {
          setError("")
        }, 9000)
      }
      else if(error instanceof Error) {
        setError(error.message)
        setIsLoading(false)
        setTimeout(() => {
          setError("")
        }, 9000)
      } else {
        setError("unexpected error")
        setIsLoading(false)
        setTimeout(() => {
          setError("")
        }, 9000)
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    try {
      const tokenIds = JSON.parse(value)
      if(Array.isArray(tokenIds) && tokenIds.length <= 5) {
        setTokenIds(tokenIds)
      } else {
        setError("You can sell maximum 5 NFTs1155")
        setTimeout(() => {
          setError("")
        }, 5000)
      }
    } catch (error) {}
  }

  const handle2InputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    try {
      const amounts = JSON.parse(value)
      if(Array.isArray(amounts)) {
        setAmounts(amounts)
      }
    } catch (error) {}
  }
  
  return (
    <>
      <div className="sell1155config">
        <section className="cs1155">
          <label>NftAddress:</label>
          <input type="text" id="sale" placeholder="nft1155 address" name="sale" value={nftAddr} onChange={(e) => setAddr(e.target.value)} />
          <br/>
          <label>TokenIds:</label>
          <input type="text" placeholder="token ids as array" onChange={handleInputChange} />
          <br/>
          <label>Amounts:</label>
          <input type="text" placeholder="amounts as array" onChange={handle2InputChange}  />
          <br/>
          <label>Price:</label>
          <input type="text" id="sale" placeholder="price" name="sale" value={price} onChange={(e) => setPrice(e.target.value)} />
          <br/>
          <button 
            className="sell1155" 
            onClick={handleSell}
            disabled={isLoading}>Sell
          </button>
        </section>
        {errorMessage && <p className="error1155sell">Error: {errorMessage}</p>}
      </div>
      {<div className="divNFT1155">{nfts}</div>}
      <Confirmation isActive={isActive} />
    </>
  )
}