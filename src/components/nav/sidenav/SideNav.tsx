"use client";
import NavItem from "./NavItem";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import Link from "next/link";
import { AuthService } from "@/service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SideNav = () => {
  const [selected, setSelected] = useState(0);

  const authService = AuthService.getInstance();
  const router = useRouter();

  const logOut = async () => {
    authService
      .logout()
      .then(() => {
        toast.success("Logout Successful", {
          description: "You have been logged out",
        });
        router.push("/");
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  return (
    <nav className="fixed mx-2 rounded-lg border border-zinc-200 text-slate-100 dark:border-zinc-800">
      <div className="flex h-full w-fit flex-col items-center gap-4 p-2 md:p-4">
        <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
          <MdDashboard className="fill-white dark:fill-zinc-950" />
        </NavItem>
        <Link href="dashboard/transaction/new">
          <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
            <FaPlus className="fill-white dark:fill-zinc-950" />
          </NavItem>
        </Link>
        <button onClick={logOut}>
          <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
            <RiLogoutBoxLine className="fill-white dark:fill-zinc-950" />
          </NavItem>
        </button>
      </div>
    </nav>
  );
};

export default SideNav;
