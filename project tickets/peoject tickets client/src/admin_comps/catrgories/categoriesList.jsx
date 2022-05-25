/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp'

export default function CategoriesList() {
    const [ar, setAr] = useState([]);
    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        let url = API_URL + '/categories'
        let resp = await doApiGet(url);
        console.log(resp.data)
        setAr(resp.data)
    }

    const onDelClick = async (_idDel) => {
        let _url = API_URL + '/categories/' + _idDel;

        try {
            let resp = await doApiMethod(_url, 'DELETE');
            if (resp.data.deletedCount === 1)
                doApi();

        } catch (err) {
            console.log(err)
            alert('Try again so')
        }
    }
    return (
        <div className='container'>
            {/* check if user is admin! */}
            <AdminAuthComp />
            <Link to={'/admin/add_category'} className='btn btn-info mt-4 mb-1' >Add Category</Link>
            <table className='table table-striped text-center my-3 table-hover'>
                <thead >
                    <th className='border'>#</th>
                    <th className='border'>name</th>
                    <th className='border'>url</th>
                    <th className='border'>short_id</th>
                    <th className='border'>del/edit</th>
                </thead>
                <tbody>
                    {ar.map((item, i) => {
                        return (
                            <tr key={item._id}>
                                <td>{i + 1}</td>
                                <td title={item.date_created} >{item.name}</td>
                                <td >{item.url_name}</td>
                                <td >{item.short_id}</td>
                                <td>
                                    <button onClick={() => {

                                        window.confirm("Are you sure?") && onDelClick(item._id);
                                        

                                    }} className='btn badge bg-danger me-2 px-3 py-2'>Del</button>
                                    <Link to={'/admin/editCategory/' + item.url_name} className='btn badge bg-info px-3 py-2'>Edit</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}