import Image from "next/image";
import Link from "next/link";
import { NavBar } from "@/components/nav";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="my-20">
        <div className="flex items-center justify-center">
          <h1>TESTING API COY</h1>
        </div>
        <div>
          <Link
            href={"/income_expense/new"}
            className="mx-[45vw] my-2 flex items-center justify-center rounded-md bg-[#94a5df] p-2"
          >
            Add Card
          </Link>
        </div>
      </div>
    </main>
  );
}
