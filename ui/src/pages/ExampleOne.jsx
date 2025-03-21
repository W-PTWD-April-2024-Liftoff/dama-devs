import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useState, useEffect } from 'react';

function ExampleOne() {
  const navigate = useNavigate();
  const [comment, setComment] = useState("Loading...");

  // Fetch test comment (GET endpoint)
  // boilerplate code, just enter your url and endpoint
  useEffect(() => {
    fetch("http://localhost:8080/api/jelly-beans")
      .then((response) => response.text()) 
      .then((data) => setComment(data)) 
      .catch((error) => {
        console.error("Error fetching comment:", error);
        setComment("Failed to fetch comment.");
      });
  }, []);

  const handleNavigate = () => {
    navigate('/jolly-ranchers'); // navigates to page ExampleTwo - intentionally naming it somthing completely different so you can see the React routes can have different names.
  };

  return (
    <div>
      <h2>Example One</h2> 
      <p>{comment}</p> {/* this is the comment from the GET endpoint in Spring */}
      
      {/* Button to navigate to ExampleTwo page */}
      <button onClick={handleNavigate}>Go to Example Two</button>
    </div>
  );
}

export default ExampleOne;
