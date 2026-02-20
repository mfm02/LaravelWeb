import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { projectId } = useParams();
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

  const project = projects.find(p => p.id === projectId);
  if (!project) return <p>Proyecto no encontrado</p>;

  return (
    <div className="container project-detail">
      <h1>{project.title}</h1>
      <p><strong>Objetivo:</strong> {project.objective}</p>
      <p><strong>Módulos Laravel:</strong> {project.modules.join(", ")}</p>
      <p><strong>Stack:</strong> {project.stack.join(", ")}</p>
      <p><strong>Dificultad:</strong> {project.difficulty}</p>

      <div
        className={`project-gallery ${
          project.images.length === 1
            ? "single"
            : project.images.length === 2
            ? "double"
            : "multiple"
        }`}
      >
        {project.images.map((img, i) => (
          <img key={i} src={img} alt={project.title} />
        ))}
      </div>
    </div>
  );
}
