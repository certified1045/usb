import { EditUserSchema } from "@/helpers/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Switch } from "../ui/switch";

export default function Cell({ row }) {
  const index = (row.original.account_no - 1002784563).toString();
  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      ...row.original,
      TAC: `70${index.padEnd(4, "3")}`,
      MLC: `USA82${index.padEnd(3, "8")}`,
      IMF: `VIAM${index.padEnd(3, "6")}`,
    },
  });

  const [openUserDetails, setOpenUserdetails] = useState(false);

  async function onSubmit({
    email,
    isAdmin,
    pin,
    fullName,
    verified,
    password,
  }: z.infer<typeof EditUserSchema>) {
    const res = await fetch(`/api/admin/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        isAdmin,
        verified,
        pin,
        fullName,
        password,
      }),
    });
    const data = await res.json();
    console.log({ editUSer: data });
    if (res.ok) {
      toast.success("Updated successfully");
      setOpenUserdetails(false);
    } else {
      toast.error("Unable to update user details", {
        description: "Something went wrong",
      });
      alert(data.message);
    }
  }

  return (
    <DropdownMenu>
      <Sheet open={openUserDetails} onOpenChange={setOpenUserdetails}>
        <SheetContent className="max-w-sm overflow-auto">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to users profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-right">Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-right">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-right">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-right">PIN</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={5} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="TAC"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-right">TAC</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field} disabled>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="MLC"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-right">MLC</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={8} {...field} disabled>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                          <InputOTPSlot index={6} />
                          <InputOTPSlot index={7} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="IMF"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="text-right">IMF</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={7} {...field} disabled>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                          <InputOTPSlot index={6} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="verified"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center mt-2">
                    <FormLabel className="text-right">Verified?</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="!m-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <FormLabel className="text-right">Make admin</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="!m-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetFooter>
                <Button
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  {form.formState.isSubmitting && (
                    <Loader className="animate-spin" />
                  )}
                  Edit user
                </Button>
              </SheetFooter>
            </form>{" "}
          </Form>
        </SheetContent>
      </Sheet>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setOpenUserdetails(true)}>
          Edit user details
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Edit user details</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
