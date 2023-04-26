import React from "react"

export default function Confirmation(props: any) {
  return (
    <div className="confirmationContainer">
      <p className={`confirmation ${props.isActive ? 'active' : ''}`}>
        Success✅
      </p>
    </div>
  )
}