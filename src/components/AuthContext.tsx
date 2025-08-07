"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "@/db/schema/schema";
// import type {} from "@prisma/client"

interface IContext {
  user: User | null;
  users: User[] | null;
  loading: boolean;
  error: any;
  authChecking: boolean;
  login?: ({ email, password }: any) => Promise<void>;
  signout?: () => Promise<void>;
  checkUserLoggedIn?: () => Promise<void>;
  getAllUsers?: () => Promise<void>;
}

const AuthContext = createContext<IContext>({
  user: null,
  loading: false,
  error: null,
  authChecking: true,
  users: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const router = useRouter();

  const login = async ({ email, password }: any) => {
    setLoading(true);
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
      next: { revalidate: 0 },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log({ loginDAta: data });
    setLoading(false);
    if (res?.ok && data.data) {
      setUser(data.data);
      toast.success("You are now logged in", {
        description: `Welcome ${data?.data?.fullName}`,
      });
      if (data?.data?.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } else {
      toast.error("Log in failed", {
        description: data.message || "Something went wrong. Please try again",
      });
      setError(data.message);
      error ?? console.log(error);
    }
  };

  const signout = async () => {
    await fetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      next: { revalidate: 0 },
    });
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    checkUserLoggedIn();
    // getAllUsers();
  }, []);

  console.log({ users });

  async function checkUserLoggedIn() {
    setAuthChecking(true);
    const res = await fetch("/api/v1/auth/login", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      next: { revalidate: 0 },
    });
    const data = await res.json();
    console.log("🚀 ~ file: AuthContext.tsx:56 ~ data:", data);
    if (res.ok) {
      console.log({ acc_no: data.account_no });
      setUser(data);
      setAuthChecking(false);
    } else {
      console.log("failed");
      setUser(null);
      setAuthChecking(false);
    }
  }
  const getAllUsers = async () => {
    const res = await fetch("/api/v1/user", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      next: { revalidate: 0 },
    });
    const data: User[] = await res.json();
    console.log("🚀 ~ file: AuthContext.tsx:56 ~ data:", data);
    if (res.ok) {
      setUsers([...data]);
      // router.refresh();
    } else {
      setUsers(null);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        loading,
        error,
        authChecking,
        login,
        signout,
        checkUserLoggedIn,
        getAllUsers,
      }}
    >
      {children}{" "}
    </AuthContext.Provider>
  );
};

export default AuthContext;
