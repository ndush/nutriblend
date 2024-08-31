
NutriBlend is a web application designed to help users create balanced and nutritious meals easily. By leveraging data from the USDA FoodData Central API, NutriBlend provides meal suggestions based on available ingredients and basic dietary criteria. The app is built using Next.js and MongoDB to ensure a seamless and efficient user experience.


Features
Meal Suggestion Based on Available Ingredients:

Users can input a list of ingredients they have on hand and receive suggestions for balanced meals that can be prepared with those ingredients.
Viewing Ingredient Information:

Users can search for an ingredient to view its nutritional information, including calories, protein, and fat.
User Authentication:

Users can log in with their credentials to access personalized meal suggestions and saved ingredients (Note: Currently simplified to basic authentication).
Simple Meal Planning:

Users can generate meal ideas based on simple criteria such as high-protein or low-carb (Note: Expanded criteria features are pending).
Technologies
Frontend:

Next.js
React
CSS Modules
Backend:

Next.js API routes
Database:

MongoDB
API Integration:

Axios
Authentication:

Custom username/password-based authentication (JWT-based authentication is planned for future implementation)
Deployment:

Vercel
Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/nutriblend.git
Navigate to the Project Directory:

bash
Copy code
cd nutriblend
Install Dependencies:

bash
Copy code
npm install
Set Up Environment Variables:

Create a .env.local file in the root directory and add the following environment variables:

makefile
Copy code
MONGODB_URI=your_mongodb_connection_string
FDC_API_KEY=your_usda_fooddata_central_api_key
Run the Development Server:

bash
Copy code
npm run dev
The application will be accessible at http://localhost:3000.

Usage
Meal Suggestion:

Navigate to the meal suggestion page and input a list of ingredients. The app will display meal suggestions based on the available ingredients.
Viewing Ingredient Information:

Use the search field to find information about specific ingredients and view their nutritional details.
User Authentication:

Log in with your username and password to access personalized features and saved data.
Meal Planning:

Generate meal ideas based on simple criteria by selecting or inputting criteria on the meal planning page.
API Integration
NutriBlend uses the USDA FoodData Central API to fetch nutritional information and meal data. The API provides comprehensive data on food products, including nutritional facts and ingredient details.

API Key
To use the USDA FoodData Central API, you need an API key. Obtain your API key by registering on the USDA FoodData Central API website and add it to your .env.local file as FDC_API_KEY.

API Endpoints
Search Foods by Ingredients:

Endpoint: GET /api/meals/suggestions
Description: Retrieves meal suggestions based on provided ingredients.
Query Parameters: ingredients (comma-separated list of ingredients)
Example Request: GET /api/meals/suggestions?ingredients=chicken,broccoli
Search for Ingredient Information:

Endpoint: GET /api/ingredients/search
Description: Searches for ingredient information using the USDA FoodData Central API.
Query Parameters: name (name of the ingredient)
Example Request: GET /api/ingredients/search?name=broccoli
User Authentication:

Endpoint: POST /api/auth/login
Description: Authenticates a user and returns a session token.
Body: { "username": "user", "password": "pass" }
Future Enhancements
JWT-Based Authentication: Implement custom JWT-based authentication for improved security.
User Feedback Mechanism: Add a feature to collect and incorporate user feedback.
Expanded Meal Planning: Include additional criteria such as meal prep time and cuisine type.
Dark Mode & Accessibility Improvements: Enhance UI/UX with dark mode and accessibility features.
Contributing
Contributions are welcome! If you have suggestions or improvements, please fork the repository and submit a pull request. For major changes, please open an issue to discuss your proposed changes before making a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

