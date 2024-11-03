"use client"

import { useState, useEffect } from "react"
import {create} from 'zustand';

import { dogApi } from "@/app/utils/service/useDogs";

import ImageComponent from "../ImageComponent/ImageComponent";
import extractBreeds from "@/app/utils/helper/getBreedFromLink";

import Loader from "../ui/Loading";
interface StoreState {
  currentdogs: string[] | string | undefined;
  currentBreeds: string | null;
  query: string | null;
  showModal: boolean;
}
interface StoreActions {
  setQuery: (q: string) => void;
  setCurrentBreeds: (breed: string | null) => void;
  setShowModal: (status: boolean) => void;
  setcurrentDogs: (dogs: string[] | string | undefined) => void;
}

type Store = StoreState & StoreActions;

export const useStore = create<Store>((set) => ({
    currentdogs: [],
    currentBreeds: null,
    query: null,
    setQuery: (q:string) => set(() => ({ query: q })),
    // setcurrentDogs: (dogs:string[] | string | undefined) => set(() => ({ currentdogs: dogs })),
    setCurrentBreeds: (breed:string | null) => set(() => ({currentBreeds: breed})),
    setcurrentDogs: (dog:string[] | string | undefined) => set(() => ({currentdogs: dog})),
    showModal: false,
    setShowModal: (status:boolean) => set(() => ({showModal: !status})),
  }));
 

const Dogs = () => {
    const { currentdogs, setcurrentDogs, currentBreeds, query } = useStore()
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState<null | string | string[]>(null)
    const [count, setCount] = useState(0)
    const [loadingMore, setLoadingMore] = useState(false)
    console.log(isError, error, loadingMore)
    const filteredDogs = (typeof currentdogs == "object" && query !== null) ? currentdogs.filter((dog) => extractBreeds(dog).toLowerCase().includes(query!.toLowerCase())) : currentdogs
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
          setcurrentDogs(req?.message)
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
    }, [currentBreeds, count, currentdogs!.length == 0])
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
    return(!loading?
<div className="grid grid-cols-1 p-4 md:pr-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-2">
{(typeof filteredDogs == "object" ) && filteredDogs!.map((dog:string, index:number) => (
        <ImageComponent key={index} src={dog}/> // Ensure you return the <p> element
      ))}
</div>:<div className="w-full flex h-screen items-center justify-center"><Loader/></div>
    )
}

export default Dogs