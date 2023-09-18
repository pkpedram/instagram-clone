import React from 'react'

import {BiHome, BiSearch, BiShoppingBag} from 'react-icons/bi'
import {BsCameraReels} from 'react-icons/bs'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import imagePlaceholder from '../../assets/images/imageplaceholder.svg'
import { ApiConfig } from '../../redux/constants'
import {LuPlusSquare} from 'react-icons/lu'

const BottomNav = ({userData}) => {

    const location = useLocation()

    const items = [
        {
            link: '/',
            icon: <BiHome />
        },
        {
            link: '/search',
            icon: <BiSearch />
        },
        {
            link: '/addPost',
            icon: <LuPlusSquare />
        },
        {
            link: '/shop',
            icon: <BiShoppingBag />
        },
        
    ]

  return (
    <div className='fixed w-full bottom-0 right-0 bg-white p-4 border-t flex justify-between gap-4 rounded-t-xl shadow-md items-center'>
        {
            items.map(item => 
                <Link to={item.link} className={`text-2xl ${location.pathname == item.link ? 'border-b border-b-black' : 'border-b border-b-transparent'}`}>
                    {item.icon}
                </Link>
                )
        }

        <Link to={`/profile/${userData?.username}`}>
            <img src={userData?.avatar ? ApiConfig.domain + '/' + userData?.avatar : imagePlaceholder} className='w-8 h-8 rounded-full' />
        </Link>
    </div>
  )
}

const mapStateToProps = state => ({
    userData: state.userState.userData
})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav)