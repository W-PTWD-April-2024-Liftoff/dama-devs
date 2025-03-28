import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/dashboard'); // Make sure this path matches your route for ExampleOne
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login Logic</h1>
      <button onClick={handleNavigate}>Login</button>
    </div>
  );
}

export default Login;