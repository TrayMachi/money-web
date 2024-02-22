import React from "react";
import Form from "@/components/Form";

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <h1 className="text-7xl mb-8 text-center font-bold text-gray-800">
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
        btnTitle="Login"
      ></Form>
    </div>
  );
};

export default RegisterPage;
