
import { useState } from "react";
import useRecipes from "../hooks/useRecipes";
import RecipeCard from "../components/RecipeCard";

function Recipes({ favourites, addFavourite }) {
    const [query, setQuery] = useState(() => {
    return sessionStorage.getItem("recipeSearch") || "";
});

const [search, setSearch] = useState(() => {
    return sessionStorage.getItem("recipeSearch") || "";
});

    const { data, loading, error } = useRecipes(search);

    return (
        <div className="recipes-page">
            <p className="home-tagline">EXPLORE & ENJOY</p>

            <h1>Find Your Perfect Recipe</h1>

            <p className="recipes-subtitle">
                Search delicious meals and discover something new today.
            </p>

           
<form
    onSubmit={(e) => {
        e.preventDefault();

        if (query.trim()) {
            const searchTerm = query.trim();

            sessionStorage.setItem("recipeSearch", searchTerm);

            setSearch(searchTerm);
        }
    }}
>

            
                <input
                    type="text"
                    placeholder="🔍 Search recipes... (e.g. chicken)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button type="submit">Search</button>
            </form>

            {loading && (
                <div className="loading-container" role="status">
                    <div className="spinner"></div>
                    <p>Finding delicious recipes...</p>
                </div>
            )}

            {error && (
                <p className="status-message">{error}</p>
            )}

            {!loading && !error && data.length > 0 && (
                <div className="recipe-list">
                    {data.map((recipe) => {
                        const isFavourite = favourites.some(
                            (item) => item.idMeal === recipe.idMeal
                        );

                        return (
                            <RecipeCard
                                key={recipe.idMeal}
                                recipe={recipe}
                                addFavourite={addFavourite}
                                isFavourite={isFavourite}
                            />
                        );
                    })}
                </div>
            )}

            {search && !loading && !error && data.length === 0 && (
                <p>No recipes found. Try another search!</p>
            )}

            {!search && !loading && (
                <p className="search-hint">
                    Type a food name above to discover recipes.
                </p>
            )}
        </div>
    );
}

export default Recipes;
