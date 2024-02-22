import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="my-20">
        <div className="flex justify-center items-center">
          <h1>TESTING API COY</h1>
        </div>
        <div>
          <Link
            href={"/addCard"}
            className="bg-[#94a5df] p-2 rounded-md my-2 mx-[45vw] flex justify-center items-center"
          >
            Add Card
          </Link>
        </div>
      </div>
    </main>
  );
}
