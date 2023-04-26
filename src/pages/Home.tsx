import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Rain from "../images/rain.gif"

export default function Home() {
  return (
    <>
      <Navbar />
      <br/>
      <div className="home">
        <h1 className="headerHome">Welcome to the marketplace</h1>
        <br/>
        <p>MaximumNFTs - Diversity, Security and Reliability.<br/>Sell and buy nfts in one click. All in one place.</p>
        <br/>
        <br/>
        <img className="rain-icon"src={Rain} alt=""/>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  )
}