import React from 'react'
import userPlaceholder from '../../assets/images/imageplaceholder.svg'
import { ApiConfig } from '../../redux/constants'
import { useNavigate } from 'react-router-dom'

const ProfilePicture = ({
    avatar,
    hasStory,
    username,
    className
}) => {

    const navigate = useNavigate()

  return (
    <div
    onClick={() => hasStory ? navigate(`/story/${username}`) : {}}
    className={`w-20 h-20 rounded-full ${hasStory ? 'bg-gradient-to-tr  p-1  from-main-yellow via-main-red to-main-pink' : ''} ${className}`}>
        <img src={avatar ? ApiConfig.domain + '/' + avatar : userPlaceholder} className={`${hasStory ? 'border-2 border-white' : ''} w-full h-full rounded-full`} />
    </div>
  )
}

export default ProfilePicture