import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService'
import ItemTicket from '../itemTicket'

export default function LastTicketsAddedHome() {
  const [ar,setAr] = useState([])

  useEffect(()=>{
      doApi()
  },[])
  const doApi = async ()=>{
      let url = API_URL+'/tickets?perPage=4';
      let {data} = await doApiGet(url)
      console.log(data)
      setAr(data)
  }

  return (
    <div className='container-fluid categoriesHome py-5 ticketsHome'>
      <div className="container">
        <h1 style={{fontFamily:`'Bebas Neue', cursive`}}>New ticket in the site:</h1>
        <div className="row">
        {ar.map(item=>{
          return(
            <ItemTicket key={item._id} item={item}/>
          )
        })}
        </div>
      </div>
    </div>
  )
}
