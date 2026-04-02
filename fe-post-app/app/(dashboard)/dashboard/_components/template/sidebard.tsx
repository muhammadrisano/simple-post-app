import React from "react";
import { Newspaper, Settings2 } from "lucide-react";
import Link from "next/link";

const SIDEBAR_MENU = [
  {
    name: "Post",
    href: "/dashboard/post",
    icon: <Newspaper />,
  },
  {
    name: "Setting",
    href: "/dashboard/setting",
    icon: <Settings2 />,
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
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
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
