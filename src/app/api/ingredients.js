import connectDB from '../../lib/mongodb';
import axios from 'axios';

export default async function handler(req, res) {
  await connectDB();
  const { query } = req.query;
  
  try {
    // Use the correct endpoint for searching foods
    const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
      params: {
        query
      },
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
}
