export default function RestaurantCard({ resData }) {
  const {
    strMeal: name,
    strCategory: category,
    strArea: cuisine,
    strMealThumb: image,
    strInstructions: instructions,
  } = resData;

  return (
    <div className="res-card w-[190px] text-center ml-0 mt-[15px] mr-[15px] mb-[15px] hover:border-2 hover:border-black rounded-sm cursor-pointer hover:bg-neutral-100">
      <img
        className="res-logo w-[100%] h-[40%]"
        src={image}
        alt={`${name} logo`}
      />
      <div className="px-1 py-1">
      <h3 className="font-bold">{name}</h3>
      <h5><span className="font-bold">Category:</span> {category}</h5>
      <h5><span className="font-bold">Cuisine:</span> {cuisine}</h5>
      <h5 className="font-bold">
        Instructions:{" "}
        <span className="font-normal">
          {instructions.slice(0, 100)}...
        </span>
      </h5>
      </div>
    </div>
  );
}
