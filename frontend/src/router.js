import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import Layout from './layout'
import HelloWorldPage from './views/HelloWorld'
import LoginPage from './views/Login'
import userActions from './redux/actions/User'
import EditProfile from './views/EditProfile'
import Profile from './views/Profile'

const CostumeRouter = ({isLogin, checkUserLogin}) => {


  useEffect(() => {
    checkUserLogin()
  }, [])

  let routes = [
    {
      path: '/editProfile',
      element: <EditProfile />
    },
    {
      path: '/profile/:username',
      element: <Profile />
    },
    {
      path: '*',
      element: <HelloWorldPage />
    },
  ]

  return (
    
      isLogin ? 
    
    <BrowserRouter>
    {
    
      <Routes>
        {
          routes.map((item) => <Route path={item.path} element={<Layout>{item.element}</Layout>} />)
        }
      </Routes>
    }
    </BrowserRouter>
    :
    <LoginPage />
  )
}
const mapStateToProps = state => ({
  isLogin: state.userState.isLogin
})
const mapDispatchToProps ={
  checkUserLogin: userActions.checkUserLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(CostumeRouter)
