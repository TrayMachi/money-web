"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export function ThemeToggle({ className }: React.HTMLAttributes<HTMLElement>) {
  const { setTheme } = useTheme();
  const Change = () => {
    let theme = localStorage.getItem("theme");

    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={() => Change()} className={cn("", className)}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
