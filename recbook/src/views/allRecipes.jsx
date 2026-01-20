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
    <div className="recipes-page">
      <div className="recipes-header">
        <h1>All Recipes</h1>
        <p>Browse your saved recipes</p>

        <div className="search">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="recipes-grid">
        {filteredRecipes.map((r) => (
          <div key={r.id} className="recipe-card">
            <h3>{r.title}</h3>

            {r.imageUrl && (
              <img
                src={r.imageUrl}
                alt={r.title}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "10px",
                }}
              />
            )}

            <div className="card-actions">
              <Link className="b1" to={`/view/${r.id}`}>
                View
              </Link>

              <button className="b3" onClick={() => handleDelete(r.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
