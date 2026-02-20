import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import "./Recipes.css";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [tagFilter, setTagFilter] = useState([]);

  useEffect(() => {
    fetch("/data/recipes.json")
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  const tags = Array.from(new Set(recipes.flatMap(r => r.tags)));

  const toggleTag = (tag) => {
    setTagFilter(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filtered = recipes.filter(r => {
    const matchesText = r.title.toLowerCase().includes(filter.toLowerCase());
    const matchesTags = tagFilter.length === 0 || tagFilter.every(t => r.tags.includes(t));
    return matchesText && matchesTags;
  });

  return (
    <div className="container">
      <h1>Laravel Cookbook</h1>

      <input
        type="text"
        placeholder="Buscar receta..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="search-input"
      />

      <div className="filter-bar">
        {tags.map(tag => (
          <button
            key={tag}
            className={`filter-btn ${tagFilter.includes(tag) ? "active" : ""}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
        {tagFilter.length > 0 && (
          <button
            className="filter-btn clear-btn"
            onClick={() => setTagFilter([])}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="recipes-grid">
        {filtered.map(recipe => (
            <div key={recipe.id} className="card">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <div className="tags">
                    {recipe.tags.map(t => (
                    <span key={t}>{t}</span>
                    ))}
                </div>
                <Link to={`/recipes/${recipe.id}`}>Ver detalles</Link>
            </div>
        ))}
        {filtered.length === 0 && <p>No se encontraron recetas.</p>}
      </div>
    </div>
  );
}
