import axios from 'axios';

export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  
  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter is required' }), { status: 400 });
  }

  try {
    const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
      params: { query },
      headers: { 'X-Api-Key': process.env.API_KEY } 
    });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error('Error fetching ingredients:', error.response ? error.response.data : error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch ingredients' }), { status: 500 });
  }
}
