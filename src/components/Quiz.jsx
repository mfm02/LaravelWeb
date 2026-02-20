import { useState } from "react";
import useFetch from "../hooks/useFetch";

export default function Quiz() {
  const { data, loading, error } = useFetch("/data/quiz.json");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (loading) return <p>Cargando quiz...</p>;
  if (error) return <p>{error}</p>;

  const question = data[current];

  const handleAnswer = (option) => {
    if (option === question.answer) setScore(score + 1);
    if (current + 1 < data.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <div>
      {finished ? (
        <div>
          <h3>Resultado: {score}/{data.length}</h3>
          <button onClick={restart}>Reintentar</button>
        </div>
      ) : (
        <div>
          <p><strong>Pregunta {current + 1}:</strong> {question.q}</p>
          {question.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt)}>{opt}</button>
          ))}
        </div>
      )}
    </div>
  );
}
