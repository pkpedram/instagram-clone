import React, { useState } from 'react'
import {FaFacebookF} from 'react-icons/fa'
import logo from '../../assets/images/logos_instagram.svg'
import Button from '../../components/Button'


const LoginPage = () => {

    const [loginType, setLoginType] = useState('')

  return (
    <div className='flex flex-col items-center h-screen'>
        <div className='mt-8'>
            English
        </div>

        <div className='flex-1 w-full h-full flex flex-col justify-center items-center gap-6 p-4'>

        <img src={logo} />
        
        <p className='text-sm text-center'>Sign up to see photos videos and reels from your friends.</p>
            

        <Button className={'shadow-lg !gap-3 mt-20 mb-4'}>
               <p><FaFacebookF /></p>
               <p> Continue with Facebook</p>
        </Button>    

        <div className='flex items-center w-full gap-4'>
            <div className='h-1 bg-gray-200 rounded-full w-full'></div>
            <div className='text-sm  text-gray-500'>
                OR
            </div>
            <div className='h-1 bg-gray-200 rounded-full w-full'></div>
        </div>

        <div className='mt-8'>
            <p 
            onClick={() => setLoginType('SignUp')}
            className='text-lg font-semibold'>Sign Up With Phone or Email</p>
        </div>

        </div>

        <div className='w-full p-4 flex bg-gray-100 justify-center'>
            <p className='text-gray-500'>Already have an account? </p>
            <p
            onClick={() => setLoginType('singIn')}
            className='font-bold ml-2'>Sign in.</p>
        </div>

    </div>
  )
}

export default LoginPage