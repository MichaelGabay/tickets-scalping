import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClientContext } from '../../context/clientContext'
import { TOKEN_NAME } from '../../services/apiService';

export default function Logout() {
    const {setUser,setFavsAr} = useContext(ClientContext);
    const nav =useNavigate()
    useEffect(()=>{
        setUser({name:'',role:''})
        localStorage.removeItem(TOKEN_NAME)
        setFavsAr([])
        nav('/')
        toast.info('You logged out, see you soon')
    },[])
  return (
    <></>
    )
}
