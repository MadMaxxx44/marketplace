import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function About() {
  return (
    <>
      <Navbar />
      <br/>
      <div className="about">
        <header className="headerAbout">About</header>
        <p>
          Here you can trade your nfts with other users. Sell and buy different standarts of nfts, such as ERC721 and ERC1155.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus hendrerit elit, id euismod nunc efficitur at. Nam vitae arcu vel nunc ornare ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla et nulla lobortis, pellentesque mauris quis, malesuada magna. Fusce at nunc quis mauris efficitur tristique a a justo. Sed vestibulum bibendum nulla vel sollicitudin. Sed semper elementum enim at consectetur. Aliquam quis risus vel est venenatis maximus. Mauris blandit lorem id felis luctus, at vestibulum arcu ultrices. Aenean vehicula suscipit velit, eget fermentum libero volutpat sed. Vestibulum vel lacus vitae nulla dictum bibendum. Sed consequat libero vel risus varius hendrerit. Suspendisse tincidunt ante risus, at sagittis massa dictum sit amet. Proin sollicitudin velit auctor, rhoncus tellus vel, vestibulum magna. 
        </p>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  )
}