
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header';
import Footer from '../footer';
import { useRouter } from 'next/navigation';
// import MealPlanner from './meal-planner/page';
// Named import
import { MealPlanner } from './meal-planner/page'; 


const Dashboard = () => {
  const [savedMeals, setSavedMeals] = useState([]);
  const [isViewingMeals, setIsViewingMeals] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [mealSuggestionsFetched, setMealSuggestionsFetched] = useState(false);
  const [showSuggestedMeals, setShowSuggestedMeals] = useState(false);
  const [savedMealsPage, setSavedMealsPage] = useState(0); 
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

      const response = await axios.get(`/api/saved-meals/user?page=${savedMealsPage}&limit=2`, {
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
    router.push('/'); 
  };

  const handleViewMealsClick = () => {
    setIsViewingMeals(prev => !prev);
    if (!isViewingMeals) fetchSavedMeals(); 
  };

  const handleMealSuggestionsFetched = () => {
    setMealSuggestionsFetched(true);
    setShowSuggestedMeals(true);
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="container">
        <div className="left-column">
          <h1>Welcome, {username}</h1>
          <MealPlanner 
            onMealSaved={() => alert('Meal saved!')} 
            handleMealSuggestionsFetched={handleMealSuggestionsFetched}
            showSuggestedMeals={showSuggestedMeals}
            setShowSuggestedMeals={setShowSuggestedMeals} // Pass setter to MealPlanner
          />
      
          {mealSuggestionsFetched && (
            <button 
              onClick={handleViewMealsClick}
              className={isViewingMeals ? 'active' : ''}
            >
              {isViewingMeals ? 'Hide Saved Meals' : 'View Saved Meals'}
            </button>
          )}
        </div>
        {isViewingMeals && (
          <div className="right-column">
            <h2>Your Saved Meals</h2>
            {savedMeals.length === 0 ? (
              <p>No meals available</p>
            ) : (
              <ul>
                {savedMeals.map(meal => (
                  <li key={meal._id}>
                    <strong>{meal.name}</strong><br />
                    Calories: {meal.totalCalories}<br />
                    Protein: {meal.protein}<br />
                    Carbs: {meal.carbs}<br />
                    Fats: {meal.fats}<br />
                    <button onClick={() => handleDeleteMeal(meal._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
            {savedMeals.length > 0 }
            <button onClick={handleViewMealsClick}>
              {isViewingMeals ? 'Hide Saved Meals' : 'View Saved Meals'}
            </button>
            <button className="logout" onClick={handleLogout}>Logout</button>
            {error && <p>{error}</p>}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
