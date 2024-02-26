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
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const authService = AuthService.getInstance();
  const dbService = DBService.getInstance();

  const fetchUser = async () => {
    const data = await authService.getAccount();
    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = (data: any) => {
    data.incomeExpense = data.incomeExpense == "true" ? true : false;
    if (!data.name || !data.amount || !data.date || data.incomeExpense == null) {
      return alert("Please fill all field");
    }

    dbService.create({ ...data, userId: user["$id"] }, setSuccess);
  };

  useEffect(() => {
    if (success) {
      alert("Added Successfully");
      router.push("/")
    }
  }, [success]);

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
            name: "incomeExpense",
            label: "Income",
            type: "radio",
            placeholder: "",
            value: "true",
          },
          {
            name: "incomeExpense",
            label: "Expense",
            type: "radio",
            placeholder: "",
            value: "false",
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
