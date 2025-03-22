import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import './App.css'; 
import ExampleOne from './pages/ExampleOne'; 
import ExampleTwo from './pages/ExampleTwo'; 
import WeatherWidget from './reusable-code/WeatherWidget';
import DashboardPage from './pages/DashboardPage';
import StarterPage from './pages/StarterPage';


function App() {
  return (
    
    <Router>
      <WeatherWidget />
      
      <div>
        <Routes>
         
          <Route path="/" element={<StarterPage />} />
      
          {/* Define the route for ExampleOne - intentionally naming it somthing completely different so you can see the React routes can have different names.*/}
          <Route path="/chocolate-ice-cream" element={<ExampleOne />} /> 

          {/* Define the route for ExampleTwo - intentionally naming it somthing completely different so you can see the React routes can have different names.*/}
          <Route path="/jolly-ranchers" element={<ExampleTwo />} />

          <Route path="/dashboard" element={<DashboardPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

