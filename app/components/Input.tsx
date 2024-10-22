"use client"
import { Input as DaisyInput } from "react-daisyui"

 const Input = ({handleChange}) => {
      return <DaisyInput placeholder="Search Breed" onChange={() => handleChange(e.target.value)}  className="p-2 w-full max-w-xs border-solid border border-black"/>
}
export default Input
