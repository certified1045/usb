"use client";

import Link from "next/link";
import { useContext } from "react";
import { loanColumns } from "../table/columns";
import { DataTable } from "../table/data-table";
import Transactions from "./Transactions";
import AuthContext from "../AuthContext";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Clipboard } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Skeleton } from "../ui/skeleton";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="flex gap-6 flex-col sm:flex-row">
        <Card className="w-full border-b-primary py-5 px-6 border-b-[3px]">
          <p className="font-medium">Account Name</p>
          {!user ? (
            <Skeleton className="h-5 mt-2 w-36" />
          ) : (
            <p className="text-lg">{user?.fullName}</p>
          )}
        </Card>
        <Card className="w-full border-b-primary py-5 px-6 border-b-[3px]">
          <div className="flex justify-between">
            <p className="font-medium">Account Number</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={!user}
                  size="icon"
                  className="size-5"
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard.writeText(user!.account_no.toString());
                    toast.success("Account number copied!");
                  }}
                >
                  <Clipboard size={20} />{" "}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-muted text-foreground">
                <p>Copy account number</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {!user ? (
            <Skeleton className="h-5 mt-2 w-36" />
          ) : (
            <p className="text-lg">{user?.account_no}</p>
          )}
        </Card>
        <Card className="w-full border-b-primary py-5 px-6 border-b-[3px]">
          <p className="font-medium">Account Balance</p>
          {!user ? (
            <Skeleton className="h-5 mt-2 w-20" />
          ) : (
            <p className="text-lg">
              {user?.currency}
              {user?.account_bal?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          )}
        </Card>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 my-8">
        <Card className="w-full border-b-primary py-5 px-6 border-b-[3px] justify-between flex flex-col">
          <div className="flex justify-between">
            <p className="font-medium">Active Loans</p>{" "}
            <Link href={""} className="hover:underline">
              <span className="whitespace-nowrap">&#8594; View</span>
            </Link>
          </div>
          <p>$0</p>
        </Card>
        <Card className="w-full border-b-primary py-5 px-6 border-b-[3px] justify-between flex flex-col">
          <div className="flex justify-between">
            <p className="font-medium">Payment Requests</p>{" "}
            <Link href={""} className="hover:underline">
              <span className="whitespace-nowrap">&#8594; View</span>
            </Link>
          </div>
          <p>$0</p>
        </Card>
        <Card className="w-full border-b-primary py-5 px-6 border-b-[3px] justify-between flex flex-col">
          <div className="flex justify-between">
            <p className="font-medium">Active Fixed Deposits</p>{" "}
            <Link href={""} className="hover:underline">
              <span className="whitespace-nowrap">&#8594; View</span>
            </Link>
          </div>
          <p>$0</p>
        </Card>
        <Card className="w-full border-b-primary py-5 px-6 border-b-[3px] justify-between flex flex-col">
          <div className="flex justify-between">
            <p className="font-medium">Active Tickets</p>{" "}
            <Link href={""} className="hover:underline">
              <span className="whitespace-nowrap">&#8594; View</span>
            </Link>
          </div>
          <p>$0</p>
        </Card>
      </div>
      <div className="overflow-x-auto mt-4">
        <p>Up Comming Loan Payment</p>
        <DataTable
          columns={loanColumns}
          data={[]}
          isLoading={false}
          pageSize={5}
          empty="You have no active loan available"
        />
        <Transactions />
      </div>
    </>
  );
}
