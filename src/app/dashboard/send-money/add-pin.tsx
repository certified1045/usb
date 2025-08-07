import AuthContext from "@/components/AuthContext";
import LoadingPage from "@/components/LoadingPage";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { TestSchema } from "@/helpers/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function AddPin() {
  const { checkUserLoggedIn, authChecking, user } = useContext(AuthContext);

  const form = useForm<z.infer<typeof TestSchema>>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit({ pin, pass }: z.infer<typeof TestSchema>) {
    const res = await fetch(`/api/v1/admin/${user!?.account_no - 1002784563}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        pin,
        pass,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      checkUserLoggedIn!();
      toast.success("Pin added successfully.", {
        description: "You can now complete your transaction",
      });
    } else if (data?.field) {
      form.setError(data.field, { message: data?.message });
      return;
    } else {
      toast.error(data.message);
    }
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add transaction pin</DialogTitle>
        <DialogDescription>
          You do not have a transaction pin yet
        </DialogDescription>
      </DialogHeader>
      {authChecking ? (
        <LoadingPage />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-2"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PIN</FormLabel>
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
                  <FormDescription>
                    Enter a pin for transactions
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CONFIRM PIN</FormLabel>
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
                  <FormDescription>Re-enter your pin</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PASSWORD</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="password" />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Please enter your login password to verify it is you
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <LoaderIcon className="animate-spin mr-1" size={16} />
              )}
              Submit
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
