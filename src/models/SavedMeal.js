import mongoose from 'mongoose';

const savedMealSchema = new mongoose.Schema({
  name: String,
  totalCalories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
  userId: mongoose.Schema.Types.ObjectId,
});

const SavedMeal = mongoose.models.SavedMeal || mongoose.model('SavedMeal', savedMealSchema);

export default SavedMeal;
