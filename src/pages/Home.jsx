import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import CTAButton from "../components/CTAButton";
import "./Home.css"

export default function Home() {
  const { data, loading, error } = useFetch("/data/landing.json");

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <section style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>{data.title}</h1>
        <p style={{ maxWidth: "700px", margin: "10px auto", lineHeight: "1.6" }}>
          {data.description}
        </p>
        <img
          src="/images/logo-laravel.png"
          alt="Logo Laravel"
          style={{ width: "200px", marginTop: "20px" }}
        />
      </section>

      <section style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap", marginBottom: "40px" }}>
        {data.cta.map((btn, i) => (
          <CTAButton key={i} text={btn.text} link={btn.link} />
        ))}
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>¿Qué es Laravel?</h2>
        <p>
          Laravel es un framework de PHP moderno que facilita la creación de aplicaciones web
          robustas y escalables. Proporciona herramientas integradas para routing, controladores, 
          migraciones, autenticación y mucho más, siguiendo el patrón MVC.
        </p>

      <section style={{ marginBottom: "30px" }}>
        <h2>Para qué se usa</h2>
        <p>
          Laravel se utiliza para desarrollar aplicaciones web de cualquier tamaño, desde sitios simples
          hasta proyectos complejos con APIs, sistemas de autenticación, gestión de usuarios y administración de datos.
          También facilita la integración con librerías, pruebas automatizadas y despliegue profesional.
        </p>
      </section>

        <h2>El ecosistema de Laravel</h2>
        <p>
          Laravel no es solo un framework: su ecosistema incluye herramientas como:&nbsp;
          <strong>Laravel Nova</strong> (panel administrativo),&nbsp;
          <strong>Laravel Sail</strong> (entorno Docker),&nbsp;
          <strong>Laravel Horizon</strong> (gestión de colas),
          y <strong>Laravel Mix</strong> (compilación de assets), facilitando el desarrollo completo.
        </p>

        <img
            src="/images/laravel-ecosystem.png"
            className="ecosystem-image"
        />

      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Qué encontrarás en esta web</h2>
        <ul>
          <li>Guía completa de conceptos y funcionalidades de Laravel.</li>
          <li>Recetas prácticas y ejemplos de código.</li>
          <li>Proyectos tipo para ver cómo aplicar Laravel en escenarios reales.</li>
          <li>Sección interactiva: quiz, glosario y roadmap de aprendizaje.</li>
        </ul>
      </section>
    </div>
  );
}
