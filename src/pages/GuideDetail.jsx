import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import BookmarkButton from "../components/BookmarkButton";
import CodeBlock from "../components/CodeBlock";

export default function GuideDetail() {
  const { topicId } = useParams();
  const { data, loading, error } = useFetch("/data/guideTopics.json");

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const topic = data.find(t => t.id === topicId);
  if (!topic) return <p>Tema no encontrado</p>;

  return (
    <div className="container">
      <h1>{topic.title}</h1>
      <BookmarkButton type="topic" id={topic.id} />

      <p>{topic.description}</p>
      <section>
        <h2>Introducción</h2>
        <p>{topic.intro}</p>
      </section>

      {topic.code && (
        <section>
          <h2>Ejemplo de código</h2>
          <CodeBlock code={topic.code} />
        </section>
      )}

      {topic.tips && topic.tips.length > 0 && (
        <section>
          <h2>Buenas prácticas</h2>
          <ul>
            {topic.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
