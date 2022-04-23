import React from 'react'
import Sidebar from './Sidebar';
import './Admin.css'


const  DashBoard = () => {
  return (
    <div>
   <Sidebar/>
      <div className="main" >
        <h2>Welcome To Genova Admin</h2>
        
      </div>
    </div>
  );
}

export default DashBoard