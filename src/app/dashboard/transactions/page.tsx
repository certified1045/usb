"use client";

import { useContext } from "react";

import AuthContext from "@/components/AuthContext";
import Transactions from "@/components/dashboard/Transactions";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function page() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Card className="w-full border-b-primary py-5 px-6 border-b-[3px] max-w-64 sm:ml-auto sm:mr-0 mb-5">
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
      <Transactions />
    </>
  );
}
