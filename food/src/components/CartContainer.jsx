import React, { useState,useEffect } from 'react'
import Emptycart from '../img/emptyCart.svg'
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import {RiRefreshFill} from 'react-icons/ri'
import ItemSection from './ItemSection'
import {motion} from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

export default function CartContainer() {
    
    const [{cartShow,cartItems,user }, dispatch] = useStateValue();
    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);
    const showCart =()=>{
        dispatch({
          type: actionType.SET_CART_SHOW,
          cartShow: !cartShow,
        });
      }
      useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
          return accumulator + item.qty * item.price;
        }, 0);
        setTot(totalPrice);
        console.log(tot);
      }, [tot, flag]);
    
      const clearCart = () => {
        dispatch({
          type: actionType.SET_CARTITEMS,
          cartItems: [],
        });
    
        localStorage.setItem("cartItems", JSON.stringify([]));
      };
  return (
    <motion.div initial={{opacity: 0 , x:200}}
    animate={{opacity: 1, x:0}}
    exit={{opacity: 0 , x:200}}
    className='fixed bg-white w-full md:w-[350px] h-screen top-0 right-0 z-[110]'>
      <div  className="flex flex-row items-center justify-between p-4 cursor-pointer">
       <motion.div whileTap={{scale: 0.75}}>
       <MdOutlineKeyboardBackspace onClick={showCart} className='text-3xl text-slate-800 hover:text-slate-700 transition-all duration-0 ease-in-out'/>
       </motion.div>
        <p className='text-xl font-semibold text-slate-800'>Cart Items</p>
        <motion.div whileTap={{scale: 0.75}} className='flex items-center justify-center gap-2 rounded-lg p-1 border-2 ' onClick={clearCart}>
            <p className='font-semibold text-slate-600 text-lg'>clear</p>
            <RiRefreshFill/>
        </motion.div>
      </div>

      {/* {Cart section} */}
      {
        cartItems && cartItems.length>0 ?(

     <div className='flex flex-col items-center  w-full h-full bg-gray-800 rounded-t-[2rem] '>
        <div className=' h-[300px] w-full m-12 md:h-[250px]   overflow-y-scroll scrollbar-none'>
           {
            cartItems && cartItems.map((item)=>(
               <ItemSection item={item} setFlag={setFlag}
                  flag={flag}/>
               
            ))
           }
           
            
        </div>
<div className='bg-gray-700 w-full h-full md:h-[360px] rounded-t-[2rem] flex flex-col items-center'>
        <div className='flex flex-row items-center justify-between m-4 mt-10 px-6  w-full '>
        <span className='text-xl font-semibold text-slate-400'>Sub-Total</span>
        <span className='text-xl font-semibold text-slate-400'><span className='text-xl font-semibold text-red-500 mr-2'>$</span> {tot}</span>

        </div>
{/* {Total section start} */}
        <div className='flex flex-row items-center justify-between m-4  px-6  w-full '>
        <span className='text-xl font-semibold text-slate-400'>Dilevery</span>
        <span className='text-xl font-semibold text-slate-400'><span className='text-xl font-semibold text-red-500 mr-2'>$</span>2.5</span>

        </div>
        <hr className='text-slate-300 h-1 w-[300px] m-4 drop-shadow-xl ' />
        <div className='flex flex-row items-center justify-between m-4  px-6  w-full '>
        <span className='text-xl font-semibold text-white'>Total</span>
        <span className='text-xl font-semibold text-white'><span className='text-xl font-semibold text-red-500 mr-2'>$</span>{tot+2.5}</span>

        </div>
       {
        user? ( <motion.div whileTap={{scale: 0.75}}  className='w-[300px] h-[40px] hover:bg-orange-300 shadow-xl rounded-full flex items-center m-4 justify-center bg-orange-400'>
            <button className='text-white text-xl'>Check Out</button>
        </motion.div>):(
            <motion.div whileTap={{scale: 0.75}}  className='w-[300px] h-[40px] hover:bg-orange-300 shadow-xl rounded-full flex items-center m-4 justify-center bg-orange-400'>
            <button className='text-white text-xl'>Login to Check Out</button>
        </motion.div>
        )
       }
</div>
     </div>
        ):(
            <div className='w-full h-full m-4 flex flex-col items-center justify-center gap-3'>
                <img src={Emptycart} alt="" className='w-300 '/>
                <p className='font-semibold text-md text-slate-600'>Your Cart is Empty ☹️ Add Your Items ❤️</p>
            </div>
        )
      }


    </motion.div>
  )
}
