import { db } from "@/db/db";
import { users, verifications } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    let { identity_doc, address_doc, account_no } = await request.json();
    account_no = +account_no - 1002784563;
    await db.insert(verifications).values({
      user_id: account_no,
      identity_doc,
      address_doc,
    });
    await db
      .update(users)
      .set({ verifying: true })
      .where(eq(account_no, users.account_no));
    return new NextResponse(
      JSON.stringify({ message: "Details submitted sucessfully" }),
      { status: 201 }
    );
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ e, message: "Operation failed" }),
      { status: 500 }
    );
  }
};
