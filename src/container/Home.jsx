import React from 'react'
import { useState } from 'react'
import {HiChevronDoubleLeft} from "react-icons/hi2"
import {MdHome} from "react-icons/md"
import {FaSearchengin} from "react-icons/fa6"
import { Link, Route, Routes } from 'react-router-dom'
import { LOGO }from "../assets"
import {Projects, Login} from '../container'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { UserProfileDetails } from '../components'
import {SET_SEARCH_TERM} from '../context/actions/searchAction'


const Home = () => {
    const [isSideMenu, setisSideMenu] = useState(false)
    const user = useSelector(state => state.user?.user)
    const searchTerm=useSelector((state)=>state.searchTerm?.searchTerm? state.searchTerm?.searchTerm: "" )
    const dispatch=useDispatch()

  return<>
    <div className={`w-2 ${isSideMenu? "w-2 transition-all 2s":"flex-[.2] transition-all 2s xl:flex-[.2]"}
  min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transistion-all direction-200 ease-in-out`}
  >
    {/*anchor*/}
    <motion.div 
        onClick={()=> setisSideMenu(!isSideMenu)} 
        whileTap={{ scale: 0.9 }}
        className='w-8 h-8 bg-secondary rounded-tr-lg  rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer'>
            <HiChevronDoubleLeft className="text-white text-xl"/>   
    </motion.div>
    
    <div className='overflow-hidden w-full flex flex-col gap-4'>
        {/*logo*/}
        <Link to={"/home"}>
            <img src={LOGO} alt='LOGO' className='object-contain w-72 h-auto'/>
        </Link>
        {/*Start Coding*/}
        <Link to={"/newProject"}>
            <motion.div whileTap={{scale:0.9}} className='px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200'>
                <p className='text-gray-400 group-hover:text-gray-200 capitalize'>Start Coding</p>
            </motion.div>
        </Link>

        {/*Home Nav*/}
        {user&&(
            <Link to={"/home"}className='flex items-center justify-center gap-6'>
                <MdHome className='text-primaryText text-xl'/>
                <p className='text-lg text-primaryText'>Home</p>
            </Link>
        )}
        </div> 
        </div>
        <div className='flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12'>
            {/*Top section */}
            <div className='w-full flex items-center justify-between gap-3'>
                {/*search*/}
                <div className='bg-secondary w-full px-4 py-3 rounded-md flex items-center justify-center gap-3 '>
                    <FaSearchengin className='text-2xl text-primaryText'/>
                    <input
                    type='text'
                    value={searchTerm}
                    className='flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600'
                    placeholder='Search Here...'
                    onChange={(e)=>dispatch(SET_SEARCH_TERM(e.target.value))}
                    />
                </div>
                {/*Profile section */}
                {!user &&(
                    <motion.div whileTap={{scale:0.9}} className='flex items-center justify-center gap3'>
                        <Link to={'/home/Login'} className='bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700'>
                            Login
                        </Link>
                    </motion.div>
                )}
                {user &&
                    <UserProfileDetails/>
                    
                }
            </div>
            {/* bottom section*/}
            <div className='w-full'>
                <Routes>
                    <Route path='/*' element={<Projects />}/>
                    <Route path='/Login' element={<Login/>}/>
                </Routes>
            </div>

        </div>
</>
}

export default Home