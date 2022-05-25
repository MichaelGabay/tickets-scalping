import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL, doApiGet } from '../../services/apiService'
import ItemTicket from '../itemTicket'

export default function TicketsCategories() {
    const [ar,setAr] = useState([])
    const params = useParams()
    const [loading,setLoading] =useState(false)
    useEffect(()=>{
        doApi()
    },[])

    const doApi = async() =>{
        setLoading(true)
        let url1 = API_URL+'/categories/infoCat/'+params.cat_url
        let resp1 = await doApiGet(url1);
        let short_id = resp1.data.short_id;
        // console.log(short_id)
        let url2 = API_URL + '/tickets?cat='+short_id;
        let {data} = await doApiGet(url2);
        // console.log(data)
        setAr(data)
        setLoading(false)
    } 

  return (
    <div className='container py-5'>
        <h1 style={{fontFamily:`'Bebas Neue', cursive`}} className='display-2 text-center'>{params.cat_url} tickets</h1>

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
