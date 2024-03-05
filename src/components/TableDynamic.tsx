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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AuthService, DBService } from "@/service";
import { useEffect, useState } from "react";
import SelectRe from "./SelectRe";
import { Input } from "./ui/input";
import Link from "next/link";
import { cn } from "@/utils/cn";

export function TableDynamic() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    } else if (category === "Gift") {
      return "text-[#BBC3A4]";
    }
  };

  const indonesianCurrency = (amount: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const handleType = (type: string) => {
    if (type === "All") {
      dbService
        .getDocuments(user["$id"])
        .then((res) => {
          setDocuments(res.documents);
          setLoading(false);
        })
        .catch((error: any) => console.log(error));
    }
    dbService
      .getDocumentsByType(user["$id"], type)
      .then((res) => {
        setDocuments(res.documents);
        setLoading(false);
      })
      .catch((error: any) => console.log(error));
  };

  const handleCategory = (category: string) => {
    if (category === "All") {
      dbService
        .getDocuments(user["$id"])
        .then((res) => {
          setDocuments(res.documents);
          setLoading(false);
        })
        .catch((error: any) => console.log(error));
    }
    dbService
      .getDocumentsByCategory(user["$id"], category)
      .then((res) => {
        setDocuments(res.documents);
        setLoading(false);
      })
      .catch((error: any) => console.log(error));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    if (keyword === "") {
      dbService
        .getDocuments(user["$id"])
        .then((res) => {
          setDocuments(res.documents);
          setLoading(false);
        })
        .catch((error: any) => console.log(error));
    }
    dbService
      .getDocumentsBySearch(user["$id"], keyword)
      .then((res) => {
        setDocuments(res.documents);
        setLoading(false);
      })
      .catch((error: any) => console.log(error));
  };

  return (
    <>
      <div className="my-2 flex flex-wrap justify-start gap-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <Input
            type="search"
            placeholder="Search..."
            className="p-4 ps-10"
            onChange={handleSearch}
          />
        </div>
        <SelectRe
          options={[
            { value: "All" },
            { value: "Income" },
            { value: "Expense" },
          ]}
          group={[{ label: "Status" }]}
          handleChange={handleType}
          placeholder={"Select a Status"}
        />
        <SelectRe
          options={[
            { value: "All", key: "all" },
            { value: "Salary", key: "group 1" },
            { value: "Gift", key: "group 1" },
            { value: "Food & Beverages", key: "group 2" },
            { value: "Entertainment", key: "group 2" },
            { value: "Transportation", key: "group 2" },
            { value: "Fashion", key: "group 2" },
          ]}
          group={[
            { key: "all" },
            { label: "Income", key: "group 1" },
            { label: "Expense", key: "group 2" },
          ]}
          handleChange={handleCategory}
          placeholder={"Select a Category"}
        />
      </div>
      <Table className="text-start">
        <TableCaption></TableCaption>
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
            <ContextMenu>
              <TableRow key={data["$id"]}>
                <ContextMenuTrigger>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                </ContextMenuTrigger>
                <TableCell>
                  <span
                    className={`border ${data.type === "Income" ? "text-[#64ca75]" : "text-red-500"} my-1 rounded px-2`}
                  >
                    {data.type}
                  </span>{" "}
                  <HoverCard>
                    <HoverCardTrigger>{data.name}</HoverCardTrigger>
                    <HoverCardContent>
                      <div className="p-1">
                        <h1 className="text-muted-foreground my-1">
                          Description:
                        </h1>
                        <hr />
                        <p className="my-1">{data.description}</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell>{indonesianCurrency(data.amount)}</TableCell>
                <TableCell className={styleCategory(data.category)}>
                  {data.category}
                </TableCell>
                <TableCell>{data.date}</TableCell>
              </TableRow>
              <AlertDialog>
                <ContextMenuContent>
                  <ContextMenuLabel>Actions</ContextMenuLabel>
                  <ContextMenuSeparator />
                  <AlertDialogTrigger asChild>
                    <ContextMenuItem>Delete</ContextMenuItem>
                  </AlertDialogTrigger>
                  <ContextMenuItem>
                    <Link href={`dashboard/records/edit/${data["$id"]}`}>
                      Edit
                    </Link>
                  </ContextMenuItem>
                </ContextMenuContent>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive hover:bg-red-800"
                      onClick={() => {
                        handleDelete(data["$id"]);
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ContextMenu>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </>
  );
}
