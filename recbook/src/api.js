const API_URL = "http://localhost:5000/api/recipes";

const headers = {
  "Content-Type": "application/json",
  "x-api-key": "supersecret123", // only for protected routes
};

export async function getRecipes(query = "") {
  const url = query ? `${API_URL}?q=${encodeURIComponent(query)}` : API_URL;

  const res = await fetch(url);
  if (!res.ok) {
    console.error("Failed to fetch recipes", res.status);
    return [];
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function getRecipe(id) {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) return null;

  return await res.json();
}

export async function createRecipe(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateRecipe(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteRecipe(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers,
  });
  return await res.json();
}
