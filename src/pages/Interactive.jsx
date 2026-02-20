import { useState, useEffect } from "react";
import "./Interactive.css";

export default function Interactive() {
  const [view, setView] = useState("quiz");
  
  // Quiz
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(true);

  // Glosario
  const [search, setSearch] = useState("");
  const glossaryTerms = [
    { term: "Migration", description: "Archivo que gestiona cambios en la base de datos." },
    { term: "Seeder", description: "Archivo que permite llenar la base de datos con datos iniciales." },
    { term: "Facade", description: "Interfaz estática para acceder a clases del servicio." },
    { term: "Eloquent", description: "ORM de Laravel para trabajar con modelos y base de datos." },
    { term: "Middleware", description: "Filtra y procesa peticiones antes de llegar al controlador." },
    { term: "Blade", description: "Motor de plantillas de Laravel." },
    { term: "Controller", description: "Gestiona la lógica de las rutas y llama a vistas." }
  ];

  // Roadmap
  const roadmapConcepts = ["Routing", "MVC", "Controllers", "Blade", "Eloquent", "Migrations", "Middleware", "Validation", "API", "Auth"];
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    fetch("/data/quiz.json")
      .then(res => res.json())
      .then(data => {
        setQuizQuestions(data);
        setLoadingQuiz(false);
      });

    const saved = JSON.parse(localStorage.getItem("roadmap")) || [];
    setRoadmap(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("roadmap", JSON.stringify(roadmap));
  }, [roadmap]);

  const handleAnswer = (index) => {
    if (index === quizQuestions[currentQ].answer) setScore(score + 1);
    if (currentQ + 1 < quizQuestions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQ(0);
    setShowResult(false);
  };

  return (
    <div className="container interactive-page">
      <h1>Interactividades Laravel</h1>

      <div className="tabs">
        <button onClick={() => setView("quiz")} className={view === "quiz" ? "active" : ""}>Quiz</button>
        <button onClick={() => setView("glossary")} className={view === "glossary" ? "active" : ""}>Glosario</button>
        <button onClick={() => setView("roadmap")} className={view === "roadmap" ? "active" : ""}>Roadmap</button>
      </div>

      {view === "quiz" && (
        <div className="quiz">
          {loadingQuiz ? (
            <p>Cargando preguntas...</p>
          ) : !showResult ? (
            <>
              <h2>{quizQuestions[currentQ].question}</h2>
              <div className="options">
                {quizQuestions[currentQ].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)}>{opt}</button>
                ))}
              </div>
              <p>Pregunta {currentQ + 1} / {quizQuestions.length}</p>
            </>
          ) : (
            <>
              <h2>Resultado: {score} / {quizQuestions.length}</h2>
              <button onClick={resetQuiz}>Reintentar Quiz</button>
            </>
          )}
        </div>
      )}

      {view === "glossary" && (
        <div className="glossary">
          <input 
            type="text" 
            placeholder="Buscar término..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
          <ul>
            {glossaryTerms
              .filter(t => t.term.toLowerCase().includes(search.toLowerCase()))
              .map(t => (
              <li key={t.term}><strong>{t.term}:</strong> {t.description}</li>
            ))}
          </ul>
        </div>
      )}

      {view === "roadmap" && (
        <div className="roadmap">
          <ul>
            {roadmapConcepts.map(c => (
              <li key={c}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={roadmap.includes(c)} 
                    onChange={() => {
                      if (roadmap.includes(c)) {
                        setRoadmap(roadmap.filter(rc => rc !== c));
                      } else {
                        setRoadmap([...roadmap, c]);
                      }
                    }}
                  /> {c}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
