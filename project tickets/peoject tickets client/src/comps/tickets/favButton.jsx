import React, { useContext, useEffect, useState } from 'react'
import {BsStar,BsStarFill} from 'react-icons/bs'
import { toast } from 'react-toastify'
import { ClientContext } from '../../context/clientContext'
import { API_URL, doApiMethod } from '../../services/apiService'
export default function FavBtn(props) {
  let ticket = props.ticket
  const {favs_ar,doApiUserInfo,user} = useContext(ClientContext)
  const [inFav,setInFav] = useState(false);
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    setInFav(favs_ar.includes(ticket.short_id));
  },[favs_ar])

  const onAddRemoveFav = async()=>{
    try{
    // TODO: check if user logged in:
    if(user.name){
      let url = API_URL + '/users/favs'
      setLoading(true)
      await doApiMethod(url,"PATCH",{short_id:ticket.short_id})
      await doApiUserInfo()     
      setLoading(false)     
    }else{
      setLoading(false)     
      toast.error('You must to logged in first to add favorite')
    }

    }catch(err){
      console.log(err.response)
      toast.error("There problem try again later")
    }
  }



  return (
    <>
    {!loading ? 
    <>
    {inFav ?
    <button style={{color:'rgb(236, 236, 0)'}} onClick={onAddRemoveFav} className='mx-2 btnFavComp'><BsStarFill/></button>
    :  
   <button style={{color:'rgb(236, 236, 0)'}} onClick={onAddRemoveFav} className='mx-2 btnFavComp'><BsStar/></button>
}</>:<span><img src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif" width={100} alt="dasdsa" /></span>}
    </>
  )
}
