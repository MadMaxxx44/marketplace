import React from "react"
import linkedin from "../images/linkedin.png"
import stack from "../images/stack-overflow.png"
import github from "../images/github.png"
import { Link } from "react-router-dom"

export default function Footer() {
  const path1 = "https://www.linkedin.com/in/max-a-772a2122a/"
  const path2 = "https://stackoverflow.com/users/18125566/petr-galushkin"
  const path3 = "https://github.com/MadMaxxx44"
    return (
      <div className="footer">
        <h1>Contacts</h1>
        <br/>
        <Link to={path1} target="_blank"><img className="linkedin-icon" src={linkedin} alt=""/></Link>
        <Link to={path2} target="_blank"><img className="stack-icon" src={stack} alt=""/></Link>
        <Link to={path3} target="_blank"><img className="github-icon" src={github} alt=""/></Link>
      </div>
    )
  }