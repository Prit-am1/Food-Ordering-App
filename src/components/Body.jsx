import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Filter from "./Filter";
import Shimmer from "./Shimmer";

export default function Body() {
  const [listOfMeals, setListOfMeals] = useState([]);
  const [filterMeals, setFilterMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const apiCall = await fetch(
        // `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        "https://www.themealdb.com/api/json/v1/1/search.php?s"
      );
      const json = await apiCall.json();
      console.log(json);
      const meals = json?.meals || [];
      setListOfMeals(meals);
      setFilterMeals(meals);
      return meals;
    } catch (e) {
      console.error(e);
      setListOfMeals([]);
      setFilterMeals([]);
      return [];
    }
  };

  return (
    <div className="body-card">
      <div className="added-functionalities">
        <div className="filter-nonVegDishes">
          <Filter
            dishes={["chicken", "seafood", "beef", "pork", "lamb"]}
            dishname="Non Veg Dishes"
            meals = {listOfMeals}
            setMeals={setFilterMeals}
          />
        </div>
        <div className="filter-vegDishes">
          <Filter
            dishes={["vegetarian", "side", "miscellaneous"]}
            dishname="Veg Dishes"
            meals = {listOfMeals}
            setMeals={setFilterMeals}
          />
        </div>
        <div className="filter-dessertDishes">
          <Filter
            dishes={["dessert"]}
            dishname="Desserts"
            meals = {listOfMeals}
            setMeals={setFilterMeals}
          />
        </div>
        <div className="serach-dishes">
          <input
            type="text"
            placeholder="Search Meal"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => {
              const filteredMeals = listOfMeals.filter((meal) =>
                meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
              );
              setFilterMeals(filteredMeals);
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="dish-container">
        {filterMeals.length === 0 ? (
          <Shimmer />
        ) : (
          filterMeals.map((meal) => (
            <RestaurantCard key={meal.idMeal} resData={meal} />
          ))
        )}
      </div>
    </div>
  );
}
