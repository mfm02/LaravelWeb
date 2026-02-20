import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Detectar ancho de pantalla
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { text: "Home", path: "/" },
    { text: "Guía Laravel", path: "/guide" },
    { text: "Recetas", path: "/recipes" },
    { text: "Proyectos", path: "/projects" },
    { text: "Interactivo", path: "/interactive" },
  ];

  return (
    <nav style={{ flexDirection: isMobile ? "column" : "row" }}>
      {links.map(link => {
        const isActive = location.pathname === link.path; // ✅ comparación exacta
        return (
          <Link
            key={link.path}
            to={link.path}
            style={{
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              color: "white",
              backgroundColor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
              margin: isMobile ? "4px 0" : "0",
            }}
          >
            {link.text}
          </Link>
        );
      })}
    </nav>
  );
}
