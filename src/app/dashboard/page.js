// src/app/dashboard/page.js
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MealPlanner from './meal-planner/page';
import Header from '../header';
import Footer from '../footer';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [savedMeals, setSavedMeals] = useState([]);
  const [isViewingMeals, setIsViewingMeals] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No authentication token found');
          return;
        }

        const userResponse = await axios.get('/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setUsername(userResponse.data.username || 'Guest');
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  const fetchSavedMeals = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No authentication token found');
        return;
      }

      const response = await axios.get('/api/saved-meals/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setSavedMeals(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching saved meals:', error);
      setError('Failed to fetch saved meals');
    }
  };

  const handleDeleteMeal = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No authentication token found');
        return;
      }

      await axios.delete(`/api/saved-meals/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      fetchSavedMeals();
    } catch (error) {
      console.error('Error deleting meal:', error);
      alert('Failed to delete meal');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/'); // Redirect to home page
  };

  return (
    <div className="dashboard-container ">
      <Header />
      {/* <Navigation /> */}
      <div className="container">
        <div className="left-column">
          <h1>Welcome, {username}</h1>
          <MealPlanner onMealSaved={() => alert('Meal saved!')} />
          <button onClick={() => {
            setIsViewingMeals(prev => !prev);
            if (!isViewingMeals) fetchSavedMeals();
          }}>
            {isViewingMeals ? 'Hide Saved Meals' : 'View Saved Meals'}
          </button>
          
        </div>
        {isViewingMeals && (
          <div className="right-column">
            <h2>Your Saved Meals</h2>
            <button onClick={() => {
            setIsViewingMeals(prev => !prev);
            if (!isViewingMeals) fetchSavedMeals();
          }}>
            {isViewingMeals ? 'Hide Saved Meals' : 'View Saved Meals'}
          </button><br></br>
          <button className="logout" onClick={handleLogout}>Logout</button>
        
            {error && <p>{error}</p>}
            <ul>
              {savedMeals.length === 0 ? (
                <p>No meals available</p>
              ) : (
                savedMeals.map(meal => (
                  <li key={meal._id}>
                    <strong>{meal.name}</strong><br />
                    Calories: {meal.totalCalories}<br />
                    Protein: {meal.protein}<br />
                    Carbs: {meal.carbs}<br />
                    Fats: {meal.fats}<br />
                    <button onClick={() => handleDeleteMeal(meal._id)}>Delete</button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
