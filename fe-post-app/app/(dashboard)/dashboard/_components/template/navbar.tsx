import React from "react";
import { Columns2 } from "lucide-react";
import MenuLogout from "./menu-logout";

const navbar = () => {
  return (
    <nav className="navbar w-full bg-base-300 flex justify-between items-center">
      <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        <Columns2 size={20} />
      </label>
      <div className="px-4">
        <div></div>
        <MenuLogout />
      </div>
    </nav>
  );
};

export default navbar;
