import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../api";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async () => {
    await createRecipe({ title, ingredients, instructions, imageUrl });
    navigate("/");
  };

  return (
    <div className="add-recipe-container">
      <div className="add-recipe-card">
        <h1>Add Recipe</h1>
        <p className="subtitle">Create a new recipe</p>

        <div className="form-group">
          <label>Title</label>
          <input
            placeholder="Recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            placeholder="Paste image link here"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          <textarea
            placeholder="Enter ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Instructions</label>
          <textarea
            placeholder="Enter instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        <button className="primary-btn" onClick={handleSubmit}>
          Add Recipe
        </button>
      </div>
    </div>
  );
}
