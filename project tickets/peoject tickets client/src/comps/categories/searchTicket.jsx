import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { API_URL, doApiGet } from '../../services/apiService'
import ItemTicket from '../itemTicket'

export default function SearchTicket() {
    const [ar,setAr] = useState([])
    const [query] = useSearchParams()
    const [loading,setLoading] =useState(false)
    useEffect(()=>{
        doApi()
    },[query])

    const doApi = async() =>{
        setLoading(true)
        let url = API_URL+`/tickets/search?s=${query.get('s')}`;
        let {data} = await doApiGet(url);
        console.log(data)
        setAr(data)
        setLoading(false)
    } 


  return (
    <div className='container py-5'>
        <h1 style={{fontFamily:`'Bebas Neue', cursive`}} className='display-2 text-center'>search by {query.get('s')} </h1>

        {loading && <h2>Loading...</h2>}
        <div className="row justify-content-center">
            {ar.map(item=>{
                return(
                    <ItemTicket key={item._id} item={item}/>
                    )
            })}
        </div>
    </div>
  )
}
