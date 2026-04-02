"use client";
import { sessionLogout } from "@/app/actions";
// import { logoutAction } from '@/app/actions'
import { logout } from "@/service/auth.service";
import { UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const MenuLogout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    sessionLogout();
    router.push("/signin");
  };
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="m-1 px-2 cursor-pointer">
        <UserCog size={20} />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default MenuLogout;
