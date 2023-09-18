import React from 'react'
import ProfilePicture from '../ProfilePicture'
import { ApiConfig } from '../../redux/constants'
import { Link } from 'react-router-dom'
import { BsThreeDots, BsSend, BsHeart, BsHeartFill, BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'

const PostItem = ({item}) => {
    console.log(item)
  return (
    <div className='w-full '>
        <div className='w-full flex items-center justify-between py-3 px-4'>
            <div className='flex items-center gap-3'>
                <ProfilePicture className={'!w-12 !h-12'} avatar={item.post?.relatedUser.avatar} username={item.post?.relatedUser?.username}/>
                <Link className='font-bold' to={`/profile/${item.post?.relatedUser?.username}`}>
                {item.post?.relatedUser?.username}
                </Link>
            </div>
            <p className='text-black text-2xl'>
                <BsThreeDots />
            </p>
        </div>
        {
            item?.post?.type == 'image' ? 
            (
                <img src={ApiConfig.domain + '/' + item.images[0].image}  className='w-full'/>
            ) :
            (
                item?.post?.type == 'video' ? 
                <video controls={true}>
                    <source src={ApiConfig.domain + '/' + item.videos[0].video} />
                </video>
                :
                <></>
            )
        }
        <div className='w-full flex items-center justify-between px-4 py-3 text-2xl'>
            <div className='flex items-center gap-3'>
                <p
                className={`${item?.youLiked ? 'text-red-500' : ''}`}
                >{item?.youLiked ? <BsHeartFill /> : <BsHeart />}</p>

                <p>
                    <FaRegComment />
                </p>
                <p>
                    <BsSend />
                </p>
            </div>
            <p>
                {
                    item?.youSaved ? <BsFillBookmarkFill /> : <BsBookmark />
                }
            </p>
        </div>
        <p className='px-4 font-bold'>
                {item?.post?.likes} Likes
        </p>
        <p className='flex px-4'>
                <span className='font-bold mr-1'>{item.post?.relatedUser?.username}</span>
                {item?.post?.caption}
        </p>
        {
            item?.comments?.map(comment => (
                <div className='my-1'>
                     <span className='font-bold mr-1'>{comment?.relatedUser?.username}</span>
                     {comment.text}
                     <span>{new Date(comment.createdAt).toString()}</span>
                </div>
            ))
        }
        <Link className='text-sm pl-4 text-gray-500' to={`/comments/${item?.post?.id}`} >
            View all {item.commentCounts} comments
        </Link>

        <p className='text-gray-400 text-xs pl-4 mt-2'>{new Date(item?.post?.createdAt).toLocaleString()}</p>
    </div>
  )
}

export default PostItem