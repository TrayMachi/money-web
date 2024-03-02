import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

function NavItem({
  children,
  selected,
  id,
  setSelected,
}: {
  children: JSX.Element;
  selected: boolean;
  id: number;
  setSelected: Dispatch<SetStateAction<number>>;
}) {
  return (
    <motion.button
      className="bg-zinc-950 dark:bg-white relative rounded-md p-3 text-xl transition-colors hover:bg-slate-700"
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 block ">{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 z-0 rounded-md bg-[#64ca75]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default NavItem;
