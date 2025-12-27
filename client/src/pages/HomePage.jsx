import React from 'react'
import { useUser } from '../context/AuthContext'

const HomePage = () => {

    const { user } = useUser();
    console.log(user);
    
  return (
    <div>HomePage</div>
  )
}

export default HomePage