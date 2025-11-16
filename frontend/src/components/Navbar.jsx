import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link,  NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const {getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  return (
    <div className='flex items-center justify-between py-7 px-0 font-medium'>
      
        <Link to='/'><img src={assets.logo} className='w-36' alt='logo' /></Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>Home</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>Collection</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/tops' className='flex flex-col items-center gap-1'>
                <p>Tops</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/dresses' className='flex flex-col items-center gap-1'>
                <p>Dresses</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/pants' className='flex flex-col items-center gap-1'>
                <p>Pants</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/shorts' className='flex flex-col items-center gap-1'>
                <p>Shorts</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/skirts' className='flex flex-col items-center gap-1'>
                <p>Skirts</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/denim' className='flex flex-col items-center gap-1'>
                <p>Denim</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>About</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>Contact Us</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
        </ul>  


        {/* Search Icon */}
        
        <div className='flex items-center gap-6'>
            {/* <img src={assets.search_icon} className='w-5 cursor-pointer' alt=''/> */}


        {/* Profile Icon */}
            <div className='group relative'>
                <img onClick={()=> token ? null : navigate('/login') } className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                {/* Dropdown Menu */}
                {token && 
                <div className='group-hover:block hidden absolute top-full right-0 pt-2 z-10'>
                    <div className='flex flex-col gap-1 w-36 py-1 px-5 bg-slate-100 text-gray-500 rounded shadow'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p onClick={()=> navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>}
            </div>


        {/* Cart */}
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5' alt=""/>
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>

            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>



        {/* Sidebar menu for small screens*/}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=> setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img className='h-4 rotate-180' src={assets.dropdown_icon} alt=""/>
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible}  className='py-2 pl-6 border' to='/'>Home</NavLink>
                <NavLink onClick={()=>setVisible} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
                <NavLink onClick={()=>setVisible} className='py-2 pl-6 border' to='/about'>About</NavLink>
                <NavLink onClick={()=>setVisible} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
                <NavLink onClick={()=>setVisible}  className='py-2 pl-6 border'to='/tops'>Tops</NavLink>
                <NavLink onClick={()=>setVisible}  className='py-2 pl-6 border'to='/dresses'>Dresses</NavLink>
                <NavLink onClick={()=>setVisible}  className='py-2 pl-6 border'to='/pants'>Pants</NavLink>
                <NavLink onClick={()=>setVisible}  className='py-2 pl-6 border'to='/shorts'>Shorts</NavLink>
                <NavLink onClick={()=>setVisible}  className='py-2 pl-6 border'to='/skirts'>Skirts</NavLink>
                <NavLink onClick={()=>setVisible}  className='py-2 pl-6 border'to='/denim'>Denim</NavLink>
                <NavLink onClick={()=>setVisible}  className='py-2 pl-6 border'to='/workwear'>Workwear</NavLink>
            </div>
        </div>

    </div>
  )
}

export default Navbar
