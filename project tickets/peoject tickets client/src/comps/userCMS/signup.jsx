import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../services/apiService';

export default function SignUp() {
    let { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    const nav = useNavigate()
    const onSub = (_dataBody) => {
        delete _dataBody.password2
        console.log(_dataBody)
        doApi(_dataBody)
        
    }
    const doApi = async (_dataBody) => {
        try{
            let url = API_URL+'/users'
            let {data} = await doApiMethod(url,'POST',_dataBody)
            if(data._id)
            toast.success('You sign up succefuly , now login')
            nav('/login')
            
        }catch(err){
            console.log(err.response)
            if(err.response.data.code === 11000)
            toast.error('Email is already in system or enter another email')
            else
            toast.error('There is problem come back later')
            

        }
    }

    return (
        <div className='container py-5 d-flex flex-column align-items-center'>
            <h1 className='display-3 '>Sign Up as new user</h1>
            <form onSubmit={handleSubmit(onSub)} className='col-md-6 p-3 shadow'>

                <label>name:</label>
                <input  {...register('name', { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.name && <small className='text-danger d-block'>Enter valid name </small>}

                <label>Email:</label>
                <input  {...register('email', { required: true, pattern: regEmail })} type="text" className='form-control' />
                {errors.email && <small className='text-danger d-block'>Enter valid email</small>}

                <label>password:</label>
                <input  {...register('password', { required: true, minLength: 0 })} type="text" className='form-control' />
                {errors.password && <small className='text-danger d-block'>Enter valid password </small>}

                <label>Enter password again:</label>
                <input  {...register('password2', { required: true, validate: (value) => { return value === getValues('password') } })} type="text" className='form-control' />
                {errors.password2 && <small className='text-danger d-block'>password not match </small>}

                <label>phone:</label>
                <input  {...register('phone', { required: true, minLength: 0 })} type="text" className='form-control' />
                {errors.phone && <small className='text-danger d-block'>Enter valid phone </small>}

                <button className='btn btn-dark  mt-3'>Sign Up</button>
            </form>
        </div>
    )
}
