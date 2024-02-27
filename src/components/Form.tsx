"use client";
import { type FC, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";

interface IField {
  fields: any[];
  btnTitle: string;
  onSubmit: (e: any) => void;
  loading: boolean;
}

const Form: FC<IField> = ({ fields, btnTitle, onSubmit, loading }) => {
  const pathname = usePathname();

  const [data, setData] = useState<any>(
    fields
      ? fields.reduce((acc: any, field: any) => {
          acc[field.name] = "";
          return acc;
        }, {})
      : {},
  );
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto w-96">
        {fields.map((field: any, index: number) => (
          <div
            key={index}
            className="my-4 flex flex-col gap-2"
          >
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={field.value}
              min={field.min}
              onChange={(e)=>
                setData({ ...data, [field.name]: e.target.value })
              }
              placeholder={field.placeholder}
              className="rounded-lg border border-slate-300 p-4"
            ></input>
          </div>
        ))}
        {["/login", "/register"].includes(pathname) && (
          <p className="w-full text-end text-sm font-light italic text-slate-800 dark:text-white">
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
          className="mt-4 flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          {loading && <LoadingSpinner />}
          {btnTitle}
        </button>
      </form>
    </div>
  );
};

export default Form;
