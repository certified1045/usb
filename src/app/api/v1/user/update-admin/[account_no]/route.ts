import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const PUT = async (
  request: Request,
  { params }: { params: { account_no: string } }
) => {
  const { isAdmin } = await request.json();
  try {
    const account = +(await params).account_no - 1002784563;
    console.log(account);
    const updatedAdmin = await db
      .update(users)
      .set({ isAdmin })
      .where(eq(users.account_no, account))
      .returning();
    console.log(updatedAdmin);
    return new NextResponse(JSON.stringify(updatedAdmin), { status: 201 });
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ e, message: "Operation failed" }),
      { status: 500 }
    );
  }
};
