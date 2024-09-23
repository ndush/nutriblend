import connectDB from '../../../../lib/mongodb';

export async function GET(request, { params }) {
  await connectDB();

  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Ingredient ID is required' }), { status: 400 });
  }

  const apiKey = process.env.API_KEY;

  try {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=${apiKey}`);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch ingredient' }), { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching ingredient data:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
