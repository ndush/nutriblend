'use client';
import { useState } from 'react';
import axios from 'axios';

export default function MealPlanner({ onMealSaved }) {
  const [criteria, setCriteria] = useState('');
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

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
      } else {
        setMeals([]);
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
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No authentication token found');
        return;
      }

      const mealData = {
        name: meal.description,
        totalCalories: meal.foodNutrients.find(n => n.nutrientName === 'Energy')?.value || 0,
        protein: meal.foodNutrients.find(n => n.nutrientName === 'Protein')?.value || 0,
        carbs: meal.foodNutrients.find(n => n.nutrientName === 'Carbohydrate, by difference')?.value || 0,
        fats: meal.foodNutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0
      };

      console.log('Saving meal with data:', mealData);

      const response = await axios.post('/api/saved-meals', mealData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Save meal response:', response);
      alert('Meal saved!');
      if (onMealSaved) onMealSaved();
    } catch (error) {
      console.error('Error saving meal:', error);
      alert('Failed to save meal');
    }
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
      <h2>Suggested Meals</h2>
      {meals.length === 0 ? (
        <p>No meals available</p>
      ) : (
        <ul>
          {meals.map((meal) => (
            <li key={meal.fdcId}>
              <strong>{meal.description}</strong> - {meal.foodNutrients.find(n => n.nutrientName === 'Energy')?.value || 0} calories
              <br />
              Protein: {meal.foodNutrients.find(n => n.nutrientName === 'Protein')?.value || 0}g, Carbs: {meal.foodNutrients.find(n => n.nutrientName === 'Carbohydrate, by difference')?.value || 0}g, Fats: {meal.foodNutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0}g
              <button onClick={() => saveMeal(meal)}>Save</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
