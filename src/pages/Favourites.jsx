
function Favourites({ favourites, removeFavourite }) {
    return (
        <div className="favourites-page">
            <p className="home-tagline">YOUR PERSONAL COLLECTION</p>

            <h1>My Favourite Recipes ❤️</h1>

            <p className="favourites-subtitle">
                All your saved delicious recipes in one place.
            </p>

            {favourites.length === 0 ? (
                <div className="empty-favourites">
                    <div className="empty-icon">♡</div>
                    <h2>No favourites yet!</h2>
                    <p>Explore recipes and save the ones you love.</p>
                </div>
            ) : (
                <div className="recipe-list">
                    {favourites.map((recipe) => (
                        <div className="recipe-card" key={recipe.idMeal}>
                            <img
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                            />

                            <h3>{recipe.strMeal}</h3>
                            <p>{recipe.strCategory}</p>

                            <button
                                onClick={() => removeFavourite(recipe.idMeal)}
                            >
                                Remove ♡
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favourites;
