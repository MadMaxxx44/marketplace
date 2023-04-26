import { ethers } from "ethers"
import abi from "./abi"
import axios from "axios"

declare global {
  interface Window {
    ethereum: any
  }
}

export interface NFT_Object1155 {
  image: string[]
  attributes?: any
  contractAddress?: string
  tokenIds?: any
  amounts?: any
  network?: string
  nonce?: any
  price?: string
}

export interface NFT_Object {
  name: string
  description: string
  image: string
  attributes?: any
  contractAddress?: string
  tokenId?: string
  network?: string
  nonce?: any
  price?: string
}

export const API_KEY = `${process.env.REACT_APP_API_KEY}`
export const ETHERSCAN_API_URL = `${process.env.REACT_APP_ETHERSCAN_API_URL}`
const marketplaceAddress = "0xf7E269Ad2bb4cDA4e659C981DE52277C6BAce7F4"

export function getMarketplace() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const marketplace = new ethers.Contract(marketplaceAddress, abi, signer)
  return { marketplace, provider, signer }
}

export function ipfsToHttp(ipfsUrl: string): string {   
  if(ipfsUrl.length > 53) {
    ipfsUrl = ipfsUrl.substring(0, 53)
  }  
  let cid = ipfsUrl.match(/^ipfs:\/\/(.+)/)?.[1]
  if (!cid) {
    throw new Error('Invalid IPFS URL')
  }
  const filenameMatch = cid.match(/^(.+)\?filename=(.+)$/)
  if (filenameMatch) {
    cid = filenameMatch[1]
    const filename = encodeURIComponent(filenameMatch[2])
    return `https://ipfs.io/ipfs/${cid}/${filename}`
  }
  return `https://ipfs.io/ipfs/${cid}`
}

export async function getContractAbi(contractAddress: any) {  //*
  try {
    const response = await axios.get(ETHERSCAN_API_URL, {
      params: {
        module: 'contract',
        action: 'getabi',
        address: contractAddress,
        apikey: API_KEY,
      },
    })
    return response.data.result
  } catch (error) {
    return null;
  }
}