import React, { useState } from 'react';
import './NutritionTracker.css';

function NutritionTracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [foodData, setFoodData] = useState([]);
  const [dailyLog, setDailyLog] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [showGoalInput, setShowGoalInput] = useState(false);

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
      setFoodData(data.common);  // Update the food data state with the search results
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const addFoodToLog = async (foodName) => {
    try {
      const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        headers: {
          'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
          'x-app-key': process.env.REACT_APP_NUTRITIONIX_APP_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: foodName })
      });
      const data = await response.json();
      const calories = data.foods[0].nf_calories; // Extract calories from the response
      setTotalCalories((prevTotal) => parseFloat((parseFloat(prevTotal) + parseFloat(calories)).toFixed(1)));
      setDailyLog([...dailyLog, { name: foodName, calories }]); // Add the food to the daily log
      setFoodData([]); // Clear the search results
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Function to handle the submission of the daily calorie goal 
  const handleGoalSubmit = (e) => {
    e.preventDefault();
    const goal = parseInt(e.target.goal.value);
    if (!isNaN(goal) && goal > 0) {
      setDailyGoal(goal);
    }
    setShowGoalInput(false);
  };

    // Calculate the progress percentage towards the daily goal
  const progressPercentage = Math.min((totalCalories / dailyGoal) * 100, 100);

  return (
    <div className="NutritionTracker">
      <header className="header">
        <h1 className="title">Nutrition Tracker</h1>
        <button onClick={() => setShowGoalInput(!showGoalInput)} className="goal-button">Set Goal</button>
      </header>
      <div className="header-shadow"></div>

      <div className="tracker-container">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchFood();
              }}}
            placeholder="Search for food"
            className="input"
          />
          <button onClick={searchFood} className="search-button">Search</button>
        </div>

        <div className="results-list">
          {foodData.map((item, index) => (
            <div className="food-item" key={index}>
              <span>{item.food_name}</span>
              <button onClick={() => addFoodToLog(item.food_name)} className="add-button">Add to Log</button>
            </div>
          ))}
        </div>

        {dailyLog.length > 0 && (
          <>
            <h2 className="log-title">Daily Log</h2>
            <ul className="log-list">
              {dailyLog.map((item, index) => (
                <li key={index} className="log-item">
                  {item.name} - Calories: {item.calories}
                </li>
              ))}
            </ul>
          </>
        )}

        <h2 className="calorie-count">Total Calories: {totalCalories}</h2>
        
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}>
            {progressPercentage.toFixed(0)}% / {dailyGoal} kcal
          </div>
        </div>
      </div>

      {showGoalInput && (
        <>
          <div className="goal-overlay" onClick={() => setShowGoalInput(false)}></div>
          <form onSubmit={handleGoalSubmit} className="goal-form">
            <input type="number" name="goal" placeholder="Enter calorie goal" className="goal-input" />
            <button type="submit" className="submit-goal">Set</button>
          </form>
        </>
      )}
    </div>
  );
}

export default NutritionTracker;