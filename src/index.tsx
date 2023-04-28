import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App721 from "./721App"
import App1155 from "./1155App"
import reportWebVitals from "./reportWebVitals"
import { DAppProvider, ChainId } from "@usedapp/core"
import { HashRouter as Router, Routes, Route} from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <DAppProvider config={{
    supportedChains: [ChainId.Goerli, ChainId.Sepolia]
  }}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/721" element={<App721 />}/>
        <Route path="/1155" element={<App1155 />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
    </Router>
  </DAppProvider>
)
reportWebVitals()
