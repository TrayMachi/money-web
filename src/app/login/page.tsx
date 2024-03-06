import LoginForm from "@/components/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { IoMdArrowRoundBack, IoMdArrowForward  } from "react-icons/io";

export default function EditPage() {
  return (
    <main>
      <Card className="mx-[10vw] my-[10vh] md:mx-[30vw] md:mt-[25vh]">
        <div className="flex justify-between">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary flex items-center pl-4 pt-6 text-sm transition-colors"
          >
            <IoMdArrowRoundBack /> Back
          </Link>
          <Link
            href="/register"
            className="text-muted-foreground hover:text-primary flex items-center pr-4 pt-6 text-sm transition-colors"
          >
            Register{" "}<IoMdArrowForward />
          </Link>
        </div>
        <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
          <CardTitle className="text-2xl font-medium">
            Welcome Back to Money Management
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Ready save your money?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
