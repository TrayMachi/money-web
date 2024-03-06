"use client";
import React from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { Separator } from "./ui/separator";

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <motion.footer
      style={{ y }}
      className="md:fixed bottom-0 left-0 right-0 p-4 text-center h-[10vh] mt-[10vh]"
    >
      <Separator className="mb-4"/>
      <p>
        © {new Date().getFullYear()} Tristan Agra Yudhistira. All rights reserved.
      </p>
    </motion.footer>
  );
}