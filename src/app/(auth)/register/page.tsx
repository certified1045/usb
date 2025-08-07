"use client";

import Link from "next/link";
import { FC, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// import metadata from "libphonenumber-js/metadata.min";
import { RegisterSchema, RegisterSchemaType } from "@/helpers/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AuthContext from "@/components/AuthContext";

const Register: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const router = useRouter();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      toast("You are already logged in");
      router.push("/");
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const signUp = async ({ email, password, fullName }: RegisterSchemaType) => {
    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        phoneNumber,
        fullName,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Registration successful.", {
        description: "Please log in",
      });
      router.push("/login");
    } else if (data?.field) {
      setError(data.field, { message: data?.message });
      return;
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* {error && <h6 className="text-orange-700 text-sm">{error}</h6>} */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(signUp)}
            method="POST"
            className="grid gap-5 mb-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                type="text"
                {...register("fullName")}
                placeholder="John Doe"
              />
              {errors?.fullName?.message && (
                <span className="text-orange-700 text-sm">
                  {errors?.fullName?.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                {...register("email")}
                placeholder="John Doe"
              />
              {errors?.email?.message && (
                <span className="text-orange-700 text-sm">
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Phone number</Label>
              <PhoneInput
                rules={{ required: false }}
                placeholder="Phone Number"
                {...register("phoneNumber")}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e?.toString())}
              />
              {errors?.phoneNumber?.message && (
                <span className="text-orange-700 text-sm">
                  {errors?.phoneNumber?.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors?.password?.message && (
                <span className="text-orange-700 text-sm">
                  {errors?.password?.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                {...register("confirm_password")}
              />
              {errors?.confirm_password?.message && (
                <span className="text-orange-700 text-sm">
                  {errors?.confirm_password?.message}
                </span>
              )}
            </div>
            <div>
              <div className="items-top flex space-x-2">
                <input
                  type="checkbox"
                  {...register("agree")}
                  className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                  <p className="text-sm text-muted-foreground">
                    You agree to our{" "}
                    <Link href={"/terms-condition"}>Terms of Service</Link> and{" "}
                    <Link href={"/privacy-policy"}>Privacy Policy.</Link>
                  </p>
                </div>
              </div>
              {errors.agree?.message && (
                <span className="text-orange-700 text-sm ml-6">
                  {errors.agree?.message}
                </span>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader className="animate-spin mr-1" size={16} />
              )}
              Create My Account
            </Button>
          </form>
          <p>
            Already Have An Account? <Link href={"/login"}>Log in Here</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
