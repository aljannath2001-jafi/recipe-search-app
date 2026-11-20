
import { Link } from "react-router-dom";

function RecipeCard({ recipe, addFavourite, isFavourite }) {
    return (
        <div className="recipe-card">
            <Link
                to={`/recipes/${recipe.idMeal}`}
                className="recipe-card-content"
            >
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="recipe-image"
                />

                <div className="recipe-info">
                    <h3>{recipe.strMeal}</h3>

                    <p>
                 <p>
                         {recipe.strArea
                             ? `${recipe.strArea} Cuisine`
                             : "Discover this delicious recipe"}
                </p>
                    </p>

                    <span className="view-btn">
                        View Recipe →
                    </span>
                </div>
            </Link>

            <button
                type="button"
                className="favourite-btn"
                onClick={() => addFavourite(recipe)}
                disabled={isFavourite}
            >
                {isFavourite
                    ? "❤️ Saved"
                    : "🤍 Save to Favourites"}
            </button>
        </div>
    );
}

export default RecipeCard;
