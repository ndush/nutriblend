'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navigation from '../navigation'; 
import '../../app/styles/globals.css'; 

export default function IngredientSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const searchIngredients = async () => {
    try {
      const res = await axios.get(`/api/ingredients?query=${query}`);
      setResults(res.data.foods || []);
      if (res.data.foods.length === 0) {
        setError('No matching ingredients found');
      } else {
        setError('');
      }
    } catch (error) {
      console.error('Error searching ingredients:', error);
      setError('Error searching ingredients. Please try again.');
    }
  };

  return (
    <div className="ingredient-search-wrapper">
      <Navigation />
      <div className="image-container">
        <img src="/images/c.jpg" alt="Search Ingredients" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}/> 
      </div>
      <div className="search-content-container">
        <h1>Ingredient Search</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter ingredient name"
        />
        <button onClick={searchIngredients}>Search</button>
        {error && <p className="error">{error}</p>}
        <ul>
          {results.map((ingredient) => (
            <li key={ingredient.fdcId}>
              <Link href={`/ingredients/${ingredient.fdcId}`}>
                {ingredient.description}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
