

import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Favourites from "./pages/Favourites";

function App() {
    const [favourites, setFavourites] = useState(() => {
  try {
    const saved = localStorage.getItem("recipeFavourites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem(
    "recipeFavourites",
    JSON.stringify(favourites)
  );
}, [favourites]);

    const addFavourite = (recipe) => {
        setFavourites((previous) => {
            const alreadySaved = previous.some(
                (item) => item.idMeal === recipe.idMeal
            );
            if (alreadySaved) return previous;
            return [...previous, recipe];
        });
    };

    const removeFavourite = (id) => {
        setFavourites((previous) =>
            previous.filter((recipe) => recipe.idMeal !== id)
        );
    };

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
               
<Route
    path="/"
    element={
        <Home
            favourites={favourites}
            addFavourite={addFavourite}
        />
    }
/>

                <Route
                    path="/recipes"
                    element={
                        <Recipes
                            favourites={favourites}
                            addFavourite={addFavourite}
                        />
                    }
                />
                <Route
                    path="/recipes/:id"
                    element={<RecipeDetail />}
                />
                <Route
                    path="/favourites"
                    element={
                        <Favourites
                            favourites={favourites}
                            removeFavourite={removeFavourite}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
