import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useState, useEffect } from 'react';
import Dashboard from '../reusable-code/DashboardWeather';

function DashboardPage() {
  const navigate = useNavigate();
 



  const handleNavigate = () => {
    navigate('/'); // navigates to beginning
  };
  
  return (
    <div>
     <Dashboard />
      
      {/* Button to navigate to ExampleTwo page */}
      {/* <button onClick={handleNavigate}>Go to Start</button> */}
    </div>
  );
};

export default DashboardPage;