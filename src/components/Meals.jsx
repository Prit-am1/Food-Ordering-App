import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const Meals = () => {
  const [mealInfo, setMealInfo] = useState(null);

  const { mealId } = useParams();

  useEffect(() => {
    fetchMeal();
  }, []);

  const getIngredients = (meal) => {
    const ingredients = [];
    let count = 1;
    while (meal[`strIngredient${count}`]) {
      const ingredient = meal[`strIngredient${count}`];
      if (ingredient.trim() !== "") {
        ingredients.push(`${ingredient}`);
      }
      count++;
    }
    return ingredients;
  };

  const fetchMeal = async () => {
    const meal = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const res = await meal.json();
    setMealInfo(res?.meals[0]);
  };

  return (
    <div className="body-card">
      {mealInfo === null ? (
      <Shimmer />) :(
        <>
      <h1>Meal Details</h1>
      <h3>Meal name: {mealInfo.strMeal}</h3>
      <h3>Ingredients: </h3>
      <ul>
        {getIngredients(mealInfo).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Instructions: </h3>
      <p>{mealInfo.strInstructions}</p>
      </>
      )}
    </div>
  );
};

export default Meals;
