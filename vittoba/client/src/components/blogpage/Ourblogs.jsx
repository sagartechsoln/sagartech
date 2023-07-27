import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import opData from './Blogdata'
import { FaComment } from 'react-icons/fa'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdDateRange } from "react-icons/md"
import { IoIosArrowForward } from "react-icons/io"
import aboutimg from "../../images/about-1.jpg"
import moment from 'moment';

const Ourblogs = () => {
    ////////pagination///////////////////
    const [page, setPage] = useState(0)
    const [items, setItems] = useState([])
    const [blogData, setBlogData] = useState([]);
    const [blogLoading, setblogLoading] = useState(false);
    
    const navigate = useNavigate();

    const callBlogs = async () => {
        try {
            setblogLoading(true);
            const req =  await fetch('/api/getAllBlogs', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const jsonData = await req.json();
            // const blogFilter = jsonData.filter(item => item._id != blogFetched._id);
            setBlogData(jsonData);
            setblogLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (blogData.length == 0) callBlogs();
    }, [blogData]);

    const handleBlogClick = (item) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        navigate(`/SingleBlog?${item.title.trim()}`, { state: item });
    }
    return (
        <>


            <div className='bg-[#f1f1f1] py-20 pt-8 pb-8 flex lg:flex-row flex-col'>
                <div className='md:container md:mx-auto w-6/6 '>
                    {/* <div className='pb-6'>
                    <h1 className='text-center text-[#262161] text-[40px] md:text-[45px]'>Our Blogs</h1>
                </div> */}
                    <div className=' mx-auto'>
                        {
                            blogData.map((single, index) => {
                                return (
                                    <div key={index} className=' md:w-6/6 w-full px-4 mb-7'>
                                        <div className=' pb-6 mt-4 mb-10 shadow-xl' style={{ border: "1px solid rgb(200,200,200)" }}>
                                            <div className='relative h-full md:h-[500px]'>
                                                <div className='zoom-container'>
                                                    <img src={`/uploads/blog/${single?.image}`} className='object-cover w-full h-full ' />
                                                </div>
                                                <div className='absolute top-0 left-0 bg-slate-900 text-white py-2 md:py-3 px-3 md:px-4 rounded-sm font-semibold'>
                                                    {
                                                        window.innerWidth > 768 &&

                                                        <p className='flex justify-center items-center text-[25px]'>
                                                            {<MdDateRange />}
                                                        </p>
                                                    }
                                                    <p className='text-[12px] md:text-base'>{moment(single.created_at).format('LL')}</p>
                                                </div>
                                            </div>
                                            <div className=' p-3'>

                                                <h2 className='text-slate-900 text-[20px] sm:text-[28px] lg:text-[38px] leading-[1.5rem] sm:leading-[2.2rem] lg:leading-[2.8rem]  tracking-normal  text-left pt-2    pb-2 w-[95%]  ml-2'>{single.title}</h2>
                                                {/* <h2 className='text-black text-[13px] md:text-[15px] text-center pt-4 font-bold'>{opdate}</h2> */}

                                                <div className='flex w-[90%] ml-4 mt-2 mb-4 text-[13px]'>
                                                    <p className='flex items-center mr-3'><span className='mr-1'>{<BsFillPersonFill />}</span> By <span className='font-semibold ml-1 text-slate-800'> ADMIN</span></p>
                                                    {/* <p className='flex items-center'><span className='mr-1'>{<FaComment />}</span> <span className='font-semibold text-slate-800'>0 COMMENTS</span></p> */}
                                                </div>

                                                <p className='text-[13px] lg:text-[17px] text-justify tracking-normal  leading-5 md:leading-6 mb-3 mx-auto t ml-2 font-normal line-clamp-2' dangerouslySetInnerHTML={{ __html: single.content }}></p>
                                                <div onClick={() => handleBlogClick(single)} className='border w-[120px] md:w-[160px] py-2 mt-3  md:mt-2 bg-slate-700 font-bold rounded-md text-white hover:bg-slate-900  text-sm md:text-lg text-center mb-2 cursor-pointer'>Read More</div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>

                    </div>
                </div>
                <div className='p-2 md:p-4 rounded-md mt-0  lg:mt-0 w-[95%] sm:w-5/6 lg:w-3/6 mx-auto' >
                    {/* <input placeholder='Search Here...' className='w-full h-10 pl-4 text-xl bg-slate-200 mt-2 mb-4 rounded-md' style={{border:"1px solid gray"}}/> */}
                    <div className='  rounded-md mt-8 lg:mt-0 bg-slate-100' style={{ border: "1px solid grey" }}>
                            {/* <input placeholder='Search Here...' className='w-full h-10 pl-4 text-xl bg-slate-200 mt-2 mb-4 rounded-md' style={{border:"1px solid gray"}}/> */}
                            <div>
                                <h1 className='p-2 ml-4 text-basae sm:text-2 xl lg:text-3xl font-bold '>Latest Post</h1>
                                <div>
                                    {
                                        blogLoading ?
                                            <>
                                                <div className='m-2 flex'>
                                                    <div className='w-[80px] h-[80px] bg-gray-300 rounded-md animate-pulse'></div>
                                                    <div className='w-full'>
                                                        <div className=' ml-2 mr-2  w-[95%] h-[50px] bg-gray-200 rounded-md animate-pulse'></div>
                                                        <div className=' ml-2 mr-2 w-[95%] h-[10px] bg-gray-200 rounded-md animate-pulse mt-2'></div>
                                                    </div>
                                                </div>
                                                <div className='m-2 flex'>
                                                    <div className='w-[80px] h-[80px] bg-gray-300 rounded-md animate-pulse'></div>
                                                    <div className='w-full'>
                                                        <div className=' ml-2 mr-2  w-[95%] h-[50px] bg-gray-200 rounded-md animate-pulse'></div>
                                                        <div className=' ml-2 mr-2 w-[95%] h-[10px] bg-gray-200 rounded-md animate-pulse mt-2'></div>
                                                    </div>
                                                </div>
                                                <div className='m-2 flex'>
                                                    <div className='w-[80px] h-[80px] bg-gray-300 rounded-md animate-pulse'></div>
                                                    <div className='w-full'>
                                                        <div className=' ml-2 mr-2  w-[95%] h-[50px] bg-gray-200 rounded-md animate-pulse'></div>
                                                        <div className=' ml-2 mr-2 w-[95%] h-[10px] bg-gray-200 rounded-md animate-pulse mt-2'></div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            blogData
                                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                                .slice(0, 5)
                                                .map((singledata, index) => {
                                                    const { title, created_at, image } = singledata;
                                                    return (
                                                        <div key={index} onClick={() => handleBlogClick(singledata)} className="flex p-2 md:p-4 items-center pb-2 md:pb-4 pt-2 hover:bg-slate-200 cursor-pointer" style={{ borderTop: "1px solid gray" }}>
                                                            <div className="w-[120px]">
                                                                <div className="w-[120px] rounded-lg overflow-hidden">
                                                                    <img src={`/uploads/blog/${image}`} alt="blogslist" className="object-cover h-full w-full" />
                                                                </div>
                                                            </div>
                                                            <div className="ml-2 md:ml-4 text-[.6rem] sm:text-xl lg:text-sm xl:text-base">
                                                                <h1 className="font-bold text-[.6rem] sm:text-xl lg:text-sm xl:text-base">{title} </h1>
                                                                <p className="text-[.6rem] sm:text-base lg:text-sm xl:text-sm mt-2">{moment(created_at).format('LL')}</p>
                                                            </div>

                                                        </div>
                                                    );
                                                })
                                    }
                                </div>
                            </div>
                        </div>
                    {/* ***********ABOUT US ******************** */}
                    {
                        window.innerWidth > 1023 &&

                        <div className=' bg-slate-100 mt-12 p-2 px-6  rounded-md' style={{ border: "1px solid gray" }}>
                            <h1 className='font-bold text-[26px]  mt-2 pb-4' >About Us</h1>
                            <div className=''>
                                <img src={aboutimg} alt="dummy" className=' rounded-md  shadow-xl ' />
                                <p className='text-[16px] leading-6 text-justify mt-4'>At Vittoba, we are dedicated to providing innovative printing solutions that empower businesses and individuals to bring their ideas to life. With our state-of-the-art printers and comprehensive services, we have been serving customers worldwide since our establishment. We combine cutting-edge technology, exceptional craftsmanship, and a passion for excellence to meet the diverse printing needs of our customers.</p>
                            </div>

                        </div>
                    }
                </div>

            </div>
       
        </>
    )
}

export default Ourblogs