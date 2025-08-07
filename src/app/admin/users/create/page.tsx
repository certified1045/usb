"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema, CreateUserSchemaType } from "@/helpers/schema";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import metadata from "libphonenumber-js/metadata.min";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AuthContext from "@/components/AuthContext";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const { getAllUsers } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserSchemaType>({
    resolver: zodResolver(CreateUserSchema),
  });
  const signUp = async ({ email, password, fullName }: any) => {
    try {
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
        toast.success("User created successfully");
        reset();
        setPhoneNumber(undefined);
        getAllUsers!();
      } else if (data?.field) {
        setError(data.field, { message: data?.message });
        return;
      } else {
        toast.error("Ooops, Something went wrong", {
          description: data.message,
        });
      }
    } catch (err) {
      toast.error("Ooops, Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Add a new user</CardTitle>
          {/* <CardDescription>Create an account</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(signUp)}
            method="POST"
            className="grid gap-5"
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
                placeholder="johndoe@example.com"
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
                {...register("phoneNumber")}
                value={phoneNumber}
                placeholder="Phone Number"
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
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader className="animate-spin" />}
              Create My Account
            </Button>
          </form>
        </CardContent>{" "}
      </Card>
    </div>
  );
};

export default Register;
