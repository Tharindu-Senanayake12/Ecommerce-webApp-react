import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products, backendUrl } = useContext(ShopContext); // Add backendUrl
    const [bestSeller, setBestSeller] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Products in BestSeller:', products);
        if (products && products.length > 0) {
            const bestProduct = products.filter((item) => item.bestSeller === true);
            console.log('Filtered Best Sellers:', bestProduct);
            setBestSeller(bestProduct.slice(0, 5));
            setLoading(false);
        } else {
            console.log('No products available');
            setLoading(false);
        }
    }, [products]);

    if (loading) {
        return <div className='text-center my-10'>Loading best sellers...</div>;
    }

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Our Best Sellers of the Season made even better ! <br />
                    Introducing the new and improved versions of our Ellen Collection with a Breathable Knit fabric for your comfort.
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.length > 0 ? (
                    bestSeller.map((item, index) => {
                        const imageSrc = Array.isArray(item.image) ? item.image[0] : item.image;
                        const fullImageUrl = imageSrc.startsWith('http') ? imageSrc : `${backendUrl}${imageSrc}`; // Prepend backendUrl if needed
                        console.log(`Image for ${item.name}:`, fullImageUrl);
                        return (
                            <ProductItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                image={fullImageUrl}
                                price={item.price}
                            />
                        );
                    })
                ) : (
                    <p className='text-center col-span-full'>No best sellers available.</p>
                )}
            </div>
        </div>
    );
};

export default BestSeller;