import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { MdDateRange } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import moment from 'moment';

const Blogsingle = () => {
    const location = useLocation();
    const blogFetched = location.state;
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState([]);
    const [blogLoading, setblogLoading] = useState(false);

    const callBlogs = async () => {
        try {
            setblogLoading(true);
            const req = await fetch('/getAllBlogs', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const jsonData = await req.json();
            // const blogFilter = jsonData.filter(item => item._id != blogFetched._id);
            setBlogData(jsonData.filter((item) => item._id != blogFetched._id));
            setblogLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        callBlogs();
    }, [blogFetched]);




    const handleBlogClick = (item) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        navigate(`/SingleBlog?${item.title.trim()}`, { state: item });
    }

    return (
        <div className='bg-slate-100'>
            <div>
                <Breadcrumb title="Blogs" />
            </div>
            <div className='mt-12 pb-12 '>
                <div className='flex flex-col lg:flex-row  justify-center'>
                    <div className=' w-full lg:w-[64%] mr-0 lg:mr-10 mx-auto'>
                        <div className='lg:mx-0  w-[90%] lg:w-full mx-auto '>
                            <div className='relative  h-full md:h-[500px]'>
                                <div className='zoom-container'>
                                    <img src={`/uploads/blog/${blogFetched?.image}`} className='object-cover w-full h-full rounded-lg' />
                                </div>
                                <div className='absolute top-0 left-0 bg-slate-900 text-white py-2 md:py-3 px-3 md:px-4 rounded-sm font-semibold'>
                                    {
                                        window.innerWidth > 768 &&
                                        <p className='flex justify-center items-center text-[25px]'>
                                            {<MdDateRange />}
                                        </p>
                                    }
                                    <p className='text-[12px] md:text-base'>{moment(blogFetched?.created_at).format('LL')}</p>
                                </div>
                            </div>

                            {/* <p className='text-slate-800 text-base lg:text-lg my-0 mb-0 sm:my-2'>~ by {opname} <span className='text-sm lg:text-base font-semibold ml-4'> ({opdate})</span></p> */}
                            {/* <h1 className='text-base sm:text-xl lg:text-2xl font-bold mt-6'>{optitle}</h1> */}
                            <h2 className='text-slate-900 text-[20px] sm:text-[28px] lg:text-[38px] leading-[1.5rem] sm:leading-[2.2rem] lg:leading-[2.8rem]  tracking-normal  text-left pt-4 pb-2 w-[95%]  ml-4'>{blogFetched.title}</h2>
                            <div className='flex w-[90%] ml-2 mt-3 mb-4 text-[15px]'>
                                <p className='flex items-center mr-3'><span className='mr-1'>{<BsFillPersonFill />}</span> By <span className='font-semibold ml-1 text-slate-800'> ADMIN</span></p>
                                {/* <p className='flex items-center'><span className='mr-1'>{<FaComment/>}</span> <span className='font-semibold text-slate-800'>0 COMMENTS</span></p> */}
                            </div>
                        </div>



                        <div className='text-sm sm:text-sm lg:text-[16px]  my-2 md:my-2 md:mb-0 w-[90%] lg:w-full mx-auto text-justify'>
                            <p className='mt-6 leading-6' dangerouslySetInnerHTML={{ __html: blogFetched.content }}></p>
                        </div>
                    </div>
                    <div className='w-[90%] sm:w-[70%] mx-auto lg:w-[30%]' >
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogsingle;
