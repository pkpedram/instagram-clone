import React from 'react'

const Button = ({
    onClick,
    children,
    className
}) => {
  return (
    <button
    onClick={onClick}
    className={`w-full h-14 flex items-center justify-center rounded-lg bg-main-blue text-white ${className}`}>
        {children}
    </button>
  )
}

export default Button