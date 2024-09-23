import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const url = new URL(request.url);
  const ingredients = url.searchParams.get('ingredients') || '';
  const nutrientName = url.searchParams.get('nutrient') || '';
  const criteria = url.searchParams.get('criteria') || '';

  try {
   
    const apiResponse = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
      params: {
        api_key: process.env.API_KEY,
        query: ingredients
      }
    });

    let meals = apiResponse.data.foods || [];

   
    if (nutrientName) {
      meals = meals.filter(meal => 
        meal.foodNutrients && meal.foodNutrients.some(nutrient => nutrient.nutrientName === nutrientName)
      );
    }

    
    if (criteria) {
      meals = meals.filter(meal => {
        switch (criteria.toLowerCase()) {
          case 'high-protein':
            return meal.foodNutrients && meal.foodNutrients.some(nutrient => nutrient.nutrientName === 'Protein' && nutrient.value >= 15); 
          case 'low-carb':
            return meal.foodNutrients && meal.foodNutrients.some(nutrient => nutrient.nutrientName === 'Carbohydrate, by difference' && nutrient.value <= 30); 
          case 'low-fat':
            return meal.foodNutrients && meal.foodNutrients.some(nutrient => nutrient.nutrientName === 'Total lipid (fat)' && nutrient.value <= 10); 
          default:
            return true;
        }
      });
    }

    if (meals.length === 0) {
      return NextResponse.json({ message: 'No meals found' }, { status: 404 });
    }

    return NextResponse.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json({ error: 'Failed to fetch meals' }, { status: 500 });
  }
}
