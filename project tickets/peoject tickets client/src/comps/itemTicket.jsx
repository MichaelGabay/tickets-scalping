import React from 'react'
import { useNavigate } from 'react-router-dom';
import FavBtn from './tickets/favButton';

export default function ItemTicket(props) {
    const item = props.item;
    const nav = useNavigate()
  return (
    <div className='col-xl-3 col-md-6 p-4 ticket-box'>
        <div   className="border shadow h-100 text-center bg-white">
            <div onClick={()=>{nav('/tikcetInfo/'+item._id)}} className='bg-div' style={{backgroundImage:`url(${item.img_url})`,cursor:'pointer'}}></div>
            <div style={{position:'relative'}} className='px-5 py-2'>
            <h3 className='h4'>{item.name}</h3>
            <h4 className='h5'>Location: {item.location}</h4>
            <h4 className='h6'>Date: {item.date_from}</h4>
            <h4 className='h6'>Price: {item.price}$</h4>
            <div className='btnFav'> <FavBtn  ticket={item}/>  </div>
           
            </div>

        </div>
    </div>
  )
}
