import React, { useState } from "react";
const CalorieIntake = () => {
  const [inputs, setInputs] = useState(null);

  const searchItems = [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div style={{ fontSize: "3em" }}>Add A Meal</div>
      <form>
        <input
          type="text"
          onChange={handleChange}
          name="Food"
          placeholder="Search Food Items"
          style={{ width: "50vw", height: "10vh", fontSize: "2em" }}
        />
      </form>
      <ul>
        {searchItems &&
          searchItems.map((searchItem) => (
            <li
              key={searchItem.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>Serving Size: {searchItem.serving_size}</p>
              <p>Food Name: {searchItem.food_name}</p>
              <p>Calories: {searchItem.calories}</p>
              <p>Total Fat: {searchItem.fat}</p>
              <p>Carbs: {searchItem.carbohydrate}</p>
              <p>Protein: {searchItem.protein}</p>
              <p>Fiber: {searchItem.fiber}</p>
              <p>Other Nutrients: N/A </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CalorieIntake;
