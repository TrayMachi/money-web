import RegisterForm from "@/components/RegisterForm";
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
      <Card className="mx-[10vw] my-[10vh] md:mx-[30vw] md:mt-[15vh]">
        <div className="flex justify-between">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary flex items-center pl-4 pt-6 text-sm transition-colors"
          >
            <IoMdArrowRoundBack /> Back
          </Link>
          <Link
            href="/login"
            className="text-muted-foreground hover:text-primary flex items-center pr-4 pt-6 text-sm transition-colors"
          >
            Login{" "}<IoMdArrowForward />
          </Link>
        </div>
        <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
          <CardTitle className="text-2xl font-medium">
            Register to Money Management
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Don't worry your data is safe with us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  );
}
