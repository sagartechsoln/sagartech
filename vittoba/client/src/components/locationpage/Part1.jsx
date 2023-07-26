import React from 'react'
import './location.css'


const Part1 = (props) => {
    return (
        <>
            <div className='bg-[#f1f1f1] py-16'>
                <div className='md:container md:mx-auto'>
                    <div className="pb-6">
                        {/* <h1 className="text-center text-slate-900 text-[40px] md:text-[54px]">Our Location</h1> */}
                    </div>
                </div>
                <div className="w-full lg:flex">
                    <div className="w-full lg:w-10/12 mx-auto ">

                        <iframe className='w-full' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14433.228610378317!2d55.28888!3d25.260251!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43ec54365b4b%3A0x5fb27227f5212fe4!2sVittoba%20computers%20co%20llc!5e0!3m2!1sen!2sin!4v1687176423298!5m2!1sen!2sin" height="550" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    {/* <div className="w-full lg:w-6/12 py-10 px-5 md:px-8 bg-slate-950 m-2">
                        <div className="">
                            <h4 className='text-[#ffffff] font-semibold mb-5 text-[30px]'>Contact Us</h4>
                            <h1 className='text-[#ffffff] font-light mb-8 text-[26px]'>To request a service call, please fill out the form below</h1>
                        </div>
                        <form id="myForm">
                            <input className="half_width mr-4 w-full md:w-[49%] outline-0" id="name" type="text" name="name" placeholder="Your name" />
                            <input className="half_width w-full md:w-[48%] outline-0" type="email" id="email" name="email" placeholder="Email address" />
                            <input className='half_width w-full outline-0' type="phone" name="phone" id="phone" placeholder="Phone number" />
                            <span className="half_width w-full block bg-[#ffffff] outline-0">
                                <select className='outline-0 w-full' name="subject" id="subject">
                                    <option value="Not selected anything">Select Service</option>
                                    <option value="AC Installation">AC Installation</option>
                                    <option value="Anti Corrosion Service">Anti Corrosion Service</option>
                                    <option value="Maintenance Service">Maintenance Service</option>
                                </select>
                            </span>
                            <button className="btn-yellow half_width mt-8 m-auto block bg-[#64748b] hover:bg-slate-600 rounded-md text-white" type="button" onclick="sendEmail();" value="Send An Email">SUBMIT
                                NOW</button>
                        </form>
                    </div> */}
                </div>



            </div>
        </>
    )
}

export default Part1