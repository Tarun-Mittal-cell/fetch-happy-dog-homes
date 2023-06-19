// Import necessary modules
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  // Set initial state for name and email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Function to handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Login API Endpoint
    const loginApiUrl = "https://frontend-take-home-service.fetch.com/auth/login";

    try {
      const response = await axios.post(loginApiUrl, { name, email }, { withCredentials: true });
      
      if (response.status === 200) {
        console.log("Login Successful");
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
      console.error("An error occurred during login", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
