import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import SavedMeal from '../../../models/SavedMeal';
import jwt from 'jsonwebtoken';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function POST(request) {
  try {
    const { name, totalCalories, protein, carbs, fats } = await request.json();

    // Get token from Authorization header
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      console.error('No token provided');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.userId;

    // Create and save a new meal
    const newMeal = new SavedMeal({
      name,
      totalCalories,
      protein,
      carbs,
      fats,
      userId
    });

    await newMeal.save();
    return NextResponse.json({ message: 'Meal saved successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error saving meal:', error);
    return NextResponse.json({ error: 'Failed to save meal' }, { status: 500 });
  }
}
