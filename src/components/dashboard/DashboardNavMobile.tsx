"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { MdSpaceDashboard, MdSend } from "react-icons/md";
import {
  FaExchangeAlt,
  FaMoneyCheckAlt,
  FaRegCreditCard,
  FaUnlockAlt,
  FaMinusCircle,
  FaPlusCircle,
} from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { HiDocumentReport } from "react-icons/hi";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";
import AuthContext from "../AuthContext";
import { Accordion } from "../ui/accordion";
import DropdownMobile from "./DropdownMobile";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { CircleUser, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardNavMobile = () => {
  const { signout, user } = useContext(AuthContext);
  const [openSheet, setOpenSheet] = useState(false);

  const router = useRouter();
  return (
    <>
      <Sheet onOpenChange={setOpenSheet} open={openSheet}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden mr-4"
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
                href="/dashboard"
                onClick={() => setOpenSheet(false)}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <MdSpaceDashboard />
                Dashboard
              </Link>
              <Link
                href={
                  user?.verified
                    ? "/dashboard/send-money"
                    : "/dashboard/verify-page"
                }
                onClick={() => setOpenSheet(false)}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <MdSend />
                Send Money
              </Link>
              <Link
                href={user?.verified ? "#" : "/dashboard/verify-page"}
                onClick={() => setOpenSheet(false)}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <FaExchangeAlt />
                Exchange Money
              </Link>
              <Link
                href={
                  user?.verified
                    ? "/dashboard/send-money"
                    : "/dashboard/verify-page"
                }
                onClick={() => setOpenSheet(false)}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <FaMoneyCheckAlt />
                {/* <RiFileTransferFill /> */}
                Wire Transfer
              </Link>
              {/* <div
				className={!dropdown ? styles.flex : styles.dropdown}
				onClick={() => setDropdown(!dropdown)}
			>
				<FaRegCreditCard />
				Payment Request
			</div>
			<div className={styles.dropdownContent}>
				<Link href={"#"}>New Request</Link>
				<Link href={"#"}>All Requests</Link>
			</div> */}
              <DropdownMobile
                top="Payment Request"
                click={setOpenSheet}
                content={{ "New Request": "#", "All Requests": "#" }}
              >
                <FaRegCreditCard />
              </DropdownMobile>
              <DropdownMobile
                click={setOpenSheet}
                top="Deposit Money"
                content={{
                  "Automatic Deposit": "#",
                  "Manual Deposit": "#",
                  "Redeem Gift Card": "#",
                }}
              >
                <FaPlusCircle />
              </DropdownMobile>
              <div className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                <FaMinusCircle />
                Withdraw Money
              </div>
              <DropdownMobile
                click={setOpenSheet}
                top="Loans"
                content={{
                  "Apply New Loan": "#",
                  "My Loans": "#",
                  "Loan Calculator": "#",
                }}
              >
                <RiMoneyDollarBoxFill />
              </DropdownMobile>
              <DropdownMobile
                click={setOpenSheet}
                top="Fixed Deposit"
                content={{ "Apply New FRD": "#", "FDR History": "#" }}
              >
                <FaUnlockAlt />
              </DropdownMobile>
              <DropdownMobile
                click={setOpenSheet}
                top="Support Tickets"
                content={{
                  "Create New Ticket": "#",
                  "Pending Tickets": "#",
                  "Active Tickets": "#",
                  "Closed Tickets": "#",
                }}
              >
                <BiSupport />
              </DropdownMobile>
              <Link
                onClick={() => setOpenSheet(false)}
                href="/dashboard/transactions"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <HiDocumentReport />
                Transactions Report
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
              signout!();
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

export default DashboardNavMobile;
