import { AES, enc } from "crypto-js";
import { NextRequest, NextResponse } from "next/server";
import { users } from "@/db/schema/schema";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ user: string }> }
) => {
  const { user } = await params;
  const req = await request.json();
  console.log({ req });
  if (req?.pass) {
    console.log({ pass: req.pass });
    try {
      const [uzer] = await db
        .select()
        .from(users)
        .where(eq(users.account_no, +user));
      if (!uzer) {
        return new NextResponse(
          JSON.stringify({
            message: "User not found",
          }),
          { status: 401 }
        );
      }
      const { passwordHash } = uzer;
      const unhashedPassword = AES.decrypt(
        passwordHash,
        process.env.PASSWORD_SECRET!
      ).toString(enc.Utf8);
      if (req.pass !== unhashedPassword) {
        return new NextResponse(
          JSON.stringify({
            message: "Invalid password",
            field: "pass",
          }),
          { status: 409 }
        );
      }
    } catch (err) {
      console.error({ err });
      return new NextResponse(
        JSON.stringify({ err, message: "Operation failed" }),
        { status: 500 }
      );
    }
  }
  if (req.password) {
    req.password = AES.encrypt(
      req.password,
      process.env.PASSWORD_SECRET!
    ).toString();
  }
  const { ...all } = req;
  try {
    const [updatedUser] = await db
      .update(users)
      .set({ ...all })
      .where(eq(users.account_no, +user))
      .returning();
    return new NextResponse(JSON.stringify(updatedUser), { status: 201 });
  } catch (err) {
    console.log({ err });
    return new NextResponse(
      JSON.stringify({ err, message: "Operation failed" }),
      { status: 500 }
    );
  }
};

export async function GET(request: NextRequest) {
  try {
    const len = request.nextUrl.searchParams.get("len") || 30;
    const l = await db.query.users.findMany({ with: { verifications: true } });
    // const l = await db
    //   .select()
    //   .from(transactions)
    //   .leftJoin(users, eq(users.account_no, transactions.receipient_id))
    //   .where(
    //     or(
    //       eq(transactions.credited_user_id, 1),
    //       eq(transactions.debited_user_id, 1)
    //     )
    //   )
    //   .orderBy(transactions.id);
    if (!l) {
      return new NextResponse(
        JSON.stringify({
          message: "No listing found",
        }),
        { status: 404 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        l,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log({ err });
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong",
      }),
      { status: 500 }
    );
  }
}
