"use client"
import { useStore } from "../Dogs/Dogs"
import { categorytype } from "@/app/type"
interface MyComponentProps {
    cat:categorytype
   }
const SideItems:React.FC<MyComponentProps> = ({cat}) => {
    const {setCurrentBreeds,setShowModal, showModal} = useStore()
    return (
        <div key={cat} className="py-4 border-b-[0.5px] border-y-grey hover:bg-slate-400 cursor-pointer px-2 md:px-4 text-black" onClick={() => {
            setCurrentBreeds(cat)
            setShowModal(!showModal)
        }}>{cat.toUpperCase()}</div> 
    )
}
export default SideItems