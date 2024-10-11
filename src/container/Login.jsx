import React, { useState } from 'react'
import { LOGO } from '../assets'
import { UserAuthinput } from '../components'
import { FaEnvelope, FaGithub } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { MdPassword } from 'react-icons/md'
// import { Link } from 'react-router-dom'
import {motion}from 'framer-motion'
import { signInWithGithub, signInWithGoogle } from '../utils/helpers'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase.config'
import { fadeInOut } from '../animations'
import {AnimatePresence} from 'framer-motion'

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [GetEmailValidationStatus, setGetEmailValidationStatus] = useState(false)
  const [isLogin, setisLogin] = useState(false)
  const [alert, setalert] = useState(false)
  const [alertMsg, setalertMsg] = useState("")


  const createNewUser =async()=>{
    if(GetEmailValidationStatus){
      await createUserWithEmailAndPassword(auth,email,Password).then 
      (
        userCred=>{
          if(userCred){
            console.log(userCred)
          }
        }).catch((err)=>console.log(err))
    }
  }

  const loginWithEmailPassword= async()=>{
    if(GetEmailValidationStatus){
      await signInWithEmailAndPassword(auth,email,Password)
      .then((userCred)=>{
        if(userCred){
          console.log(userCred)
        }
      })
      .catch((err)=>{
        console.log(err.message)
        if(err.message.includes("user-not-found")){
          setalert(true)
          setalertMsg("Invalid ID : User Not Found")
        }
        else if(err.message.includes("auth/invalid-credential")){
          setalert(true)
          setalertMsg("Check Email ID or Password")
        }
        else{
          setalert(true)
          setalertMsg("Wrong Password")
        }

        setInterval(()=>{
          setalert(false)
        },4000)
      })
    }
  }



  return (
   <div className='w-full py-6'>
    <img src={LOGO} className='object-contain w-32 opacity-70 h-auto' alt="" srcset="" />
    <div className='w-full flex flex-col items-center justify-center py-8'>
        <p className='py-12 text-2xl text-primaryText'>Become a Frontend Master!😃</p>
        <div className='px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8'>
            {/* Email */}
            <UserAuthinput 
            label ="Email" 
            placeHolder="Email" 
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
            />
            {/*Password */}
            <UserAuthinput 
            label ="Password" 
            placeHolder="Password" 
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
            />
            {/*Alert Section */}

            <AnimatePresence>
              {alert &&(
                <motion.p key={"Alert Message"}
                {...fadeInOut}
                className='text-red-500'>
                  {alertMsg}
                </motion.p>
              )}
            </AnimatePresence>

            {/*login button */}
          {isLogin ?(
            <motion.div 
            onClick={createNewUser}
            whileTap={{scale:0.9}}
            className='flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500'
            ><p className='text-xl text-white'>Sign Up</p></motion.div>
            ):(
            <motion.div 
              onClick={loginWithEmailPassword}
              whileTap={{scale:0.9}}
              className='flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500'
              ><p className='text-xl text-white'>Login</p></motion.div>
              )}


            {/*Account Text Section */}
           {isLogin ?(
           <p 
            className='text-sm text-primaryText flex items-center justify-center gap-3'
            >Already have an Account
              <span onClick={()=>setisLogin(!isLogin)} 
              className='text-emerald-500 cursor-pointer'>
                Login Here
            </span>
            </p>
           ):(
            <p 
            className='text-sm text-primaryText flex items-center justify-center gap-3'
            >Doesnt have an Account
              <span onClick={()=>setisLogin(!isLogin)} 
              className='text-emerald-500 cursor-pointer'>
                Create Here
            </span>
            </p>
           )}


    
            
            {/*or section  */}

{/*             <div className='flex items-center justify-center gap-12bg'>
              <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
              <p className='text-sm text-[rgba(256,256,256,0.2)]'>OR</p>
              <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
            </div> */}

            {/* Google sign in */}

{/*             <motion.div onClick={signInWithGoogle} 
            whileTap={{scale:0.9}}  
            className='flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:[rgba(256,256,256,0.4)] cursor-pointer' >
              <FcGoogle className='text-3xl'/>
              <p className='text-xl text-white'>Sign in with Google</p>
            </motion.div> */}

            {/* or section */}

{/*             <div className='flex items-center justify-center gap-12bg'>
              <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
              <p className='text-sm text-[rgba(256,256,256,0.2)]'>OR</p>
              <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
            </div> */}

            {/* Github signin */}

{/*             <motion.div onClick={signInWithGithub}
            whileTap={{scale:0.9}}  
            className='flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:[rgba(256,256,256,0.4)] cursor-pointer' >
              <FaGithub className='text-3xl'/>
              <p className='text-xl text-white'>Sign in with Github</p>
            </motion.div>
 */}
        </div>
    </div>
   </div>
  )
}

export default SignIn
