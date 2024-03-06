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
  email: z.string({
    required_error: "Please fill your email.",
  }),
  password: z.string({
    required_error: "Please fill your password.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

const LoginForm: NextPage = () => {
  const router = useRouter();
  const authService = AuthService.getInstance();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: FormValues) {
    authService
      .login(data.email, data.password)
      .then(() => {
        toast.message("Login Successful", {
          description: "Welcome to Money Management",
        });
        router.push("/dashboard");
      })
      .catch((error: any) => {
        if (error.message.includes("Invalid credentials")) {
          toast.error("Invalid Credentials");
        }
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
