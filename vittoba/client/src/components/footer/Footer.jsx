import React from 'react'

import { BiMap } from "react-icons/bi"
import { AiFillInstagram, AiOutlineMail } from "react-icons/ai"
import { BsClock } from "react-icons/bs"
import {CiMail} from "react-icons/ci"
import {BsTelephoneFill} from "react-icons/bs"
import {FaLinkedinIn,FaFacebookF} from "react-icons/fa"
import vlogo from "../../images/vittologo.png"
import facebook from "../../images/logos/facebook.png"
import linkedln from "../../images/logos/linkedin.png"
import gmail from "../../images/logos/gmail.png"
import instagram from "../../images/logos/instagram.png"
import map from "../../images/logos/map.png"
import call from "../../images/logos/phone-call.png"
import twitter from "../../images/logos/twitter.png"
import { Link } from 'react-router-dom'

const UserFooter = () => {

  const scrolltop =() =>{
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className=' bg-slate-950 text-white'>
     

      <div className='flex  justify-around pt-10 pb-0 px-2 md:px-6 lg:px-10 lg:flex-row flex-col '>

        
        <div className='   lg:ml-16 mx-auto lg:w-1/4  w-full sm:w-11/12  lg:mb-2 mb-6 bg-slate-100 font-semibold rounded-xl px-2 py-4' >
          <div>
          <img src={vlogo} alt="main logo" className=" w-4/5 mx-auto max-w-xs" />
          <p className=' text-sm sm:text-[14px] mt-2 md:mt-2 px-3 mx-auto text-justify text-slate-900'>Welcome to Vittoba Computers Co LLC. We are Dubai based traders and exporter featuring a full line of original and compatible toners. We have a huge selection of laser toners, toner cartridges, drum kits, developers, cleaning blades, fuser kits for your specific fax, printer or copier machinery.</p>
          <div className='flex items-center justify-center text-3xl mt-4'>
          <a href="https://www.facebook.com/vittoballc/" target="_blank" rel="noopener noreferrer"><img src={facebook} color="darkblue" className='mx-2 w-[25px]'/></a>
          <a href="https://www.instagram.com/vittoballc/" target="_blank" rel="noopener noreferrer"><img src={instagram} color="darkblue" className='mx-4 w-[25px]'/></a>
          <a href="https://www.facebook.com/vittoballc/" target="_blank" rel="noopener noreferrer"><img src={twitter} color="darkblue" className='mx-2 w-[25px]'/></a></div>
          </div> 
        </div>
      
      <div className='flex md:flex-row flex-col  w-full lg:w-3/4  justify-evenly' >
        <div className='  mt-4 md:text-left text-center'>
          <h1 className='text-[17px] mb-4 font-semibold'>Quick Links</h1>
          <ul className='text-[14px]  '>
            <li className='mb-2 hover:text-gray-300' onClick={() => scrolltop()}><Link to="/">Home</Link></li>
            <li className='mb-2 hover:text-gray-300' onClick={() => scrolltop()}> <Link to="/about">About</Link></li>
            <li className='mb-2 hover:text-gray-300' onClick={() => scrolltop()}><Link to="/product">Products</Link></li>
            <li className='mb-2 hover:text-gray-300' onClick={() => scrolltop()}><Link to="/location">Location</Link></li>
            <li className='mb-2 hover:text-gray-300' onClick={() => scrolltop()}><Link to="/blog">Blogs</Link></li>
          </ul>
        </div>


        <div className='  mt-4 md:text-left text-center'>
          <h1 className='text-[17px] mb-4 font-semibold'>Product Categories</h1>
          <ul className='text-[14px] '>
            <li className='mb-2 hover:text-gray-300' onClick={() => scrolltop()} ><Link to="/product">Printing Accessories</Link></li>
            <li className='mb-2 hover:text-gray-300'  onClick={() => scrolltop()}><Link to="/product">Ink and Toner Cartridges</Link></li>
            <li className='mb-2 hover:text-gray-300' onClick={() => scrolltop()}><Link to="/product">Printer Parts and Maintenance</Link></li>
            <li className='mb-2 hover:text-gray-300' onClick={() => scrolltop()}><Link to="/product">Printer Supplies and Cleaning</Link> </li>
            <li className='mb-2 hover:text-gray-300' onClick={() => scrolltop()}><Link to="/product">Print Management Solutions</Link></li>
          </ul>
        </div>



        <div className='md:w-1/3 mt-4  md:text-left text-center'>
          <h1 className='text-[17px] mb-4  font-semibold '>Contact details</h1>
          <div className='flex items-center justify-center   md:justify-start mb-4'><img src={map} color='darkblue' className='mr-2  sm:mr-4  w-[20px] sm:w-[22px]' /> <p className='mr-2 text-[12px] sm:text-[14px] '>Shop No.6, Al Raffa S treet Al Souq Al kabeer Bur Dubai, Dubai, UAE</p></div>
            <div className='flex items-center  mb-4 justify-center  md:justify-start  '><img src={call}  color='darkblue'  className='mr-2 sm:mr-4 mb-2  w-[20px] sm:w-[22px]'/><p className='text-[12px] sm:text-[14px]'><a href="tel:+971504540704"> +971 50 454 0704 </a></p></div>
          <div className='flex items-center mb-4 justify-center md:justify-start'>
          <img src={gmail} color='darkblue'  className='mr-2 sm:mr-4  w-[20px] sm:w-[22px]'/>
          <p className='text-[12px] sm:text-[14px]'><a href="mailto:sales@vittoballc.com">sales@vittoballc.com</a></p> </div>
                    
        </div>
        </div>
      </div>
      <div className='flex md:flex-row flex-col justify-between sm:px-10 md:px-18 lg:px-24  mt-2  pb-4 pt-3 border-t-2 border-solid border-white lg:border-none' >
        <h1 className=' text-center pb-2 md:pb-0 text-[11px] md:text-[12px] lg:text-[14px]'>Copyright © 2023 <span className='font-semibold'>Vittoba LLC</span>. All Rights Reserved </h1>
        <h1 className='text-center text-[11px] md:text-[12px] lg:text-[14px]'><a href="https://www.sagartech.co.in/" target='_blank'>Crafted By <span className='font-semibold pl-1'>Sagar Tech - Technical Solution</span></a></h1>
      </div>

    </div>
  )
}

export default UserFooter