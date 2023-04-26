import { useState } from "react"
import Buy721 from "../components/InjectedBuy721"
import Close721 from "../components/InjectedClose721"

export default function NFTCard(props: any) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const [arrowRotation, setArrowRotation] = useState(0)

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible)
    setArrowRotation(arrowRotation + 180)
  } 

  const shortenedAddress = `${props.contractAddress.slice(0, 6)}...${props.contractAddress.slice(-4)}`
  const link = `https://etherscan.io/address/${props.contractAddress}`
  const path = "M 12.11 12.178L16 8.287l1.768 1.768-5.657 5.657-1.768-1.768-3.889-3.889 1.768-1.768 3.889 3.89 Z"

  return (
    <div className="NFTCard">
      <img src={props.img} className="NFTcard-image" alt={props.image} />
      <h2 className="details-conf">
        DETAILS
          <div className="toggle-container" onClick={toggleDetails}>
            <svg
              transform={`translate(55, -25) rotate(${isDetailsVisible ? 180 : 0})`}
              style={{ transition: "transform 0.5s ease-in-out", transformOrigin: "center" }}
              id="arrow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d={path}/>
            </svg>
          </div>
      </h2>
      <div id="details"  style={{ display: isDetailsVisible ? "block" : "none" }}>
        <div className="test">
          <span>Name:</span> 
          <span className="name-test">{props.name}</span>
        </div>
        <div className="test">
          <span>Description:</span> 
          <span>{props.description}</span>
        </div>
        <div className="test">
          <span>Network:</span>  
          <span>Ethereum(goerli)</span>
        </div>
        <div className="test">
          <span>ContractAddress:</span> 
          <span><a id="address-link" href={link} target="_blank" rel="noopener noreferrer">{shortenedAddress}</a></span>
        </div>
        <div className="test">
          <span>TokenId:</span> 
          <span>{props.tokenId}</span>
        </div>
      </div>
      <br/>
      <div className="salePrice">
        <span>Sale#: {props.nonce}</span>
        <span>Price: {props.price}</span>
      </div>
      <div className="buttons">
        <Buy721 nonce={props.nonce}/>
        <Close721 nonce={props.nonce}/>
      </div>
      <br/>
      <br/>
    </div>
  )
}