"use client"
import SideItems from "./SideItem"
import Input from "../Input"
import { useState } from "react"
import { Input as DaisyInput } from "react-daisyui"

const Search = ({categories}) => {
    const [query, setQuery] = useState("")
    const filteredCategories = Object.keys(categories).filter((cat) =>
    cat.toLowerCase().includes(query.toLowerCase())
  );

    return(
        <div>
             <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
             <DaisyInput placeholder="Search Breed" onChange={(e) => setQuery(e.target.value)}  className=" p-2 w-full md:max-w-xs border-solid border border-black"/>
    </div>
        <div className="h-full ">
        {filteredCategories.map((cat) => 
          <SideItems cat={cat} key={cat}/>
        )}
      </div>
      </div>
    )
}

export default Search