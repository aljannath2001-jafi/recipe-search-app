
import { Link } from "react-router-dom";

function RecipeCard({ recipe, addFavourite, isFavourite }) {
    return (
        <div className="recipe-card">

            <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipe-image"
            />

            <div className="recipe-info">

                <h3>{recipe.strMeal}</h3>

                <p>{recipe.strArea || "International"} Cuisine</p>

                <Link
                    to={`/recipes/${recipe.idMeal}`}
                    className="view-btn"
                >
                    View Recipe
                </Link>

                <button
                    className="favourite-btn"
                    onClick={() => addFavourite(recipe)}
                >
                    {isFavourite ? "❤️ Saved" : "🤍 Save to Favourites"}
                </button>

            </div>
        </div>
    );
}

export default RecipeCard;
