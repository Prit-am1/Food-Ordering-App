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
    <div className="m-5 bg-red-100 shadow-lg rounded">
      {mealInfo === null ? (
      <div className="m-5 py-5"><Shimmer /></div>) :(
        <div className="m-5 py-5">
      <h1 className="font-extrabold text-xl">Meal Details</h1>
      <h3 className="font-bold pt-2">Meal name:{" "} <span className="font-normal">{mealInfo.strMeal}</span></h3>
      <h3 className="font-bold pt-2">Ingredients:{" "} </h3>
      <ul className="mx-11 pt-2">
        {getIngredients(mealInfo).map((item, index) => (
          <li key={index} type={"disc"}>{item}</li>
        ))}
      </ul>
      <h3 className="font-bold pt-2">Instructions:{" "} </h3>
      <p className="pt-2">{mealInfo.strInstructions}</p>
      </div>
      )}
    </div>
  );
};

export default Meals;
