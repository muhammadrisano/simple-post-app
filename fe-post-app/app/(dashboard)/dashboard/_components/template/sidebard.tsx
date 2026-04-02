import React from "react";
import { Newspaper, Settings2 } from "lucide-react";
import Link from "next/link";

const SIDEBAR_MENU = [
  {
    name: "Post",
    href: "/dashboard",
    icon: <Newspaper size={20} />,
  },
  {
    name: "Setting",
    href: "/dashboard/setting",
    icon: <Settings2 size={20} />,
  },
];

const sidebard = () => {
  return (
    <ul className="menu w-full grow">
      {/* List item */}
      {SIDEBAR_MENU.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-4"
            data-tip="Homepage"
          >
            {/* Home icon */}
            {item.icon}
            <span className="is-drawer-close:hidden">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default sidebard;
