import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import GuideDetail from "./pages/GuideDetail";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Interactive from "./pages/Interactive";
import Navbar from "./components/Navbar";
import "./app.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/guide/:topicId" element={<GuideDetail />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/interactive" element={<Interactive />} />
      </Routes>
    </BrowserRouter>
  );
}
