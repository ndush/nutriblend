'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../../app/styles/globals.css'; 
import Navigation from '../navigation'; 

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { username, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard'); 
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login unsuccessful. Please check your credentials and try again.');
    }
  };

  return (
    <div className="centered-container">
      <Navigation /> 
      <div className="login-form">
      <h1 style={{ color: 'white' }}>Login</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
