"use client";

import AuthContext from "@/components/AuthContext";
import { useContext, useState } from "react";
// import { format } from 'date-fns';
// import styles from "@/styles/Dashboard.module.css";
import { DataTable } from "../table/data-table";
import { transactionsColumns } from "../table/columns";

const Transactions = () => {
  const { user } = useContext(AuthContext);

  const sorted =
    user?.trans?.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ) || [];

  return (
    <>
      <p className="mt-3">Recent Transactions</p>
      <DataTable
        columns={transactionsColumns}
        data={sorted}
        isLoading={false}
        empty="No recent transaction available"
        pageSize={5}
      />
    </>
  );
};

export default Transactions;
