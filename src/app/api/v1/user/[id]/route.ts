import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { AES, enc } from "crypto-js";
import { eq, InferSelectModel, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async ({ params }: { params: Promise<{ id: string }> }) => {
  const account_no = +(await params).id - 1002784563;

  try {
    const [user] = await db.select().from(users);

    // const cUser = { transactions: user.transaction, ...user.person };
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: "Something went wrong" }),
      { status: 500 }
    );
  }
};

export const PUT = async (request: Request) => {
  const req = await request.json();
  if (req?.password) {
    req.password = AES.encrypt(
      req.password,
      process.env.PASSWORD_SECRET!
    ).toString();
  }
  const { ...all } = req;
  console.log(all);
  try {
    const [updatedUser] = await db
      .update(users)
      .set({ ...all })
      .where(eq(users.account_no, +req.params.account_no))
      .returning();
    return new NextResponse(JSON.stringify(updatedUser), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: "Operation failed" }),
      { status: 500 }
    );
  }
};
