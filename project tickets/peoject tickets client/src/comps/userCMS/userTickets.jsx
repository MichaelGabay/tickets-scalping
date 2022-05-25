import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageNav from '../../helpers_comps/pageNav';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import ClientAuthComp from './clientAuthComp';

export default function UserTickets() {
    const [ar, setAr] = useState([]);
    const [categoriesDic, setCategoriesDic] = useState({});
    const [loading,setLoading] = useState(false)
    const [query] = useSearchParams();

    useEffect(() => {
        doApi();
        doApiGetCategory();
    }, [query])


    const doApiGetCategory = async () => {
        let url = API_URL + "/categories";
        let {data} = await doApiGet(url);
        // obj = {338 : "sport"}
        let obj ={}
        data.forEach(item => {
            obj[item.short_id] =item.name
        });
        setCategoriesDic(obj)
    }



    const doApi = async () => {
        setLoading(true)
        let pageQ = query.get('page') || 1
        let url = API_URL + '/tickets/userTickets?page='+pageQ
        let resp = await doApiGet(url);
        console.log(resp.data)
        setAr(resp.data)
        setLoading(false)
    }

    const onDelClick = async (_idDel) => {
        let _url = API_URL + '/tickets/' + _idDel;

        try {
            let resp = await doApiMethod(_url, 'DELETE');
            if (resp.data.deletedCount === 1){
                toast.info('Ticket Deleted')
                doApi();
            }

        } catch (err) {
            console.log(err)
            toast.error('Try again somthing erorr')
        }
    }


  return (
    <div className='container'>
    {/* check if user logged in! */}
    <ClientAuthComp/>
    <Link to={'/user/add_ticket'} className='btn btn-info mt-4 mb-1' >Add Ticket</Link>
    {!loading ? 
    <table className='table table-striped text-center my-3 table-hover'>
        <thead >
            <tr>
            <th className='border'>#</th>
            <th className='border'>name</th>
            <th className='border'>location</th>
            <th className='border'>date_from</th>
            <th className='border'>price</th>
            <th className='border'>status</th>
            <th className='border'>category</th>
            <th className='border'>del/edit</th>
            </tr>
        </thead>

        <tbody>
            {ar.map((item, i) => {
                let index = ((+(query.get('page')||1) -1) * 5)
                return (
                    
                    <tr key={item._id} >
                        <td>{index+i+1 }</td>
                        <td title={item.info} >{item.name}</td>
                        <td >{item.location}</td>
                        <td >{item.date_from} - {item.time}</td>
                        <td >{item.price}$</td>
                        <td >{item.status}</td>
                        <td >{categoriesDic[item.category_short_id]}</td>
                       
                        <td>
                            <button onClick={() => {

                                window.confirm("Are you sure?") && onDelClick(item._id);


                            }} className='btn badge bg-danger me-2 px-3 py-2'>Del</button>
                            <Link to={'/user/editTicket/' + item._id} className='btn badge bg-info px-3 py-2'>Edit</Link>
                        </td>
                    </tr>
                )
            })}

        </tbody>
    </table>: <h2>Loading...</h2>}
                {/* <PageNav css='btn btn-dark mx-1' perPage="5" urlCount={API_URL+'/tickets/count'} toLink="/admin/tickets?page="  /> */}
</div>
  )
}
