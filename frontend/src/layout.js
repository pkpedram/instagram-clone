import React from 'react'
import BottomNav from './components/BottomNav'

const Layout = ({children}) => {
  return (
    <div className='w-full min-h-screen '>
        {children}

        <BottomNav />
    </div>
  )
}


export default Layout