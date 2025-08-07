"use client";

import AuthContext from "@/components/AuthContext";
import Home from "@/components/dashboard/Home";
import { useContext } from "react";

export default function Admin() {
  const { user } = useContext(AuthContext);
  return (
    <div className="px-1 pb-6 bg-background">
      <Home />
    </div>
  );
}
