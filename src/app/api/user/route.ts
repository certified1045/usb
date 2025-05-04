import { PrismaClient } from "@prisma/client";
import { AES, enc } from "crypto-js";
import { url } from "inspector";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  console.log(request.url);
  try {
    const user = await prisma.user.findMany({
      include: {
        verification: true,
        transactions: true,
      },
    });
    const list = [];
    user.forEach((el: Partial<(typeof user)[0]>) => {
      el.password = AES.decrypt(
        el.password_hash!,
        "process.env.PASSWORD_SECRET!"
      ).toString(enc.Utf8);
      el.account_no! += 1002784563;
      console.log(
        "🚀 ~ file: usersController.js:26 ~ user.forEach ~ el.account_bal:",
        el.account_bal
      );
      list.push(el);
    });
    // Filter password_hash
    revalidatePath(request.url);
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: "User not found" }),
      { status: 500 }
    );
  }
};
