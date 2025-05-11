const Filter = ({ dishes, dishname, meals, setMeals }) => {
  return (
    <button
      onClick={() => {
        // const meals = await fn();
        const dishCategories = dishes;
        const filtered = meals.filter((meal) =>
          dishCategories.includes(meal.strCategory?.toLowerCase())
        );
        setMeals(filtered);
      }}
    >
      {dishname}
    </button>
  );
};

export default Filter;
