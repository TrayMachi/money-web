"use client";
import React from "react";
import { type FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface IField {
  fields: any[];
  btnTitle: string;
}

const Form: FC<IField> = ({ fields, btnTitle }) => {
  const pathname = usePathname();
  return (
    <div>
      <form className="mx-auto w-96">
        {fields.map((field: any, index: number) => (
          <div
            key={index + Math.random() * 1564}
            className="my-4 flex flex-col gap-2"
          >
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              className="border border-slate-300 p-4"
            ></input>
          </div>
        ))}
        {["/login", "/register"].includes(pathname) && (
          <p className="text-end w-full text-sm text-slate-800 font-light italic">
            {pathname == "/login" ? (
              <>
                Not a member?{" "}
                <Link className="text-blue-800" href="/register">
                  Register
                </Link>
              </>
            ) : (
              <>
                Already a member?{" "}
                <Link className="text-blue-800" href="/login">
                  Login
                </Link>
              </>
            )}
          </p>
        )}
        <button
          type="submit"
          className="bg-black text-white w-full mt-4 px-4 py-2 rounded-md hover:bg-gray-800"
        >
          {btnTitle}
        </button>
      </form>
    </div>
  );
};

export default Form;
