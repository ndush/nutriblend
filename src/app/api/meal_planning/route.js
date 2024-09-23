import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import SavedMeal from '../../models/SavedMeal'; 



mongoose.connect('mongodb://localhost:27017/nutriblend', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function POST(request) {
  try {
    const { name, totalCalories, protein, carbs, fats } = await request.json();
    
  
    const newMeal = new SavedMeal({
      name,
      totalCalories,
      protein,
      carbs,
      fats
    });
    
    await newMeal.save();
    return NextResponse.json({ message: 'Meal saved successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error saving meal:', error);
    return NextResponse.json({ error: 'Failed to save meal' }, { status: 500 });
  }
}
