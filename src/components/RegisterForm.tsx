"use client";
import { AuthService } from "@/service";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

// Define the form schema using zod
const FormSchema = z.object({
  userId: z
    .string({
      required_error: "Please fill your username.",
    })
    .min(4, "Username must be at least 4 characters long.")
    .max(16, "Username must be no more than 16 characters long."),
  name: z
    .string({
      required_error: "Please fill your full name.",
    })
    .min(4, "Name must be at least 4 characters long.")
    .max(24, "Name must be no more than 24 characters long."),
  email: z.string({
    required_error: "Please fill your email.",
  }),
  password: z.string({
    required_error: "Please fill your password.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

const RegisterForm: NextPage = () => {
  const router = useRouter();
  const authService = AuthService.getInstance();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: FormValues) {
    authService
      .register(data)
      .then(() => {
        toast.success("Registeration Successful", {
          description: "Enjoy saving your money",
        });
        router.push("/login");
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username..." {...field} />
              </FormControl>
              <FormDescription>Please enter your username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name..." {...field} />
              </FormControl>
              <FormDescription>Please enter your full name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email..." {...field} />
              </FormControl>
              <FormDescription>Please enter your email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password..." {...field} />
              </FormControl>
              <FormDescription>Please enter your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
