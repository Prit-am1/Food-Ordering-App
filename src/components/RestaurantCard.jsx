export default function RestaurantCard({ resData }) {
  const {
    strMeal: name,
    strCategory: category,
    strArea: cuisine,
    strMealThumb: image,
    strInstructions: instructions,
  } = resData;

  return (
    <div className="res-card">
      <img className="res-logo" src={image} alt={`${name} logo`} />
      <h3>{name}</h3>
      <h5>Category: {category}</h5>
      <h5>Cuisine: {cuisine}</h5>
      <h5>Instructions: <span style={{fontWeight: "normal"}}>{instructions.slice(0, 100)}...</span></h5>
    </div>
  );
}
