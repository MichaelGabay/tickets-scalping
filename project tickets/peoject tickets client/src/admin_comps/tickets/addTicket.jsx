import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';

export default function AddTicket() {
    const nav = useNavigate();
    const [loading,setLoading] = useState(false);
    const [categories,setCategories] = useState([]);
    let { register, handleSubmit, formState: { errors } } = useForm();
  
  
    useEffect(() => {
      doApiGetCategory()
    },[])
  
    const doApiGetCategory = async() => {
      let url = API_URL + "/categories";
      let resp = await doApiGet(url);
      setCategories(resp.data);
    }
  
    const onSub = (_dataBody) => {
      console.log(_dataBody);
      doApiAdd(_dataBody);
    }
  
    const doApiAdd = async(_dataBody) => {
      setLoading(true);
      let url = API_URL+"/tickets";
      try{
        let resp = await doApiMethod(url,"POST",_dataBody);
        if(resp.data._id){
          toast.success("New ticket added for admin");
          nav("/admin/tickets");
        }
      }
      catch(err){
        console.log(err.response);
        toast.error("There error try again later")
      }
      setLoading(false);
      
    }
  
  
    return (
      <div className='container d-flex flex-column align-items-center'>
        <AdminAuthComp />
        <h1>Add new Ticket</h1>
        { categories.length > 0 ?
        <form onSubmit={handleSubmit(onSub)} className='col-md-6 p-3 shadow'>
  
                  <label>Ticket name:</label>
                  <input {...register('name', { required: true, minLength:2 })} type="text" className='form-control' />
                  {errors.name && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}
                  <label>Ticket info:</label>
                  <textarea {...register('info', { required: false, minLength:0 })} type="text" className='form-control' ></textarea>
                  {errors.info && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}
                  
                  <label>img Url:</label>
                  <input {...register('img_url', { required: false, minLength:2 })} type="text" className='form-control' />
                  {errors.img_url && <small className='text-danger d-block'>Enter valid url</small>}
  
                  <label>location:</label>
                  <input {...register('location', { required: true, minLength:2 })} type="text" className='form-control' />
                  {errors.location && <small className='text-danger d-block'>Enter valid location</small>}
  
                  <label>time:</label>
                  <input {...register('time', { required: true, minLength:2 })} type="time" defaultValue={"19:00"} className='form-control' />
                  {errors.time && <small className='text-danger d-block'>Enter valid time</small>}
  
                  <label>date from:</label>
                  <input {...register('date_from', { required: true, minLength:2 })} type="date" className='form-control' />
                  {errors.date_from && <small className='text-danger d-block'>Enter valid date_from</small>}
  
                  <label>date to:</label>
                  <input {...register('date_to', { required: false, minLength:2 })} type="date" className='form-control' />
                  {errors.date_to && <small className='text-danger d-block'>Enter valid date_to</small>}
  
                  <label>price:</label>
                  <input {...register('price', { required: true, min:1 })} type="number" className='form-control' />
                  {errors.price && <small className='text-danger d-block'>Enter valid price</small>}
  
                  <label>link:</label>
                  <input {...register('link', { required: false, minLength:2 })} type="text" className='form-control' />
                  {errors.link && <small className='text-danger d-block'>Enter valid link</small>}
  
                  <label>categories:</label>
                  <select {...register('category_short_id', { required: false, minLength:2 })} className='form-select'>
                    {categories.map(item => {
                      return(
                      <option key={item.short_id} value={item.short_id}>
                        {item.name}
                      </option>
                      )
                    })}
                  </select>
              
  {/* !loading - for prevent from user click twice or more on the btn adn add multi categories  */}
                  {!loading && <button className='btn btn-info mt-3'>Add new Ticket</button>}
              </form> : 
              <h2>Loading...</h2>
              }
  
      </div>
    )
  }