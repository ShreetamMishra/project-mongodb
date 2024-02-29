import "../styles/Hero.css";
// import heroimg from "../assets/VSIT_Banner7.jpg";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
export default function Hero() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  // useEffect(() => {
  //   const isLoggedIn = !!localStorage.getItem('token');
  //   if (isLoggedIn) {
  //     navigate('/select'); // Navigate to /select if user is logged in
  //   }
  // }, [navigate]);
  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/select');
    } else {
      navigate("/login");
    }
  };
  return (<>
    <div className='container h-[19rem] w-[28.4rem]' >

    {/* </div>
    <div className='hero-text'> */}
  <div className='hero-text mt-[80px] '>
  <h1 className='text-[#ffffff] text-[3rem] max767:text-[2rem]'>Unlocking Academic Success</h1>
  <p className='ml-[28rem] w-[40%] text-[1.3rem] max767:text-[1rem] max1050:ml-[3rem] max767:w-[80%] max767:left-0'> Practice Previous Year Questions and Make Your Backbone stronger for Exam</p>
  {/* <a href='/login'>Get Start</a> */}
  <button   onClick={handleButtonClick} className="w-[20%] text-sm sm:text-base md:text-[1rem] lg:text-l font-semibold rounded-full responsive-button button-2 bg-[#f7c223] hover:bg-gray-300 h-10  mt-10">Get Start</button>
  </div>
    </div></>
  )
}
