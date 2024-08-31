import connectDB from '../../../lib/mongodb';

export async function GET(req) {
  await connectDB();

  const url = new URL(req.url, `http://${req.headers.host}`);
  const ingredients = url.searchParams.get('ingredients');

  if (!ingredients || ingredients.trim() === '') {
    return new Response(JSON.stringify({ error: 'No ingredients provided' }), { status: 400 });
  }

  const ingredientsList = ingredients.split(',');
  const apiKey = process.env.API_KEY; // Ensure this environment variable is set

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key is missing' }), { status: 500 });
  }

  try {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(ingredientsList.join(','))}&api_key=${apiKey}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching meal suggestions:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch meal suggestions' }), { status: 500 });
  }
}
