import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from './authslice';
import { useNavigate } from 'react-router-dom';
import "../../style/LoginPage.css"
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    const result = await dispatch(loginUser({ username, password }));
    console.log("Login result:", result);

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    } else {
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <input
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="login-button" onClick={handleLogin}>Login</button>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
