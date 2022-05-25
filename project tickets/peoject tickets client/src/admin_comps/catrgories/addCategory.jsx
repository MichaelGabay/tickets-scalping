import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';

export default function AddCategory() {
    let { register, handleSubmit, formState: { errors } } = useForm();

    const [loading,setLoading] =useState(false)
    const nav = useNavigate()
    const onSub = (_bodyData) => {
        console.log(_bodyData)
        doApiAdd(_bodyData);
    }

    const doApiAdd = async(_bodyData) =>{
        setLoading(true)
        let url = API_URL +'/categories'
        try{
            let resp = await doApiMethod(url,'POST',_bodyData);
            if(resp.data._id){
                alert('New category added')
                nav('/admin/categories')
            }
        }catch(err){
            console.log(err.response);
            alert('There error try again later')
        }
        setLoading(false)
    }

    return (
        <div className='d-flex flex-column align-items-center container'>
            <AdminAuthComp/>
            <h1 className='display-6 py-3'>Add new category</h1>
            <form onSubmit={handleSubmit(onSub)} className='col-md-4 p-3 shadow'>

                <label>name:</label>
                <input {...register('name', { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.name && <small className='text-danger d-block'>Enter valid name</small>}

                <label>url_name:</label>
                <input {...register('url_name', { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.url_name && <small className='text-danger d-block'>Enter valid url_name</small>}
                
                <label>img_url:</label>
                <input {...register('img_url', { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.img_url && <small className='text-danger d-block'>Enter valid img_url</small>}


                {!loading &&<button className='btn btn-info mt-3'>Add</button>}
                <Link to={'/admin/categories'} className='btn btn-dark ms-2 mt-3'>Back</Link>

            </form>
        </div>
    )
}
