import React from "react";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="fixed top-0 w-full bg-[#f2f2f3]">
      <div className="flex items-center justify-between m-5">
        <Link href="/" className="font-medium">© Code By Tristan.A</Link>
        <div>
          <ul className="flex space-x-8 font-medium">
            <Link href="/addCard">Add Card</Link>
            <Link href="/login">login</Link>
            <Link href="/register">register</Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
