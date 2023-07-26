import React from 'react';
import { Link } from 'react-router-dom';

import pdbrad from '../../images/breadcrumb-product.jpg';

const Breadcrumb = ({ title }) => {
    return (
        <div className=''>
            <ul className='breadcrumb py-8 sm:py-16 mt-2 sm:mt-0 text-center bg-cover bg-no-repeat font-bold h-36 sm:h-auto ' style={{ backgroundImage: `url(${pdbrad})`}}>
                <li className='flex justify-center text-white text-lg md:text-[1.2rem] '><Link to='/'>Home</Link> <p className='ml-1'> - {title}</p></li>
                <li className='text-2xl md:text-4xl text-white  '><h5>{title}</h5></li>
            </ul>
        </div>
    );
};

export default Breadcrumb;
