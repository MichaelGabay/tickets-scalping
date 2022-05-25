import React, { useContext, useEffect, useState } from 'react'
import { ClientContext } from '../../context/clientContext';
import { API_URL, doApiGet } from '../../services/apiService';
import ItemTicket from '../itemTicket';

export default function FavsList(props) {
  const [ar, setAr] = useState([]);
  const [loading, setLoading] = useState(false);
  const {favs_ar} = useContext(ClientContext)
  useEffect(() => {
    doApi();
  }, [favs_ar])

  const doApi = async () => {
    if(favs_ar.length > 0){
      setLoading(true);
      let favsStrings = favs_ar.join(',')
      let url= API_URL + `/tickets/ticketsList?shorts_ids=${favsStrings}`;
      let {data} = await doApiGet(url);
      console.log(data);
      setAr(data)
      setLoading(false);

    }

  }

  return (
    <div className='container py-5'>
      <h2>Tickets favorites list:</h2>
      <div className="row">
        {ar.map(item => {
          return (
            <ItemTicket key={item._id} item={item} />
            )
          })}
      </div>
          {loading && <h2>Loading...</h2>}
    </div>
  )
}
