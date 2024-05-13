import React from 'react'
import {Avatar} from "@nextui-org/react";

const Clients = ({username}) => {
  return (
    <div className='font-bold text-2xl'>
         <Avatar name={username} className='font-bold text-lg p-6'/>
    </div>
  )
}

export default Clients