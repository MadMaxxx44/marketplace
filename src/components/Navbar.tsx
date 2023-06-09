import React from "react"
import logo from "../images/m.png"
import home from "../images/power2.gif"
import { Link } from "react-router-dom"
import { useEthers } from "@usedapp/core"

export default function Navbar() {
  const { account, activateBrowserWallet, deactivate } = useEthers()
  const isConnected = account !== undefined

  return (
  <>
    <nav className="myNav">
      <Link to="/"><img className="home-icon" src={home} alt=""/></Link>
      <div className="header">MaximumNFTs</div>
      <img className="logo" src={logo} alt="MA LOGO" />
      <div className="nav-links">
        <ul>
          <li><Link to="/721">721</Link></li>
          <br/>
          <li><Link to="/1155">1155</Link></li>
          <br/>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
      {isConnected ? (
        <button 
          className="connection-btn" 
          onClick={deactivate}>
          Disconnect
        </button>
      ) : (
        <button 
          className="connection-btn" 
          onClick={() => activateBrowserWallet()}>
          Connect
        </button>
      )}
    </nav>
  </>
  )
}