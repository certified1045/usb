"use client";

import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Landmark,
  Columns3,
  Gift,
  Vault,
  ArrowRight,
  CircleDollarSign,
  HandCoins,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import { FaUsers, FaPlusCircle } from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import Link from "next/link";
import Dropdown from "../dashboard/Dropdown";
import { Accordion } from "../ui/accordion";
import { usePathname } from "next/navigation";
import Nav from "../header/Nav";
import DashboardNav from "../dashboard/DashboardNav";
import DashboardNavMobile from "../dashboard/DashboardNavMobile";
import AdminDashboardNav from "./AdminDashboardNav";
import AdminDashboardNavMobile from "./AdminDashboardNavMobile";

const AdminLayout = ({ children }: any) => {
  const { getAllUsers, user }: any = useContext(AuthContext);
  const pathname = usePathname();
  const admin = user?.isAdmin && pathname.startsWith("/admin");
  const reg = user && pathname.startsWith("/dashboard");

  useEffect(() => {
    // setOpen(window.matchMedia("(min-width: 1050px)").matches);
    getAllUsers();
  }, []);

  return (
    <div
      className={`grid min-h-screen w-full ${
        reg || admin ? "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]" : ""
      }`}
    >
      <div
        className={`hidden border-r bg-muted/40 h-full ${
          (reg || admin) && "lg:block"
        }`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              {/* <Landmark className="h-6 w-6" /> */}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  x="0px"
                  y="0px"
                  width="127px"
                  height="46px"
                  viewBox="0 0 127 46"
                  enableBackground="new 0 0 127 46"
                >
                  <style type="text/css"></style>
                  <path
                    fill="#E60000"
                    d="m74.3 27.7c0 9.5-5.2 10.7-10.4 10.7-8.9 0-10.8-4.6-10.8-11.1v-18.5h-3.3v-1.8h12.5v1.8h-3.5v17.9c0 6.3 1.6 9.5 6.2 9.5s6.9-2.3 6.9-8.9v-18.5h-3.3v-1.8h8.9v1.8h-3l-0.2 18.9zm8.7 8.5v-27.4h-3.5v-1.8h13.8c5.9 0 8.8 3.3 8.8 7.2 0 4.2-3.8 6.5-7.1 7.2 6.5 0.6 8.3 4.8 8.3 7.9 0 6.3-5.4 8.7-10.6 8.7h-13.4v-1.8h3.7zm13.5-21.6c0-2.9-1.5-5.8-4.8-5.8h-3.6v11.9h3.2c3.6 0 5.2-2.9 5.2-6.1zm1.2 14.8c0-4.1-1.8-6.9-5.9-6.9h-3.5v13.8h2.9c4.3-0.1 6.5-2.7 6.5-6.9zm19.5-21c-3.3 0-5.4 1.9-5.4 5.3 0 3 3.3 4.5 6.5 5.6 1.9 0.7 4.3 1.6 6 3.1 1.8 1.7 2.8 4 2.7 6.9-0.1 5.4-3.9 9.1-10.6 9.1-2.5 0-6.4-0.6-8.7-1.9l-0.3-8.1h2c0.2 5.5 2.7 8.3 7.2 8.3 3.6 0 5.6-2.4 5.6-6.1 0-3.2-2.6-4.5-6.6-5.9-1.3-0.4-3.9-1.4-5.7-3.2-1.6-1.6-2.4-3.7-2.4-5.8 0-6.3 4.5-9.1 10.1-9.1 2.2 0 5.5 0.8 7.5 1.9l0.2 7.1h-2c-0.3-5-2.5-7.2-6.1-7.2z"
                  />
                  <path
                    style={{ color: "#000000" }}
                    d="m34.1 13.3-0.8 0.7 0.9 2.9-2.6-1.4-0.9 0.7 2.9 1.6-3.1 2.5-0.8-1.1 1.1-0.9-0.8-1-1.1 0.9-0.9-1.2 1.1-0.9-0.8-1.1-5.6 4.7 5.4 4.3 1-1.2c0.7 0 1.2 0.6 1.5 1.2l-1 1.2 0.6 0.5c1.3-1.2 3.1-2 4.9-2 3.8 0 6.7 3.1 6.7 6.9 0 1.2-0.3 2.6-1 3.7l1 0.8c0 0.7-0.7 1.5-1.4 1.7l-1-0.8c-1.3 1.3-3.1 2-4.9 2-3.8 0-6.7-3-6.7-6.8 0-1.2 0.4-2.5 0.9-3.6l-0.7-0.5-1 1.3c-0.7-0.1-1.3-0.6-1.5-1.3l1-1.1-4.5-3.8v6h1.5c0.2 0.3 0.3 0.6 0.3 0.9s-0.1 0.7-0.3 1h-1.5v0.7c3.3 0.6 6.1 3.4 6.1 6.8 0 3.5-2.7 6.3-6.1 6.9v1.2c-0.3 0.2-0.7 0.3-1.1 0.3s-0.9-0.1-1.2-0.3v-1.2c-3.4-0.5-6-3.4-6-6.9 0-3.4 2.6-6.2 6-6.7v-0.8h-1.6c-0.2-0.3-0.3-0.6-0.3-1s0.1-0.7 0.3-1h1.6v-6l-4.6 3.8 1 1.1c-0.2 0.7-0.8 1.2-1.5 1.3l-1-1.3-0.6 0.6c0.6 1.1 1 2.3 1 3.6 0 3.8-3 6.8-6.7 6.8-1.8 0-3.6-0.7-4.9-2l-1 0.8c-0.6-0.2-1.3-1-1.4-1.7l1-0.8c-0.6-1.1-1-2.4-1-3.7 0-3.8 2.9-6.9 6.7-6.9 1.8 0 3.6 0.8 4.9 2l0.6-0.4-1-1.2c0.2-0.6 0.8-1.1 1.5-1.2l1 1.2 5.4-4.3-5.6-4.7-0.8 1.1 1.1 0.9-0.8 1.1-1.1-0.9-0.8 1 0.9 0.7-0.8 1.1-3-2.5 2.8-1.6-0.8-0.7-2.6 1.4 0.8-2.7-0.8-0.7-1 3.1-3.1-2.5 0.8-1 1.1 0.9 0.9-1-1.1-1 0.8-1 1.1 0.8 0.8-1-2.4-1.8c0.2-0.8 0.7-1.4 1.5-1.9l12.7 10.4v-6.9h-1.3v1.3h-1.3v-1.3h-1.3v1.3h-1.3v-3.9l3 1.3v-1.1l-2.8-1.2 2.8-1.1v-1l-3 1.2v-4h1.3v1.4h1.3v-1.4h1.3v1.4h1.3v-3.1c0.4-0.1 0.8-0.2 1.2-0.2s0.8 0.1 1.1 0.2v17.1l12.7-10.4c0.7 0.5 1.2 1.1 1.5 1.9l-2.4 1.9 0.8 1 1.1-0.8 0.8 1-1.1 1 0.8 1 1.1-0.9 0.8 1-3.1 2.5-0.9-3.2zm-25.9 18.8c0 1.1 0.8 1.8 1.8 1.9l-1.6 1.2c-1.1-0.4-2.1-1.7-2.1-2.9 0-0.4 0.1-0.6 0.2-0.9h-0.3c-1.5 0-2.7-1.4-3-2.8l1.7-1.3v0.5c0 0.9 0.9 1.7 1.8 1.7 1 0 1.9-0.8 1.9-1.8 0-1.2-0.9-2-2.1-2-2.2 0-4.4 2.2-4.4 5 0 0.8 0.2 1.6 0.5 2.3l1-0.8c0.7 0.3 1.2 1 1.4 1.8l-1 0.8c1 0.8 2.2 1.2 3.4 1.2 2.6 0 4.6-2.1 4.6-3.9 0-1.1-0.7-2-1.8-2-1.2 0.2-2 1-2 2zm13.6 4c0 1 0.8 1.8 1.8 1.8 0.7 0 1-0.3 1.5-0.7v2.1c-0.5 0.3-1 0.4-1.6 0.4-1.1 0-2-0.3-2.6-1.3-0.6 1-1.6 1.3-2.7 1.3-0.5 0-1.1-0.1-1.6-0.4v-2.1c0.5 0.5 0.8 0.7 1.5 0.7 1 0 1.8-0.8 1.8-1.8s-0.6-1.8-1.7-1.8c-1.9 0-2.7 1.8-2.7 3.5 0 2.4 1.8 4.5 4.1 4.9v-1.2c0.4-0.2 0.8-0.2 1.1-0.2 0.4 0 0.8 0 1.2 0.2v1.2c2.2-0.3 4.1-2.6 4.1-4.9 0-1.7-0.7-3.5-2.7-3.5-0.8-0.1-1.5 0.8-1.5 1.8zm11.4-8.3c0 0.9 1 1.8 1.9 1.8s1.8-0.8 1.8-1.7v-0.5l1.6 1.3c-0.3 1.6-1.7 2.9-3.3 2.8 0.1 0.3 0.1 0.6 0.1 0.9 0 1.2-1 2.5-2.1 2.9l-1.5-1.3c1-0.1 1.8-0.8 1.8-1.9s-0.9-1.8-1.9-1.8c-1.1 0-1.8 0.9-1.8 2 0 1.3 1.6 3.9 4.7 3.9 1.2 0 2.4-0.4 3.3-1.2l-1-0.8c0.2-0.8 0.7-1.5 1.4-1.8l1 0.8c0.4-0.7 0.6-1.5 0.6-2.3 0-2.2-1.7-5-4.4-5-1.2 0-2.2 0.7-2.2 1.9z"
                  />
                </svg>
              </span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 h-full">
            <p className="text-2xl ml-7 my-5 font-bold">{user?.fullName}</p>
            {admin && <AdminDashboardNav />}
            {reg && <DashboardNav />}
          </div>
          <div className="mt-auto p-4">
            {/* <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-0">
          {reg && <DashboardNavMobile />}
          {admin && <AdminDashboardNavMobile />}

          {/* <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div> */}
          <Nav />
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </header>
        <main
          className={`flex flex-1 flex-col overflow-hidden w-screen lg:w-full ${
            admin || reg ? "p-4 lg:gap-6 lg:p-6" : "gap-4 p-0 lg:gap-6 lg:p-0"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
