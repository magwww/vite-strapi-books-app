"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Combobox } from "./combo-box";
import { categories } from "../../consts/index";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Title must be at least 1 character." }),
  categorySlug: z.string().min(1, { message: "Please select a category." }),
});

type BookFormProps = {
  onSubmit: (
    data: { title: string; categorySlug: string },
    reset: () => void
  ) => void;
};

export function BookForm({ onSubmit }: BookFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "", categorySlug: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data, form.reset))}
        className="w-2/3 space-y-6"
      >
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
        <FormField
          control={form.control}
          name="categorySlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Combobox
                  field={field}
                  options={categories}
                  placeholder="Select category"
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
