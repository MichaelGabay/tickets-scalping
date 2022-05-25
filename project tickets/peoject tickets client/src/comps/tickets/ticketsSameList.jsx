import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService'
import ItemTicket from '../itemTicket';

export default function TicektsSameList(props) {
    const [ar, setAr] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      doApi();
    }, [])
  
    const doApi = async () => {
      setLoading(true);
      let url2 = API_URL + `/tickets?cat=${props.cat_short_id}&perPage=4&page=1`;
      let resp2 = await doApiGet(url2);
      console.log(resp2.data);
      let temp_ar = resp2.data.filter(item => 
        {return item._id != props.currentTicketId}  
      )
      setAr(temp_ar);
      setLoading(false);
  
    }
  
    return (
      <div>
        <h2 style={{ fontFamily: `'Bebas Neue', cursive` }}>Tickets you may intersted also:</h2>
        {loading && <h2>Loading...</h2>}
        <div className="row p-5 p-md-0">
          {ar.map(item => {
            return (
              <ItemTicket key={item._id} item={item} />
            )
          })}
        </div>
      </div>
    )
  }