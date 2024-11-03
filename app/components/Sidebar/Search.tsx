"use client"
import SideItems from "./SideItem"
import React, { useState } from "react"
import { Input as DaisyInput } from "react-daisyui"
import { SearchComponent } from "@/app/type"
const Search:React.FC<SearchComponent> = ({categories}) => {
    const [query, setQuery] = useState("")
    const filteredCategories = Object.keys(categories).filter((cat) =>
    cat.toLowerCase().includes(query.toLowerCase())
  );
    return(
        <div>
             <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
             <DaisyInput placeholder="Search Breed" onChange={(e) => setQuery(e.target.value)}  className=" p-2 w-full text-black md:max-w-xs border-solid border border-black"/>
    </div>
        <div className="h-full ">
        {filteredCategories.map((cat:string, index:number) => 
          <SideItems cat={cat} key={index}/>
        )}
      </div>
      </div>
    )
}

export default Search