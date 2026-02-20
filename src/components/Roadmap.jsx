import { useState } from "react";

const concepts = [
  "Routing",
  "Controllers",
  "Blade",
  "Eloquent",
  "Migrations",
  "Middleware",
  "Validation",
  "Auth",
  "API",
];

export default function Roadmap() {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem("roadmap");
    return saved ? JSON.parse(saved) : {};
  });

  const toggle = (concept) => {
    const updated = { ...checked, [concept]: !checked[concept] };
    setChecked(updated);
    localStorage.setItem("roadmap", JSON.stringify(updated));
  };

  return (
    <div>
      <ul>
        {concepts.map(c => (
          <li key={c}>
            <label>
              <input
                type="checkbox"
                checked={checked[c] || false}
                onChange={() => toggle(c)}
              />
              {c}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
