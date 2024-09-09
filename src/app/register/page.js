'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../../app/styles/globals.css'; // Ensure this path is correct
import Navigation from '../navigation'; // Adjust path as necessary

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/auth/register', { username, password });
      router.push('/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to register.');
    }
  };

  return (
    <div className="centered-container">
      <Navigation /> {/* Include Navigation */}
      <div className="form-container register-form">
        <h1>Register</h1>
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
          <button type="submit">Register</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
