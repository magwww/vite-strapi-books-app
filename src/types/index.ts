export type Book = {
  Title: string;
  createdAt: Date;
  documentId: string;
  id: string;
  publishedAt: Date;
  updatedAt: Date;
};

export type BookCategory = {
  Name: string;
  books: Book[];
  createdAt: Date;
  documentId: string;
  id: number;
  publishedAt: Date;
  slug: string
  updatedAt: Date;
};
