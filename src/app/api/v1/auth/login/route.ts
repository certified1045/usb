import { AES, enc } from "crypto-js";
import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "@/helpers/schema";
import { signJwt, verifyJWT } from "@/helpers/token";
import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

export const POST = async (request: NextRequest) => {
  const { email, password } = LoginSchema.parse(await request.json());
  console.log({ password });
  if (!email) {
    return new NextResponse(JSON.stringify({ message: "No Email Provided" }), {
      status: 401,
    });
  }
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    console.log({ user });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "Email address is not registered",
        }),
        { status: 401 }
      );
    }

    const { passwordHash, ...rest } = user;
    const unhashedPassword = AES.decrypt(
      passwordHash,
      process.env.PASSWORD_SECRET!
    ).toString(enc.Utf8);
    if (password !== unhashedPassword) {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid credentials. Try again",
        }),
        { status: 401 }
      );
    }
    const accessToken = await signJwt({
      account_no: user.account_no,
      is_admin: user.isAdmin,
    });
    rest.account_no = 1002784563 + rest.account_no;
    const response = NextResponse.json(
      {
        data: rest,
        Message: "logged in successfully",
      },
      { status: 201 }
    );
    response.cookies.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      path: "/",
    });
    return response;
  } catch (err) {
    console.log({ err });
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get("access_token")?.value;
  if (token) {
    const v = await verifyJWT<{
      account_no: number;
      is_admin: boolean;
    }>(token).catch(
      (err) =>
        new NextResponse(JSON.stringify("Invalid token"), {
          status: 401,
        })
    );
    if (!v?.account_no) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "invalid token",
        }),
        { status: 401 }
      );
    } else {
      try {
        const [user] = await db
          .select({
            fullName: users.fullName,
            currency: users.currency,
            account_bal: users.account_bal,
            verified: users.verified,
            verifying: users.verifying,
            pending_KYC: users.pending_KYC,
            account_no: users.account_no,
            isAdmin: users.isAdmin,
            trans: users.trans,
            pin: users.pin,
          })
          .from(users)
          .where(eq(users.account_no, v.account_no));
        if (!user) {
          return new NextResponse(JSON.stringify("Invalid token"), {
            status: 401,
          });
        }
        const accessToken = await signJwt({
          account_no: user.account_no,
          is_admin: user.isAdmin,
        });
        user.account_no = 1002784563 + user.account_no;
        const response = NextResponse.json(
          {
            ...user,
            Message: "logged in successfully",
          },
          { status: 201 }
        );
        response.cookies.set({
          name: "access_token",
          value: accessToken,
          httpOnly: true,
          path: "/",
        });
        return response;
      } catch (err) {
        console.log({ err });
        return new NextResponse(JSON.stringify({ message: err }), {
          status: 500,
        });
      }
    }
  } else {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Error! Token was not provided",
      }),
      { status: 401 }
    );
  }
};
