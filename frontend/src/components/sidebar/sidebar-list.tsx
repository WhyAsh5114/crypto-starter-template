"use client";

import { BotMessageSquare, Database, Home, Puzzle, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Models",
    url: "/models",
    icon: Puzzle,
  },
  {
    title: "Agents",
    url: "/agents",
    icon: BotMessageSquare,
  },
  {
    title: "Knowledge base",
    url: "/knowledge-base",
    icon: Database,
  },

  {
    title: "Tools",
    url: "/tools",
    icon: Wrench,
  },
];

export function SidebarList() {
  const pathname = usePathname();

  function isActive(url: string) {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  }

  return items.map((item) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton isActive={isActive(item.url)} asChild>
        <Link href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));
}
