import { useState } from "react";
import useFetch from "../hooks/useFetch";

export default function GlossarySearch() {
  const { data, loading, error } = useFetch("/data/glossary.json");
  const [query, setQuery] = useState("");

  if (loading) return <p>Cargando glosario...</p>;
  if (error) return <p>{error}</p>;

  const filtered = data.filter(t =>
    t.term.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar término..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul>
        {filtered.map((t, i) => (
          <li key={i}>
            <strong>{t.term}:</strong> {t.definition}
          </li>
        ))}
      </ul>
    </div>
  );
}
