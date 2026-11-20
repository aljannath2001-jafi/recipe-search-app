
import { useState, useEffect } from "react";
import axios from "axios";

function useRecipes(query) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
                );

                setData(response.data.meals || []);
            } catch (err) {
                setError("Failed to fetch recipes. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (query.trim()) {
            fetchRecipes();
        } else {
            setData([]);
            setLoading(false);
            setError(null);

        }
    }, [query]);

    return { data, loading, error };
}

export default useRecipes;
