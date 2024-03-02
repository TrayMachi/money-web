"use client";
import React from "react";
import { WavyBackground } from "@/components/WavyBg";
import NavBar2 from "@/components/nav/NavBar";
import { AuthService } from "@/service";
import { useState, useEffect } from "react";
import Link from "next/link";

const HomePage = () => {
  const [user, setUser] = useState<any>(null);
  const authService = AuthService.getInstance();

  const fetchUser = async () => {
    try {
      const user = await authService.getAccount();
      setUser(user || null);
    } catch (error: any) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main className="overflow-hidden">
      <NavBar2 />
      <WavyBackground className="h-full w-full pb-80">
        <section className="mt-[30vh] flex items-center justify-center">
          <div className=" text-center">
            <h1 className="mt-8 text-4xl font-semibold text-gray-950 md:text-5xl xl:text-5xl xl:[line-height:1.125] dark:text-white">
              Save Your Money <br className="hidden sm:block" /> with
              <span className="text-[#64ca75]"> Money Management</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-wrap text-lg text-gray-800 dark:text-gray-300">
              Welcome to Money Management, your ultimate financial companion!
              Seamlessly capturing your income and expenses, our app is designed
              to empower you on your financial journey.
            </p>
            <div className="mt-8 flex items-center justify-center rounded-md">
              <Link
                href={user ? "/dashboard" : "/login"}
                className="light:border-black group relative z-[1] flex h-11 items-center justify-center rounded-lg border border-black px-4 text-base dark:border-white"
              >
                <span className="px-4">Start Saving</span>
                <div className="mt-[1px] flex items-center -space-x-3 transition-transform duration-300 group-hover:-translate-x-1">
                  <span className="h-[2px] w-2.5 origin-left -translate-x-px scale-x-0 rounded bg-gray-950 opacity-0 transition duration-300 group-hover:scale-x-100 group-hover:opacity-100 dark:bg-white"></span>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 -translate-x-2 text-gray-950 transition duration-300 group-hover:translate-x-px dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </WavyBackground>
    </main>
  );
};

export default HomePage;
