
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">
            <div className="home-content">
                <p className="home-tagline">FRESH IDEAS • DELICIOUS MEALS</p>

                <h1>
                    Discover Your Next
                    <br />
                    <span>Favourite Recipe</span>
                </h1>

                <p className="home-description">
                    Explore delicious recipes, discover new flavours,
                    and bring happiness to your kitchen.
                </p>

                <Link to="/recipes" className="explore-button">
                    Explore Recipes →
                </Link>
            </div>

            <div className="home-image">
                <img
                    src="https://images.unsplash.com/photo-1547592180-85f173990554?w=900"
                    alt="Fresh healthy food bowl"
                />
            </div>
        </div>
    );
}

export default Home;
