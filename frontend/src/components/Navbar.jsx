import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full h-20 bg-slate-800 flex justify-center items-center">
      {/* <div clas></div> */}
      <div className="h-full w-4/12 bg-red-500">
            <h2>logo</h2>
      </div>
      <div className="w-full flex justify-center">
      <Link className="pointer underline pl-1 cursor-pointer" to={"/send"}>
          send
      </Link>
      </div>
    </div>
  )
}

export default Navbar
