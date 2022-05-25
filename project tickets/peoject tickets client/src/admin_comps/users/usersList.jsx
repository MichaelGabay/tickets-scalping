import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp'

export default function UsersList() {
    //show list in table of users
    const [ar, setAr] = useState([]);
    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        let url = API_URL + '/users/listUsers'
        let resp = await doApiGet(url);
        console.log(resp.data)
        setAr(resp.data)
    }
    return (
        <div className='container'>
            {/* check if user is admin! */}
            <AdminAuthComp />

            <table className='table table-striped table-active text-center my-3 table-hover'>
                <thead >
                    <th className='border'>#</th>
                    <th className='border'>name</th>
                    <th className='border'>email</th>
                    <th className='border'>phone</th>
                    <th className='border'>role</th>
                    <th className='border'>del/edit</th>
                </thead>
                <tbody>
                    {ar.map((item, i) => {
                        return (
                            <tr key={item._id}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td className='text-start'>{item.email}</td>
                                <td className='text-start'>{item.phone}</td>
                                <td>{item.role}</td>
                                <td>
                                    <Link to={'/admin/editUser/' + item._id} className='btn badge bg-info px-3 py-2'>Edit</Link>

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}
