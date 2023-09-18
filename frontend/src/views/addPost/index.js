import React, { useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import postActions from "../../redux/actions/Post";

const AddPost = ({addPost}) => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [showVideo, setShowVideo] = useState(null);

  const [value, setValue] = useState({
    caption: '',
    type: ''
  })

  const [step, setStep] = useState(0);


  return (
    <div className="w-full p-4">
      <div className="w-full flex items-center justify-between">
        <p
        
        onClick={() => {
            if(step === 1){
                setStep(0)
            }else{
                navigate(-1)
            }
        }}
        
        className="text-2xl font-bold">
          <BsChevronLeft />
        </p>
        <p>New post</p>

        <button
        onClick={() => {
            if(step === 0){
                if(images.length !== 0 || videos.length !== 0){
                    setStep(1)
                }else{
                    toast.error('Please Choose Files to Post')
                }
            }else{
                let type = (images.length + videos.length > 1) ? 'multi' : (
                    images.length == 1 ? 'image' : 'video'
                )

                addPost({
                    ...value,
                    type: type
                }, images, videos)
            }
        }}
        
        className="text-main-blue font-bold">

            {
                step === 0 ? 'Next' : 'Share'
            }
        </button>
      </div>

      {step === 0 ? (
      
          <div className="my-8 w-full flex flex-col items-center">
            <input
              multiple={true}
              onChange={(e) => {
                let file = e.target.files[0];

                if (file?.type.includes("image")) {
                  let thisImages = [...images, file];

                  setImages(thisImages);
                }
                if (file?.type.includes("video")) {
                  setVideos([...videos, file]);
                }
              }}
              id="postFiles"
              type="file"
              className="hidden"
            />

            <label
              className="w-full mb-4 p-4 py-10 border border-gray-200 rounded-lg shadow flex flex-col items-center"
              htmlFor="postFiles"
            >
              <p className="text-6xl mb-4">
                {" "}
                <AiOutlineFileImage />
              </p>
              <p className="text-sm text-center">
                Please Select photo or videos you want to post
              </p>
            </label>
            <div className="w-full grid grid-cols-3 gap-4 mt-6">
              {images.map((item, idx) => (
                <div
                  key={idx + "IMAGE"}
                  className="relative w-full aspect-square flex items-center border rounded-md border-gray-300 shadow"
                >
                  <div
                    onClick={() =>
                      setImages(images.filter((itm, indx) => indx !== idx))
                    }
                    className="absolute text-xl text-red-500 -top-2 -right-2"
                  >
                    <FaTimesCircle />
                  </div>
                  <img
                    src={URL.createObjectURL(item)}
                    className="object-contain"
                  />
                </div>
              ))}
              {videos.map((item, idx) => (
                <div
                  onClick={() => (showVideo == idx) ? null : setShowVideo(idx)}
                  key={idx + "video"}
                  className={`   flex items-center border rounded-md border-gray-300 shadow
                  ${showVideo == idx ? 'fixed z-30 w-full h-screen top-0 right-0 bg-black/70 backdrop-blur-sm p-4' : 'relative w-full aspect-square'}
                  `}
                >
                  <div
                    onClick={() => (showVideo == idx) ? setShowVideo(null) : setVideos(videos.filter((itm, indx) => indx !== idx))
                    }
                    className={` text-xl z-50 text-red-500 ${showVideo == idx ? 'top-4 right-4 fixed' : '-top-2 -right-2 absolute'} `}
                  >
                    <FaTimesCircle />
                  </div>

                  <video controls={showVideo == idx}>
                    <source src={URL.createObjectURL(item)} />
                  </video>
                </div>
              ))}
            </div>
          </div>
      
      ) : (
        <>
        <div className="w-full grid grid-cols-3 gap-4 mt-6">
              {images.map((item, idx) => (
                <div
                  key={idx + "IMAGE"}
                  className="relative w-full aspect-square flex items-center border rounded-md border-gray-300 shadow"
                >
                  <div
                    onClick={() =>
                        {
                      setImages(images.filter((itm, indx) => indx !== idx))
                      if(images.length == 1 && videos.length == 0){
                        setStep(0)
                      }
                    }
                    }
                    className="absolute text-xl text-red-500 -top-2 -right-2"
                  >
                    <FaTimesCircle />
                  </div>
                  <img
                    src={URL.createObjectURL(item)}
                    className="object-contain"
                  />
                </div>
              ))}
              {videos.map((item, idx) => (
                <div
                  onClick={() => (showVideo == idx) ? null : setShowVideo(idx)}
                  key={idx + "video"}
                  className={`   flex items-center border rounded-md border-gray-300 shadow
                  ${showVideo == idx ? 'fixed z-30 w-full h-screen top-0 right-0 bg-black/70 backdrop-blur-sm p-4' : 'relative w-full aspect-square'}
                  `}
                >
                  <div
                    onClick={() => {if(showVideo == idx){ setShowVideo(null) 
                        
                    }else{ 
                        
                        if(videos.length == 1 && images.length == 0){
                            setStep(0)
                          } 
                        setVideos(videos.filter((itm, indx) => indx !== idx))}}
                    }
                    className={` text-xl z-50 text-red-500 ${showVideo == idx ? 'top-4 right-4 fixed' : '-top-2 -right-2 absolute'} `}
                  >
                    <FaTimesCircle />
                  </div>

                  <video controls={showVideo == idx}>
                    <source src={URL.createObjectURL(item)} />
                  </video>
                </div>
              ))}
            </div>

            <textarea value={value.caption} onChange={e => setValue({...value, caption: e.target.value})} className="p-3 w-full border-b my-2 outline-none" placeholder="Caption...">

                </textarea>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
    addPost: postActions.addPost
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
