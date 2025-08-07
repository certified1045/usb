import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { TransactionsSchema } from "@/helpers/schema";

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ user: string }> }
) => {
  const account_no = +(await params).user - 1002784563;
  const { data } = await request.json();
  const validate = TransactionsSchema.extend({}).array().safeParse(data);
  if (validate?.error) {
    return new NextResponse(
      JSON.stringify({
        message: validate.error.issues[0].message,
        field: validate.error.issues[0].path[0],
      }),
      { status: 400 }
    );
  }
  try {
    const updatedUser = await db
      .update(users)
      .set({ trans: sql`${JSON.stringify(validate.data)}::json` })
      .where(eq(users.account_no, account_no))
      .returning();
    console.log({ updatedUser });
    return new NextResponse(JSON.stringify(updatedUser), { status: 201 });
  } catch (err) {
    console.log({ err });
    return new NextResponse(
      JSON.stringify({ err, message: "Operation failed" }),
      { status: 500 }
    );
  }
};
