/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = 'LKR ';
  const delivery_fee = 350;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const addToCart = async (itemId, size, color, quantity) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    } else if (!color) {
      toast.error('Select Product Color');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) cartData[itemId] = {};
    if (!cartData[itemId][size]) cartData[itemId][size] = {};
    if (!cartData[itemId][size][color]) cartData[itemId][size][color] = 0;

    cartData[itemId][size][color] += quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/add',
          { itemId, size, color, quantity },
          { headers: { token } }
        );
        toast.success('Added to Cart', { autoClose: 1500 });
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, color, quantity) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId] || !cartData[itemId][size] || !cartData[itemId][size][color]) return;

    if (quantity === 0) {
      delete cartData[itemId][size][color];
      if (Object.keys(cartData[itemId][size]).length === 0) delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
    } else {
      cartData[itemId][size][color] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/update',
          { itemId, size, color, quantity },
          { headers: { token } }
        );
        toast.success('Cart Updated', { autoClose: 1200 });
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    try {
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          for (const color in cartItems[itemId][size]) {
            const quantity = cartItems[itemId][size][color];
            if (typeof quantity === 'number' && quantity > 0) {
              totalCount += quantity;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error calculating cart count:", error);
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    //console.log('Cart Items in getCartAmount:', cartItems);
    //console.log('Products in getCartAmount:', products);

    if (!products || products.length === 0) {
      console.warn('Products array is empty or not loaded');
      return totalAmount;
    }

    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) {
        console.warn(`Product with ID ${itemId} not found in products`);
        continue;
      }

      if (typeof product.price !== 'number' || isNaN(product.price)) {
        console.warn(`Invalid price for product ID ${itemId}:`, product.price);
        continue;
      }

      for (const size in cartItems[itemId]) {
        for (const color in cartItems[itemId][size]) {
          const quantity = cartItems[itemId][size][color];
          if (quantity > 0 && typeof quantity === 'number') {
            totalAmount += product.price * quantity;
            //console.log(`Adding to total: ${product.price} * ${quantity} for item ${itemId}, size ${size}, color ${color}`);
          } else {
            console.warn(`Invalid quantity for item ${itemId}, size ${size}, color ${color}:`, quantity);
          }
        }
      }
    }

    //console.log('Final Cart Amount:', totalAmount);
    return totalAmount;
  };

  // Get products data
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Get user cart data on token change
  const getUserCart = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + '/api/cart/get',
        { userId: null }, // UserId is extracted from token in backend
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
    getUserCart();
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems, // Added setCartItems
    addToCart,
    getCartCount,
    updateQuantity,
    showSizeChart,
    setShowSizeChart,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;