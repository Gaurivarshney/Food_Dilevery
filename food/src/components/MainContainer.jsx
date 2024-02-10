import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
function MainContainer() {
  const [{ foodItems,cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue]= useState();
  useEffect(()=>{

  },[scrollValue])
  console.log("foodItems", foodItems);
  return (
    <div>
      <HomeContainer />
      <section className="w-full my-2">
        <div className="w-full flex items-center justify-between">
          <p className="text-slate-900 font-bold text-2xl capitalize  border-b-8 rounded-md outline-none border-orange-500">
            Our Fresh & Healthy Fruits
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300  hover:bg-orange-500 transition-all duration-75 ease-in-out flex items-center justify-center"
            >
              <MdChevronLeft className="text-white font-bold text-lg" onClick={()=>setScrollValue(-500)}/>
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 transition-all duration-75 ease-in-out  flex items-center justify-center"
            >
              <MdChevronRight className="text-white font-bold text-lg" onClick={()=>setScrollValue(500)}/>
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruits")}
        />
      </section>
      <MenuContainer />
     {
      cartShow &&  <CartContainer/>
     }
    </div>
  );
}

export default MainContainer;
