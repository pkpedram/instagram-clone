import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import logo from "../../assets/images/logos_instagram.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { connect } from "react-redux";
import userActions from "../../redux/actions/User";

const LoginPage = ({login, signUp}) => {
  const [loginType, setLoginType] = useState("Sign Up");
  const [step, setStep] = useState(0);

  const [value, setValue] = useState({
    usernameOrOther: '',
    password: ''
  })

  switch (step) {
    case 1:
      return (
        <div className="flex flex-col items-center h-screen">
          <div className="mt-8">English</div>

          <div className="flex-1 w-full h-full flex flex-col justify-center items-center gap-6 p-4">
            <img src={logo} />

            <div className="flex flex-col w-full gap-4">
              <Input

                value={value.usernameOrOther}
                onChange={e => setValue({...value, usernameOrOther: e.target.value})}
                type={"text"}
                placeholder={"Phone number, email or username"}
              />
              <Input
              
              value={value.password}
              onChange={e => setValue({...value, password: e.target.value})}

              type={"password"} placeholder={"Password"} />

              <Button
              
              onClick={() => {
               if(value.password.length > 7 && value.usernameOrOther.length > 1){
                if(loginType == 'Sign Up'){
                    signUp(value)
                }else{
                    login(value)
                }
               }
              }}
              
              className={`${(value.password.length > 7 && value.usernameOrOther.length > 1) ? 'opacity-100' : 'opacity-40'}`}>{loginType}</Button>

              <div className="w-full flex justify-center mb-6 text-xs">
            <p className="text-gray-500">
                {
                    loginType == 'Sign Up' ? 'Already have an account?' : "Don't have an account?"
                }
                 </p>
            <p
              onClick={() => loginType == 'Sign Up' ?  setLoginType("Sign In") : setLoginType("Sign Up")}
              className="font-bold ml-2"
            >
             {
                loginType == 'Sign Up' ? ' Sign in.' : 'Sign Up.'
             }
            </p>
          </div>
            </div>
            <div className="flex items-center w-full gap-4">
              <div className="h-1 bg-gray-200 rounded-full w-full"></div>
              <div className="text-sm  text-gray-500">OR</div>
              <div className="h-1 bg-gray-200 rounded-full w-full"></div>
            </div>
            <Button className={"shadow-lg !gap-3  mb-4"}>
              <p>
                <FaFacebookF />
              </p>
              <p> Continue with Facebook</p>
            </Button>
          </div>

          <div className="w-full p-4 flex bg-gray-100 justify-center">
           </div>
        </div>
      );

    default:
      return (
        <div className="flex flex-col items-center h-screen">
          <div className="mt-8">English</div>

          <div className="flex-1 w-full h-full flex flex-col justify-center items-center gap-6 p-4">
            <img src={logo} />

            <p className="text-sm text-center">
              Sign up to see photos videos and reels from your friends.
            </p>

            <Button className={"shadow-lg !gap-3 mt-20 mb-4"}>
              <p>
                <FaFacebookF />
              </p>
              <p> Continue with Facebook</p>
            </Button>

            <div className="flex items-center w-full gap-4">
              <div className="h-1 bg-gray-200 rounded-full w-full"></div>
              <div className="text-sm  text-gray-500">OR</div>
              <div className="h-1 bg-gray-200 rounded-full w-full"></div>
            </div>

            <div className="mt-8">
              <p
                onClick={() => {
                  setStep(1);
                }}
                className="text-lg font-semibold"
              >
                Sign Up With Phone or Email
              </p>
            </div>
          </div>

          <div className="w-full p-4 flex bg-gray-100 justify-center">
            <p className="text-gray-500">Already have an account? </p>
            <p
              onClick={() => {
                setStep(2);
              }}
              className="font-bold ml-2"
            >
              Sign in.
            </p>
          </div>
        </div>
      );
  }
};

const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    login: userActions.login,
    signUp: userActions.signUp
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
