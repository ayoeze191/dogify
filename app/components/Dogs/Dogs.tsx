"use client"

import { useState, useEffect } from "react"
import {create} from 'zustand';
import api from "./../../utils/axios"
import { dogApi } from "@/app/utils/service/useDogs";
import Image from "next/image";
import ImageComponent from "../ImageComponent/ImageComponent";
import Loader from "../ui/Loading";
export const useStore = create((set) => ({
    currentdogs: [],
    currentBreeds: null,
    query: null,
    setQuery: (q) => set(() => ({ query: q })),
    setcurrentDogs: (dogs) => set(() => ({ currentdogs: dogs })),
    setCurrentBreeds: (breed) => set(() => ({currentBreeds: breed})),
    showModal: false,
    setShowModal: (status) => set(() => ({showModal: !status})),
  }));
 

const Dogs = () => {
    const { currentdogs, setcurrentDogs, currentBreeds } = useStore()
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState(null)
    const [count, setCount] = useState(0)
    const [loadingMore, setLoadingMore] = useState(false)
    // const []
    // const filteredDogs = currentBreeds
    // const []
    const loadMoreDogs = async() => {  
      const [req, err] = await dogApi().getRandom().getRandomImage()
    }
    const getDogs = async() => {
      if(currentBreeds == null && count > 0){
        setLoadingMore(true)
      }
      else if(currentBreeds == null && count == 0){
        setLoading(true)
      }
      else if(currentBreeds !== null){
        setLoading(true)
      }
        
        const [req, err] = currentBreeds == null ?await dogApi().getRandom().getRandomImage((count + 50).toString()) :await dogApi().getAllImagesInABreed(currentBreeds)
        if (err) {
            setIsError(true);
            setError(err.message);
            setLoading(false)
            setLoadingMore(false)
            return;
          }
          // let current = [...currentdogs]
          // console.log(req.message.length)
          setcurrentDogs(req.message)
          // setcurrentDogs([...currentdogs, ...req.message.slice(count, count + 50)])
          // console.log(currentdogs, req.message.slice(count, count + 50))
          setLoading(false)
            setLoadingMore(false)
      }
    useEffect(() => {
        const fetchDogs = async () => {
            await getDogs(); // Fetch your data here
          };
          fetchDogs()
            // Check if user has scrolled to the bottom
    }, [currentBreeds, count, currentdogs.length == 0])
    useEffect(() => {
      const handleScroll = () => {
          // Check if user has scrolled to the bottom
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1 && !loading) {
              setCount(prevCount => prevCount + 50);
          }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  console.log(currentdogs)
    return(!loading?
<div className="grid grid-cols-1 pr-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-2">
{currentdogs.map((dog, index) => (
        <ImageComponent key={index} src={dog}/> // Ensure you return the <p> element
      ))}
</div>:<div className="w-full flex h-screen items-center justify-center"><Loader/></div>
    )
}

export default Dogs