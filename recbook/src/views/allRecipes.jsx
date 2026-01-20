import { useEffect, useState } from "react";
import { getRecipes, deleteRecipe } from "../api";
import { Link } from "react-router-dom";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getRecipes();
    setRecipes(data);
  };

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    load();
  };

  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="title">
        <h1>ReciBook</h1>
        <p>All recipes</p>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* DISPLAY CARDS SIDE BY SIDE */}
      <div className="recipe">
        <div className="recipe1">
          {filteredRecipes.map((r) => (
            <div key={r.id} className="recipe-card">
              <p className="recipe-title">{r.title}</p>

              <Link className="b3" to={`/view/${r.id}`}>
                View
              </Link>

              <button className="b3" onClick={() => handleDelete(r.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
