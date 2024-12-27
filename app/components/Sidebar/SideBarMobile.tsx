"use client";

import api from "../../utils/axios";
import { useEffect, useState } from "react";

import { useStore } from "../Dogs/Dogs";
import Search from "./Search";
export default function SideBarMobile() {
  const [categories, setCategories] = useState([]);
  // const [showSideBar, setShowSideBar] = useState(false)
  const { showModal } = useStore();

  const getcategories = async () => {
    const cat = (await api.get("/breeds/list/all")).data.message;
    setCategories(cat);
  };
  useEffect(() => {
    const fetchCats = async () => {
      await getcategories(); // Fetch your data here
    };
    fetchCats();
  }, []);

  return (
    <div
      className={` ${
        showModal ? "translate-y-0" : " -translate-y-[60rem] transition-all"
      } flex flex-col px-2  pt-10 bg-[#f0f8ff] overflow-y-scroll fixed w-full md:hidden h-[90vh]  bottom-0 left-0 z-20`}
    >
      <div className="flex flex-col gap-4 items-center">
        <div className="w-fit font-mono italic font-[500] text-black">
          Dogify
        </div>
      </div>
      <Search categories={categories} />
    </div>
  );
}

// ${showSideBar?"showSideBar":"dissappear md: showSideBar"}
