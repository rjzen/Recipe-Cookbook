import { Link } from "react-router-dom";

function NavbarButtons() {
  return (
    <div className="header">
      <Link className="b1" to="/">
        All Recipes
      </Link>
      <Link className="b2" to="/add">
        Add Recipe
      </Link>
    </div>
  );
}

export default NavbarButtons;
