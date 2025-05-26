import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useFetchMeals from "../utils/useFetchMeals";

const Meals = () => {

  const { mealId } = useParams();
  const mealInfo = useFetchMeals(mealId); // Using custom hook

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
