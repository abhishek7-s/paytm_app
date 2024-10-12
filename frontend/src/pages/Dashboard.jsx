import React from 'react'

function Dashboard() {
  return (
    <div>
      <h1 className="text-red-900 font-bold">Dashboard</h1>
      <Appbar/>
      <BalanceBar value={9101}/> 
      <UsersComp/>
    </div>
  )
}

export default Dashboard
