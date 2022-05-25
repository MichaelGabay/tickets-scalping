import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { ClientContext } from '../context/clientContext'
import './header_footer.css'
import { BsSearch } from "react-icons/bs"

export default function HeaderClient() {
  let searcto = useRef()
  let nav = useNavigate()
  // collect user from global context
  const { user } = useContext(ClientContext)

  const onSearchClick = () => {
    let input_val = searcto.current.value
    console.log(input_val)
    if (input_val.length > 1)
      nav(`/tickets_search?s=${input_val}`)
  }

  const onKeySearch = (e) => {
    if (e.key === 'Enter')
      onSearchClick()
  }
  return (
    <header className='container-fluid bg-dark p-2'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container d-flex align-items-center">
          <Link className="navbar-brand mb-1" to="#">TicketsScalping</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse  navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {user.name &&
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Account Info
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/user/tickets">My Tickets</Link></li>
                    <li><Link className="dropdown-item" to="/user/favs">Favorite</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item disabled" to="#">Coming soon...</Link></li>
                  </ul>
                </li>}
              <li className='mx-lg-5 mx-0 col-lg-auto col-md-6 col-6 mt-lg-0 mt-3'>
                <div className="d-flex align-items-center input_search pe-1 col-12">
                  <input onKeyDown={onKeySearch} ref={searcto} type="text" className="form-control me-2 input_r" placeholder="Search..." />
                  <BsSearch style={{ fontSize: '20px',cursor:'pointer' }} onClick={onSearchClick} />
                </div>
              </li>
            </ul>

            {!user.name ?
              <div className="log_info col-auto ms-auto text-white mt-md-0 mt-4">
                <Link className='text-white text-decoration-none me-3 btn btn-outline-success' to={'/login'}>Login</Link>
                <Link className='text-white text-decoration-none btn btn-outline-secondary' to={'/signUp'}>Sign Up</Link>
              </div> :

<div className="log_info col-auto ms-auto text-white">
<span >Welcome {user.name}, </span>
<Link className='btn btn-outline-success ms-2' to={'/logout'}>Log Out</Link>
</div>}

          </div>
        </div>

      </nav>
    </header>
  )
}
