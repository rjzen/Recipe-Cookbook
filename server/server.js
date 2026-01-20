import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import dotenv from "dotenv";
import { apiKeyAuth } from "./middleware/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("recipes.db");

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    ingredients TEXT,
    instructions TEXT
  )
`);

//ROUTES
app.get("/", (req, res) => {
  res.send("Cookbook API is running");
});

// Create a new recipe
app.post("/api/recipes", apiKeyAuth, (req, res) => {
  const { title, ingredients, instructions } = req.body;
  db.run(
    "INSERT INTO recipes (title, ingredients, instructions) VALUES (?, ?, ?)",
    [title, ingredients, instructions],
    function () {
      res.json({ id: this.lastID });
    }
  );
});

// Get all recipes
app.get("/api/recipes", (req, res) => {
  const q = req.query.q;

  if (q) {
    const search = `%${q}%`;
    db.all(
      "SELECT * FROM recipes WHERE title LIKE ? OR ingredients LIKE ?",
      [search, search],
      (err, rows) => {
        res.json(rows);
      }
    );
  } else {
    db.all("SELECT * FROM recipes", [], (err, rows) => {
      res.json(rows);
    });
  }
});

app.get("/api/recipes/:id", (req, res) => {
  db.get("SELECT * FROM recipes WHERE id=?", [req.params.id], (err, row) => {
    res.json(row);
  });
});

// Update a recipe
app.put("/api/recipes/:id", apiKeyAuth, (req, res) => {
  const { title, ingredients, instructions } = req.body;
  db.run(
    "UPDATE recipes SET title=?, ingredients=?, instructions=? WHERE id=?",
    [title, ingredients, instructions, req.params.id],
    () => res.json({ updated: true })
  );
});

// Delete a recipe
app.delete("/api/recipes/:id", apiKeyAuth, (req, res) => {
  db.run("DELETE FROM recipes WHERE id=?", req.params.id, () =>
    res.json({ deleted: true })
  );
});

app.listen(5000, () => console.log("Backend on http://localhost:5000"));
