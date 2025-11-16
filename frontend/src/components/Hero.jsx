import React, { useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  const nextSectionRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const scrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className='w-full bg-gradient-to-r from-[#f9f9f9] to-[#f9fff9] rounded-3xl relative '>
        <div className='grid sm:grid-cols-4 items-center border border-gray-300 rounded-xl overflow-hidden shadow-md'>

          {/* Left Image */}
          <div className='w-full h-full sm:col-span-1 overflow-hidden' data-aos='fade-right'>
            <img className='w-full h-full object-cover transition-transform duration-[1s] ease-out hover:scale-105' src={assets.hero_img_2} alt='Fashion Left' />
          </div>

          {/* Center Text */}
          <div className='col-span-2 text-center sm:py-12 py-10 px-6 sm:px-0 relative' data-aos='fade-up'>
            <div className='text-[#414141]'>
              <div className='flex items-center justify-center gap-2 mb-3'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base tracking-widest'>OUR BESTSELLERS</p>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
              </div>

              <h1 className='prata-regular text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4'>
                New Arrivals
              </h1>
              <p className='text-sm md:text-base text-gray-500 mb-6'>
                Discover the latest styles and timeless classics curated for you.
              </p>

              <button
                className='group inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm sm:text-base font-medium rounded-full transition hover:bg-[#333]'
                onClick={scrollToNextSection}
              >
                SHOP NOW
                <span className='transform group-hover:translate-x-1 transition-transform duration-200'>&rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className='w-full h-full sm:col-span-1 overflow-hidden' data-aos='fade-left'>
            <img className='w-full h-full object-cover transition-transform duration-[1s] ease-out hover:scale-105' src={assets.hero_img} alt='Fashion Right' />
          </div>
        </div>

        {/* ✅ Scroll Indicator placed OUTSIDE grid & centered */}
        <div
          className='flex flex-col items-center mt-4 animate-bounce'
          data-aos='fade-in'
        >
          <span className='text-gray-500 text-sm'>Scroll Down</span>
          <svg className='w-5 h-5 text-gray-500 mt-1' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
          </svg>
        </div>
      </div>

      {/* 👇 Target Scroll Section */}
      <div ref={nextSectionRef}></div>
    </>
  );
};

export default Hero;
