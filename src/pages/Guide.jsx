import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import FilterBar from "../components/FilterBar";
import Card from "../components/Card";
import "./Guide.css";

export default function Guide() {
  const { data, loading, error } = useFetch("/data/guideTopics.json");
  const [filter, setFilter] = useState("");

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const filteredTopics = data.filter(topic =>
    topic.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Guía Laravel</h1>
      <FilterBar setFilter={setFilter} placeholder="Filtra temas por título..." />

        <div className="guide-grid">
            {filteredTopics.map(topic => (
                <Card key={topic.id} title={topic.title} description={topic.description}>
                <Link to={`/guide/${topic.id}`}>Ver detalles</Link>
                </Card>
            ))}
        </div>

    </div>
  );
}
