import Strip from "./home/strip";
import './home/home.css'
import React from "react";
import CategoriesHomeList from "./home/categoriesHomeList";
import LastTicketsAddedHome from "./home/lastTicketsAddedHome";
export default function Home(props) {


  return (
    <React.Fragment >
    <Strip/>
    <CategoriesHomeList/>
    <LastTicketsAddedHome/>
    </React.Fragment>
  )
}
