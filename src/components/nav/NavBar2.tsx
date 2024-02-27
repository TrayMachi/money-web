import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { ModeToggle } from "../ThemeToggle";

function NavBar2({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-10 flex w-full items-center justify-between px-6  py-4",
        className,
      )}
      {...props}
    >
      {/* Logo on the left */}
      <div className="flex items-center">
        <LiaMoneyBillWaveSolid size={"50px"} />
        <span className="px-4 text-lg font-bold">Money - Management</span>
      </div>

      {/* Navigation links on the right */}
      <div className="flex items-center space-x-4 lg:space-x-6">
        <ModeToggle />
        <Link
          href="/"
          className="hover:text-primary text-sm font-medium transition-colors"
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
      </div>
    </nav>
  );
}

export default NavBar2;
