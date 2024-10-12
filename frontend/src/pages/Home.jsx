import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarn from '../components/BottomWarn'
import Navbar from '../components/Navbar'
import Appbar from '../components/Appbar'
import BalanceBar from '../components/BalanceBar'
import UsersComp from '../components/UsersComp'
// import jwt_decode from 'jwt-decode';
// import { Signup } from '../components/Signup'


function Home() {
  return (
    <div>
      {/* <Navbar/> */}
      <Appbar/>
      <BalanceBar value={9101}/> 
      <UsersComp/>
    </div>
  )
}

export default Home
