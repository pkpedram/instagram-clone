import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import { AiOutlineTable } from "react-icons/ai";
import { PiUserSquareThin } from "react-icons/pi";
import postActions from "../../redux/actions/Post";
import { ApiConfig } from "../../redux/constants";
import { Link } from "react-router-dom";

const ProfilePostsList = ({getUserPosts, userPosts, username}) => {
  const [activeType, setActiveType] = useState(1);

  let types = [
    {
      id: 1,
      icon: <AiOutlineTable />,
      list: userPosts,
    },
    {
      id: 2,
      icon: <PiUserSquareThin />,
      list: [],
    },
  ];

  useMemo(() => {
    if(username){
        getUserPosts(username, {}, {offset: 0, limit: 10})
    }
  }, [username])

  return (
    <div className="w-full mt-2">
      <div className="w-full  flex items-center">
        {types?.map((item) => (
          <div
            key={`POST_TYPE_${item.id}`}
            onClick={() => setActiveType(item.id)}
            className={`${
              activeType == item.id
                ? "border-b border-black"
                : "border-b border-[#eee"
            } flex w-full p-3 justify-center text-2xl`}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {types.find((itm) => itm.id == activeType)?.list.length === 0 ? (
        <div className="w-full flex flex-col items-center text-lg p-4">
          <h2>There are no posts yet!</h2>
        </div>
      ) : (
        <div className="w-full grid grid-cols-3 gap-1">
            {
                types.find(itm => itm.id == activeType)?.list?.map((post) => (
                    <Link to={`/post/${post.post._id}`} className="w-full aspect-square bg-gray-100">
                        {
                            (post?.post.type == 'image') || (post?.post.type == 'multi')  ? (
                                <img src={ApiConfig.domain + '/' + post.thumbnail} className="object-center h-full" />
                            ) : 
                            (
                                <video className="h-full object-fill" controls={false}>
                                    <source src={ApiConfig.domain + '/' + post.thumbnail} />
                                </video> 
                            )
                        }
                    </Link>
                ))
            }
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
    userPosts: state.postState.userPosts
});
const mapDispatchToProps = {
    getUserPosts: postActions.getUserPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePostsList);
