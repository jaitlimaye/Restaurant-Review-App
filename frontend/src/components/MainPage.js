import React from 'react'
import Restaurant_list from "./Restaurant_list";
import Sidebar from "./Sidebar";

const MainPage = ({restaurants,setRestaurants,user}) => {
  return (
    <div>
        <div class="row">
          <Sidebar restaurants = {restaurants} setRestaurants = {setRestaurants}/>
        
          <div class ="col-sm-6">
            <div className="container mt-3">
            <Restaurant_list restaurants = {restaurants} setRestaurants = {setRestaurants} user={user}/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default MainPage