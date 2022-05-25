import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TOKEN_NAME } from '../services/apiService'


export default function HeaderAdmin() {
  const nav = useNavigate()
  const onLogOut = () =>{
    localStorage.removeItem(TOKEN_NAME)
    nav('/admin')
    toast.info('You log out,see you soon !!!')
  }
  return (
    <header className='container-fluid bg-info'>
      <nav className='container d-flex justify-content-between align-items-center'>
        <ul className='nav p-2'>
          <li><Link to="/admin">Home</Link></li>
          <li><Link to="/admin/usersList">Users</Link></li>  
          <li><Link to="/admin/categories">Categories</Link></li>  
          <li><Link to="/admin/tickets">Tickets</Link></li>  
        </ul>
        { localStorage[TOKEN_NAME] &&
        <div className='col-auto'>
          <button onClick={onLogOut} className='badge bg-danger'>Log Out</button>
        </div>
        }
      </nav>

    </header>
  )
}
