import React from "react"
import { ButtonsProps } from "../types"

const MainButton = ({ children, type, onClick }:ButtonsProps) => { 
  return <button onClick={onClick} id="location" type={type} className="btn btn-primary">{children}</button>
}

const SecondaryButton = ({ children, type, onClick }: ButtonsProps) => {
  return <button onClick={onClick} type={ type } className="btn btn-success">{ children }</button>
}

export { MainButton, SecondaryButton }