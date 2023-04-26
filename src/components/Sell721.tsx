import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import NFTCard from "./NFTCard"
import Confirmation from "./Confirmation"
import { getMarketplace, ipfsToHttp, getContractAbi, NFT_Object } from "./functionalityConfig"

function Sell721() {
  const [nftAddr, setAddr] = useState("")
  const [tokenId, setId] = useState("")
  const [price, setPrice] = useState("")
  const [errorMessage, setError] = useState("")
  const [tokenURI, setTokenURI] = useState("")
  const [nonce, setNonce] = useState(0)
  const [nftData, setNftData] = useState<NFT_Object[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isActive, setIsActive] = useState(false)

  let nfts = nftData.map(item => {
    let im; 
    try{
      if(item.image.startsWith("http")) {
        im = item.image
      } else {
        const i = ipfsToHttp(item.image)
        im = i
      }
    } catch(error) { console.log(error) }
    return (
      <section>
        <NFTCard 
        img={im}
        name={item.name}
        description={item.description}
        contractAddress={item.contractAddress}
        tokenId={item.tokenId}
        nonce={item.nonce}
        price={item.price}
        />
      </section>
    )
  })

  useEffect(() => {
    async function fetchMetadata() {
      const metadataResponse = await fetch(tokenURI)
      const metadata = await metadataResponse.json()
      metadata.nonce = nonce
      metadata.price = price
      metadata.contractAddress = nftAddr
      metadata.tokenId = tokenId
      if(price) {
        setNftData((nftData) => [...nftData, metadata])
      }
    }
    fetchMetadata()
  }, [tokenURI])

  useEffect(() => {
    const storedData = localStorage.getItem("nftData")
    if (storedData) {
      setNftData(JSON.parse(storedData))
    }
  }, [nonce])

  useEffect(() => {
    localStorage.setItem("nftData", JSON.stringify(nftData))
  }, [nftData]) 

  async function handleSell() {  
    try {
      setIsLoading(true)
      const { marketplace, provider } = getMarketplace()
      const tx = await marketplace.sellNFT721(nftAddr, tokenId, price)
      const nonce = await marketplace.nonce()
      setNonce(nonce.toNumber())
      const nftABI = await getContractAbi(nftAddr) 
      const contract2 = new ethers.Contract(nftAddr, nftABI, provider) 
      const URI = await contract2.tokenURI(tokenId)
      setTokenURI(URI)
      if (tx) {
        await tx.wait()
        setIsActive(true)
        setTimeout(() => {
          setIsActive(false)
        }, 9000)
        setIsLoading(false)
      }
    } catch(error) {
      if (error.reason) {
        setError(error.reason)
        setIsLoading(false)
        setTimeout(() => {
          setError("")
        }, 9000)
      }
      else if (error instanceof Error) {
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

  return (
    <>
      <div className="sell721config">
        <section className="cs">
          <label htmlFor="nftAddr">NFTaddress:</label>
          <input type="text" id="nftAddr" placeholder="address" name="nftAddr" value={nftAddr} onChange={(e) => setAddr(e.target.value)} />
          <br />
          <label htmlFor="tokenId">TokenId:</label>
          <input type="text" id="tokenId" placeholder="token id" name="tokenId" value={tokenId} onChange={(e) => setId(e.target.value)} />
          <br />
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" placeholder="amount" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <br />
          <button 
          className="sell721" 
          onClick={handleSell} 
          disabled={isLoading}>Sell
          </button>
        </section>
        {errorMessage && <p className="error721sell">Error: {errorMessage}</p>}
        <br/>
        <br/>
      </div>
      <div className="divNFTWrapper">
        {<div className="divNFT">{nfts}</div>}
      </div>
      <Confirmation isActive={isActive} />
    </>
  )
}

export default Sell721
