"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Book } from "@/types";
import { type Dispatch, type SetStateAction } from "react";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character.",
  }),
});

export function InputForm({
  setBooks,
}: {
  setBooks: Dispatch<SetStateAction<Book[]>>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { Title: data.title } }),
    });

    if (res.ok) {
      const newBook = await res.json();
      setBooks((prevBooks) => [...prevBooks, newBook.data]);
      form.reset();
      toast("Form submitted");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book title</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Harry Potter and The Goblet of Fire"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
