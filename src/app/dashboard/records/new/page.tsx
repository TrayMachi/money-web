"use client";
import type { NextPage } from "next";
import Form from "@/components/Form";
import { useEffect, useState } from "react";
import { DBService, AuthService } from "@/service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddIncomeExpense: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const authService = AuthService.getInstance();
  const dbService = DBService.getInstance();

  const fetchUser = async () => {
    try {
      const data = await authService.getAccount();
      if (!data || data === null) {
        throw new Error("User not found or response is null");
      }
      
      setUser(data);

    } catch {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = (data: any) => {
    if (!data.name || !data.amount || !data.date || !data.type || !data.category) {
      return alert("Please fill all field");
    }
    data.date = data.date.replace("-", "/").replace("-", "/");
    dbService.create({ ...data, userId: user["$id"] });
    router.push("/dashboard");
  };


  return (
    <div className="flex min-h-screen flex-col justify-center">
      <h1 className="mb-8 text-center text-7xl font-bold text-gray-800">
        Add Income/Expense
      </h1>
      <Form
        loading={loading}
        onSubmit={handleSubmit}
        fields={[
          {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Makan Siang",
          },
          {
            name: "type",
            label: "Income",
            type: "radio",
            placeholder: "",
            value: "Income",
          },
          {
            name: "type",
            label: "Expense",
            type: "radio",
            placeholder: "",
            value: "Expense",
          },
          {
            name: "category",
            label: "Food & Beverages",
            type: "radio",
            placeholder: "",
            value: "Food & Beverages",
          },
          {
            name: "category",
            label: "Entertainment",
            type: "radio",
            placeholder: "",
            value: "Entertainment",
          },
          {
            name: "category",
            label: "Fashion",
            type: "radio",
            placeholder: "",
            value: "Fashion",
          },
          {
            name: "category",
            label: "Transportation",
            type: "radio",
            placeholder: "",
            value: "Transportation",
          },
          {
            name: "category",
            label: "Salary",
            type: "radio",
            placeholder: "",
            value: "Salary",
          },
          {
            name: "amount",
            label: "Amount",
            type: "number",
            placeholder: "",
            min: "1",
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            placeholder: "",
          },
          {
            name: "date",
            label: "Date",
            type: "date",
            placeholder: "",
          },
        ]}
        btnTitle="Submit"
      ></Form>
    </div>
  );
};

export default AddIncomeExpense;
