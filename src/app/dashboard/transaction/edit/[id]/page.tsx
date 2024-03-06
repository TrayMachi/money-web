"use client";
import type { NextPage } from "next";
import Form from "@/components/Form";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DBService } from "@/service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const dbService = new DBService();

const EditIncomeExpense: NextPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [dbLoading, setDbLoading] = useState<boolean>(true);
  const [incomeExpense, setIncomeExpense] = useState<any>({
    name: "",
    type: "",
    amount: "",
    description: "",
    date: "",
  });
  let timezone = new Date().toLocaleString();

  const handleSubmit = (data: any) => {
    if (!data.name || !data.amount || !data.date || !data.type || !data.category) {
      toast.error("Please fill all the fields");
    }

    setLoading(true);
    data.date = data.date.replace("-", "/").replace("-", "/");
    dbService
      .update(id.toString(), data)
      .then(() => {
        toast.success(`${data.name} has been updated`, { description: `Your new ${data.type} has been edited ${timezone}` });
        setLoading(false);
        router.push("/dashboard");
      })
      .catch(() => {
        setLoading(false);
        toast.error("Error updating data");
      });
  };

  useEffect(() => {
    if (id) {
      dbService
        .getDocument(id.toString())
        .then((res) => {
          setIncomeExpense({
            name: res.name,
            type: res.type,
            amount: res.amount,
            description: res.description,
            date: res.date,
          });
          setDbLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setDbLoading(false);
        });
    }
  }, [id]);

  if (dbLoading) {
    return <h1 className="my-20 text-center text-4xl font-bold">Loading...</h1>;
  }

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <h1 className="mb-8 text-center text-7xl font-bold text-gray-800">
        Edit Income/Expense
      </h1>
      {incomeExpense ? (
        <Form
          loading={loading}
          onSubmit={handleSubmit}
          fields={[
            {
              name: "name",
              label: "Name",
              type: "text",
              placeholder: incomeExpense.name,
            },
            {
              name: "type",
              label: "Income",
              type: "radio",
              value: "Income",
            },
            {
              name: "type",
              label: "Expense",
              type: "radio",
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
              name: "category",
              label: "Gift",
              type: "radio",
              placeholder: "",
              value: "Gift",
            },
            {
              name: "amount",
              label: "Amount",
              type: "number",
              placeholder: incomeExpense.amount,
              min: "1",
            },
            {
              name: "description",
              label: "Description",
              type: "text",
              placeholder: incomeExpense.description,
            },
            {
              name: "date",
              label: "Date",
              type: "date",
            },
          ]}
          btnTitle="Update Status"
        ></Form>
      ) : (
        <h1 className="my-20 text-center text-4xl font-bold">
          404: Document Not Found
        </h1>
      )}
    </div>
  );
};

export default EditIncomeExpense;
