import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doApiGet } from '../services/apiService'

export default function PageNav(props) {
    const [pages,setPages] = useState(0)

    useEffect(()=>{
        doApi()
    })

    const doApi = async () =>{
        let resp = await doApiGet(props.urlCount)
        console.log(resp.data)
        setPages(Math.ceil(resp.data.count/props.perPage))
    }
  return (
    <div className='my-2'>
        Pages: 
        {[...Array(pages)].map((item,i)=>{
            return(
                <Link key={i} to={props.toLink + (i+1)} className={props.css}>{i+1}</Link>
            )
        })}
    </div>
  )
}
