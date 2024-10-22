"use client"
import { useStore } from "../Dogs/Dogs"
const SideItems = ({cat}) => {
    const {setCurrentBreeds} = useStore()
    return (
        <div key={cat} className="py-4 border-b-[0.5px] border-y-grey hover:bg-slate-400 cursor-pointer px-2 md:px-4" onClick={() => {
            setCurrentBreeds(cat)
        }}>{cat.toUpperCase()}</div> 
    )
}

export default SideItems