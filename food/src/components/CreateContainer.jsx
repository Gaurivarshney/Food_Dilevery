import React, { useState } from 'react'
import Loader from './Loader'
import { motion } from "framer-motion";
import {ref,uploadBytesResumable,getDownloadURL,deleteObject} from 'firebase/storage'
import {storage} from '../firebase.config'
import { MdFastfood, MdCloudUpload,MdDelete, MdFoodBank, MdAttachMoney} from "react-icons/md";
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
export const categories = [
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
export default function CreateContainer() {

  const[title, setTitle]= useState("");
  const[calories, setCalories]= useState("");
  const[price, setPrice]= useState("");
  const[category, setCategory]= useState(null);
  const[imageAsset, setImgAsset]= useState(null);
  const[fields, setFields]= useState(false); //errors
  const[alertStatus, setAlertStatus]= useState("d");
  const[msg, setMsg]= useState(null);
  const[isLoading, setIsLoading]= useState(false);
  const [{foodItems}, dispatch]= useStateValue();
  const uploadFile=(e)=>{
    setIsLoading(true);
    const imgFile =e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imgFile.name}`);
    const uploadTask= uploadBytesResumable(storageRef, imgFile);
    uploadTask.on('state_changed', (snapshot)=>{
      const uploadProgress =(snapshot.bytesTransferred/ snapshot.totalBytes)*100;
    }, (error)=>{
      console.log(error);
      setFields(true);
     setMsg("Error while uploading: Try Again ☹️")
      setAlertStatus("danger");
      setTimeout(()=>{
        setFields(false);
        setIsLoading(false);

      },4000)
    }, ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setImgAsset(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMsg("Image Uploaded Successful 😊");
        setAlertStatus("success");
        setTimeout(()=>{
          setFields(false);
        },4000)
      })
    } )
  };
  const deleteImage=()=>{
    setIsLoading(true);
    const deleteRef = ref(storage,imageAsset);
    deleteObject(deleteRef).then(()=>{
      setImgAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image Deleted Successful 😊");
      setAlertStatus("success");
      setTimeout(()=>{
        setFields(false);
      },4000)
    })
  };
  const saveDetails=()=>{
    setIsLoading(true);
    try {
      if((!title || !price || !calories || !category || !imageAsset)){
        setFields(true);
       setMsg("Required Fields can not be empty ☹️")
        setAlertStatus("danger");
        setTimeout(()=>{
          setFields(false);
          setIsLoading(false);
  
        },4000)
      }else{
        const data={
          id: `${Date.now()}`,
          title: title,
          price: price,
          qty: 1,
          category :category,
          calories:calories,
          imgURL :imageAsset
        }
        saveItem(data);
        setIsLoading(false);
      setFields(true);
      setMsg("Data Saved Successful 😊");
      setAlertStatus("success");
      setTimeout(()=>{
        setFields(false);
      },4000)
      clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
     setMsg("Error while uploading: Try Again ☹️")
      setAlertStatus("danger");
      setTimeout(()=>{
        setFields(false);
        setIsLoading(false);

      },4000)
    }
    fetchData();
  };
const clearData =()=>{
  setTitle("");
  setPrice("");
  setCalories("");
  setCategory("Select Category");
  setImgAsset(null);
}
const fetchData = async()=>{
  await getAllFoodItems().then((data)=>{
    console.warn('create',data)
    dispatch({
      type: actionType.SET_FOOD_ITEMS,
      foodItems: data,
    })
  })
}
  return (
   <div className='w-full h-[100vh] flex items-center justify-center gap-2 border-gray-300'> 
   <div className='w-[90%] md:w-[70%] border border-gray-300 rounded-lg flex flex-col justify-center items-center p-4'>
    {
      fields &&(
        <motion.p 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        className={`w-full p-2 rounded-lg text-lg text-semibold text-center ${alertStatus==="danger" ? "bg-red-400 text-red-800"
        :"bg-emerald-400 text-emerald-800"}`}>
         {msg}
        </motion.p>

      )
    }
    <div className='w-full flex flex-row justify-center items-center border-b border-gray-300 '>
    <MdFastfood className='text-2xl text-gray-700'/>
    <input type="text" required value={title} placeholder='Give me a title......' onChange={e=>setTitle(e.target.value)} className='placeholder:text-grey-400 w-full h-full p-4 bg-transparent border-none outline-none text-gray-800 text-lg text-semibold' />
      
    </div>

    <div className='w-full mt-2'>
      <select className='w-full border-2 border-gray-300 rounded-md  outline-none bg-transparent py-2' onChange={e=>setCategory(e.target.value)}>
      <option className='bg-white' value="other" >Select Category</option>
          {
            categories && categories.map((item)=>(
        <option className='text-base border-0 outline-none capitalize bg-white ' value={item.urlParamName}>
              {item.name}
        </option>
            ))
          }
      </select>
    </div>

    <div className='w-full flex justify-center items-center mt-2 '>
          <div className='w-full border-2 border-gray-300 rounded-md h-[225px] flex items-center justify-center'>
            {isLoading ? <Loader/>: <>
              {!imageAsset? (
                <>
                  <label className='flex items-center justify-center '>
                    <div className='flex flex-col items-center justify-center px-1 text-xl text-gray-500 hover:text-gray-700'>
                      <MdCloudUpload className='text-4xl '/>
                      <p className='text-xl '>Click here to upload image</p>
                    </div>
                    <input type="file" onChange={uploadFile} accept='image/*' name='uploadFile' className='w-0 h-0'/>
                  </label>
                </>
              ):(<>
                <div className="relative w-full flex items-center justify-center">
                  <img src={imageAsset} alt="uploadImage" className='object-cover w-[225px] h-[225px]  items-center'/>
                  <button className='bg-red-600 hover:bg-red-700 hover:shadow-md transition-all duration-75 ease-in-out absolute bottom-3 right-[12rem] p-3 rounded-full text-xl' onClick={deleteImage}><MdDelete className='text-white'/></button>
                </div>
              </>)}
            </>}
          </div>
    </div>

    <div className='flex flex-col w-full justify-center items-center  p-4 md:flex-row gap-3'>
      <div className='w-full flex flex-row justify-center items-center border-b border-gray-300 '>
              <MdFoodBank className='text-2xl text-gray-700'/>
              <input type="text" placeholder='Calories' value={calories} onChange={e=>setCalories(e.target.value)}className='placeholder:text-grey-400 w-full h-full p-4 bg-transparent border-none outline-none text-gray-800 text-lg text-semibold' />
      </div>
      <div className='w-full flex flex-row justify-center items-center border-b border-gray-300 '>
              <MdAttachMoney className='text-2xl text-gray-700'/>
              <input type="text" placeholder='Price' value={price} onChange={e=>setPrice(e.target.value)} className='placeholder:text-grey-400 w-full h-full p-4 bg-transparent border-none outline-none text-gray-800 text-lg text-semibold' />
      </div>
      
    </div>
 
      <button className='w-full bg-orange-400 text-xl flex items-center justify-center text-white py-2 text-semibold rounded-md md:w-[55%] m-4 hover:bg-orange-300' onClick={saveDetails}>Save Your Data</button>
  
   </div>
   
   </div>
  )
}
