import React, { useEffect } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      {/* Title */}
      <div className="text-center mb-12" data-aos="fade-down">
        <Title text1="CONTACT" text2="US" />
        <div className="mt-2 w-20 h-1 bg-black mx-auto rounded"></div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row gap-12 items-center mb-24" data-aos="fade-up">
        
        {/* Image */}
        <img
          className="w-full max-w-md rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
          src={assets.contact_img}
          alt="Contact Bellini"
        />

        {/* Contact Info */}
        <div className="md:w-1/2 space-y-4 text-gray-700 text-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2 border-l-4 border-black pl-3">
            Our Store
          </h3>
          <div className="pl-3 space-y-1">
            <p><strong>Bellini (Pvt) Ltd</strong></p>
            <p>No. 117, Hunupitiya Lake Road, Colombo 02</p>
            <p>📞 <a href="tel:+94770699259" className="text-blue-600 hover:underline">0770699259</a></p>
            <p>📧 <a href="mailto:customercare@bellini.lk" className="text-blue-600 hover:underline">customercare@bellini.lk</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
