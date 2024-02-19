import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

//token based navigate
function Frstpage() {
    const history =useHistory();
    const token =sessionStorage.getItem('token')
    useEffect(()=>{
     if(token){
      history.push('/dashboard')
     }else{
      history.push('/login');
     }
    },[])
  return (
    <></>
  )
}

export default Frstpage