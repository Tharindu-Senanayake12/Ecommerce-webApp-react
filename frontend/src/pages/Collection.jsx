// src/pages/Collection.jsx

import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Filters from '../components/FilterProducts';
import SubFilters from '../components/SubFilterProducts';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const location = useLocation();

  // We no longer need `setSearch` here. Collection.jsx only *reads* the global search state.
  const { products, search } = useContext(ShopContext);

  const [filterProducts, setFilterProducts] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');
  const [showFilter, setShowFilter] = useState(false);

  // These local states are for the checkbox filters and are correctly initialized from the URL.
  const [category, setCategory] = useState(() => new URLSearchParams(location.search).getAll('category'));
  const [size, setSize] = useState(() => new URLSearchParams(location.search).getAll('size'));
  const [color, setColor] = useState(() => new URLSearchParams(location.search).getAll('color'));
  const [availability, setAvailability] = useState(() => new URLSearchParams(location.search).getAll('availability').map(val => val === 'true'));



  // EFFECT 1: Sync Local Filters from URL (For Chatbot/Direct Links)
  // This hook is now simplified. It only manages the state for the checkbox filters.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCategory(params.getAll('category'));
    setSize(params.getAll('size'));
    setColor(params.getAll('color'));
    setAvailability(params.getAll('availability').map(val => val === 'true'));
  }, [location.search]);

  // EFFECT 2: Live Filtering
  // This effect is perfect. It listens to the global `search` term and all local filter states.
  useEffect(() => {
    if (!products) return;
    let filtered = [...products];

    const lowerCaseCategories = category.map(c => c.toLowerCase());
    const lowerCaseColors = color.map(c => c.toLowerCase());
    const lowerCaseSizes = size.map(s => s.toLowerCase());

    // Filter by the global search term
    if (search.trim() !== '') {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        (product.category && product.category.toLowerCase().includes(searchLower))
      );
    }

    // Apply checkbox filters
    if (lowerCaseCategories.length > 0) {
      filtered = filtered.filter(product => product.category && lowerCaseCategories.includes(product.category.toLowerCase()));
    }
    if (lowerCaseSizes.length > 0) {
      filtered = filtered.filter(product => product.sizes?.some(s => lowerCaseSizes.includes(s.toLowerCase())));
    }
    if (lowerCaseColors.length > 0) {
      filtered = filtered.filter(product => product.colors?.some(c => lowerCaseColors.includes(c.toLowerCase())));
    }
    if (availability.length > 0) {
      filtered = filtered.filter(product => availability.includes(product.availability));
    }

    // Apply sorting
    if (sortOption === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filtered);
  }, [search, category, size, color, availability, sortOption, products]);

  // --- HANDLERS --- (No changes needed here)
  const createToggleHandler = (setter) => (e) => {
    const value = e.target.value;
    setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };
  const toggleCategory = createToggleHandler(setCategory);
  const toggleSize = createToggleHandler(setSize);
  const toggleColor = createToggleHandler(setColor);
  const toggleAvailability = (value) => {
    setAvailability(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  // --- RETURN --- (No changes needed here)
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="flex flex-col min-w-60">
        <SubFilters
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          size={size}
          toggleSize={toggleSize}
          color={color}
          toggleColor={toggleColor}
          availability={availability}
          toggleAvailability={toggleAvailability}
        />
        <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
           <Filters
             category={category}
             toggleCategory={toggleCategory}
           />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select
            className="border-2 border-gray-250 text-sm px-3 h-10 mt-1"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          ) : (
            <p>No products found matching your criteria. Try adjusting your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;