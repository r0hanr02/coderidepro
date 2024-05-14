import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
const UserAuthinput = ({
    label,
    placeHolder,
    isPass,
    setStateFunction,
    Icon,
    setGetEmailValidationStatus,
}) => {
    const [value, setValue] = useState("")
    const [showPass, setshowPass] = useState(true)
    const [isEmailValid, setisEmailValid] = useState(false)

    const handleTextChange=(e)=>{
        setValue(e.target.value)
        setStateFunction(e.target.value)

        if(placeHolder==="Email"){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const status =emailRegex.test(e.target.value)
            setisEmailValid(status);
            setGetEmailValidationStatus(status);
        }
    }
  return (
    <div className='flex flex-col items-start justify-start gap-1'>
        <label className='text-sm text-gray-300'>
            {label}
        </label>
        <div 
        className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 
        ${!isEmailValid && placeHolder==="Email" && value.length>0 && "border-2 border-red-500"} `}>
        <Icon className='text-text555 text-2xl'/>
        <input 
        type={isPass && showPass ? "password":"text"} 
        placeholder={placeHolder}  
        className='flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg'
        value={value}
        onChange={handleTextChange}        
        />
        {isPass
        &&(<div
            onClick={()=>setshowPass(!showPass)}  className='cursor-pointer'>
            { showPass ? ( 
            <FaEyeSlash className='text-text555 text-2xl cursor-pointer'/>
            ) :(
                <FaEye className='text-text555 text-2xl cursor-pointer'/>
            )
        }
        </div>)}
    </div>
    </div>
  )
}

export default UserAuthinput