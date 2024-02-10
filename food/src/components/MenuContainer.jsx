import React, { useEffect, useState } from 'react'
import { MdFastfood } from "react-icons/md";
import {motion} from 'framer-motion'
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';
const categories = [
     {
       id: 1,
       name: "Chicken",
       urlParamName: "chicken",
     },
     {
       id: 2,
       name: "Curry",
       urlParamName: "curry",
     },
     {
       id: 3,
       name: "Rice",
       urlParamName: "rice",
     },
     {
       id: 4,
       name: "Fish",
       urlParamName: "fish",
     },
     {
       id: 5,
       name: "Fruits",
       urlParamName: "fruits",
     },
     {
       id: 6,
       name: "Icecreams",
       urlParamName: "icecreams",
     },
   
     {
       id: 7,
       name: "Soft Drinks",
       urlParamName: "drinks",
     },
   ];
export default function MenuContainer() {
    const[filter, setFilter] =useState("chicken");
    const [{foodItems}, dispatch] =useStateValue();
    useEffect(()=>{},[filter]);
  return (
    <section className='w-full my-2' id='menu'>
      <div className='w-full flex flex-col items-center justify-center'>
      <p className="text-slate-900 font-bold text-2xl capitalize  border-b-8 rounded-md outline-none border-orange-500 mr-auto">
            Our Hot dishes
          </p>

          <div className='w-full flex items-start justify-start md:items-center md:justify-center flex-wrap gap-6 m-12'>
         {
            categories && categories.map((item)=>(
                <motion.div whileTap={{scale: 0.75}} key={item.id} className={`group ${filter===item.urlParamName? "bg-red-500" : "bg-slate-100"} h-28 min-w-[85px] rounded-lg drop-shadow-xl hover:bg-red-500 flex flex-col justify-center items-center transition-all duration-150 ease-in-out`} onClick={()=>setFilter(item.urlParamName)}>
            <div className={`${filter===item.urlParamName ?  "bg-slate-100":  "bg-red-500" } w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white  transition-all duration-150 ease-in-out shadow-lg`}>
                <MdFastfood className={` ${filter===item.urlParamName ? "text-slate-500" : "text-white "} text-lg group-hover:text-slate-600  transition-all duration-150 ease-in-out`} />
            </div>
            <div className={`${filter===item.urlParamName ? "text-white": "text-slate-500"} mt-3 `}>
                <p className='text-sm font-semibold group-hover:text-white  transition-all duration-150 ease-in-out'>{item.name}</p>
            </div>
          </motion.div>
            ))
         }

          </div>

          <RowContainer flag={false} data={foodItems?.filter((n)=>n.category===filter)}/>
      </div>
    </section>
  )
}
