import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipe, updateRecipe } from "../api";

export default function ViewRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getRecipe(id);
    setTitle(data.title);
    setIngredients(data.ingredients);
    setInstructions(data.instructions);
  };

  const handleUpdate = async () => {
    await updateRecipe(id, { title, ingredients, instructions });
    navigate("/");
  };

  return (
    <>
      <div className="title">
        <h1>ReciBook</h1>
        <p>Edit recipe</p>
      </div>

      <div className="recipe">
        <div className="recipe1">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <input
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />

          <button className="b3" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}
