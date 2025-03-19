import { useEffect, useState } from "react";
import "./App.css";
import { Book } from "./types";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_STRAPI_URL}/api/books`
      );

      const { data } = await response.json();
      setBooks(data);
    };

    getData();
  }, []);

  return (
    <>
      <h1>📚 Books from strapi:</h1>
      <ul className="my-10">
        {books.map((book) => (
          <li key={book.Title}>"{book.Title}"</li>
        ))}
      </ul>
    </>
  );
}

export default App;
