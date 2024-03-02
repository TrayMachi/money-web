"use client";
import NavItem from "./NavItem";
import { useState } from "react";
import { MdDashboard, MdDelete } from "react-icons/md";
import { FaPlus, FaEdit } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import Link from "next/link";

const SideNav = () => {
  const [selected, setSelected] = useState(0);
  return (
    <nav className="fixed mx-2 rounded-lg border border-zinc-200 text-slate-100 dark:border-zinc-800">
      <div className="flex h-full w-fit flex-col items-center gap-4 p-2 md:p-4">
        <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
          <MdDashboard className="fill-white dark:fill-zinc-950" />
        </NavItem>
        <Link href="dashboard/records/new">
          <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
            <FaPlus className="fill-white dark:fill-zinc-950" />
          </NavItem>
        </Link>
        <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
          <FaEdit className="fill-white dark:fill-zinc-950" />
        </NavItem>
        <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
          <MdDelete className="fill-white dark:fill-zinc-950" />
        </NavItem>
        <NavItem selected={selected === 4} id={4} setSelected={setSelected}>
          <RiLogoutBoxLine className="fill-white dark:fill-zinc-950" />
        </NavItem>
      </div>
    </nav>
  );
};

export default SideNav;
