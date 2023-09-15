import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import Layout from './layout'
import HelloWorldPage from './views/HelloWorld'
import LoginPage from './views/Login'

const CostumeRouter = ({isLogin}) => {

  let routes = [
    {
      path: '*',
      element: <HelloWorldPage />
    }
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

}

export default connect(mapStateToProps, mapDispatchToProps)(CostumeRouter)
