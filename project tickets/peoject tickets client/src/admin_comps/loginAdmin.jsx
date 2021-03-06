import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod, TOKEN_NAME } from '../services/apiService';

export default function LoginAdmin() {

    //window.location() in react --> (nav(/))
    const nav = useNavigate();
    let emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    let { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSub = (_bodyData) => {
        console.log(_bodyData)
        doApiLogin(_bodyData)
    }

    const doApiLogin = async (_bodyData) => {
        try{
            let url = API_URL + '/users/login'
            let {data} = await doApiMethod(url,'POST',_bodyData)
            // console.log(data)
            //check if get token and save in localStorage and Take to ListOfUsers
            if(data.token){
                localStorage.setItem(TOKEN_NAME,data.token)
                nav("/admin/usersList");
            }
        }catch(err){
            console.log(err.response);
            toast.error("Password Or Email Worng!!")
        }
    }
    
    return (
        <div className='container d-flex flex-column align-items-center'>
            <h1>Admin login</h1>
            <form onSubmit={handleSubmit(onSub)} className='col-md-6 p-3 shadow '>

                <label>Email:</label>
                <input {...register('email', { required: true, pattern: emailValid })} type="email" className='form-control' />
                {errors.email && <small className='text-danger d-block'>Enter valid email</small>}

                <label>Password:</label>
                <input {...register('password', { required: true, minLength: 2 })} type="password" className='form-control' />
                {errors.password && <small className='text-danger d-block'>Enter valid password</small>}

                <button className='btn btn-info mt-3'>Log in</button>
            </form>
        </div>
    )
}