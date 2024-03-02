"use client";
import { TableDynamic } from "@/components/TableDynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Charts } from "@/components/Charts";
import { AuthService, DBService } from "@/service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/nav/NavBar";
import SideNav from "@/components/nav/sidenav/SideNav";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [income, setIncome] = useState<any[]>([]);
  const [expense, setExpense] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const authService = AuthService.getInstance();
  const dbService = DBService.getInstance();

  const fetchData = async () => {
    try {
      const res: any = await authService.getAccount();

      if (!res || res === null) {
        throw new Error("User not found or response is null");
      }

      setUser(res);

      dbService
        .getDocumentsByType(res["$id"], "Income")
        .then((res) => {
          setIncome(res.documents);
          setLoading(false);
        })
        .catch((error: any) => console.log(error));
      dbService
        .getDocumentsByType(res["$id"], "Expense")
        .then((res) => {
          setExpense(res.documents);
          setLoading(false);
        })
        .catch((error: any) => console.log(error));
    } catch {
      router.push("/login");
    }
  };

  const totalIncome: number = income.reduce((a, item) => a + item.amount, 0);

  const totalExpense: number = expense.reduce((a, item) => a + item.amount, 0);

  const balance = totalIncome - totalExpense;

  const totalDoc = income.length + expense.length;

  let subText: string[] = [];
  if (totalIncome > totalExpense) {
    subText = [
      "Good Job, you made a decent Income",
      "Nice, you have small expense",
      "Wow, you have so much balance",
    ];
  } else {
    subText = [
      "Well, let's try again in the future :)",
      "How can you be this dumb at spending?",
      "Broke af",
    ];
  }

  const indonesianCurrency = (amount: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <NavBar />
      <SideNav />
      <div className="mt-24 overflow-y-hidden">
        {user ? (
          <div className="flex h-auto w-full flex-col items-center gap-10 px-14">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              </div>
              <div className="grid w-full grid-cols-2 gap-4">
                <div className="col-span-2 xl:col-span-1">
                  <div className="grid grid-cols-1 gap-4 xl:w-[40vw] xl:grid-cols-3">
                    <Card className="">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Balance
                        </CardTitle>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="text-muted-foreground h-4 w-4"
                        >
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold xl:text-2xl">
                          {indonesianCurrency(balance)}
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {subText[2]}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Income
                        </CardTitle>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="text-muted-foreground h-4 w-4"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-green-500 xl:text-2xl">
                          {indonesianCurrency(totalIncome)}
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {subText[0]}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Expense
                        </CardTitle>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="text-muted-foreground h-4 w-4"
                        >
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <path d="M2 10h20" />
                        </svg>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-red-500 xl:text-2xl">
                          {indonesianCurrency(totalExpense)}
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {subText[1]}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="xl:col-span-3">
                      <CardHeader>
                        <CardTitle>Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="pl-2">
                        <Charts />
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="col-span-2 xl:col-span-1 xl:w-[40vw]">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Recent Income & Expense</CardTitle>
                      <CardDescription className="text-[#64ca75]">
                        You've saved {totalDoc} transaction.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TableDynamic />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
