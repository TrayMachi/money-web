"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { ThemeToggle } from "../ThemeToggle";
import { AuthService } from "@/service";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

function NavBar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const [user, setUser] = useState<any>(null);
  const authService = AuthService.getInstance();

  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = async () => {
    try {
      const user = await authService.getAccount();
      setUser(user || null);
    } catch (error: any) {
      setUser(null);
    }
  };

  const logOut = async () => {
    authService
      .logout()
      .then(() => {
        setUser(null);
        toast.success("Logout Successful", { description: "You have been logged out" });
        router.push("/");
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  const displayLogOut = pathname === "/dashboard" ? "hidden" : "";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-30 flex w-full items-center justify-between px-2 md:px-6 backdrop-blur-md overflow-hidden py-4",
        className,
      )}
      {...props}
    >
      {/* Logo on the left */}
      <div className="flex items-center">
        <LiaMoneyBillWaveSolid size={"50px"} />
        <span className="px-4 text-m md:text-lg font-bold">Money - Management</span>
      </div>

      {/* Navigation links on the right */}
      <div className="flex items-center space-x-4 lg:space-x-6">
        {user ? (
          <>
            <ThemeToggle/>
            <p className="text-sm">
              Welcome,{" "}
              <span className="hover:text-primary font-medium transition-colors">
                {user.name}
              </span>
            </p>
            <button onClick={() => logOut()} className={`hover:text-[#a03f3f] font-medium text-sm transition-colors ${displayLogOut}`}>
              Logout
            </button>
          </>
        ) : (
          <>
            <ThemeToggle />
            <Link
              href="/"
              className="hover:text-primary text-sm font-medium transition-colors md:block hidden"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
