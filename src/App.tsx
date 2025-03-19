import { useEffect, useState } from "react";
import "./App.css";
import { Book } from "./types";
import { InputForm } from "./components/custom/single-input-form";

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
    <div className="flex flex-col items-center gap-12 mt-20">
      <h1>📚 Books from strapi</h1>
      <h2>Add another one:</h2>
      <InputForm {...{ setBooks }} />
      <h2 className="mt-6">Books already read:</h2>
      <ul>
        {books.map((book) => (
          <li key={book.Title}>"{book.Title}"</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
