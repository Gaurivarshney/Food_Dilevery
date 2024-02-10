import React,{useEffect, useState} from 'react'
import {BiPlus, BiMinus} from 'react-icons/bi'
import {motion} from 'framer-motion'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
export default function ItemSection({item,flag, setFlag}) {
    const[qty ,setQty] =useState(item.qty);
    const [items, setItems] =useState([]);
    
    const[{cartItems}, dispatch]= useStateValue();
    const cartDispatch=()=>{
        localStorage.setItem("cartItems", JSON.stringify(items));
        dispatch({
            type:actionType.SET_CARTITEMS,
            cartItems:items,
        })
    }
    const updateQty=(action,id)=>{
        if(action=="add"){
            setQty(qty+1);
            cartItems.map((item)=>{
                if(item.id===id){
                    item.qty+=1;
                    setFlag(flag + 1);
                }
            });
            cartDispatch();
        }else{
            if(qty==1){
                setItems(cartItems?.filter((n)=>n.id!==id));
                cartDispatch();
            }else{
                setQty(qty-1);
                cartItems.map((item)=>{
                    if(item.id===id){
                        item.qty-=1;
                        setFlag(flag + 1);
                    }
                });
                cartDispatch();
            }
        }
    }
    useEffect(()=>{
setItems(cartItems)
    },[qty])
  return (
    <div key={item.id} className='flex flex-row justify-around items-center rounded-lg bg-gray-700 mb-4 mx-2'>
                <div>
                    <img src={item.imgURL} alt="" className='h-24 w-24'/>
                </div>
                <div className='flex flex-col'>
                    <p className='text-white font-semibold tetx-lg'>{item.title}</p>
                    <p className='text-white font-semibold tetx-lg'>
                        <span className='text-red-500 font-semibold tetx-lg mr-2'>$</span>
                        <span>{item?.price*qty}</span>
                    </p>
                </div>

                <div className='flex flex-row gap-2 text-white font-semibold text-xl items-center justify-center'>
                    <motion.div whileTap={{scale: 0.75}} className='border rounded-md' onClick={()=>updateQty("add",item?.id)}>
                        <BiPlus/>
                    </motion.div>
                    <p>{qty}</p>
                    <motion.div whileTap={{scale: 0.75}} className='border rounded-md' onClick={()=>updateQty("remove",item?.id)}>
                        <BiMinus/>
                    </motion.div>
                </div>
            </div>
  )
}
