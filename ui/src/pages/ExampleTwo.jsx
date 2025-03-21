

import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useState, useEffect } from 'react';

function ExampleTwo() {
  const navigate = useNavigate();
  const [comment, setComment] = useState("Loading...");

  // Fetch test comment (GET)
  useEffect(() => {
    fetch("http://localhost:8080/api/hershey-kisses")
      .then((response) => response.text()) 
      .then((data) => setComment(data)) 
      .catch((error) => {
        console.error("Error fetching comment:", error);
        setComment("Failed to fetch comment.");
      });
  }, []);

  const handleNavigate = () => {
    navigate('/chocolate-ice-cream'); // Navigate back to ExampleOne page
  };

  return (
    <div>
      <h2>Example Two</h2>
      <p>{comment}</p> {/* Display the fetched comment */}
      
      {/* Button to navigate to ExampleOne */}
      <button onClick={handleNavigate}>Go to Example One</button>
    </div>
  );
}

export default ExampleTwo;

