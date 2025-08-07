"use client";

import { FaUsers, FaPlusCircle } from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import Link from "next/link";
import DropdownMobile from "../dashboard/DropdownMobile";
import {
  ArrowRight,
  CircleDollarSign,
  CircleUser,
  Columns3,
  Gift,
  HandCoins,
  Menu,
  Ticket,
  Vault,
} from "lucide-react";
import { Accordion } from "../ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext, useState } from "react";
import AuthContext from "../AuthContext";
import { useRouter } from "next/navigation";

const AdminDashboardNavMobile = () => {
  const { signout, user }: any = useContext(AuthContext);
  const [openSheet, setOpenSheet] = useState(false);
  const router = useRouter();
  return (
    <>
      <Sheet onOpenChange={setOpenSheet} open={openSheet}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 lg:hidden mr-4"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Accordion type="single" collapsible className="w-full">
              <p className="text-2xl ml-7 my-4 font-bold">{user?.fullName}</p>
              <Link
                onClick={() => setOpenSheet(false)}
                href="/admin"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Columns3 className="h-4 w-4" />
                Dashboard
              </Link>
              <DropdownMobile
                click={setOpenSheet}
                top="Users"
                content={{
                  "Add New": "/admin/users/create",
                  "All Users": "/admin/users",
                  "KYC Documents": "/admin/users/kyc",
                  "Verified Users": "#",
                  "Unverified Users": "#",
                }}
              >
                <FaUsers />
              </DropdownMobile>
              <Link
                href="#"
                onClick={() => setOpenSheet(false)}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                {/* <Send className="h-4 w-4" /> */}
                <CircleDollarSign className="h-4 w-4" />
                Transfer Requests
              </Link>
              <Link
                href="#"
                onClick={() => setOpenSheet(false)}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                {/* <Package className="h-4 w-4" /> */}
                <BiTransfer />
                Wire Transfer
              </Link>
              <DropdownMobile
                click={setOpenSheet}
                top="Deposit"
                content={{
                  "Deposit Request": "#",
                  "Make Deposit": "/admin/users/credit-acc",
                  "Deposit History": "#",
                }}
              >
                <FaPlusCircle />
              </DropdownMobile>
              <DropdownMobile
                click={setOpenSheet}
                top="Withdraw"
                content={{
                  "Withdraw Request": "#",
                  "Make Withdraw": "/admin/users/debit-acc",
                  "Withdraw History": "#",
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </DropdownMobile>
              <DropdownMobile
                click={setOpenSheet}
                top="Loans Management"
                content={{
                  "All Loans": "#",
                  "Loan Calculator": "#",
                  "Add New Loan": "#",
                  "Loan Products": "#",
                  "Loan Repayments": "#",
                }}
              >
                <RiMoneyDollarBoxFill />
              </DropdownMobile>
              <DropdownMobile
                click={setOpenSheet}
                top="Fixed Deposit"
                content={{
                  "All New": "#",
                  "All FDR": "#",
                  "FDR Packages": "#",
                }}
              >
                <Vault className="h-4 w-4" />
              </DropdownMobile>
              <DropdownMobile
                click={setOpenSheet}
                top="Gift Cards"
                content={{ "Gift Cards": "#", "Used Gift Cards": "#" }}
              >
                <Gift className="h-4 w-4" />
              </DropdownMobile>
              <DropdownMobile
                click={setOpenSheet}
                top="Support Tickets"
                content={{
                  "Active Tickets": "#",
                  "Pending Tickets": "#",
                  "Closed Tickets": "#",
                }}
              >
                <Ticket className="h-4 w-4" />
              </DropdownMobile>
              <Link
                onClick={() => setOpenSheet(false)}
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <HandCoins className="h-4 w-4" />
                All Transactions
              </Link>
            </Accordion>
          </nav>
        </SheetContent>
      </Sheet>
      <div className=""></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              signout();
              router.replace("/");
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AdminDashboardNavMobile;
