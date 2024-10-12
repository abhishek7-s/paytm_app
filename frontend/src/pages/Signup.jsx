import {useState} from 'react'
import  BottomWarn  from "../components/BottomWarn"
import  Button  from "../components/Button"
import  Heading  from "../components/Heading"
import  InputBox  from "../components/InputBox"
import  SubHeading  from "../components/SubHeading"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signup() {


  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    console.log(e.target.value);
  };



  let data = JSON.stringify({
    "username": email,
    "firstName": firstName,
    "lastName": lastName,
    "password": password
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/v1/user/signup',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-full text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={handleInputChange(setfirstName)} placeholder="John" label={"First Name"} />
        <InputBox onChange={handleInputChange(setlastName)} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={handleInputChange(setemail)} placeholder="abhishek@gmail.com" label={"Email"} />
        <InputBox onChange={handleInputChange(setpassword)} placeholder="123456" label={"Password"} />

        <div className="pt-4">
          <Button onClick={
            async () => {
              axios.request(config)
                .then((response) => {
                  console.log(JSON.stringify(response.data));
                  localStorage.setItem("token", response.data.token)
                })
                .catch((error) => {
                  console.log(error);
                });
            navigate("/")
          }} label={"Sign up"} />
        </div>
        <BottomWarn label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
  )
}

export default Signup
