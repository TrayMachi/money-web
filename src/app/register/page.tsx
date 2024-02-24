"use client";
import Form from "@/components/Form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { AuthService } from "@/service";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const { userId, name, email, password } = data;

    if (!userId || !name || !email || !password) {
      return toast.error("Please fill all fields");
    }

    const authService = AuthService.getInstance();

    const userData = {
      email,
      password,
      userId,
      name,
    };

    setLoading(true);
    authService
      .register(userData)
      .then((res: any) => {
        setLoading(false);
        toast.success("Registeration Successful")
        router.push("/login");
      })
      .catch((error: any) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <h1 className="mb-8 text-center text-7xl font-bold text-gray-800">
        Register Page
      </h1>
      <Form
        fields={[
          {
            name: "userId",
            label: "Username",
            type: "text",
            placeholder: "Enter your username",
          },
          {
            name: "name",
            label: "Full Name",
            type: "text",
            placeholder: "Enter your full name",
          },
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
        btnTitle="Register"
        onSubmit={handleSubmit}
        loading={loading}
      ></Form>
    </div>
  );
};

export default RegisterPage;
