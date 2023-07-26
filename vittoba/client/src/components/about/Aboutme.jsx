import React from 'react'
import Testimonial from '../homepage/Testimonial'
import aboutimg from "../../../src/images/main1.jpg"
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Breadcrumb from '../breadcrumb/Breadcrumb';

const Aboutme = () => {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className='bg-slate-100 font-medium'>
      <div><Breadcrumb title="About" /></div>
{/* 
      <div className=' text-3xl lg:text-5xl font-bold px-2 py-2 rounded-md mt-10 mb-2
        text-center pt-4 lg:mt-4 '>ABOUT US</div> */}
      <div className='flex lg:flex-row flex-col justify-around mt-10'>
        <div className=' rounded-3xl w-[90%] mx-auto lg:w-[35%]  h-full  overflow-hidden  my-auto' >
        <div className=' ' >
        <img src={aboutimg} alt="about-image" className='object-cover  ' />  
        </div>
          
        </div>
        <div className=' w-[90%] mx-auto lg:w-[55%]'>
          
          <h1 className='text-xl font-bold my-4'>Welcome to Vittoba - Your Trusted Printing Solutions Provider!</h1>
          <p className='text-sm xl:text-[15px] tracking-wider leading-6'>Vittoba is your premier destination for a wide range of high-quality printer accessories. As a specialized retailer, we offer a comprehensive selection of accessories that are essential for your printing needs. Whether you're a home user, a small business, or a large enterprise, we have the right accessories to enhance your printing experience.</p>
          <p className='text-xl font-bold my-4'>Who We Are:</p>
          <p className='text-sm xl:text-[15px] tracking-wider leading-6'>
          At Vittoba, we understand the significance of reliable and top-notch printer accessories. That's why we partner with reputable manufacturers who prioritize quality and precision in their products. Our inventory includes a diverse range of accessories, such as ink cartridges, toner cartridges, printheads, paper supplies, maintenance kits, and more. Rest assured that each accessory is carefully chosen to deliver optimal performance and compatibility with a wide variety of printer brands and models.</p>
        </div>
      </div>
      <div>
        
        <div className='text-xl w-[90%] lg:w-[90%] mx-auto'>
        <p className='text-xl lg:text-2xl font-bold my-4 mt-10  lg:mt-12'>Why Choose Vittoba:</p>
          <ul className=' tracking-wider  '>
            <li className='mb-4  text-sm xl:text-[15px]'><span className='font-bold  text-base lg:text-lg '>Wide Selection: </span> Vittoba offers a comprehensive range of printer accessories, ensuring that customers can find exactly what they need. From ink cartridges and toner cartridges to printheads and paper supplies, Vittoba covers all essential printer accessories.</li>
            <li className='mb-4 text-sm xl:text-[15px]'><span className='font-bold text-base lg:text-lg'>Quality Assurance: </span> Vittoba prioritizes quality in all its products. By partnering with reputable manufacturers, the company ensures that customers receive high-quality printer accessories that deliver consistent performance and reliability.</li>
            <li className='mb-4 text-sm xl:text-[15px]'><span className='font-bold text-base lg:text-lg'>Expert Guidance:</span>  Vittoba understands that customers may have questions or need assistance in selecting the right accessories for their printers. The company provides expert guidance and support, helping customers make informed decisions based on their specific requirements, printer models, and budget.</li>
            <li className='mb-4 text-sm xl:text-[15px]'><span className='font-bold text-base lg:text-lg'>Convenience and Reliability: </span>  Vittoba values customer satisfaction and aims to exceed expectations. The company's dedicated customer service team is readily available to address any concerns, provide prompt assistance, and ensure that customers have a positive experience with their purchases.</li>
            <li className='mb-4 text-sm xl:text-[15px]'><span className='font-bold text-base lg:text-lg'>Customer Satisfaction: </span> Vittoba values customer satisfaction and aims to exceed expectations. The company's dedicated customer service team is readily available to address any concerns, provide prompt assistance, and ensure that customers have a positive experience with their purchases.</li>
          </ul>








        </div>
      </div>
      {/* ************************************COUNTUP***************************************** */}
      <div className="text-center  mt-8 md:mt-12  py-10 p-6 bg-slate-200">
      <h1 className=" text-2xl md:text-4xl font-bold">NUMBER SPEAKERS.</h1>
      <div className="flex justify-between md:justify-around mt-8 md:mt-12">
        <div ref={ref}>
          <h1>{inView && <CountUp className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-slate-800" end={10} duration={4} />}<span className=" ml-0.5 md:ml-2 text-2xl sm:text-3xl md:text-5xl lg:text-7xl ">+</span> </h1>
          <p className='text-[.6rem] md:text-base lg:text-lg mt-2'>Years of Experience</p>
        </div>
        <div ref={ref}>
          <h1>{inView && <CountUp className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-slate-800" end={2000} duration={3} />}<span className=" ml-0.5 md:ml-2 text-2xl sm:text-3xl md:text-5xl lg:text-7xl ">+</span></h1>
          <p className='text-[.6rem] md:text-base lg:text-lg mt-2'>Printers Sold</p>
        </div>
        <div ref={ref}>
          <h1>{inView && <CountUp className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-slate-800" end={5000} duration={3} />}<span className=" ml-0.5 md:ml-2 text-2xl sm:text-3xl md:text-5xl lg:text-7xl ">+</span></h1>
          <p className='text-[.6rem] md:text-base lg:text-lg mt-2'>Satisfied Customers</p>
        </div>
      </div>
    </div>
      {/* ********************************TESTIMONIAL******************************************* */}
      <div className="w-full overflow-hidden">
        <Testimonial />
      </div>
    </div>
  )
}

export default Aboutme