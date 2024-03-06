import TransactionForm from "@/components/TransactionForm";
import { NavBar } from "@/components/nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import Footer from "@/components/Footer";

export default function EditPage() {
  return (
    <main>
      <NavBar />
      <div className="h-[125vh]">
      <Card className="mx-[10vw] my-[10vh] md:mx-[30vw] md:my-[15vh]">
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-primary flex items-center pl-4 pt-6 text-sm transition-colors"
        >
          <IoMdArrowRoundBack /> Back
        </Link>
        <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
          <CardTitle className="text-2xl font-medium">
            Add a new Transaction
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Just be honest with us about your transaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionForm />
        </CardContent>
      </Card>
      </div>
      <Footer />
    </main>
  );
}
