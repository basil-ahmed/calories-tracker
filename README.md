# Calories Tracker

## Project Description

The **Calories Tracker** is a web application that helps users monitor their daily food intake by logging calories consumed and comparing it to a daily calorie goal. This tool is designed to assist users in maintaining dietary targets, with a simple interface that supports food search, calorie tracking, and progress visualization through a neon-inspired, dark-themed UI.

## Features
- **Food Search**: Allows users to search for food items by name and retrieve calorie information using the Nutritionix API.
- **Daily Log**: Users can add searched food items to a daily log, displaying the calorie count of each item.
- **Calorie Goal Setting**: Users can set a custom daily calorie goal, which is used to calculate their progress.
- **Progress Tracking**: A progress bar visually indicates the percentage of the calorie goal met, with a total count of logged calories.

## Tech Stack
- **Frontend**: React.js for building the UI components and managing state.
- **Styling**: Custom CSS for a neon-inspired, dark-mode aesthetic.

## API Integration

The **Nutritionix API** is used to retrieve calorie and nutritional information:
1. **Instant Search API**: Retrieves food items based on a search query entered by the user.
2. **Natural Language Nutrients API**: Provides detailed calorie and nutritional information for specific food items.

### Environment Variables

API credentials are stored securely in a `.env` file to prevent them from being exposed in the codebase. The `.env` file includes the following variables:
```plaintext
REACT_APP_NUTRITIONIX_APP_ID=your_app_id
REACT_APP_NUTRITIONIX_APP_KEY=your_app_key
```

These environment variables are accessed in the code through `process.env.REACT_APP_NUTRITIONIX_APP_ID` and `process.env.REACT_APP_NUTRITIONIX_APP_KEY`.

## Setup and Run Instructions

### Prerequisites
- Ensure Node.js and npm are installed on your machine.

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/basil-ahmed/calories-tracker.git
   cd calories-tracker
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the project root.
   - Add the Nutritionix API credentials as shown above.

4. **Run the Application**:
   ```bash
   npm start
   ```
   This command will launch the development server, and the application should be accessible at [http://localhost:3000](http://localhost:3000).

### Usage
1. **Search for Food**: Enter a food name in the search bar and click "Search" or press "Enter" to retrieve calorie information.
2. **Add to Log**: Click "Add to Log" next to a food item to add it to your daily log and update your total calorie count.
3. **Set Calorie Goal**: Click the "Set Goal" button, enter a target calorie count, and save. This goal will be reflected in the progress bar.
4. **Track Progress**: The progress bar will display the percentage of your daily calorie goal reached.

## Code Example

The following snippet demonstrates how API requests are made using the credentials stored in environment variables:
```javascript
const searchFood = async () => {
  try {
    const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${searchTerm}`, {
      method: 'GET',
      headers: {
        'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
        'x-app-key': process.env.REACT_APP_NUTRITIONIX_APP_KEY,
      },
    });
    const data = await response.json();
    setFoodData(data.common);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
```

## Security Considerations

The `.env` file is listed in `.gitignore` to ensure API credentials remain private and are not committed to version control.

## Credits

### AI Assistance
This project was developed with the support of OpenAI’s ChatGPT. AI assistance was utilized in the following areas:
- **Component Structure**: Initial layout and structure of React components.
- **CSS Styling**: Guidance on implementing a neon-inspired dark mode for better visual appeal.
- **Progress Bar and Goal Setting**: Suggestions for displaying the calorie goal and progress bar with a clean design.
  
All AI-generated code was reviewed, tested, and adjusted as necessary.

## License

This project is licensed under the MIT License.