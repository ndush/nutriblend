'use client'; // Must be at the top for client-side components
import React, { useState } from 'react';
import axios from 'axios';

const MealPlanner = ({ onMealSaved, handleMealSuggestionsFetched, showSuggestedMeals }) => {
  const [criteria, setCriteria] = useState('');
  const [meals, setMeals] = useState([]);
  const [displayedMeals, setDisplayedMeals] = useState([]);
  const [error, setError] = useState(null);
  const [nextMealIndex, setNextMealIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchMeals = async () => {
    if (!criteria) {
      setError('Please select a criteria.');
      return;
    }

    try {
      const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${criteria}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.foods) {
        setMeals(response.data.foods);
        setNextMealIndex(0);
        setDisplayedMeals(response.data.foods.slice(0, 2));
        handleMealSuggestionsFetched();
      } else {
        setMeals([]);
        setDisplayedMeals([]);
      }

      setError(null);
    } catch (error) {
      console.error('Failed to fetch meals:', error);
      setError('Failed to fetch meals');
    }
  };

  const handleCriteriaChange = (e) => {
    setCriteria(e.target.value);
  };

  const saveMeal = async (meal) => {
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setSuccessMessage('No authentication token found');
        setSaving(false);
        return;
      }

      const mealData = {
        name: meal.description,
        totalCalories: meal.foodNutrients.find(n => n.nutrientName === 'Energy')?.value || 0,
        protein: meal.foodNutrients.find(n => n.nutrientName === 'Protein')?.value || 0,
        carbs: meal.foodNutrients.find(n => n.nutrientName === 'Carbohydrate, by difference')?.value || 0,
        fats: meal.foodNutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0
      };

      await axios.post('/api/saved-meals', mealData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setSuccessMessage('Meal saved successfully!');
      if (onMealSaved) onMealSaved();
    } catch (error) {
      console.error('Error saving meal:', error);
      setSuccessMessage('Failed to save meal');
    } finally {
      setSaving(false);
    }
  };

  const handleViewMore = () => {
    const newIndex = nextMealIndex + 2;
    const newMeals = meals.slice(nextMealIndex, newIndex);
    setDisplayedMeals(newMeals);
    setNextMealIndex(newIndex);
  };

  return (
    <div className="meal-planner-wrapper">
      <h1>Meal Planner</h1>
      <select onChange={handleCriteriaChange} value={criteria}>
        <option value="">Select Criteria</option>
        <option value="high-protein">High-Protein</option>
        <option value="low-carb">Low-Carb</option>
        <option value="low-fat">Low-Fat</option>
      </select>
      <button onClick={fetchMeals}>Get Meal Suggestions</button>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}

      {showSuggestedMeals && (
        <>
          <h2>Suggested Meals</h2>
          {displayedMeals.length === 0 ? (
            <p>No meals available</p>
          ) : (
            <ul>
              {displayedMeals.map((meal) => (
                <li key={meal.fdcId}>
                  <strong>{meal.description}</strong> - {meal.foodNutrients.find(n => n.nutrientName === 'Energy')?.value || 0} calories
                  <br />
                  Protein: {meal.foodNutrients.find(n => n.nutrientName === 'Protein')?.value || 0}g,
                  Carbs: {meal.foodNutrients.find(n => n.nutrientName === 'Carbohydrate, by difference')?.value || 0}g,
                  Fats: {meal.foodNutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0}g
                  <button onClick={() => saveMeal(meal)} disabled={saving}>Save</button>
                </li>
              ))}
            </ul>
          )}
          {nextMealIndex < meals.length && (
            <button onClick={handleViewMore}>View More</button>
          )}
        </>
      )}
    </div>
  );
};

export default MealPlanner; // Default export of the MealPlanner component
