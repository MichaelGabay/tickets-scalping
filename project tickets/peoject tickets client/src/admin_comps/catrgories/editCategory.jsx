import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';

export default function EditCategory() {
    let { register, handleSubmit, formState: { errors } } = useForm();
    const [cat,setCat] = useState({})
    const nav = useNavigate()

    const params = useParams();
    useEffect(()=>{
        doApi();
    },[])

    
    const onSub = (_bodyData) => {
        console.log(_bodyData)
        doApiEdit(_bodyData);
    }

    const doApi = async() =>{
        let url = API_URL +'/categories/infoCat/'+params.urlEdit
        let resp = await doApiGet(url)
        console.log(resp.data)
        setCat(resp.data)
    }

    const doApiEdit = async(_dataBody) => {
        let url = API_URL+"/categories/"+cat._id;
        console.log(url)
        try{
          let resp = await doApiMethod(url,"PUT",_dataBody);
          console.log(resp.data)
          if(resp.data.modifiedCount === 1){
            toast.success('Category updating')

            nav("/admin/categories");
          }
        }
        catch(err){
          console.log(err.response);
          toast.error("There error try again later")
        }
        
      }
    return (
        <div className='d-flex flex-column align-items-center container'>
            <AdminAuthComp/>
            <h1 className='display-6 py-3'>Edit category</h1>
            {cat.name ?
            <form onSubmit={handleSubmit(onSub)} className='col-md-4 p-3 shadow'>

                <label>name:</label>
                <input defaultValue={cat.name} {...register('name', { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.name && <small className='text-danger d-block'>Enter valid name</small>}

                <label>url_name:</label>
                <input defaultValue={cat.url_name} {...register('url_name', { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.url_name && <small className='text-danger d-block'>Enter valid url_name</small>}

                <label>img_url:</label>
                <input defaultValue={cat.img_url} {...register('img_url', { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.img_url && <small className='text-danger d-block'>Enter valid img_url</small>}
                {cat.img_url && <img className='d-block mt-3' src={cat.img_url} alt={cat.name} height='100'/>}
                <button className='btn btn-warning mt-3 '>Edit</button>
                <Link to={'/admin/categories'} className='btn btn-dark ms-2 mt-3'>Back</Link>
            </form>
            : <h2>Loading...</h2>}
        </div>
    )
}
