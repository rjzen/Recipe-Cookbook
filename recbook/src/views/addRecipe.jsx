import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../api";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await createRecipe({ title, ingredients, instructions });
    navigate("/");
  };

  return (
    <>
      <div className="title">
        <h1>ReciBook</h1>
        <p>Add your recipe</p>
      </div>

      <div className="recipe">
        <div className="recipe1">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <input
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />

          <button className="b3" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}
