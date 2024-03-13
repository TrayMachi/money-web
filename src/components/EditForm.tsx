"use client";
import { useEffect, useState } from "react";
import { DBService } from "@/service";
import { useRouter, useParams } from "next/navigation";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { toast } from "sonner";

const types = [
  { value: "Income", label: "Income" },
  { value: "Expense", label: "Expense" },
] as const;

const category = [
  { value: "Salary", label: "Salary" },
  { value: "Gift", label: "Gift" },
  { value: "Food & Beverages", label: "Food & Beverages" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Fashion", label: "Fashion" },
  { value: "Transportation", label: "Transportation" },
] as const;

// Define the form schema using zod
const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(16, {
      message: "Name must not be longer than 16 characters.",
    }),
  type: z.string({
    required_error: "Please select a type.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  amount: z.number({
    required_error: "Please enter an amount.",
  }),
  description: z.string().max(100, { message: "Description is too long." }),
  date: z.date({
    required_error: "A date of transaction is required.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

const dbService = new DBService();

const EditForm: NextPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [previous, setPrevious] = useState<any>({});
  let timezone = new Date().toLocaleString();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });
  
  useEffect(() => {
    if (id) {
      dbService
        .getDocument(id.toString())
        .then((res) => {
          const defaultValues: Partial<FormValues> = {
            name: res.name,
            type: res.type,
            category: res.category,
            amount: res.amount,
            description: res.description,
          };
          form.reset(defaultValues);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, form.reset]);

  function onSubmit(data: FormValues) {
    let newDate = format(new Date(data.date), "yyyy/MM/dd");
    dbService
      .update(id.toString(), {
        ...data,
        amount: Number(data.amount),
        date: newDate,
      })
      .then(() => {
        toast.success(`${data.name} has been updated`, {
          description: `Your new ${data.type} has been edited ${timezone}`,
        });

        router.push("/dashboard");
      });
  }

  return (
    <>
    {previous ? (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name that will be displayed on your profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Status</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? types.find((type) => type.value === field.value)
                              ?.label
                          : "Select a Type"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Type..." />
                      <CommandEmpty>No Type has been selected</CommandEmpty>
                      <CommandGroup>
                        {types.map((type) => (
                          <CommandItem
                            value={type.label}
                            key={type.value}
                            onSelect={() => {
                              form.setValue("type", type.value);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                type.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {type.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the type of transaction you want to add.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? category.find(
                              (category) => category.value === field.value,
                            )?.label
                          : "Select a Category"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Category..." />
                      <CommandEmpty>No Category has been selected</CommandEmpty>
                      <CommandGroup>
                        {category.map((category) => (
                          <CommandItem
                            value={category.label}
                            key={category.value}
                            onSelect={() => {
                              form.setValue("category", category.value);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {category.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the available category of transaction you want to add.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Amount" {...field} />
                </FormControl>
                <FormDescription>
                  How much money is involved in this transaction?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  Explain what this transaction is about.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When did this transaction happen?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Transaction</Button>
        </form>
      </Form>
      ) : (
        <h1 className="my-20 text-center text-4xl font-bold">
          404: Document Not Found
        </h1>
      )}
    </>
  );
};

export default EditForm;
