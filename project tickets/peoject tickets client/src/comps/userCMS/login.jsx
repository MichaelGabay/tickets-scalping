import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod, TOKEN_NAME } from '../../services/apiService';
import { useForm } from 'react-hook-form';
import { ClientContext } from '../../context/clientContext';


export default function Login() {
    let { register, handleSubmit, formState: { errors } } = useForm();
    const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    const nav = useNavigate()
    const {setUser,doApiUserInfo} = useContext(ClientContext)


    const onSub = (_dataBody) => {
        delete _dataBody.password2
        console.log(_dataBody)
        doApi(_dataBody)

    }
    const doApi = async (_dataBody) => {
        try {
            let url = API_URL + '/users/login'
            let { data } = await doApiMethod(url, 'POST', _dataBody)
            console.log(data)
            if (data.token) {
                toast.success(`Welcome ${data.user.name} ,You logged in`)
                //save token
                localStorage.setItem(TOKEN_NAME, data.token)
                // TODO: update global store via context
                setUser(data.user)
                doApiUserInfo()
                nav('/')
            }

        } catch (err) {
            console.log(err.response)
            toast.error('User or password worng try again')
        }
    }


    return (
        <div className='container py-5 d-flex flex-column align-items-center'>
            <h1 className='display-3 '>Login</h1>
            <form onSubmit={handleSubmit(onSub)} className='col-md-6 col-12 p-3 shadow'>

                <label>Email:</label>
                <input  {...register('email', { required: true, pattern: regEmail })} type="text" className='form-control' />
                {errors.email && <small className='text-danger d-block'>Enter valid email</small>}

                <label>password:</label>
                <input  {...register('password', { required: true, minLength: 0 })} type="text" className='form-control' />
                {errors.password && <small className='text-danger d-block'>Enter valid password </small>}


                <button className='btn btn-dark  mt-3'>Login</button>
            </form>
        </div>
    )
}
