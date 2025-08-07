"use client";

import { useContext } from "react";
import { useParams } from "next/navigation";

// import { getUser } from "@/actions";
import AuthContext from "@/components/AuthContext";
import CreateTransactions from "./trans-table";

// export const dynamic = "force-dynamic";

const page = () => {
  const params = useParams();
  const { id } = params;
  const { users, getAllUsers } = useContext(AuthContext);

  // const user = await getUser(id);
  const user = users?.filter((user) => user.account_no == +id!) || [];

  return (
    <div>
      {/* {user?.user?.trans.map((e, i) => (
        <p key={i}>{e}</p>
      ))} */}
      <CreateTransactions
        trans={user[0]?.trans || []}
        id={user[0]?.account_no!}
        getAllUsers={getAllUsers!}
      />
    </div>
  );
};

export default page;
