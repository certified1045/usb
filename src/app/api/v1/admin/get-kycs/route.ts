import { db } from "@/db/db";
import { verifications } from "@/db/schema/schema";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  console.log(request);
  try {
    const [kyc] = await db.select().from(verifications);
    revalidatePath(request.url);
    return new NextResponse(JSON.stringify(kyc), { status: 201 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ err, message: "No KYC yet" }), {
      status: 500,
    });
  }
};
