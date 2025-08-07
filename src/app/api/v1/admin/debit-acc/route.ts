import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  let { account_no, amount, currency } = await request.json();
  if (!isNaN(account_no)) {
    account_no = +account_no - 1002784563;
  }
  try {
    const [updatedUser] = await db
      .update(users)
      .set({
        account_bal: sql`${users.account_bal} - ${+amount}`,
        currency,
      })
      .where(eq(account_no, users.account_no))
      .returning();
    const { account_bal, ...rest } = updatedUser;
    return new NextResponse(JSON.stringify(rest), {
      status: 201,
    });
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
