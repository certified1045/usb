import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
  const account_no = +(await request.json()).account_no - 1002784563;
  console.log(account_no);
  try {
    await db
      .update(users)
      .set({ verified: true, verifying: false })
      .where(eq(users.account_no, account_no));
    return new NextResponse(
      JSON.stringify({ message: "Verified Successfully" }),
      {
        status: 201,
      }
    );
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ e, message: "Operation failed" }),
      {
        status: 500,
      }
    );
  }
};
