
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home({ favourites = [], addFavourite }) {
    const [featuredRecipes, setFeaturedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const fetchFeaturedRecipes = async () => {
            try {
                setLoading(true);
                setError("");

                const searchTerms = [
                    "chicken",
                    "curry",
                    "biryani",
                    "dal",
                    "paneer"
                ];

                const responses = await Promise.all(
                    searchTerms.map((term) =>
                        axios.get(
                            "https://www.themealdb.com/api/json/v1/1/search.php",
                            {
                                params: { s: term },
                                signal: controller.signal
                            }
                        )
                    )
                );

                const allRecipes = responses.flatMap(
                    (response) => response.data.meals || []
                );

                const indianRecipes = allRecipes.filter(
                    (recipe) =>
                        ["india", "indian"].includes(
                            (recipe.strArea || "").toLowerCase()
                        ) ||
                        (recipe.strCountry || "").toLowerCase() === "india"
                );

                const uniqueRecipes = Array.from(
                    new Map(
                        indianRecipes.map((recipe) => [
                            recipe.idMeal,
                            recipe
                        ])
                    ).values()
                );

                if (!controller.signal.aborted) {
                    setFeaturedRecipes(uniqueRecipes.slice(0, 6));
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setError("Unable to load Indian recipes.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchFeaturedRecipes();

        return () => controller.abort();
    }, []);

    return (
        <div className="premium-home">
            {/* HERO SECTION */}
            <section className="premium-hero">
                <div className="premium-content">
                    <p className="premium-label">
                        ✦ THE ART OF GOOD FOOD
                    </p>

                    <h1>
                        Every Recipe
                        <br />
                        Tells a <span>Story.</span>
                    </h1>

                    <p className="premium-description">
                        Discover delicious flavours, explore inspiring
                        recipes, and turn everyday cooking into
                        something extraordinary.
                    </p>

                    <div className="premium-actions">
                        <Link
                            to="/recipes"
                            className="premium-button"
                        >
                            Explore Recipes →
                        </Link>

                        <Link
                            to="/favourites"
                            className="premium-secondary"
                        >
                            My Favourites ♡
                        </Link>
                    </div>

                    <div className="premium-stats">
                        <div>
                            <strong>Fresh</strong>
                            <span>Cooking Inspiration</span>
                        </div>

                        <div>
                            <strong>Global</strong>
                            <span>Flavours & Cuisines</span>
                        </div>

                        <div>
                            <strong>Made</strong>
                            <span>With Love ♡</span>
                        </div>
                    </div>
                </div>

                <div className="premium-visual">
                    <div className="premium-image-frame">
                        <img
                            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1200"
                            alt="Beautifully prepared fresh meal"
                        />
                    </div>

                    <div className="premium-floating-card">
                        <span>✦ CHEF'S INSPIRATION</span>
                        <strong>
                            Discover something delicious
                        </strong>
                        <p>One recipe at a time.</p>
                    </div>
                </div>
            </section>

            {/* FEATURED INDIAN RECIPES */}
            <section className="featured-section">
                <div className="featured-heading">
                    <p className="premium-label">
                        ✦ HANDPICKED INSPIRATION
                    </p>

                    <h2>Featured Indian Recipes</h2>

                    <p>
                        Discover delicious dishes and find your
                        next cooking inspiration.
                    </p>
                </div>

                {loading && (
                    <div
                        className="loading-container"
                        role="status"
                    >
                        <div className="spinner"></div>
                        <p>Loading delicious recipes...</p>
                    </div>
                )}

                {error && (
                    <p
                        className="status-message"
                        role="alert"
                    >
                        {error}
                    </p>
                )}

                {!loading && !error && featuredRecipes.length === 0 && (
                    <p className="status-message">
                        No Indian recipes available right now.
                    </p>
                )}

                {!loading && !error && featuredRecipes.length > 0 && (
                    <div className="featured-grid">
                        {featuredRecipes.map((recipe) => {
                            const isFavourite = favourites.some(
                                (item) =>
                                    item.idMeal === recipe.idMeal
                            );

                            return (
                                <div
                                    className="featured-card"
                                    key={recipe.idMeal}
                                >
                                    <Link
                                        to={`/recipes/${recipe.idMeal}`}
                                        className="featured-card-link"
                                    >
                                        <img
                                            src={recipe.strMealThumb}
                                            alt={recipe.strMeal}
                                            loading="lazy"
                                        />

                                        <div className="featured-card-info">
                                            <span>
                                                🇮🇳{" "}
                                                {recipe.strCategory ||
                                                    "Indian Cuisine"}
                                            </span>

                                            <h3>{recipe.strMeal}</h3>

                                            <p>Explore Recipe →</p>
                                        </div>
                                    </Link>

                                    <button
                                        type="button"
                                        className="featured-favourite-btn"
                                        onClick={() =>
                                            addFavourite?.(recipe)
                                        }
                                        disabled={isFavourite}
                                    >
                                        {isFavourite
                                            ? "❤️ Saved to Favourites"
                                            : "🤍 Save to Favourites"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="featured-explore">
                    <Link
                        to="/recipes"
                        className="premium-button"
                    >
                        Explore All Recipes →
                    </Link>
                </div>
            </section>

            {/* BOTTOM SECTION */}
            <section className="premium-bottom">
                <p>DISCOVER • CREATE • SAVOUR</p>

                <h2>Good food. Beautiful moments.</h2>

                <Link to="/recipes">
                    Find your next favourite recipe →
                </Link>
            </section>
        </div>
    );
}

export default Home;
