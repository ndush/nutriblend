'use client';
import { useState } from 'react';
import '../../app/styles/globals.css'; // Adjusted path to go up one level and then to styles
import Navigation from '../navigation'; // Adjust path as necessary

export default function MealSuggestion() {
  const [ingredients, setIngredients] = useState('');
  const [criteria, setCriteria] = useState('');
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');

  const getMeals = async () => {
    if (!ingredients.trim()) {
      setError('Please enter ingredients');
      return;
    }

    setError(''); // Clear previous errors

    try {
      const response = await fetch(`/api/meal-suggestions?ingredients=${encodeURIComponent(ingredients)}&criteria=${encodeURIComponent(criteria)}`);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data) && data.length > 0) {
        setMeals(data);
      } else {
        setMeals([]);
        setError('No meals found');
      }
    } catch (error) {
      console.error('Error fetching meal suggestions:', error);
      setError('Error fetching meal suggestions. Please try again.');
    }
  };

  return (
    <div>
      <Navigation />
      <div className="meal-suggestion-wrapper">
        <div className="image-container">
          <img src="/images/b.jpg" alt="Meal Suggestions" /> {/* Update the path accordingly */}
        </div>
        <div className="content-container">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter comma-separated ingredients"
          />
          <button 
            onClick={getMeals}
            style={{ color: 'white' }} // Button text white
          >
            Get Meal Suggestions with Criteria
          </button>
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>} {/* Error text in red */}
          <ul style={{ color: 'white' }}> {/* List text white */}
            {meals.length > 0 ? (
              meals.map((meal, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <strong>{meal.description || 'No description'}</strong>
                  {meal.foodNutrients && (
                    <ul style={{ color: 'black' }}>
                      {meal.foodNutrients.map((nutrient) => (
                        <li key={nutrient.nutrientId}>
                          {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))
            ) : (
              <li>No meals available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
