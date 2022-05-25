import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../services/apiService';

export default function ClientAuthComp() {
    const nav = useNavigate();

    useEffect(() => {
      doApi();
    },[])
  
    const doApi = async() => {
      try{
        let url = API_URL+"/users/checkToken"
        let resp = await doApiGet(url);
        if(!resp.data.role){
          logOutAdmin("You must be login to be here");
        }
      }
      catch(err){
        logOutAdmin("Please login to be here or token expired");
      }
    }
  
    const logOutAdmin = (_msg) => {
      toast.error(_msg);
      nav("/login")
    }
  
    return (
      <React.Fragment></React.Fragment>
    )
  }