import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL, doApiGet } from '../../services/apiService'

export default function CategoriesHomeList() {
    const [ar, setAr] = useState([])
    const nav = useNavigate();
    useEffect(() => {
        doApi()
    }, [])
    const doApi = async () => {
        let url = API_URL + '/categories';
        let { data } = await doApiGet(url)
        console.log(data)
        setAr(data)
    }
    return (
        <div className='container-fluid categoriesHome py-5'>
            <div className="container">
                <h2 className='display-4 title-cat text-center my-3'>Categories of tickets you insterting in:</h2>
                <div className="row">
                    {ar.map(item => {
                        return (

                            <div key={item._id} className="col-lg-4 col-md-6 p-3">
                                <Link to={`/categories/${item.url_name}`}>
                                    <div className='box border' style={{ backgroundImage: `url(${item.img_url})` }}>
                                        <h3>{item.name}</h3>
                                    </div>
                          </Link>

                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}
