'use client';
import { useState } from 'react';

export default function MealSuggestion() {
  const [ids, setIds] = useState('');
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');

  const getMeals = async () => {
    if (!ids.trim()) {
      setError('Please enter ingredients');
      return;
    }

    setError(''); // Clear previous errors

    try {
      const response = await fetch(`/api/meal_suggestions?ingredients=${encodeURIComponent(ids)}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMeals(data.foods || []); // Adjust based on actual API response
    } catch (error) {
      console.error('Error fetching meal suggestions:', error);
      setError('Error fetching meal suggestions. Please try again.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={ids}
        onChange={(e) => setIds(e.target.value)}
        placeholder="Enter comma-separated ingredients"
      />
      <button onClick={getMeals}>Get Meal Suggestions</button>
      {error && <p>{error}</p>}
      <ul>
        {meals.map((meal, index) => (
          <li key={index}>{meal.description}</li>
        ))}
      </ul>
    </div>
  );
}
