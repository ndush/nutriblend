import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import SavedMeal from '../../../../models/SavedMeal';
import jwt from 'jsonwebtoken';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Get userId from the token
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Find and delete the meal
    const result = await SavedMeal.deleteOne({ _id: id, userId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Meal not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Meal deleted successfully!' });
  } catch (error) {
    console.error('Error deleting meal:', error);
    return NextResponse.json({ error: 'Failed to delete meal' }, { status: 500 });
  }
}
