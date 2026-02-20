import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/projects.json")
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h1>Proyectos Tipo Laravel</h1>
      <div className="projects-grid">
        {projects.map(project => (
            <div key={project.id} className="card">
                <h3>{project.title}</h3>
                <p>{project.objective}</p>
                <p><strong>Dificultad:</strong> {project.difficulty}</p>
                <Link to={`/projects/${project.id}`}>Ver detalles</Link>
            </div>
        ))}
      </div>
    </div>
  );
}
