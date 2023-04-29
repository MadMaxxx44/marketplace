import React from "react"
import "./styles.css"
import { DAppProvider, ChainId } from "@usedapp/core"
import Sell721 from "./components/Sell721"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

const App: React.FC = () => {
  return (
    <>
    <DAppProvider config={{
      supportedChains: [ChainId.Goerli, ChainId.Sepolia]
    }}>
      <body>
        <div className="navbar"><Navbar /></div>
        <div className="my1div"> 
          <header className="header721">721</header>
          <div className="sell">
            <Sell721 />
          </div>
        </div>
      </body>
      <footer>
        <Footer />
      </footer>
    </DAppProvider>
    </>
  )
}

export default App;
