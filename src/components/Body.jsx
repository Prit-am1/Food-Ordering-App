import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Filter from "./Filter";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

export default function Body() {
  const [listOfMeals, setListOfMeals] = useState([]);
  const [filterMeals, setFilterMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const status = useOnlineStatus();

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

  if(status === false) {
    return(
      <div className="body-card flex m-5 bg-red-100 shadow-lg rounded justify-center">
        <h1>Oops!!! You are currently offline. Kindly check your internet connection</h1>
      </div>
    )
  }


  return (
    <div className="body-card m-5 bg-red-100 shadow-lg rounded">
      <div className="added-functionalities flex">
        <div className="filter-nonVegDishes p-4 font-weight: 800">
          <button className="bg-red-500 px-2 py-1 rounded">
            <Filter
            dishes={["chicken", "seafood", "beef", "pork", "lamb"]}
            dishname="Non Veg Dishes"
            meals = {listOfMeals}
            setMeals={setFilterMeals}
          />
          </button>
        </div>
        <div className="filter-vegDishes p-4 font-weight: 800">
          <button className="bg-red-500 px-2 py-1 rounded">
            <Filter
            dishes={["vegetarian", "side", "miscellaneous"]}
            dishname="Veg Dishes"
            meals = {listOfMeals}
            setMeals={setFilterMeals}
          />
          </button>
        </div>
        <div className="filter-dessertDishes p-4 font-weight: 800">
          <button className="bg-red-500 px-2 py-1 rounded">
            <Filter
            dishes={["dessert"]}
            dishname="Desserts"
            meals = {listOfMeals}
            setMeals={setFilterMeals}
          />
          </button>
        </div>
        <div className="serach-dishes p-4 font-weight: 800">
          <input
            type="text"
            placeholder="Search Meal"
            className="search-bar p-1 rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="mx-2 px-2 py-1 bg-red-500 rounded font-weight: 800"
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
      <div className="dish-container my-10 mx-5 flex flex-wrap">
        {filterMeals.length === 0 ? (
          <Shimmer />
        ) : (
          filterMeals.map((meal) => (
            <Link key={meal.idMeal} to = {"/meals/" + meal.idMeal}><RestaurantCard resData={meal} /></Link>
          ))
        )}
      </div>
    </div>
  );
}
