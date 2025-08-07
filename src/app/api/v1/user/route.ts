import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { AES, enc } from "crypto-js";
import { db } from "@/db/db";
import { users, verifications } from "@/db/schema/schema";

export const GET = async (request: Request) => {
  console.log(request.url);
  try {
    const user = await db
      .select()
      .from(users)
      .leftJoin(verifications, eq(users.account_no, verifications.user_id));
    // const list = [];
    const vv = user.map((val) => {
      return {
        verification: val.verification,
        ...val.person,
        account_no: val.person.account_no + 1002784563,
        password: AES.decrypt(
          val.person.passwordHash,
          process.env.PASSWORD_SECRET!
        ).toString(enc.Utf8),
      };
    });
    // vv.forEach((el: Partial<(typeof vv)[0]>) => {
    //   delete el.passwordHash;
    //   el.account_no! += 1002784563;
    //   console.log(
    //     "🚀 ~ file: usersController.js:26 ~ user.forEach ~ el.account_bal:",
    //     el.account_bal
    //   );
    //   list.push(el);
    // });
    // Filter password_hash
    revalidatePath(request.url);
    return new NextResponse(JSON.stringify(vv), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: "User not found" }),
      { status: 500 }
    );
  }
};
