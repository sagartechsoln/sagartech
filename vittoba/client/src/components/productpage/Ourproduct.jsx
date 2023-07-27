import React, { useState, useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { FaChevronRight } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Ourproduct = () => {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [filterdata, setFiltered] = useState(data);
    const [Loading, setLoading] = useState(true);

    const [showbrands, setShowbrands] = useState(true)
    const [showlogos, setShowlogos] = useState(true)

    const [showoptions, setShowoptions] = useState(true)
    const [brand, setBrand] = useState(null)
    const [showsection, setShowsection] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);

    const getPaginatedItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filterdata.slice(startIndex, endIndex);
    };


    const logosarr = [
        {
            id: 1,
            img: "./images/logosarr/brother.jpg",
            company: "Brother"
        },
        {
            id: 2,
            img: "./images/logosarr/cannon.jpg",
            company: "Canon"
        },
        {
            id: 3,
            img: "./images/logosarr/dymo.jpg",
            company: "Dymo"
        }
        ,
        {
            id: 4,
            img: "./images/logosarr/epson.jpg",
            company: "Epson"
        },
        {
            id: 5,
            img: "./images/logosarr/hp.jpg",
            company: "Hp"
        },
        {
            id: 6,
            img: "./images/logosarr/kyocera.jpg",
            company: "Kyocera"
        },
        {
            id: 7,
            img: "./images/logosarr/lexmark.jpg",
            company: "Lexmark"
        },
        {
            id: 8,
            img: "./images/logosarr/panasonic.jpg",
            company: "Panasonic"
        },
        {
            id: 9,
            img: "./images/logosarr/ricoh.jpg",
            company: "Ricoh"
        },
        {
            id: 10,
            img: "./images/logosarr/riso.jpg",
            company: "Riso"
        },
        {
            id: 11,
            img: "./images/logosarr/samsung.jpg",
            company: "Samsung"
        },
        {
            id: 12,
            img: "./images/logosarr/toshiba.jpg",
            company: "Toshiba"
        },

        {
            id: 13,
            img: "./images/logosarr/xerox.jpg",
            company: "Xerox"
        },
        {
            id: 14,
            img: "./images/logosarr/awaya.png",
            company: "Avaya"
        }
    ]

    useEffect(() => {
        const callProducts = async () => {
            try {
                const req =  await fetch('/api/getAllProducts', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(response => response.json())
                    .then(jsonData => {
                        setData(jsonData);
                        setFiltered(jsonData);
                        setLoading(false);
                    }).catch(error => console.error(error))

            } catch (error) {
                console.log(error);
            }
        }
        callProducts();
    }, [])

    useEffect(() => {
        setShowbrands(true)
    }, [data, filterdata])


    const filterProduct = (companyName) => {
        const trimmedCompanyName = companyName.trim(); // Trim spaces from the front and back
        console.log(trimmedCompanyName);
        const filteredCompanies = data?.filter((item) => {
            // Trim spaces from the front and back of the item.company
            const trimmedItemCompany = item?.category?.trim();
            console.log(trimmedItemCompany);
            
            return trimmedItemCompany === trimmedCompanyName;
        });
    
        setFiltered(filteredCompanies);
        setShowbrands(false);
        setBrand(trimmedCompanyName); // Set the trimmed company name as the brand
    };

    const searchall = () => {
        setFiltered(data)
        setBrand("All")
    }

    const handleProduct = (item) => {
        navigate(`/ProductDetail?${item.product_name}`, { state: item });
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const totalPages = Math.ceil(filterdata?.length / itemsPerPage);

    const generatePageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div className='bg-[#f1f1f1] py-20 pt-8'>
            <div className='md:container md:mx-auto '>
                <div className='pb-6 flex md:flex-row flex-col justify-between items-center md:mx-4  lg:mx-10 '>
                    <h1 className=' text-[#262161] text-[30px] md:text-[30px] lg:text-[35px] cursor-pointer font-semibold '>{brand ? `${brand} Products ` : "All Products"}</h1>
                    <div className='flex overflow-hidden'>
                        <div className={`transition-transform  duration-700 ease-out ${showoptions ? '' : ' translate-x-[55rem] '}`} >
                            <div className='flex items-center' >
                                <h1 className='mr-4 md:mr-8 group py-6 text-[10px] sm:text-[12px] md:text-[13px] lg:text-lg cursor-pointer  text-gray-600 hover:text-black' onClick={() => searchall()}>All Products</h1>
                                <h1 className='mr-4 md:mr-8 group py-6 text-[10px] sm:text-[12px] md:text-[13px]  lg:text-lg text-gray-600 hover:text-black '>
                                    Brands
                                    {
                                        showbrands ?
                                            <div className={`${!showlogos ? "block" : 'hidden'} max-w-[1536px] group-hover:block absolute w-full  top-[3.3rem] sm:top-[10.3rem] md:top-[7.5rem]  lg:top-[12.9rem]  xl:top-[12rem] left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white border border-gray-300 rounded-lg p-4`}  >
                                                <h1 className='text-center text-xl font-bold mb-4'>Select product by category</h1>
                                                <ul className='grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mx-auto justify-center p-4 '>
                                                    {
                                                        logosarr.map((singlelogo) => {
                                                            return (
                                                                <li key={singlelogo.id} className='   mb-6 ' onClick={() => filterProduct(singlelogo.company)} >
                                                                    <div className='my-auto'>
                                                                        <img src={`.${singlelogo.img}`} className='cursor-pointer mx-auto object-cover duration-300 ease-in-out  hover:scale-150 w-[110px] sm:w-[100px] md:w-[120px] lg:w-[130px] xl:w-[150px]' alt="logos" />
                                                                    </div>
                                                                </li>


                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div> : ""
                                    }

                                </h1>
                                <h1 className='mr-4  md:mr-8 group py-4 text-[10px] sm:text-[12px] md:text-[13px]  lg:text-lg text-gray-600 hover:text-black'>
                                    Toners & Ink
                                    <div className=' max-w-[1536px] hidden group-hover:block absolute w-[100vw] -top-[17.6rem] sm:-top-[15.1rem] md:top-[6.5rem] lg:top-[10.5rem] left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white border border-gray-300 rounded-lg p-4'>
                                        <div className='flex md:flex-row flex-col pl-4  md:pl-0 mx-auto sm:justify-around  md:flex-wrap'>
                                            <div className=' '>
                                                <h2 className='font-semibold mb-3 ml-6 text-base'>Toners</h2>
                                                <ul className=' ml-6 z-50 leading-7 text-[10px] lg:text-[14px] text-cap'>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Epson</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Ricoh</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Sharp</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Brother</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Kyocera</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Minolta</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Canon</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Hewlett Packard</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Samsung</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Panasonic</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Oki</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Toshiba</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Develop</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Utax</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Triumph Adler</li>
                                                </ul>
                                            </div>
                                            <div className='mt-4 md:mt-0'>
                                                <h2 className='font-semibold mb-3 ml-6 text-base'>Inks</h2>
                                                <ul className=' ml-6 leading-7 text-[10px]  lg:text-[14px]'>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Ricoh</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Brother</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Canon</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Epson</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Hewlett (HP)</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Lexmark</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Riso</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Minolta</li>
                                                </ul>
                                            </div>
                                            <div className='mt-4 md:mt-0'>
                                                <h2 className='font-semibold mb-3 ml-6 text-base'>Compatible Toner</h2>
                                                <ul className='ml-6 leading-7 text-[10px] lg:text-[14px]'>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Samsung Toner (Compatible)</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Brother Toner (Compatible)</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Canon Toner (Compatible)</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />HP Toner (Compatible)</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Minolta Toner (Compatible)</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Mita Toner (Compatible)</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Ricoh Toner (Compatible)</li>
                                                </ul>
                                            </div>
                                            <div className='mt-4 md:mt-0'>
                                                <h2 className='font-semibold mb-3 ml-6 text-base'>Compatible Ink</h2>
                                                <ul className=' ml-6 leading-7 text-[10px] lg:text-[14px]'>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Ricoh Ink (Compatible)</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Brother Ink (Compatible)</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Canon Ink (Compatible)</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Epson Ink (Compatible)</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />HP Ink (Compatible)</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Ricoh Ink (Compatible)</li>
                                                </ul>
                                            </div>
                                            {/* <div>
                                        <h2 className='font-bold mb-3 ml-4'>DEVELOPER</h2>
                                        <ul className='list-disc ml-6 leading-6 text-[10px] lg:text-[15px]'>
                                            <li>RICOH DEVELOPER</li>
                                            <li>MINOLTA DEVELOPER</li>
                                            <li>DEVELOP DEVELOPER</li>
                                        </ul>
                                    </div> */}
                                        </div>
                                    </div>
                                </h1>

                                <h1 className='   group py-6 text-[10px] sm:text-[12px] md:text-[13px]  lg:text-lg text-gray-600 hover:text-black'>
                                    Ribbons & Tapes
                                    <div className=' max-w-[1536px] hidden group-hover:block absolute w-[100vw]    -top-8 sm:top-2 md:top-[14.2rem] lg:top-[18.3rem] left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white border border-gray-300 rounded-lg p-4'>
                                        <div className='md:flex  justify-around pl-4 md:pl-0'>
                                            <div className=''>
                                                <h2 className='font-semibold mb-3 ml-6 text-base'>Ribbon</h2>
                                                <ul className=' ml-6 z-50 leading-7 text-[10px] lg:text-[14px]'>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Epson Ribbon</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Oki Ribbon</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Fargo Ribbon</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Tally Genicom Ribbon</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Printronix Ribbon</li>
                                                    <li><FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />Lexmark Ribbon</li>
                                                </ul>
                                            </div>
                                            <div className='mt-4 md:mt-0'>
                                                <h2 className='font-semibold mb-3 ml-6 text-base'>Inks</h2>
                                                <ul className=' ml-6 leading-7 text-[10px] lg:text-[14px]'>
                                                    <li>
                                                        <FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />
                                                        Brother Label
                                                    </li>
                                                    <li>
                                                        <FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />
                                                        Casio Label
                                                    </li>
                                                    <li>
                                                        <FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />
                                                        Dymo Label
                                                    </li>
                                                    <li>
                                                        <FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />
                                                        Thermal Label
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className='mt-4 md:mt-0'>
                                                <h2 className='font-semibold mb-3 ml-6 text-base'>Compatible Ribbon</h2>
                                                <ul className=' ml-6 leading-7 text-[10px] lg:text-[14px]'>
                                                    <li>
                                                        <FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />
                                                        Barcode Ribbon (Compatible)
                                                    </li>
                                                    <li>
                                                        <FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />
                                                        Brother Ribbon (Compatible)
                                                    </li>
                                                    <li>
                                                        <FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />
                                                        Epson Ribbon (Compatible)
                                                    </li>
                                                    <li>
                                                        <FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />
                                                        Oki Ribbon (Compatible)
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className='mt-4 md:mt-0'>
                                                <h2 className='font-semibold mb-3 ml-6 text-base'>Compatible Label</h2>
                                                <ul className=' ml-6 leading-7 text-[10px] lg:text-[14px]  '>
                                                    <li>
                                                        <FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />
                                                        Brother Label (Compatible)
                                                    </li>
                                                    <li>
                                                        <FaChevronRight className='inline mr-1  text-gray-700 text-[13px]' />
                                                        Casio Label (Compatible)
                                                    </li>
                                                    <li>
                                                        <FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />
                                                        Dymo Label (Compatible)
                                                    </li>
                                                    <li>
                                                        <FaChevronRight className='inline mr-1 text-gray-700 text-[13px]' />
                                                        Epson Label (Compatible)
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </h1>


                            </div></div>

                    </div>

                </div>
                <div className='m-0 md:m-4 p-0 md:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
    {Loading ? (
        'loading'
    ) : (
        getPaginatedItems().length > 0 ? (
            getPaginatedItems().map((item, i) => {
                return (     
                    <div key={i} onClick={() => handleProduct(item)} className="cursor-pointer">
                        <div className="bg-white px-4 md:px-6 py-4 my-4 mx-4">
                            <div className="w-full h-[250px] flex justify-center items-center overflow-hidden">
                                <img src={`/uploads/products/${item.images0}`} alt="singleproduct" className="object-cover mx-auto " />
                            </div>
                            <h1 className="text-[1.35rem] font-bold text-center my-3 line-clamp-1">{item.product_name}</h1>
                            <p className="text-base md:text-lg line-clamp-3 text-center">{item.description}</p>
                        </div>
                    </div>
                );
            })
        ) : (
            <p className='font-bold text-3xl text-gray-500'>NO PRODUCT FOUND.</p>
        )
    )}
</div>
{/* ffffffffff */}

                <div className="md:container md:mx-auto">
                    {/* ...other JSX code */}
                    {filterdata?.length > itemsPerPage && (
                        <div className="flex justify-center mt-4">
                            <button
                                disabled={currentPage === 1}
                                onClick={prevPage}
                                className="mr-2 px-3 py-1 border rounded-md hover:bg-slate-900 hover:text-white duration-300"
                            >
                                Previous
                            </button>
                            {generatePageNumbers().map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => {
                                        setCurrentPage(pageNumber)
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth"
                                        });
                                    }}
                                    className={` hover:bg-gray-400 duration-300 mx-1 px-3 py-1 border rounded-md ${pageNumber === currentPage ? "bg-gray-400" : ""
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={nextPage}
                                className="ml-2 px-3 py-1 border rounded-md  hover:bg-slate-900 hover:text-white duration-300"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>


            </div>
        </div>
    )
}

export default Ourproduct