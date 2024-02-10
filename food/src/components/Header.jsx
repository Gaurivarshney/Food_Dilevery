import React, { useState } from "react";
import Logo from "../img/logo.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import avatar from "../img/avatar.png";
import "../style/header.css";
import { Link } from "react-router-dom";
import { app } from "../firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
function Header() {
  const [showDrop, setShowDrop] = useState(false);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user,cartShow,cartItems }, dispatch] = useStateValue();
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setShowDrop(!showDrop);
    }
  };

  const logout = () => {
    setShowDrop(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  const showCart =()=>{
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  }
  return (
    <div className="fixed top-0 right-0 left-0 z-50 m-0">
      <header className="header  bg-white">
        <Link to="/" className="logo">
          <img src={Logo} alt="Logo.." />
          <span>City</span>
        </Link>
        <div
          className="links hidden md:block"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="hidden md:block">
            <ul>
              <Link to={"/"}><li>Home</li></Link>
              <Link to={"/menu"}><li>Menu</li></Link>
              <li>About Us</li>
              <li>Services</li>
            </ul>
          </div>
         
        </div>

        {/* ............. */}
        <div>
        <div >
          <div className="cart text-3xl absolute top-5 right-20" onClick={showCart}>
          <MdShoppingBasket/>
          </div>
          {
            cartItems && cartItems.length>0 && (
              <p className="bg-red-500 rounded-full w-6 h-6 justify-center items-center flex text-white absolute top-3 right-16">{cartItems.length}</p>
            )
          }
        </div>
        <div className="profile" onClick={login} style={{ marginLeft: "20px" }}>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : avatar}
            style={{ borderRadius: "50%" }}
            alt="userProfile"
          />
          {showDrop ? (
            <motion.div className="dropdown flex-col justify-start space-y-1 m-2 p-2 z-50"    
            initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}>
              {user && user.email === "gaurivarshney883@gmail.com" && (
                <Link to="/createcontainer">
                  {" "}
                  <p className="drop items-center" onClick={()=>setShowDrop(false)}>
                    New Item <MdAdd />{" "}
                  </p>
                </Link>
              )}
              
              <ul className=" drop space-y-1 flex-col">
                <li className=" md:hidden hover:bg-slate-400" onClick={()=>setShowDrop(false)}>Home</li>
                <li className=" md:hidden hover:bg-slate-400" onClick={()=>setShowDrop(false)}>Menu</li>
                <li className=" md:hidden hover:bg-slate-400" onClick={()=>setShowDrop(false)}>About Us</li>
                <li className=" md:hidden hover:bg-slate-400" onClick={()=>setShowDrop(false)}>Services</li>
              </ul>
              <p className="drop justify-center items-center bg-slate-200" onClick={logout}>
                Log out
                <MdLogout />
              </p>
            </motion.div>
          ) : null}
        </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
