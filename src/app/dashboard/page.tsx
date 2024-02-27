"use client";
import Image from "next/image";
import Link from "next/link";
import { NavBar } from "@/components/nav";
import { AuthService, DBService } from "@/service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const authService = AuthService.getInstance();
  const dbService = DBService.getInstance();

  const handleDelete = async (id: string) => {
    try {
      await dbService.delete(id);
      setDocuments((prev: any) =>
        prev.filter((data: any) => data["$id"] != id),
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res: any = await authService.getAccount();

      if (!res || res === null) {
        throw new Error("User not found or response is null");
      }

      setUser(res);

      dbService
        .getDocuments(res["$id"])
        .then((res) => {
          setDocuments(res.documents);
          setLoading(false);
        })
        .catch((error: any) => console.log(error));
    } catch {
      router.push("/login");
    }
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
            href={"dashboard/records/new"}
            className="mx-[45vw] my-2 flex items-center justify-center rounded-md bg-[#94a5df] p-2"
          >
            Add Card
          </Link>
        </div>
      </div>
      {user ? (
        <div className="flex h-auto w-full flex-col items-center gap-10 px-14">
          <h1 className="mt-10 w-full text-center text-2xl font-bold">
            Income Expense Tracker
          </h1>
          <table className="mx-auto w-4/5">
            <thead className="bg-black py-2 text-white">
              <th>No</th>
              <th>Name</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </thead>
            <tbody className="text-center">
              {documents.map((data: any, index: number) => (
                <tr key={data["$id"]}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.type}</td>
                  <td>{data.amount}</td>
                  <td>{data.description}</td>
                  <td>{data.date}</td>
                  <td className="flex items-center justify-center gap-3">
                    <Link href={`dashboard/records/edit/${data["$id"]}`}>
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        handleDelete(data["$id"]);
                      }}
                      className="border-black bg-transparent text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
