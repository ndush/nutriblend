'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../../app/styles/globals.css'; // Adjust path if needed
import Navigation from '../navigation'; // Adjust path as necessary

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
        router.push('/dashboard'); // Redirect to the dashboard
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to log in.');
    }
  };

  return (
    <div className="centered-container">
      <Navigation /> {/* Include Navigation */}
      <div className="login-form">
        <h1>Login</h1>
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
