"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthService, DBService } from "@/service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function TableDynamic() {
  const [user, setUser] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [position, setPosition] = useState<string>("");
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

  const styleCategory = (category: any) => {
    if (category === "Food & Beverages") {
      return "text-[#ccb79c]";
    } else if (category === "Salary") {
      return "text-[#638889]";
    } else if (category === "Entertainment") {
      return "text-[#FFCF81]";
    } else if (category === "Transportation") {
      return "text-[#7BD3EA]";
    } else if (category === "Fashion") {
      return "text-[#E493B3]";
    }
  };

  const indonesianCurrency = (amount: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const options = [
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
    { label: "Right", value: "right" },
  ];

  return (
    <>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Table className="text-start">
        <TableCaption>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((data: any, index: number) => (
            <TableRow key={data["$id"]}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <span
                  className={`border ${data.type === "Income" ? "text-[#64ca75]" : "text-red-500"} my-1 rounded px-2`}
                >
                  {data.type}
                </span>{" "}
                {data.name}
              </TableCell>
              <TableCell>{indonesianCurrency(data.amount)}</TableCell>
              <TableCell className={styleCategory(data.category)}>
                {data.category}
              </TableCell>
              <TableCell>{data.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </>
  );
}
