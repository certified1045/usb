import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { RegisterApiSchema } from "@/helpers/schema";
import { AES } from "crypto-js";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const validate = RegisterApiSchema.safeParse(body);
  if (validate?.error) {
    console.log({ validate: validate.error.issues[0].path });
    return new NextResponse(
      JSON.stringify({
        message: validate.error.issues[0].message,
        field: validate.error.issues[0].path[0],
      }),
      { status: 400 }
    );
  }
  const { password, fullName, phoneNumber, email } = validate.data;
  try {
    const [register] = await db
      .insert(users)
      .values({
        passwordHash: AES.encrypt(
          password,
          process.env.PASSWORD_SECRET!
        ).toString(),
        phoneNumber: phoneNumber!.toString(),
        fullName,
        email,
      })
      .returning();
    const { passwordHash, ...rest } = register;
    return new NextResponse(
      JSON.stringify({
        ...rest,
        message: `${register.fullName} registered successfully`,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.log({ error });
    switch (error?.constraint) {
      case "person_phone_unique":
        return new NextResponse(
          JSON.stringify({
            message: "A user with this phone number already exists",
            field: "phoneNumber",
          }),
          { status: 409 }
        );
      case "person_email_unique":
        return new NextResponse(
          JSON.stringify({
            message: "A user with this email address already exists",
            field: "email",
          }),
          { status: 409 }
        );
      default:
        return new NextResponse(
          JSON.stringify({
            message: "Something went wrong",
          }),
          { status: 500 }
        );
    }
  }
};
