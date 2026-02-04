import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipe } from "../api";

export default function ViewRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getRecipe(id);
    setRecipe(data);
  };

  if (!recipe) return <p>Loading...</p>;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="add-recipe-container1">
      <div className="add-recipe-card">
        <button 
          className="backBtn" 
          onClick={handleBack}
          style={{ 
            marginBottom: "15px", 
            padding: "8px 16px", 
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back
        </button>
        <h1>{recipe.title}</h1>
        <p className="subtitle">Recipe Details</p>

        {recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt="recipe"
            style={{
              width: "100%",
              borderRadius: "12px",
              marginBottom: "15px",
            }}
          />
        )}

        <div className="form-group">
          <label>Ingredients</label>
          <p>{recipe.ingredients}</p>
        </div>

        <div className="form-group">
          <label>Instructions</label>
          <p style={{ whiteSpace: "pre-line" }}>
            {recipe.instructions}
          </p>
        </div>
      </div>
    </div>
  );
}
