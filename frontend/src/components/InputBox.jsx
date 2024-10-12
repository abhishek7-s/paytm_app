import React from 'react'

function InputBox({label, placeholder, onChange}) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <div>
        <input onChange={onChange} placeholder={placeholder} className="border-black border rounded p-2 m-1"/>
      </div>
    </div>
  )
}

export default InputBox
