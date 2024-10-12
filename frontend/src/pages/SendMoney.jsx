import React , {useState} from 'react'
import { PiUserCircleDashedFill } from "react-icons/pi";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function SendMoney() {
    const navigate = useNavigate()
  
  const [searchParams] = useSearchParams();
  const to = searchParams.get("id")
  const from = localStorage.getItem("userId")
  const name = searchParams.get("name")
  const [amount, setamount] = useState(0)

  console.log(amount)


  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    console.log(e.target.value);
  };


  let data = JSON.stringify({
    "from": from,
    "to": to,
    "amount": amount
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/v1/account/transfer',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };


  console.log(data)
  

  const send =()=>{
    axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data.message));
        })
        .catch((error) => {
        console.log(error);
    });
    navigate("/");
  }


  return (
    <div className="bg-slate-100 h-screen w-full flex justify-center items-center">
        <div className="bg-white h-2/4 w-1/3 flex items-center justify-center rounded-xl flex-col shadow-2xl shadow-green-950 drop-shadow-2xl">
            <div>
                <h1 className="text-3xl font-bold m-2 my-4">Send Money</h1>
            </div>
            <div className="flex  w-full h-1/2 justify-center items-center flex-col">
                <div className="flex justify-start items-center w-3/4">
                    <PiUserCircleDashedFill className="text-5xl text-green-700 "/>
                    <h1 className="text-xl font-bold ml-2">{name || "Abhishek Sharma"}</h1>
                </div>
                <div className="flex flex-col justify-center items-center px-5 w-full my-2">
                    <h2 className="font-normal w-3/4">Amount in Rs</h2>
                    <input placeholder="Enter Amount" className="border-gray w-3/4 border rounded p-2 my-1" onChange={handleInputChange(setamount)}/>
                    
                </div>
            </div>
            <button type="button" onClick={send} className="m-2 p-2 w-3/4 rounded-md bg-green-600 text-white font-semibold text-lm">Initiate Transfer</button>
        </div>
    </div>
    
  )
}

export default SendMoney
