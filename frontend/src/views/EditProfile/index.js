import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { BsCheckLg } from "react-icons/bs";
import { ApiConfig } from "../../redux/constants";
import imageplaceholder from "../../assets/images/imageplaceholder.svg";
import Input from "../../components/Input";
import userActions from "../../redux/actions/User";

const EditProfilePage = ({ userData, editProfile }) => {
  const [value, setValue] = useState({

  });

  const [image, setImage] = useState(null)
  const changeValue = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  useMemo(() => {
    if(userData?._id){
        setValue(userData)
    }
  }, [userData])

  return (
    <div className="w-full flex flex-col items-center p-4 gap-8">
      <div className="flex w-full justify-between items-center">
        <div></div>
        <h1>Edit Profile</h1>

        <button
        onClick={() => editProfile(value, image)}
        className="text-main-blue text-3xl">
          <BsCheckLg />
        </button>
      </div>

      <img
        src={
         (image ? URL.createObjectURL(image) : ( userData?.avatar
            ? ApiConfig.domain + '/' + userData?.avatar
            : imageplaceholder))
        }
        className="w-24 h-24 rounded-full"
      />

      <input
      onChange={e => setImage(e.target.files[0])}
      type="file" className="hidden" id="AVATAR" />
      <label htmlFor="AVATAR">
        <p className="text-lg text-main-blue">Change Profile Photo</p>
      </label>

      <Input
      value={value['fullName']}
        name={"fullName"}
        onChange={changeValue}
        placeholder={"Name"}
        className="!bg-transparent border-b rounded-none"
      />
      <Input
      value={value['username']}

       name={"username"}
       onChange={changeValue}
        placeholder={"Username"}
        className="!bg-transparent border-b rounded-none"
      />
      <Input
      value={value['bio']}

       name={"bio"}
       onChange={changeValue}
        placeholder={"Bio"}
        className="!bg-transparent border-b rounded-none"
      />
      <Input
      value={value['email']}

       name={"email"}
       onChange={changeValue}
        placeholder={"Email"}
        className="!bg-transparent border-b rounded-none"
      />
      <Input
      value={value['phoneNumber']}

       name={"phoneNumber"}
       onChange={changeValue}
        placeholder={"PhoneNumber"}
        className="!bg-transparent border-b rounded-none"
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userState.userData,
});
const mapDispatchToProps = {
    editProfile: userActions.editProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
