import { useState } from 'react';
import axios from 'axios';

export default function IngredientSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchIngredients = async () => {
    try {
      const res = await axios.get(`/api/ingredients?query=${query}`);
      setResults(res.data.foods); // Adjust based on actual API response
    } catch (error) {
      console.error('Error searching ingredients:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchIngredients}>Search</button>
      <ul>
        {results.map((ingredient) => (
          <li key={ingredient.fdcId}>{ingredient.description}</li>
        ))}
      </ul>
    </div>
  );
}
