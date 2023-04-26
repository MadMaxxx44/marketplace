import React from "react"
import "./styles.css"
import { DAppProvider, ChainId } from "@usedapp/core"
import Sell1155 from "./components/Sell1155"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

const App: React.FC = () => {
  return (
    <>
    <DAppProvider config={{
      supportedChains: [ChainId.Goerli, ChainId.Sepolia]
    }}>
      <body>
        <div><Navbar /></div>
        <br/>
        <br/>
        <br/>
        <div className="my2div">
          <header className="header1155">1155</header>
          <div className="sell1155-div">
            <Sell1155 />
          </div>
        </div>
      </body>
      <footer className="footer1155">
        <Footer />
      </footer>
    </DAppProvider>
    </>
  )
}

export default App;
