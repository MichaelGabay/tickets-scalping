import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { API_URL, doApiGet } from '../../services/apiService'
import FavBtn from './favButton';
import TicketsSameList from './ticketsSameList'

export default function TicketInfo() {
    const [ticket, setTicket] = useState({});
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const params = useParams();
    //check if url changed
    const location = useLocation()
    const nav = useNavigate();
  
    useEffect(() => {
      doApi();
    }, [location])
  
    const doApi = async () => {
      setLoading(true);
      let url = API_URL + "/tickets/infoTicket/" + params.id;
      let resp = await doApiGet(url);
      console.log(resp.data);
      setTicket(resp.data.ticket);
      setPhone(resp.data.phone);
      setLoading(false);
    }
  
    return (
      <div className='container py-5 '>
        {loading ? <h3>Loading...</h3> :
          <React.Fragment>
  
            <h1 className='text-center display-3' style={{ fontFamily: `'Bebas Neue', cursive` }}>{ticket.name}</h1>
            <div className='d-flex flex-column flex-lg-row flex-wrap p-2 py-5'>
              <div className='col-lg-6 d-flex '>
                <img className='img_info' src={ticket.img_url || "https://images.pexels.com/photos/1860618/pexels-photo-1860618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}  alt={ticket.name} />
              </div>
              <div className=' py-3 py-lg-0 col-lg-6 '>
                <h6>{ticket.info}</h6>
                <h4>Location: {ticket.location}</h4>
                {ticket.date_to ?
                <h5>Date: from {ticket.date_from} to {ticket.date_to}</h5>
                : <h5>Date - {ticket.date_from}</h5>}
                <h5>Time: {ticket.time}</h5>
                <h5>Price: {ticket.price}$</h5>
                <div className='d-flex  '>
                <a href={`whatsapp://send?abid=${phone}`} className="btn btn-success">Contact Whatsapp</a>
                <a href={`tel:${phone}`} className="btn btn-dark ms-2">Contact Phone</a>
                <button onClick={() => {
                  nav(-1)
                }} className='btn btn-warning ms-2'>Back</button>
                                <FavBtn  ticket={ticket}/>

                </div>
              </div>

            </div>
            {ticket.category_short_id &&
            <TicketsSameList currentTicketId={ticket._id} cat_short_id={ticket.category_short_id} />
            }
          </React.Fragment>}
         
      </div>
  
    )
  }