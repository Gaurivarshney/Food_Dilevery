
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomeContainer from './components/HomeContainer'
import CreateContainer from './components/CreateContainer';
import { AnimatePresence } from 'framer-motion';
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { useEffect } from 'react';
import { actionType } from './context/reducer';
import MainContainer from './components/MainContainer';
import MenuContainer from './components/MenuContainer';
function App() {
  const [{foodItems}, dispatch]= useStateValue();

  const fetchData = async()=>{
    await getAllFoodItems().then((data)=>{
      console.warn(data)
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    })
  }
  useEffect(()=>{fetchData();},[])
 
  return (
   <AnimatePresence>
     <div className="App bg-[#f3efef]">
      <Header/>
     <main className='mt-1 md:mt-4 p-4 w-full'>
     <Routes>
        <Route path='/*' element={<MainContainer/>}/>
        <Route path='/createcontainer' element={<CreateContainer/>} />
        <Route path='/menu' element={<MenuContainer/>}/>
      </Routes>
     </main>

    </div>
   </AnimatePresence>
  );
}

export default App;
