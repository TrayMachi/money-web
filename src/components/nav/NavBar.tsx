"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AuthService } from "@/service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [user, setUser] = useState<any>(null);
  const authService = AuthService.getInstance();

  const router = useRouter();

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
        router.push("/")
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-[#f2f2f3]">
      <div className="m-5 flex items-center justify-between">
        <Link href="/" className="font-medium">
          © Code By Tristan.A
        </Link>
        <div>
          <ul className="flex space-x-8 font-medium">
            {user ? (
              <>
                <p className="">
                  Welcome, <span className="font-bold">{user.name}</span>
                </p>
                <button onClick={() => logOut()} className="hover:text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
