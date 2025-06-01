import { useState, useEffect } from "react";
import RestaurantCard, {WithMiscLabel} from "./RestaurantCard";
import Filter from "./Filter";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import InternetStatus from "./InternetStatus";

export default function Body() {
  const [listOfMeals, setListOfMeals] = useState([]);
  const [filterMeals, setFilterMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const WithLabel = WithMiscLabel(RestaurantCard);
  const status = useOnlineStatus();

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setIsLoading(true); // Show shimmer
      const apiCall = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s"
      );
      const json = await apiCall.json();
      const meals = json?.meals || [];
      setListOfMeals(meals);
      setFilterMeals(meals);
      console.log(meals);
    } catch (e) {
      console.error(e);
      setListOfMeals([]);
      setFilterMeals([]);
    } finally {
      setIsLoading(false); // Hide shimmer
    }
  };

  if (status === false) return <InternetStatus />;

  return (
    <div className="body-card m-5 bg-red-100 shadow-lg rounded">
      <div className="added-functionalities flex">
        <div className="filter-nonVegDishes p-4 font-weight: 800">
          <span className="bg-red-500 px-2 py-1 rounded">
            <Filter
              dishes={["chicken", "seafood", "beef", "pork", "lamb"]}
              dishname="Non Veg Dishes"
              meals={listOfMeals}
              setMeals={setFilterMeals}
            />
          </span>
        </div>
        <div className="filter-vegDishes p-4 font-weight: 800">
          <span className="bg-red-500 px-2 py-1 rounded">
            <Filter
              dishes={["vegetarian", "side", "miscellaneous"]}
              dishname="Veg Dishes"
              meals={listOfMeals}
              setMeals={setFilterMeals}
            />
          </span>
        </div>
        <div className="filter-dessertDishes p-4 font-weight: 800">
          <span className="bg-red-500 px-2 py-1 rounded">
            <Filter
              dishes={["dessert"]}
              dishname="Desserts"
              meals={listOfMeals}
              setMeals={setFilterMeals}
            />
          </span>
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
        {isLoading ? (
          <Shimmer />
        ) : filterMeals.length === 0 ? (
          <h2 className="m-5 text-xl">No meals found</h2>
        ) : (
          filterMeals.map((meal) => (
            <Link key={meal.idMeal} to={"/meals/" + meal.idMeal}>
              {meal.strCategory === "Miscellaneous" ? (<WithLabel resData={meal}/>) : (<RestaurantCard resData={meal} />) }    
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
