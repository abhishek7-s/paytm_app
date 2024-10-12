import React ,{useState ,useEffect} from 'react'
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios'

function Appbar() {

  let token = localStorage.getItem("token")
  const [name, setname] = useState("")

  console.log(token)

  axios.get('http://localhost:3000/api/v1/user/info', {
    params: { token } 
  })
  .then(response => {
    let info = response.data
    console.log( response.data );
    setname(info.firstName)
    localStorage.setItem("userId", info.userId)
  })
  .catch(error => {
    console.log(error);
  });
 

  
 
  return (
    <div className="bg-slate-200 flex w-full h-12 justify-center">
        <div className="  w-2/5 flex justify-start items-center"> 
            <h1 className="pl-4 font-bold text-2xl">PayTm</h1>
        </div>
        <div className="px-5  w-3/5 flex justify-end items-center"> 
            <h1 className="mx-4 font-semibold text-xl">{name || "users"}</h1>
            <FaUserCircle className="text-3xl " />
        </div>
    </div>
  )
}

export default Appbar
