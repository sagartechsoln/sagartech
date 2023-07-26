import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from '../../data';
import "./Testimonial.css"


const Testimonial = () => {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section mb-0 md:mb-4">
      <div className="title">
        <h1 className='text-2xl md:text-[2.5rem] font-bold text-black mb-0 md:mb-4'>
          REVIEWS
        </h1>
      </div>
      <div className="section-center ">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          let position = 'nextSlide';
          
          if (personIndex === index) {
            position = 'activeSlide';
          }
          
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img mx-auto mt-0" />
              <h4 className=' text-2xl md:text-3xl mt-4 mb-4 text-slate-900 font-semibold'>{name}</h4>
              {/* <p className="title text-xl">{title}</p> */}
              <p className="text-sm md:text-[1rem] leading-6 w-[90%] mx-auto">{quote}</p>
              <FaQuoteRight className="mt-4 mx-auto text-xl md:text-5xl text-slate-900" />
            </article>
          );
        })}
        <button className="prev text-slate-900 hover:bg-slate-900 hover:text-white" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next text-slate-900 hover:bg-slate-900 hover:text-white" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default Testimonial;
