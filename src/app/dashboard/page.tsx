"use client";

import AuthContext from "@/components/AuthContext";
import Home from "@/components/dashboard/Home";
import Link from "next/link";
import { useContext } from "react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="px-1 pb-6 bg-background">
      <div className="bg-white rounded-md m-4">
        {!user?.verified && user?.verifying == false && (
          <p className="w-full p-2.5 rounded-md text-orange-700 bg-[#f8d7da] border-destructive border">
            Your account is not verified. Please submit all necessary documents.{" "}
            <Link href={"/dashboard/verify-page"} className="hover:underline">
              Submit Documents
            </Link>
          </p>
        )}
      </div>
      <Home />
    </div>
  );
};

export default Dashboard;
