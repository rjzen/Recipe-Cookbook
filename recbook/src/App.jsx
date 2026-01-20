import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

import AllRecipes from "./views/allRecipes";
import AddRecipe from "./views/addRecipe";
import ViewRecipe from "./views/ViewRecipe";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllRecipes />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/view/:id" element={<ViewRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
