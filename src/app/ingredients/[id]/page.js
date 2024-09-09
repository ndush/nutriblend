'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

import '../../../app/styles/globals.css'; // Ensure this path is correct

export default function IngredientDetailsPage() {
  const { id } = useParams(); // Extract id from the URL using useParams
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('No ID found in URL');
      setLoading(false);
      return;
    }

    setLoading(true);
    axios.get(`https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
      .then(response => {
        if (response.data) {
          setIngredient(response.data);
          setError(null);
        } else {
          setError('No data received');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch ingredient details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ingredient) {
    return <div>No ingredient found.</div>;
  }

  const foodNutrients = ingredient.foodNutrients || [];

  const calories = foodNutrients.find(nutrient => nutrient.nutrient.name === 'Energy')?.amount || 'N/A';
  const protein = foodNutrients.find(nutrient => nutrient.nutrient.name === 'Protein')?.amount || 'N/A';
  const fat = foodNutrients.find(nutrient => nutrient.nutrient.name === 'Total lipid (fat)')?.amount || 'N/A';

  return (
    <div>
      <div className="centered-container">
        <div className="form-container ing-form">
          <h2 style={{ color: 'white' }}>{ingredient.description || 'No description available'}</h2>
          <div>
            <h3 style={{ color: 'white' }}>Nutrition Information</h3>
            <ul style={{ color: 'white' }}>
              <li><strong>Calories:</strong> {calories} kcal</li>
              <li><strong>Protein:</strong> {protein} g</li>
              <li><strong>Fat:</strong> {fat} g</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
