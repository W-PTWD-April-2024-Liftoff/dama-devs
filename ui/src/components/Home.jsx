import React from "react";

const Home = () => {
  const googleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };
  const githubLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  return (
    <div>
      <h2>Welcome to DamaDevs App</h2>
      <button onClick={googleLogin}>Login with google</button>
      <button onClick={githubLogin}>Login with github</button>
    </div>
  );
};

export default Home;
