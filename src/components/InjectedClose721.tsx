import React, { useState, useEffect } from "react"
import Confirmation from "./Confirmation"
import { getMarketplace } from "./functionalityConfig"

export default function InjectedCloseNFT721Sale(props: any) {
    const [nonce, setNonce] = useState(props.nonce)
    const [trigger, setTrigger] = useState("")
    const [errorMessage, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
      const storedData = localStorage.getItem("nftData")
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        const saleNumber = Number(nonce)
        const updatedNftData = parsedData.filter((item: {nonce: any}) => item.nonce !== saleNumber)
        localStorage.setItem("nftData", JSON.stringify(updatedNftData))
      }
    }, [trigger])
  
    async function handleClosing() {  
      try {
        setIsLoading(true)
        await setNonce(props.nonce)
        const { marketplace } = getMarketplace()
        const tx = await marketplace.closeNFT721Sale(nonce)
        setTrigger(nonce)
        if(tx) {
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
        else 
        if (error instanceof Error) {
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
        <div className="close721config">
          <button 
            className="close721" 
            onClick={handleClosing}
            disabled={isLoading}>Close
          </button>
          {errorMessage && <p className="error721close">Error: {errorMessage}</p>}
        </div>
        <Confirmation isActive={isActive} />
      </>
    )
  }