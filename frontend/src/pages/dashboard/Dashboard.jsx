import React, { Suspense } from 'react';
import SearchBar from '../../components/SearchBar';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  

  return (
    <div className="flex flex-col size-full overflow-hidden">
      <Navbar/>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar/>
       <div className="w-full max-w-2xl mx-auto p-5">
       <Suspense>
          <Outlet/>
        </Suspense>
       </div>
      </div>
    </div>
  );
};

export default Dashboard;