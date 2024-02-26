"use client";
import Image from "next/image";
import Link from "next/link";
import { NavBar } from "@/components/nav";
import { AuthService, DBService } from "@/service";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const authService = AuthService.getInstance();
  const dbService = DBService.getInstance();

  const fetchData = async () => {
    const res: any = await authService.getAccount();
    setUser(res);

    dbService
      .getDocuments(res["$id"])
      .then((res) => {
        setDocuments(res.documents);
        setLoading(false);
      })
      .catch((error: any) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <NavBar />
      <div className="mt-24">
        <div>
          <Link
            href={"/income_expense/new"}
            className="mx-[45vw] my-2 flex items-center justify-center rounded-md bg-[#94a5df] p-2"
          >
            Add Card
          </Link>
        </div>
      </div>
      {user ? (
        <div className="w-full h-auto p-14 flex flex-col gap-10">
          <h1 className="text-4xl font-bold text-center w-full mt-10">
            Income Expense Tracker
          </h1>
          <table></table>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
