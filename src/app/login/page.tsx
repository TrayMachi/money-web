"use client";
import Form from "@/components/Form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/service";
import { toast } from "sonner";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const { email, password } = data;

    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    const authService = AuthService.getInstance();

    setLoading(true);
    authService
      .login(email, password)
      .then(() => {
        toast.message("Login Successful", {description: "Welcome to Money Management"});
        setLoading(false);
        router.push("/dashboard");
      })
      .catch((error: any) => {
        if (error.message.includes("Invalid credentials")) {
          toast.error("Invalid Credentials");
        }
        setLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <h1 className="mb-8 text-center text-7xl font-bold text-gray-800">
        Login Page
      </h1>
      <Form
        loading={loading}
        onSubmit={handleSubmit}
        fields={[
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
          },
          {
            name: "password",
            label: "Password",
            type: "Password",
            placeholder: "Enter your password",
          },
        ]}
        btnTitle="Login"
      ></Form>
    </div>
  );
};

export default LoginPage;
