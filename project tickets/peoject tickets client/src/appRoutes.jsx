import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; //toastify import
import 'react-toastify/dist/ReactToastify.css'; //css toastify
import TicketsList from './admin_comps/tickets/ticketsList';
import EditCategory from './admin_comps/catrgories/editCategory';
import HeaderAdmin from './admin_comps/headerAdmin';
import LoginAdmin from './admin_comps/loginAdmin';
import About from './comps/about';
import HeaderClient from './comps/headerClient';
import Home from './comps/home';
import Page404 from './comps/page404';
import CategoriesList from './admin_comps/catrgories/categoriesList';
import AddTicket from './admin_comps/tickets/addTicket';
import AddCategory from './admin_comps/catrgories/addCategory';
import EditTicket from './admin_comps/tickets/editTickets';
import UsersList from './admin_comps/users/usersList';
import EditUser from './admin_comps/users/editUser';
import TicketsCategories from './comps/categories/ticketsCategories';
import TicketInfo from './comps/tickets/ticketInfo';
import SearchTicket from './comps/categories/searchTicket';
import SignUp from './comps/userCMS/signup';
import Login from './comps/userCMS/login';
import Logout from './comps/userCMS/logout';
import UserTickets from './comps/userCMS/userTickets';
import AddUserTicket from './comps/userCMS/addTicket';
import FavsList from './comps/userCMS/favsList';
import EditTicketUser from './comps/userCMS/editTikcetUser';

export default function AppRoutes(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/*' element={<HeaderAdmin/>}/>
        <Route path='/*' element={<HeaderClient/>}/>
      </Routes>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories/:cat_url" element={<TicketsCategories />} />
        <Route path="/tikcetInfo/:id" element={<TicketInfo />} />
        <Route path="/tickets_search" element={<SearchTicket />} />

        {/* user ROUTS */}
        <Route path="/signup" element={<SignUp /> } />
        <Route path="/login" element={<Login /> } />
        <Route path="/logout" element={<Logout /> } />
        <Route path="/user/tickets" element={<UserTickets /> } />
        <Route path="/user/add_ticket" element={<AddUserTicket />} />
        <Route path="/user/favs" element={<FavsList />} />
        <Route path="/user/editTicket/:id" element={<EditTicketUser />} />
        
        {/* admin ROUTES */}
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/admin/usersList" element={<UsersList />} />
        <Route path="/admin/categories" element={<CategoriesList />} />
        <Route path="/admin/tickets" element={<TicketsList />} />
        <Route path="/admin/add_ticket" element={<AddTicket />} />
        <Route path="/admin/add_category" element={<AddCategory />} />
        <Route path="/admin/editCategory/:urlEdit" element={<EditCategory />} />
        <Route path="/admin/editTicket/:id" element={<EditTicket />} />
        <Route path="/admin/editUser/:id" element={<EditUser />} />

        {/* 404 ROUTE */}
        <Route path="/*" element={<Page404 />} />
      </Routes>

      {/* opacity div for toast */}
      <ToastContainer position="top-left"
 theme='colored' autoClose={5000}/>
    </BrowserRouter>
  )
}
