// This is a custom hook

import { useState, useEffect } from "react";

const useFetchMeals = (mealId) => {
    const [mealInfo, setMealInfo] = useState(null);

    useEffect(() => {
    fetchMeal();
  }, []);

  const fetchMeal = async () => {
    const meal = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const res = await meal.json();
    setMealInfo(res?.meals[0]);
  };

  return mealInfo;
}

export default useFetchMeals;