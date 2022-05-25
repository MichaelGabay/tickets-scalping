import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import ClientAuthComp from './clientAuthComp';


export default function EditTicketUser() {
  const nav = useNavigate();
  const params = useParams();
  const [loading,setLoading] = useState(false);
  const [categories,setCategories] = useState([]);
  const [ticket,setTicket] = useState([]);
  let { register, handleSubmit, formState: { errors } } = useForm();


  useEffect(() => {
    doApiGetCategory();

  },[])

  const doApiGetCategory = async() => {
    let url = API_URL + "/categories";
    let resp = await doApiGet(url);
    setCategories(resp.data);
    console.log(resp.data)
    doApiGetTicket()
  }

  const doApiGetTicket = async() => {
    let url = API_URL + "/tickets/infoTicket/"+params.id;
    let resp = await doApiGet(url);
    setTicket(resp.data.ticket);
    
  }

  const onSub = (_dataBody) => {
    console.log(_dataBody);
    doApiUpdate(_dataBody);
  }

  const doApiUpdate = async(_dataBody) => {
    setLoading(true);
    let url = API_URL+"/tickets/"+params.id;
    try{
      let resp = await doApiMethod(url,"PUT",_dataBody);
      if(resp.data.modifiedCount === 1){
        toast.success('Ticket updated')
        nav("/user/tickets");
      }
    }
    catch(err){
      console.log(err.response);
      toast.error("There error try again later")
    }
    setLoading(false);
    
  }


  return (
    <div className='container d-flex flex-column align-items-center py-5'>
        <ClientAuthComp/>
      <h1 className='display-3'>Update ticket</h1>
      { ticket.name ?
      <form onSubmit={handleSubmit(onSub)} className='col-12 col-lg-6 p-3 shadow'>

                <label>Ticket name:</label>
                <input defaultValue={ticket.name} {...register('name', { required: true, minLength:2 })} type="text" className='form-control' />
                {errors.name && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}
                <label>Ticket info:</label>
                <textarea defaultValue={ticket.info} {...register('info', { required: false, minLength:0 })} type="text" className='form-control' ></textarea>
                {errors.info && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}
                <label>img Url:</label>
                <input defaultValue={ticket.img_url} {...register('img_url', { required: false, minLength:2 })} type="text" className='form-control' />
                {errors.img_url && <small className='text-danger d-block'>Enter valid url</small>}
                {ticket.img_url.length >5 && <img src={ticket.img_url} className='d-block mb-2' alt={ticket.name} height='100px' />
}
                <label>location:</label>
                <input defaultValue={ticket.location} {...register('location', { required: true, minLength:2 })} type="text" className='form-control' />
                {errors.location && <small className='text-danger d-block'>Enter valid location</small>}

                <label>time:</label>
                <input defaultValue={ticket.time} {...register('time', { required: true, minLength:2 })} type="time"  className='form-control' />
                {errors.time && <small className='text-danger d-block'>Enter valid time</small>}

                <label>date from:</label>
                <input defaultValue={ticket.date_from} {...register('date_from', { required: true, minLength:2 })} type="date" className='form-control' />
                {errors.date_from && <small className='text-danger d-block'>Enter valid date_from</small>}

                <label>date to:</label>
                <input defaultValue={ticket.date_to} {...register('date_to', { required: false, minLength:2 })} type="date" className='form-control' />
                {errors.date_to && <small className='text-danger d-block'>Enter valid date_to</small>}

                <label>price:</label>
                <input defaultValue={ticket.price} {...register('price', { required: true, min:1 })} type="number" className='form-control' />
                {errors.price && <small className='text-danger d-block'>Enter valid price</small>}

                <label>link:</label>
                <input defaultValue={ticket.link} {...register('link', { required: false, minLength:2 })} type="text" className='form-control' />
                {errors.link && <small className='text-danger d-block'>Enter valid link</small>}

                <label>categories:</label>
                <select defaultValue={ticket.category_short_id} {...register('category_short_id', { required: false, minLength:2 })} className='form-select'>
                  {categories.map(item => {
                    return(
                    <option key={item.short_id} value={item.short_id}>
                      {item.name}
                    </option>
                    )
                  })}
                </select>
            
{/* !loading - for prevent from user click twice or more on the btn adn add multi categories  */}
                {!loading && <button className='btn btn-success mt-3'>update Ticket</button>}
                <button type='button' className='btn btn-dark mx-2 mt-3' onClick={()=>{
                  window.confirm('Are you sure?')&& nav(-1)
                }}>Back</button>
            </form> : 
            <h2>Loadinsg...</h2>
            }

    </div>
  )
}
