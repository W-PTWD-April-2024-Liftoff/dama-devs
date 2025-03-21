import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ExampleOne from './pages/ExampleOne';
import ExampleTwo from './pages/ExampleTwo';
import Props from './reusable-code/props';
import WeatherWidget from './reusable-code/WeatherWidget';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import ExampleOne from './pages/ExampleOne';
import ExampleTwo from './pages/ExampleTwo';
import Props from './reusable-code/props';
import WeatherWidget from './reusable-code/WeatherWidget';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );

    <Router>
      <WeatherWidget />
      {/* test for using props
      <Props />      */}

    <Router>
      <WeatherWidget />
      {/* test for using props
      <Props />      */}
      <div>
        <Routes>

          {/* "/"  will be the default for startup, so I added this route to take me to first page. */}
          <Route path="/" element={<Navigate to="/chocolate-ice-cream" />} /> {/* Redirect */}

          {/* Define the route for ExampleOne - intentionally naming it somthing completely different so you can see the React routes can have different names.*/}
          <Route path="/chocolate-ice-cream" element={<ExampleOne />} />

          {/* Define the route for ExampleTwo - intentionally naming it somthing completely different so you can see the React routes can have different names.*/}
          <Route path="/jolly-ranchers" element={<ExampleTwo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
