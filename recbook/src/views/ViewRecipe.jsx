import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipe, updateRecipe } from "../api";

export default function ViewRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState(""); 

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getRecipe(id);
    setTitle(data.title);
    setIngredients(data.ingredients);
    setInstructions(data.instructions);
    setImageUrl(data.imageUrl); 
  };

  const handleUpdate = async () => {
    await updateRecipe(id, { title, ingredients, instructions, imageUrl });
    navigate("/");
  };

  return (
    <div className="add-recipe-container1">
      <div className="add-recipe-card">
        <h1>Edit Recipe</h1>
        <p className="subtitle">Update your recipe details</p>

        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe title"
          />
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="recipe"
            style={{ width: "100%", borderRadius: "12px", marginBottom: "10px" }}
          />
        )}

        <div className="form-group">
          <label>Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="List ingredients separated by commas"
          />
        </div>

        <div className="form-group">
          <label>Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Write cooking steps..."
          />
        </div>

        <button className="primary-btn" onClick={handleUpdate}>
          Update Recipe
        </button>
      </div>
    </div>
  );
}
