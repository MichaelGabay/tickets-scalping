import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';

export default function EditUser() {
    const [user,setUser] = useState({})
    let validEmail =/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const params = useParams();
    const nav = useNavigate()

    let { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(()=>{
        doApi();
    },[])

    
    const onSub = (_bodyData) => {
        console.log(_bodyData)
        doApiEdit(_bodyData);
    }

    const doApi = async() =>{
        let url = API_URL +'/users/userInfo/'+params.id
        let resp = await doApiGet(url)
        console.log(resp.data)
        setUser(resp.data)

    }

    const doApiEdit = async(_dataBody) => {
        let url = API_URL+"/users/updateUser/"+user._id;
        try{
          let resp = await doApiMethod(url,"PUT",_dataBody);
          // console.log(resp.data)
          if(resp.data.modifiedCount === 1){
            alert("user updated");
            nav("/admin/usersList");
          }
        }
        catch(err){
          if(err.response.data.code === 11000){
            return alert("Email already in system")
          }
          console.log(err.response);
          alert("There error try again later")
        }
        
      }
        return (
        <div className='d-flex flex-column align-items-center container'>
            <AdminAuthComp/>
            <h1 className='display-6 py-3'>Edit User</h1>
            {user.name?
            <form onSubmit={handleSubmit(onSub)} className='col-md-4 p-3 shadow'>

                <label>name:</label>
                <input defaultValue={user.name}  {...register('name', { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.name && <small className='text-danger d-block'>Enter valid name</small>}

                <label>email:</label>
                <input defaultValue={user.email} {...register('email', { required: true, pattern:validEmail })} type="text" className='form-control' />
                {errors.email && <small className='text-danger d-block'>Enter valid email</small>}

                <label>phone:</label>
                <input defaultValue={user.phone} {...register('phone', { required: true, minLength: 2 })} type="text" className='form-control' />
                {errors.phone && <small className='text-danger d-block'>Enter valid phone</small>}

                <label>role:</label>
                <select defaultValue={user.role} className='form-select text-center' {...register('role')}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="ban">ban</option>
                </select>
                <button className='btn btn-warning mt-3'>Edit</button>
                <Link to={'/admin/usersList'} className='btn btn-dark ms-2 mt-3'>Back</Link>
            </form>
            : <h2>Loading...</h2>}
        </div>
    )
}
