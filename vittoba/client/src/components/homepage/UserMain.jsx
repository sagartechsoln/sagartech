import React, { useState, useEffect } from "react";
import "./Main.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import img1 from "../../images/main1.jpg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Testimonial from "./Testimonial";

import about1 from "../../images/about-top.jpg"
import about2 from "../../images/about-bottom.jpg"
import backimg from "../../images/backimghome.png"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import notfoundImg from "../../images/image_not_available.png"
// import notfoundImg from "../../images/"

const UserMain = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [blogData, setblogData] = useState([]);
  const [blogLoader, setblogLoader] = useState(false);
  const [Loading, setLoading] = useState(true);

  const mainslider = [
    {
      id: 13,
      img: "./images/dubai.png",
      imgarr: [
      ],
      logo: ""
    },
    {
      id: 1,
      img: "./images/main1.jpg",
      imgarr: [

        "./images/productsmain/hp/toner.png",
        "./images/productsmain/hp/maintainance.png",
        "./images/productsmain/hp/printer.jpg",

        "./images/productsmain/hp/ink.jpg",

      ],
      logo: "./images/vittoslider/hp-slider.png"
    },
    {
      id: 2,
      img: "./images/main2.jpg",
      imgarr: [

        "./images/productsmain/cannon/maintainance.jpg",
        "./images/productsmain/cannon/pgi510.jpg",
        "./images/productsmain/cannon/printer.jpg",
        "./images/productsmain/cannon/toner.jpg",
      ],
      logo: "./images/vittoslider/canon-slider.png"
    },
    {
      id: 3,
      img: "./images/main3.jpg",
      imgarr: [
        "./images/productsmain/kyocera/maintainance.jpg",
        "./images/productsmain/kyocera/drum.jpg",
        "./images/productsmain/kyocera/printer.jpg",
        "./images/productsmain/kyocera/toners.jpg",
      ],
      logo: "./images/vittoslider/kyocera-slider.png"
    }
    ,
    {
      id: 4,
      img: "./images/main4.jpg",
      imgarr: [
        "./images/productsmain/ricco/ink.jpg",
        "./images/productsmain/ricco/maintainance.jpg",
        "./images/productsmain/ricco/printer.jpg",
        "./images/productsmain/ricco/toner.jpg",
      ],
      logo: "./images/vittoslider/ricoh-slider.png"
    }
  ]

  const logoimg1 = [
    {
      id: 1,
      img: "./images/logosarr/brother.jpg"
    },
    {
      id: 2,
      img: "./images/logosarr/cannon.jpg"
    },
    {
      id: 3,
      img: "./images/logosarr/tplink.jpg"
    },

    {
      id: 5,
      img: "./images/logosarr/sharp.JPG"
    },
    {
      id: 6,
      img: "./images/logosarr/kyocera.jpg"
    },
    {
      id: 7,
      img: "./images/logosarr/epson.jpg"
    },
    {
      id: 4,
      img: "./images/logosarr/xerox.jpg"

    },

    // {
    //   id: 9,
    //   img: "./images/logosarr/samsung.jpg"
    // },
    // {
    //   id: 10,
    //   img: "./images/logosarr/ricoh.jpg"
    // },
    // {
    //   id: 11,
    //   img: "./images/logosarr/toshiba.jpg"
    // },
    // {
    //   id: 12,
    //   img: "./images/logosarr/riso.jpg"
    // },
    // {
    //   id: 13,
    //   img: "./images/logosarr/panasonic.jpg"
    // }
  ]
  const logoimg2 = [

    {
      id: 1,
      img: "./images/logosarr/utax.JPG"
    },
    {
      id: 2,
      img: "./images/logosarr/dlink.JPG"
    },

    {
      id: 4,
      img: "./images/logosarr/cisco.JPG"

    },
    {
      id: 5,
      img: "./images/logosarr/riso.jpg"
    },


    {
      id: 10,
      img: "./images/logosarr/ricoh.jpg"
    },

    {
      id: 12,
      img: "./images/logosarr/riso.jpg"
    },
    {
      id: 11,
      img: "./images/logosarr/toshiba.jpg"
    },
    {
      id: 13,
      img: "./images/logosarr/panasonic.jpg"
    }
  ]

  const settingslogo = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    autoplay: true,
    pauseOnHover: true,
    speed: 500,
    autoplaySpeed: 2000,
    swipeToSlide: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const settingslogo2 = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    autoplay: true,
    pauseOnHover: true,
    speed: 500,
    autoplaySpeed: 4000,
    swipeToSlide: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: blogData.length < 3 ? 2 : 3,
    autoplay: true,
    pauseOnHover: true,
    speed: 500,
    autoplaySpeed: 2500,
    swipeToSlide: true,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },

    ],

  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray" }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrowlogo(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "gray" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrowlogo(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "gray" }}
        onClick={onClick}
      />
    );
  }

  const slideshowProperties = {
    duration: 3000, // Set the autoplay timing to 5 seconds (5000 milliseconds)
    transitionDuration: 700, // Set the transition duration between slides (optional)
    infinite: true, // Allow infinite loop of slides (optional)
    indicators: false, // Show slide indicators (optional)
    arrows: true,
    autoplay:true,
    pauseOnHover:false
  }
  const [showsection, setShowsection] = useState(true);
  const [showmaingrid, setShowmaingrid] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowsection(false);

      } else {
        setShowsection(true);
      }
    };

    handleResize(); // Check on initial render

    window.addEventListener('resize', handleResize); // Listen for window resize events

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setShowmaingrid(false);

      } else {
        setShowmaingrid(true);
      }
    };

    handleResize(); // Check on initial render

    window.addEventListener('resize', handleResize); // Listen for window resize events

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          setLoading(false);
        }).catch(error => console.error(error))

    } catch (error) {
      console.log(error);
    }
  }

  const callBlogs = async () => {
    try {
      const req =  await fetch('/api/getAllBlogs', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(response => response.json())
        .then(jsonData => {
          setblogData(jsonData);
          setblogLoader(false);
        }).catch(error => console.error(error))

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    callProducts();
    callBlogs();
  }, [])

  const handleProduct = (item) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    navigate(`/ProductDetail?${item.product_name}`, { state: item });
  }
  const handleBlogClick = (item) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    navigate(`/SingleBlog?${item.title.trim()}`, { state: item });
  }

  return (
    <div className="bg-slate-200">

      {/**********MAIN HOMEPAGE SLIDER*************************/}
      <div>
  <Slide {...slideshowProperties} style={{}}>
    {mainslider.map((single, index) => {
      const { id, img, imgarr, logo } = single;
      return (
        <div key={id}>
          <div className="w-full">
            <img
              className="h-[25vh] sm:h-[40vh] md:h-[50vh] lg:h-[70vh] xl:h-[85vh] w-full object-cover relative"
              src={img}
              alt="sa"
            />
            {index !== 0 && (
              <div className="overlay w-screen h-full absolute">
                <div className="flex justify-between 2xl:justify-around items-center w-screen h-full">
                  <div className="flex items-center flex-col w-screen lg:w-[40%] mx-[17%] lg:mr-[0] lg:ml-[10%]">
                    <img
                      className="mb-2 w-40 sm:w-64 max-h-[60px] md:max-h-[100px] object-contain"
                      src={logo}
                      alt="ff"
                    />
                    <h1 className="text-center mx-2 text-[.8rem] sm:text-lg md:text-xl xl:text-2xl font-bold text-slate-200">
                      Merging Precision and Innovation in Printing Solutions
                    </h1>
                    <Link to="/product">
                      <button
                        className="duration-300 py-1 md:py-3 px-2 md:px-5 bg-black hover:bg-gray-900 hover:scale-110 text-white font-bold rounded-md my-3 md:my-4 text-[.85rem] md:text-xl"
                        style={{ border: "1px solid white" }}
                      >
                        Discover
                      </button>
                    </Link>
                  </div>
                  {showmaingrid && (
                    <div className="grid grid-cols-2 mr-[7%]">
                      <div
                        className="rounded-md p-4 m-2 bg-[#fff]"
                        style={{ transform: "skew(-15deg)" }}
                      >
                        <img
                          src={imgarr[0]}
                          alt="hp"
                          className="p-3 w-[180px] xl:w-[220px] h-[170px] xl:h-[190px] rounded-md object-cover"
                          style={{ transform: "skew(12deg)" }}
                        />
                      </div>
                      <div
                        className="rounded-md p-4 m-2 bg-[#fff]"
                        style={{ transform: "skew(-15deg)" }}
                      >
                        <img
                          src={imgarr[1]}
                          alt="hp"
                          className="p-3 w-[180px] xl:w-[220px] h-[170px] xl:h-[190px] rounded-md object-cover"
                          style={{ transform: "skew(12deg)" }}
                        />
                      </div>
                      <div
                        className="ml-[-50px] mr-[70px] rounded-md p-4 m-2 bg-[#fff]"
                        style={{ transform: "skew(-15deg)" }}
                      >
                        <img
                          src={imgarr[2]}
                          alt="hp"
                          className="p-3 w-[180px] xl:w-[220px] h-[170px] xl:h-[190px] rounded-md object-cover"
                          style={{ transform: "skew(12deg)" }}
                        />
                      </div>
                      <div
                        className="ml-[-50px] mr-[70px] rounded-md p-4 m-2 bg-[#fff]"
                        style={{ transform: "skew(-15deg)" }}
                      >
                        <img
                          src={imgarr[3]}
                          alt="hp"
                          className="p-3 w-[180px] xl:w-[220px] h-[170px] xl:h-[190px] rounded-md object-cover"
                          style={{ transform: "skew(12deg)" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    })}
  </Slide>
</div>


      {/* *********************welcome to vittoba ***************************** */}



      {/* 
        <div className="w-2/5 mt-8">
            <h2 className="text-xl"><span className="font-bold text-2xl">VITTOBA</span> - Redefining Printing Excellence</h2>
            <h1 className="text-2xl mt-4 mb-4 font-bold">Unleashing Your Imagination through Cutting-Edge Printing Solutions</h1>
            <p className="text-lg">{`Welcome to VITTOBA, a leading printer company dedicated to providing innovative printing solutions for businesses and individuals. With a passion for pushing the boundaries of printing technology, 
            VITTOBA is committed to delivering top-notch products that meet the diverse needs of our customers.`}</p>
        </div> */}

      <div className="flex  mx-auto w-[90%]  bg-slate-200 mt-0 md:mt-6 p-6 pb-0  pt-8 md:pt-12" >
        <div className=" md:w-[60%] mb-0 md:mb-44" style={{ display: "flex", justifyContent: "space-between", position: "relative", marginRight: "2rem" }}>
          <div style={{ width: "38%" }}>
            <img className="hp-adv-img1 bounce-animation rounded-md" src={about1} alt="img1" style={{ width: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ width: "38%" }}>
            <img className="hp-adv-img2 bounce-animation rounded-md" src={about2} alt="img2" style={{ width: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ width: "55%", position: "absolute", top: "40%", left: "23%" }}>
            <img className="hp-adv-img3 rounded-md" src={img1} alt="img3" style={{ width: "100%", objectFit: "cover" }} />
          </div>
        </div>


        <div className=" mx-auto" style={{ height: "100%", width: "40%" }}>

          {/* <img className="  " src={vlogo} alt="main-logo" /> */}
          {
            showsection && <div ><h1 className=" md:text-2xl lg:text-3xl font-bold mb-4 text-slate-950  ">Vittoba Computers Co.LLC</h1>
              <h1 className="md:text-sm lg:text-lg  font-light">
                Vittoba LLC is a reputable company specializing in printer accessories and spare parts. They offer a comprehensive range of high-quality products for various printer models and brands. </h1></div>
          }



          {/* <h1 className="text-2xl mt-8 mb-4 font-bold w-4/5 mx-auto">Unleashing Your Imagination through Cutting-Edge Printing Solutions</h1> */}
        </div>
      </div>
      <>
        {
          !showsection && <div className="mx-auto pt-[13%] w-[90%] my-10"><h1 className=" text-xl sm:text-2xl md:text-3xl font-bold mb-2 ">Vittoba Computers Co.LLC</h1>
            <h1 className=" md:text-sm lg:text-xl  font-light ">
              Welcome to Vittoba Computers Co.LLC, your trusted destination for all your printing needs. We are a leading company dedicated to providing comprehensive printing solutions and top-quality printer parts.</h1></div>
        }
      </>

      {/* ************************************OUR TRUSTED BRANDS*************************************** */}

      <div className="flex flex-col lg:flex-row  my-8  items-center justify-around bg-slate-2 00">
        <div className=" w-4/5 lg:w-2/5 text-center">
          <h1 className=" md:text-2xl lg:text-2xl font-bold text-slate-950">OUR TRUSTED BRANDS</h1>
          <h1 className=" md:text-2xl lg:text-2xl font-bold mt-0 md:mt-2"></h1>
          <p className="md:text-sm lg:text-xl  font-light mt-2 md:mt-4">We are selling top rated brand's products in our shops. Quality is our prime concern.</p>
        </div>
        <div className=" w-11/12 lg:w-2/4">
          <div className=" px-4 py-2 my-4 md:my-6 shadow-2xl rounded-xl bg-white" >
            <Slider {...settingslogo} nextArrow={<SampleNextArrowlogo />} prevArrow={<SamplePrevArrowlogo />}>
              {
                logoimg1.map((slogo) => {
                  return (
                    <div key={slogo.id} className="" >
                      <div style={{}}>
                        <div className="  w-[85px] sm:w-[120px]  md:w-[100px] my-auto flex h-[50px] md:h-[60px] " >
                          <img className="object-contain" src={slogo.img} alt="brands" />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </Slider>
          </div>
          <div className=" px-4 py-2 my-2 md:my-6 mt-2 md:mt-6 shadow-2xl rounded-xl  bg-white" >
            <Slider {...settingslogo2} nextArrow={<SampleNextArrowlogo />} prevArrow={<SamplePrevArrowlogo />}>
              {
                logoimg2.map((slogo) => {
                  return (
                    <div key={slogo.id} className="">
                      <div className=" w-[80px] sm:w-[120px] md:w-[100px] my-auto flex h-[50px] md:h-[60px]   " >
                        <img className="object-contain" src={slogo.img} alt="brands" />
                      </div>

                    </div>
                  )
                })
              }
            </Slider>
          </div>
        </div>
        <div>

        </div>
      </div>


      {/* ******************************OUR PRODUCTS******************************** */}
      <div className=" bg-slate-200 pt-6 my-10 md:my-12 md:mb-0">
        <h1 className="text-xl   sm:text-2xl md:text-4xl text-center pt-2 font-bold text-slate-900">FEATURED PRODUCTS</h1>
        <div className="m-0 md:m-4 md:mb-0 p-0 md:p-4 md:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">

          {Loading ? (
            'loading'
          ) : (
            data.slice(0, 6).map((item, i) => {
              if (item.makeitfeatured == '1') {
                return <>
                  <div key={i} onClick={() => handleProduct(item)} className="cursor-pointer ">
                    <div className=" bg-white  px-4 md:px-6 py-4 my-4 mx-4 shadow-lg">
                      <div className="w-full h-[250px] flex justify-center items-center overflow-hidden ">
                        {/* <img src={`/uploads/products/${item.images0}`} alt="singleproduct" className="object-cover mx-auto" /> */}
                        <img
        src={`/uploads/products/${item.images0}`}
        alt="singleproduct"
        className={` object-cover mx-auto ${item.images0 ? 'w-[240px]' : ''}`}
        onError={(e) => {
            e.target.src = notfoundImg; // Replace '/path/to/dummy_image.jpg' with the actual URL of your dummy image.
            e.target.alt = 'dummyproduct'; // Set the alternative text to 'dummyproduct' when the dummy image is displayed.
        }}
    />
                      </div>
                      <h1 className=" text-[1.25rem] font-bold text-center my-3 line-clamp-1">{item.product_name}</h1>
                      <p className="  text-lg line-clamp-3 text-center">{item.description}</p>
                    </div>
                  </div>
                </>
              }
            })
          )
          }



        </div>
      </div>
      {/* ******************************7 DAYS WORKING **************************************** */}
      {/* <div className="flex items-center justify-between h-[180px] sm:h-[240px] md:h-[300px] xl:h-[350px] px-4 md:px-14 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${backimg})` }} >
        <div className=" border py-2 md:py-4  px-4 text-sm sm:text-md md:text-xl rounded-lg font-bold text-white bg-slate-900 ">
          <p className="mb-2"> +971 43280499 </p>
          <p>sales@vittoballc.com</p>
        </div>
        <button className="border py-3  px-5 text-sm sm:text-md md:text-xl bg-slate-900 text-white rounded-lg hover:bg-gray-500">CONTACT US</button>
      </div> */}

      <div className="flex flex-col lg:flex-row items-center  ">
        <div className="sm:w-full  lg:w-1/2 bg-slate-900 text-white flex items-center justify-center h-[250px] md:h-[400px]">
          <div className="mx-8 md:mx-14">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2  ">Vittoba Computers Co.LLC</h1>
            <h1 className=" text-[1rem] md:text-[1.1rem] leading-6 md:leading-8 font-light">Unleashing Your Imagination through Cutting-Edge Printing Solutions</h1>
            <button className="self-center p-2 md:p-2  mt-3 md:mt-3 rounded-md text-base md:text-base font-bold bg-slate-700 hover:bg-slate-900 duration-300" style={{ border: "1px solid white" }}>Contact Us</button>
          </div>
        </div>
        <div className=" w-full  lg:w-1/2 ">
          <div className="w-full  h-[250px] md:h-[400px]">
            <img src={backimg} alt="imgg" className=" w-full h-full object-cover" />
          </div>

        </div>
      </div>

      {/* ***********************************************OUR BLOGS ************************************************ */}

      <div className=" bg-slate-200 py-6  my-10 mb-0 md:my-18 md:mb-0 mt-0 pt-12 ">
        <h1 className="text-3xl md:text-4xl text-center pt-2 font-bold text-slate-900">OUR BLOGS</h1>
        <div className="m-4 sm:m-10 p-2 sm:p-4 mt-2  ">
          <Slider {...settings} >
            {
              blogData.map((singleproduct, index) => {
                const { title, content, image } = singleproduct
                return (
                  <div key={index} >
                    <div className=" bg-white  px-6 py-4 mx-4 h-[420px] md:h-[600px] shadow-lg">
                      <div className="w-full h-[200px] md:h-[300px] overflow-hidden">
                        <img src={`/uploads/blog/${image}`} alt="singleproduct" className="object-cover w-full h-full" />
                      </div>
                      <h1 className=" text-lg md:text-2xl text-center my-2 md:my-4 font-semibold line-clamp-2">{title}</h1>
                      <p className="text-[.7rem]  md:text-base text-justify line-clamp-4" dangerouslySetInnerHTML={{ __html: content }}></p>
                      <button onClick={() => handleBlogClick(singleproduct)} className="border w-full py-2  mt-2 md:mt-4 bg-slate-400 font-bold rounded-md
                                hover:bg-slate-500  text-md md:text-lg">READ MORE</button>
                    </div>
                  </div>
                )
              })
            }
          </Slider>


        </div>
      </div>
    </div>
  );
};

export default UserMain;