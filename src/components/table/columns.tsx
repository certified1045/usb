import { TransactionsSchema } from "@/helpers/schema";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { z } from "zod";
import { Cell, VerifyOptions } from "./cell";
import type { User } from "@/db/schema/schema";
import { ArrowDown, ArrowUpRight, ArrowUpRightFromCircle } from "lucide-react";

export const transactionsColumns: ColumnDef<
  z.infer<typeof TransactionsSchema>
>[] = [
  {
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center max-w-80">
          <span
            className={`p-2 rounded-full ${
              row.original.type == "Deposit"
                ? "bg-purple-200/50"
                : "bg-green-200/50"
            }`}
          >
            {row.original.type == "Deposit" ? (
              <ArrowDown size={12} className="text-purple-700" />
            ) : (
              <ArrowUpRight size={12} className="text-green-700" />
            )}
          </span>
          <div className="line-clamp-1">{row.original.description}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => {
      return (
        <div className="text-xs p-1 rounded-md bg-border w-fit">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => {
      return <div>{format(getValue() as string, "PPP")}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <div
          className={`${
            row.original.type == "Deposit"
              ? "text-green-700"
              : "text-orange-700"
          }`}
        >
          {row.original.type == "Withdrawal" ? "-" : "+"}
          {"$"}
          {row.original.amount.toLocaleString()}
        </div>
      );
    },
  },
];

export const loanColumns = [
  {
    accessorKey: "currency",
    header: "Loan ID",
  },
  {
    accessorKey: "charge",
    header: "Next Payment Date",
  },
  {
    accessorKey: "cr_or_dr",
    header: "Status",
  },
  {
    accessorKey: "type",
    header: "Amount to Pay",
  },
  {
    accessorKey: "condition",
    header: "Action",
  },
];

export const UsersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "account_no",
    header: "A/C Number",
  },
  {
    accessorKey: "fullName",
    header: "Name",
  },
  // {
  //   accessorKey: "email",
  //   header: "Email",
  // },
  {
    accessorKey: "phoneNumber",
    header: "Phone No",
  },
  {
    accessorKey: "created_at",
    header: "Registered Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      // date.toISOString().substring(0, 10);
      return <div>{date.toISOString().slice(0, 10)}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Cell row={row} />;
    },
  },
];

export const VerifyColumns: ColumnDef<User>[] = [
  {
    accessorKey: "account_no",
    header: "A/C Number",
  },
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <VerifyOptions original={row.original} />;
    },
  },
];
