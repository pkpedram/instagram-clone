import React, { useState } from 'react'

import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'

const Input = ({
    onChange,
    value,
    placeholder,
    type,
    className,
    name
}) => {

    const [innerType, setInnerType] = useState(type)

  return (
    <div className={` bg-[#eee] h-12 w-full rounded-lg flex ${className}`}>

        <input name={name} className='w-full h-12 bg-transparent outline-none px-3' value={value} onChange={onChange} placeholder={placeholder} type={innerType} />
            {
                type === 'password' && 
                <div
                onClick={() => {
                    if(innerType === 'password'){
                        setInnerType('text')
                    }else{
                        setInnerType('password')
                    }
                }}
                className='w-12 h-full ml-2 flex items-center justify-center text-2xl text-gray-400'>
                        {
                            innerType === 'password' ? <AiFillEye /> : <AiFillEyeInvisible />
                        }
                    </div>
            }
    </div>
  )
}

export default Input