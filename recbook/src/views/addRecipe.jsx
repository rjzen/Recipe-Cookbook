import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../api";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [instructionsList, setInstructionsList] = useState([]);

  const [ingredientInput, setIngredientInput] = useState("");
  const [instructionInput, setInstructionInput] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [showAllInstructions, setShowAllInstructions] = useState(false);

  const navigate = useNavigate();

  const addIngredient = () => {
    if (!ingredientInput.trim()) return;
    setIngredientsList([...ingredientsList, ingredientInput.trim()]);
    setIngredientInput("");
  };

  const addInstruction = () => {
    if (!instructionInput.trim()) return;
    setInstructionsList([...instructionsList, instructionInput.trim()]);
    setInstructionInput("");
  };

  const removeIngredient = (index) => {
    const newList = ingredientsList.filter((_, idx) => idx !== index);
    setIngredientsList(newList);
  };

  const removeInstruction = (index) => {
    const newList = instructionsList.filter((_, idx) => idx !== index);
    setInstructionsList(newList);
  };

  const handleSubmit = async () => {
    const ingredients = ingredientsList.join("\n");
    const instructions = instructionsList.join("\n");

    await createRecipe({ title, ingredients, instructions, imageUrl });
    navigate("/");
  };

  return (
    <div className="add-recipe-container">
      <div className="add-recipe-card">
        <h1>Add Recipe</h1>
        <p className="subtitle">Create a new recipe</p>

        {/* Title */}
        <div className="form-group">
          <label>Title</label>
          <input
            placeholder="Recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Image URL */}
        <div className="form-group">
          <label>Image URL</label>
          <input
            placeholder="Paste image link here"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {/* Ingredients */}
        <div className="form-group">
          <label>Ingredients</label>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "-6px", marginLeft: "350px" }}>
            Press <b>Enter</b> to add
          </p>

          <input
            placeholder="Add one ingredient"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addIngredient();
            }}
          />

          <ul style={{ marginTop: "10px" }}>
            {(showAllIngredients
              ? ingredientsList
              : ingredientsList.slice(0, 2)
            ).map((item, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <span>{item}</span>
                <button className="b3" onClick={() => removeIngredient(idx)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {ingredientsList.length > 2 && (
            <button
              className="b3"
              onClick={() => setShowAllIngredients(!showAllIngredients)}
            >
              {showAllIngredients ? "View less" : "View more"}
            </button>
          )}
        </div>

        {/* Instructions */}
        <div className="form-group">
          <label>Instructions</label>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "-6px", marginLeft: "350px" }}>
            Press <b>Enter</b> to add
          </p>

          <input
            placeholder="Add one instruction"
            value={instructionInput}
            onChange={(e) => setInstructionInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addInstruction();
            }}
          />

          <ol style={{ marginTop: "10px" }}>
            {(showAllInstructions
              ? instructionsList
              : instructionsList.slice(0, 2)
            ).map((item, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <span>{item}</span>
                <button className="b3" onClick={() => removeInstruction(idx)}>
                  Remove
                </button>
              </li>
            ))}
          </ol>

          {instructionsList.length > 2 && (
            <button
              className="b3"
              onClick={() => setShowAllInstructions(!showAllInstructions)}
            >
              {showAllInstructions ? "View less" : "View more"}
            </button>
          )}
        </div>

        <button className="primary-btn" onClick={handleSubmit}>
          Add Recipe
        </button>
      </div>
    </div>
  );
}
