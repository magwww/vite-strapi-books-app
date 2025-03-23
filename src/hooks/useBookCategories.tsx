import { BookCategory } from "@/types";
import { useState, useEffect } from "react";

export function useBookCategories() {
  const [bookCategories, setBookCategories] = useState<BookCategory[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_STRAPI_URL}/api/book-categories?populate=books`
      );
      if (!response.ok) throw new Error("Failed to fetch categories");

      const { data } = await response.json();
      setBookCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function addBook(
    { title, categorySlug }: { title: string; categorySlug: string },
    reset: () => void
  ) {
    try {
      const categoryRes = await fetch(
        `${
          import.meta.env.VITE_STRAPI_URL
        }/api/book-categories?filters[slug][$eq]=${categorySlug}`
      );

      if (!categoryRes.ok) throw new Error("Failed to fetch category");

      const categoryData = await categoryRes.json();
      if (!categoryData.data.length)
        throw new Error(`Category with slug "${categorySlug}" not found.`);

      const categoryDocumentId = categoryData.data[0].documentId;

      const bookRes = await fetch(
        `${import.meta.env.VITE_STRAPI_URL}/api/books?populate=*`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: { Title: title, book_category: categoryDocumentId },
          }),
        }
      );

      if (!bookRes.ok) throw new Error("Failed to add book");

      const newBook = await bookRes.json();

      setBookCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.documentId === categoryDocumentId
            ? { ...category, books: [...category.books, newBook.data] }
            : category
        )
      );
      reset();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }

  return { bookCategories, addBook };
}
