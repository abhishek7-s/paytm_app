/* eslint-disable react/jsx-key */
import React , {useState, useEffect}from 'react'
import { PiUserCircleDashedFill } from "react-icons/pi";
import  Button  from "../components/Button"
import { useNavigate } from "react-router-dom";
import axios from 'axios'


function UsersComp() {
    const [users, setUsers] = useState([{
            firstName:"Abhishek",
            lastName:"Sharma",
            _id:1
        },
        {
            firstName:"Avenue",
            lastName:"S",
            _id:2
        }
    ])
    

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user/bulk')
        .then(response => {
          console.log( response.data );
          setUsers(response.data.user)
        })
        .catch(error => {
          console.log(error);
        });
    }, [])
    




   

  return (
    <div className="bg-slate-200 min-h-[80vh] h-full w-full">
        <div className="text-xl font-medium p-2">
            Users
        </div>
        <div className="h-full">
              {users.map(user => <Users user={user}/>)}
        </div>

    </div>
  )
}


function Users({user}){

    const navigate = useNavigate()


    return <div className="flex items-center justify-between w-full h-12 px-5 my-2 ">
        <div className="flex items-center">
            <PiUserCircleDashedFill className="text-3xl"/>
            <div className="font-medium mx-2 text-lg flex">
                <h1 className="mx-1">{user.firstName}</h1>
                <h1>{user.lastName}</h1>
            </div>    
        </div>
        <div className="flex justify-center items-center h-full">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>  
}

export default UsersComp
