import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import "./Recipes.css";

export default function RecipeDetail() {
  const { recipeId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/recipes.json")
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return <p>Receta no encontrada</p>;

  return (
    <div className="container recipe-detail">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <h2>Pasos</h2>
      <ol>
        {recipe.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <h2>Código</h2>
      <pre className="code-block">
        <code>{recipe.code}</code>
      </pre>
    </div>
  );
}
