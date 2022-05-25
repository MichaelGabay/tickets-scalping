import React, { useEffect, useState } from 'react';
import './App.css';
import AppRoutes from './appRoutes';
import { ClientContext } from './context/clientContext';
import { API_URL, doApiGet, TOKEN_NAME } from './services/apiService';




function App() {
// include info about the user
  const [user,setUser] = useState({name:'',role:''})
  const [favs_ar,setFavsAr] = useState([])
  
  // TODO: check local onload and collect data
  useEffect(()=>{
    if(localStorage[TOKEN_NAME]){
      doApiUserInfo()
    }
  },[])

  const doApiUserInfo = async()=>{
    let url = API_URL+'/users/userInfo'
    let {data} =await doApiGet(url)
    setUser({name:data.name,role:data.role})
    setFavsAr(data.favs_ar)
  }

  return (
    <ClientContext.Provider value={{
      user,setUser,doApiUserInfo,favs_ar,setFavsAr
    }}>
     <AppRoutes />
    </ClientContext.Provider>
  );
}

export default App;
