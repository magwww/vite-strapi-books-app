import "./App.css";
import { BookForm } from "./components/custom/book-form";
import { useBookCategories } from "./hooks/useBookCategories";

function App() {
  const { bookCategories, addBook } = useBookCategories();

  return (
    <div className="flex flex-col items-center gap-12 mt-20">
      <h1>📚 Books from strapi</h1>
      <h2>Add another one:</h2>
      <BookForm onSubmit={addBook} />
      <div className="flex gap-20">
        {bookCategories.map((category) => (
          <ul key={category.id}>
            <h2 className="mb-4 underline">{category.Name}</h2>
            {category.books.map((book) => (
              <li key={book.Title} className="text-left list-disc">
                "{book.Title}"
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
