import { AES } from "crypto-js";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ user: string }> }
) => {
  const account_no = +(await params).user;
  const req = await request.json();
  if (req.password) {
    req.password_hash = AES.encrypt(
      req.password,
      "process.env.PASSWORD_SECRET!"
    ).toString();
    delete req.password;
  }
  const { ...all } = req;
  console.log({ edit: all });
  try {
    const updatedUser = await prisma.user.update({
      where: {
        account_no,
      },
      data: all,
    });
    return new NextResponse(JSON.stringify(updatedUser), { status: 201 });
  } catch (err) {
    console.log({ err });
    return new NextResponse(
      JSON.stringify({ err, message: "Operation failed" }),
      { status: 500 }
    );
  }
};
