import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { StyledContainer } from "../../Components/Styles/Container.styled";
import StyledHeader from "../../Components/Styles/Header.styled";

const CalorieIntake = () => {
    const [inputs, setInputs] = useState(null);

    const searchItems = [
        {
            id: 0,
            serving_size: "Slice",
            food_name: "Whole Grain Bread",
            calories: "67",
            fat: "1g",
            carbohydrate: "13g",
            protein: "2g",
            fiber: "0.6g",
        },
        {
            id: 1,
            serving_size: "Slice",
            food_name: "Whole Grain Bread",
            calories: "67",
            fat: "1g",
            carbohydrate: "13g",
            protein: "2g",
            fiber: "0.6g",
        },
        {
            id: 2,
            serving_size: "Slice",
            food_name: "Whole Grain Bread",
            calories: "67",
            fat: "1g",
            carbohydrate: "13g",
            protein: "2g",
            fiber: "0.6g",
        },
        {
            id: 3,
            serving_size: "Slice",
            food_name: "Whole Grain Bread",
            calories: "67",
            fat: "1g",
            carbohydrate: "13g",
            protein: "2g",
            fiber: "0.6g",
        },
        {
            id: 4,
            serving_size: "Slice",
            food_name: "Whole Grain Bread",
            calories: "67",
            fat: "1g",
            carbohydrate: "13g",
            protein: "2g",
            fiber: "0.6g",
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <StyledHeader>
                <Navbar />
            </StyledHeader>
            <StyledContainer>
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
                <ul>{searchItems && searchItems.map((searchItem) => (
                    <li key={searchItem.id} style={{display: "flex", justifyContent: "space-between"}}>
                        <p>Serving Size: {searchItem.serving_size}</p>
                        <p>Food Name: {searchItem.food_name}</p>
                        <p>Calories: {searchItem.calories}</p>
                        <p>Total Fat: {searchItem.fat}</p>
                        <p>Carbs: {searchItem.carbohydrate}</p>
                        <p>Protein: {searchItem.protein}</p>
                        <p>Fiber: {searchItem.fiber}</p>
                        <p>Other Nutrients: N/A </p>
                    </li>
        ))}</ul>
            </StyledContainer>
        </div>
    );
};

export default CalorieIntake;
