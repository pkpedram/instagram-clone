import React, { useState } from "react";
import { connect } from "react-redux";
import { AiOutlineTable } from "react-icons/ai";
import { PiUserSquareThin } from "react-icons/pi";

const ProfilePostsList = () => {
  const [activeType, setActiveType] = useState(1);

  let types = [
    {
      id: 1,
      icon: <AiOutlineTable />,
      list: [],
    },
    {
      id: 2,
      icon: <PiUserSquareThin />,
      list: [],
    },
  ];

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
        <div className="w-full grid grid-cols-3 gap-1"></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePostsList);
