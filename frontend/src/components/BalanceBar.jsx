import React, {useState} from 'react'
import { MdAccountBalanceWallet } from "react-icons/md";
import axios from 'axios'



function BalanceBar() {
  const [balance, setbalance] = useState("")

  let userId = localStorage.getItem("userId")


  const fetchBalance =() =>{
    axios.get('http://localhost:3000/api/v1/account/balance', {
      params: { userId } 
    })
    .then(response => {
      console.log(  );
      setbalance(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }
  fetchBalance()

  return (
    <div className="500 h-10 w-full flex justify-start items-center px-2">
        <MdAccountBalanceWallet className="text-2xl"/>
        <h1 className="mx-2 font-bold">Your Balance </h1>
        <h1 className="mr-1 font-semibold">Rs</h1>
        <h1 className="font-semibold">{balance}</h1>
        <button type="button" onClick={fetchBalance} >refresh</button>
    </div>
  )
}

export default BalanceBar
