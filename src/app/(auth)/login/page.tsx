"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";

import { LoginSchema, LoginSchemaType } from "@/helpers/schema";
import AuthContext from "@/components/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ToastDisplay from "@/components/redirect-display";
import { toast } from "sonner";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      toast("You are already logged in");
      router.push("/");
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(LoginSchema),
  });

  return (
    <div className="flex flex-col gap-6">
      {/* {error && <h6 className="text-orange-700 text-sm">{error}</h6>} */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login To Your Account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(login!)}
            method="POST"
            className="grid gap-6"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
              {errors?.email?.message && (
                <span className="text-orange-700 text-sm">
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />
              {errors?.password?.message && (
                <span className="text-orange-700 text-sm">
                  {errors?.password?.message}
                </span>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader className="animate-spin" />}
              Login
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
            {/* <label>
              {" "}
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(!rememberMe)}
              />{" "}
              Remember Me
            </label> */}
          </form>
        </CardContent>
      </Card>
      <ToastDisplay />
    </div>
  );
};

export default Login;
