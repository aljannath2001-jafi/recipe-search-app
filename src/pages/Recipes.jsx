
import { useState, useEffect } from "react";
import axios from "axios";
import useRecipes from "../hooks/useRecipes";
import RecipeCard from "../components/RecipeCard";

const categories = [
    { name: "Chicken", icon: "🍗" },
    { name: "Vegetarian", icon: "🥦" },
    { name: "Seafood", icon: "🦐" },
    { name: "Dessert", icon: "🍰" },
    { name: "Pasta", icon: "🍝" },
    { name: "Beef", icon: "🥩" },
];

function Recipes({ favourites, addFavourite }) {
    const [query, setQuery] = useState(() =>
        sessionStorage.getItem("recipeSearch") || ""
    );

    const [search, setSearch] = useState(() =>
        sessionStorage.getItem("recipeSearch") || ""
    );

    const [selectedCategory, setSelectedCategory] = useState("");

    const [categoryRecipes, setCategoryRecipes] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [categoryError, setCategoryError] = useState(null);

    const { data, loading, error } = useRecipes(search);

    useEffect(() => {
        if (!selectedCategory) return;

        const controller = new AbortController();

        const fetchCategory = async () => {
            setCategoryLoading(true);
            setCategoryError(null);
            setCategoryRecipes([]);

            try {
                const response = await axios.get(
                    "https://www.themealdb.com/api/json/v1/1/filter.php",
                    {
                        params: { c: selectedCategory },
                        signal: controller.signal,
                    }
                );

                setCategoryRecipes(response.data.meals || []);
            } catch (err) {
                if (err.code !== "ERR_CANCELED") {
                    setCategoryError(
                        "Unable to load category recipes. Please try again."
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCategoryLoading(false);
                }
            }
        };

        fetchCategory();

        return () => controller.abort();
    }, [selectedCategory]);

    const handleSearch = (e) => {
        e.preventDefault();

        const searchTerm = query.trim();

        if (!searchTerm) return;

        sessionStorage.setItem("recipeSearch", searchTerm);
        setSelectedCategory("");
        setSearch(searchTerm);
    };

    const showCategory = (category) => {
        setSelectedCategory(category);
    };

    const showSearchResults = () => {
        setSelectedCategory("");
    };

    const isCategoryMode = Boolean(selectedCategory);

    const recipes = isCategoryMode ? categoryRecipes : data;
    const isLoading = isCategoryMode ? categoryLoading : loading;
    const currentError = isCategoryMode ? categoryError : error;

    return (
        <div className="recipes-page">
            <p className="home-tagline">EXPLORE & ENJOY</p>

            <h1>Find Your Perfect Recipe</h1>

            <p className="recipes-subtitle">
                Search delicious meals and discover something new today.
            </p>

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="🔍 Search recipes... (e.g. chicken)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button type="submit">Search</button>
            </form>

            <div className="category-section">
                <h2>Explore by Category</h2>

                <div className="category-filters">
                    <button
                        type="button"
                        className={
                            !selectedCategory
                                ? "category-btn active"
                                : "category-btn"
                        }
                        onClick={showSearchResults}
                    >
                        🍽️ All
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category.name}
                            type="button"
                            className={
                                selectedCategory === category.name
                                    ? "category-btn active"
                                    : "category-btn"
                            }
                            onClick={() => showCategory(category.name)}
                        >
                            {category.icon} {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {selectedCategory && (
                <h2 className="category-results-title">
                    {selectedCategory} Recipes
                </h2>
            )}

            {isLoading && (
                <div className="loading-container" role="status">
                    <div className="spinner"></div>
                    <p>Finding delicious recipes...</p>
                </div>
            )}

            {currentError && (
                <p className="status-message" role="alert">
                    {currentError}
                </p>
            )}

            {!isLoading && !currentError && recipes.length > 0 && (
                <div className="recipe-list">
                    {recipes.map((recipe) => {
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

            {!isLoading &&
                !currentError &&
                recipes.length === 0 &&
                (selectedCategory || search) && (
                    <p className="status-message">
                        No recipes found. Try another search or category!
                    </p>
                )}

            {!selectedCategory && !search && !isLoading && (
                <p className="search-hint">
                    Search for a meal or choose a category above.
                </p>
            )}
        </div>
    );
}

export default Recipes;
