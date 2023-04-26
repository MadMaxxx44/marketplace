import { useState, useEffect } from "react"
import Buy1155 from "../components/InjectedBuy1155"
import Close1155 from "../components/InjectedClose1155"

function MyModal(props: any) {
  const { imageSrc, onClose } = props

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content">
        <img src={imageSrc} alt={""} />
      </div>
    </div>
  )
}

export default function NFTCard1155(props: any) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const shortenedAddress = `${props.contractAddress.slice(0, 6)}...${props.contractAddress.slice(-4)}`
  const link = `https://etherscan.io/address/${props.contractAddress}`
  const path = "M 12.11 12.178L16 8.287l1.768 1.768-5.657 5.657-1.768-1.768-3.889-3.889 1.768-1.768 3.889 3.89 Z"
  const className = "NFTCard1155-image  isScaled"

  const handleImageClick = () => {
    setIsModalOpen(true)
    const t = document.querySelector(".NFTCard1155")
    if (t) {
      t.classList.add("no-hover")
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    const t = document.querySelector(".NFTCard1155")
    if (t) {
      t.classList.remove("no-hover")
    }
  }

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible)
  } 

  return (
    <div className={`NFTCard1155 ${isModalOpen ? "no-hover" : ""}`}>
      <div className="image-container">
      {props.img && props.img.map((imageUrl: string, index: number) => {
        return (
          <img
            className={className}
            key={index}
            src={imageUrl}
            alt={""}
            onClick={handleImageClick}
          />
        )
      })}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          {props.img && props.img.map((imageUrl: string, index: number) => {
            return (<MyModal imageSrc={imageUrl} onClose={handleModalClose} />)
          })}
        </div>
      )}
    </div>
      <h2 className="details-conf1155">
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
      <div id="details-1155" style={{ display: isDetailsVisible ? "block" : "none" }}>
        <div className="test">
          <span>ContractAddress:</span>
          <span><a id="address-link" href={link} target="_blank" rel="noopener noreferrer">{shortenedAddress}</a></span>
        </div>
        <div className="test">
          <span>Network:</span>
          <span>{props.network}</span>
        </div>
        <div className="test">
          <span>TokenIds:</span>
          <span>{props.tokenIds.join(', ')}</span>
        </div>
        <div className="test">
          <span>Amounts:</span>
          <span>{props.amounts.join(', ')}</span>
        </div>
      </div>
      <br/>
      <br/>
      <div className="salePrice">
        <span>Sale#: {props.nonce}</span>
        <br/>
        <span>Price: {props.price}</span>
      </div>
      <div className="buttons1155">
        <Buy1155 nonce={props.nonce}/>
        <Close1155 nonce={props.nonce}/>
      </div>
      <br/>
    </div>
  )
}