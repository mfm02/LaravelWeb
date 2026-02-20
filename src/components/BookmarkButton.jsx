import React, { useState, useEffect } from "react";

export default function BookmarkButton({ item, type = "topics" }) {
  const [bookmarked, setBookmarked] = useState(false);

  // Comprobar si ya está en localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || { topics: [], recipes: [] };
    setBookmarked(saved[type]?.includes(item));
  }, [item, type]);

  const toggleBookmark = () => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || { topics: [], recipes: [] };
    let updated = { ...saved };

    if (!updated[type]) updated[type] = [];

    if (bookmarked) {
      // Quitar
      updated[type] = updated[type].filter(i => i !== item);
      setBookmarked(false);
    } else {
      // Añadir
      updated[type].push(item);
      setBookmarked(true);
    }

    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  return (
    <button className="bookmark-btn" onClick={toggleBookmark}>
      {bookmarked ? "★ Favorito" : "☆ Añadir favorito"}
    </button>
  );
}
