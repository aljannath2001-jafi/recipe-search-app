
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">🍲 Recipe Finder</div>

            <div className="nav-links">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/recipes"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    Recipes
                </NavLink>

                <NavLink
                    to="/favourites"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    Favourites ❤️
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
