
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RecipeDetail() {
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                );

                setRecipe(response.data.meals?.[0] || null);
            } catch (err) {
                setError("Unable to load recipe details.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <p className="status-message">Loading recipe...</p>;
    if (error) return <p className="status-message">{error}</p>;
    if (!recipe) return <p className="status-message">Recipe not found.</p>;

    const ingredients = Array.from({ length: 20 }, (_, index) => {
        const ingredient = recipe[`strIngredient${index + 1}`];
        const measure = recipe[`strMeasure${index + 1}`];

        if (!ingredient?.trim()) return null;

        return (
            <li key={index}>
                <span>{ingredient}</span>
                <span>{measure}</span>
            </li>
        );
    }).filter(Boolean);

    return (
        <div className="recipe-detail">
            <div className="detail-header">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />

                <div className="detail-info">
                    <p className="home-tagline">TODAY'S DELICIOUS DISCOVERY</p>
                    <h1>{recipe.strMeal}</h1>
                    <p>Category: {recipe.strCategory}</p>
                    <p>Origin: {recipe.strArea}</p>
                </div>
            </div>

            <div className="detail-content">
                <section className="ingredients-section">
                    <h2>Ingredients</h2>
                    <ul>{ingredients}</ul>
                </section>

                <section className="instructions-section">
                    <h2>Cooking Instructions</h2>
                    <p>{recipe.strInstructions}</p>
                </section>
            </div>
        </div>
    );
}

export default RecipeDetail;
