"use client"
import { useStore } from "./components/Dogs/Dogs"
import { IoArrowBackSharp } from "react-icons/io5";
import { Input as DaisyInput } from "react-daisyui"
import extractBreeds from "@/app/utils/helper/getBreedFromLink";
import {  useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
export default function Home() {
  const {currentBreeds, setCurrentBreeds,  showModal, setShowModal, setQuery} = useStore()
  // useEffect(() => {
  //   setcurrentDogs(currentdogs!.filter((dog) => dog.toLowerCase().includes(query.toLowerCase())))
  // }, [query])
    return (
      <div className={` text-black flex justify-between flex-col md:flex-row md:items-center pt-10 mb-10 md:pr-4 px-4 h-[20vh] md:h-[initial] `}>
         <GiHamburgerMenu className="md:hidden cursor-pointer" fontSize={20} onClick={() => {
          setShowModal(showModal)
         }}/>
  {currentBreeds == null ? <h2 className="text-wrap text-lg font-mono flex flex-col md:flex-row gap-10 items-center"><div className="hidden md:block text-black">Random Dog Images</div>
   
  <div className="flex items-center w-full justify-between md:justify-center gap-2 font-sans">
               <DaisyInput placeholder="Search Breed"  onChange={(e) => setQuery(e.target.value)}
              //  onChange={(e) => setQuery(e.target.value)}
                 className="p-2 w-full max-w-xs border-solid border border-black"/> <div className="text-[brown] md:hidden ml-[1rem]">GITHUB</div>
  </div>
  </h2>:<div className="text-wrap text-lg font-mono flex gap-10 items-center">
  <IoArrowBackSharp className="cursor-pointer" onClick={() => setCurrentBreeds(null)}/>
    {currentBreeds}</div>
  }
 
  <div className="text-red-300 md:block hidden">GITHUB</div>
      </div>
    )}