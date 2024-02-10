import React from 'react'
import dilevery from '../img/delivery.png'
import back from '../img/heroBg.png'
import i1 from '../img/i1.png'
import r1 from '../img/r1.png'
import f1 from '../img/f1.png'
import c1 from '../img/c1.png'
// import data from './data'
const data=[
  {id:1, img:i1 , title: "IceCream" , p:"Chocalate & Vanilla", price:5.90},
  {id:2, img:r1 , title: "IceCream" , p:"Chocalate & Vanilla", price:5.90},
  {id:3, img:f1 , title: "IceCream" , p:"Chocalate & Vanilla", price:5.90},
  {id:4, img:c1 , title: "IceCream" , p:"Chocalate & Vanilla", price:5.90},
]
export default function HomeContainer() {
  return (
    <section className='grid grid-cols-1 mt-12 md:grid-cols-2 gap-2 w-full' id='home'>
    <div className= 'flex flex-col flex-1 py-2 gap-8'>
        <div className='flex flex-row bg-orange-100 px-4 py-2 rounded-full w-[185px] items-center justify-center'>
          <p className='font-semibold text-orange-500'>Bike Dilevery</p>
          <div className='h-9 w-9 overflow-hidden ml-2 bg-white rounded-full items-center drop-shadow-xl justify-center'>
            <img src={dilevery} alt="dilevery" className='w-full h-full object-contain' />
          </div>
        </div>
        <div>
          <p className='text-5xl font-bold tracking-wide lg:text-7xl'>The Fastest Dilevery in <span className='text-orange-500 text-6xl lg:text-8xl'>Your City</span></p>
        </div>

    <div>
      <p className='w-[80%] text-base text-slate-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo nemo ex excepturi facilis quasi eum est quaerat tempora vero veniam harum nulla porro nisi, aliquid quia voluptatibus laboriosam autem aut maxime tempore rem. Ratione hic similique, molestiae possimus numquam quae nostrum architecto recusandae nam delectus tempore ut, ad, maiores sapiente corporis. Soluta sint minima quis excepturi adipisci reprehenderit nesciunt sit, magnam itaque tempora ex, fugit eos iste amet laudantium vero?</p>

    </div>
    <button type='button' className='bg-orange-500 py-2 rounded-full text-white text-2xl hover:shadow-lg transition-all ease-in-out duration-100 md:px-4  lg:w-[185px] items-center justify-center'>Order Now</button>
    </div>


    <div className=' w-full '>
    <div className='relative py-4 z-10'>
        <img src={back} alt="background" className='h-[550px] ml-auto w-full lg:w-auto'/>
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center flex-wrap  lg:px-32 py-4'>
           {
            data && data.map((item)=>(
          <div className="lg:w-190 flex flex-col p-4 backdrop-blur-md bg-gradient-to-r from-orange-300 to-yellow-100 rounded-3xl justify-center items-center mx-2 drop-shadow-lg ">
           
            <img src={item.img} alt="" className=' w-20 lg:w-40 -mt-10 lg:-mt-20'/>
            <p className='text-base lg:text-xl font-semibold '>{item.title}</p>
            <p className='text-[10px] lg:text-sm text-slate-400 font-semibold my-1 lg:my-3'>{item.p}</p>
            <p className='font-semibold text-slate-900'><span className='text-red-500'>$</span>{item.price}</p>
          </div>
           
            ))
           }


        </div>
      </div>
    </div>
     
    </section>
  )
}
