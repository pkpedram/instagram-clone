import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import userActions from '../../redux/actions/User'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {LuPlusSquare} from 'react-icons/lu'
import {IoMenuOutline} from 'react-icons/io5'
import ProfilePicture from '../../components/ProfilePicture'
import {BsChevronLeft} from 'react-icons/bs'
import {BsThreeDotsVertical} from 'react-icons/bs'
import ProfilePostsList from '../../components/ProfilePostsList'

const Profile = ({
    getUserByUserName,
    userByUserName,
    userData
}) => {

    const {username} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(username){
            getUserByUserName(username)
            console.log(username)
        }
    }, [username])


    const topItems = [
        {
            value: userByUserName?.posts,
            title: 'Posts'
        },
        {
            value: userByUserName?.followers,
            title: 'Followers'
        },
        {
            value: userByUserName?.posts,
            title: 'Following'
        },
    ]

  return (
    <div className='w-full flex flex-col gap-2 p-4'>
        <div className='w-full flex items-center justify-between'>
            {
                userData?.username == userByUserName?.username ? 
                (
                    <>
                    <h1 className='text-2xl font-bold'>{userByUserName.username}</h1>
                    <div className='flex items-center gap-2 text-3xl'>
                    <Link to={'/addPost'}>
                            <LuPlusSquare />
                        </Link>
                        <Link to={'/editProfile'}>
                    <IoMenuOutline />
                        </Link>
                        
                    </div>
                    </>
                ) :
                (
                    <>
                        <div className='text-2xl' onClick={() => navigate(-1)}>
                            <BsChevronLeft />
                            </div>

                            <p className='font-bold'>{userByUserName?.username}</p>
                            <div className='text-lg'><BsThreeDotsVertical /></div>
                    </>
                )
            }

        </div>
        <div className='flex items-center justify-between my-4'>
            <ProfilePicture avatar={userByUserName?.avatar} username={userByUserName?.username} />

            <div className='grid grid-cols-3 gap-6'>
                {
                    topItems?.map(item => (
                        <div className='flex flex-col items-center'>
                            <h1>{item.value}</h1>
                            <h3>{item.title}</h3>
                        </div>
                    ))
                }
            </div>
        </div>
        <div>
                <p>{userByUserName?.fullName}</p>
                <p className='mt-3'>{userByUserName?.bio}</p>
        </div>

        <div className='flex w-full items-center gap-3'>
            {
                userByUserName?.username === userData?.username ? 
                (
                    <>
                    <Link to={'/editProfile'} className='p-2 text-center w-full rounded-md text-sm bg-gray-200'>
                        Edit profile
                    </Link>
                    </>
                ) :
                <>
                 <div  className='p-2 text-center w-full rounded-md text-sm text-white bg-main-blue'>
                        {
                            'Follow'
                        }
                    </div>
                    <Link to={`/message/${userByUserName}`} className='p-2 text-center w-full rounded-md text-sm bg-gray-200'>
                        Message
                    </Link>
                </>
            }
        </div>

        <ProfilePostsList username={username} />
    </div>
  )
}


const mapStateToProps = state => ({
    userByUserName: state.userState.userByUserName,
    userData: state.userState.userData
})
const mapDispatchToProps = {
    getUserByUserName: userActions.getUserByUserName
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)