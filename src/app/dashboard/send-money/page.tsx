"use client";

import { useContext, useState } from "react";
import styles from "@/styles/Dashboard.module.css";
import {
  australianBanks,
  bankList,
  europeanBanks,
  pakistaniCommercialBanks,
} from "@/helpers/banksList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader, MessageSquareWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AuthContext from "@/components/AuthContext";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CODES = ["TAC", "MLC", "IMF"];

const SendMoney = () => {
  const { user }: any = useContext(AuthContext);

  const index = (user?.account_no - 1002784563).toString();

  const [account_no, setAccount_no] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState("First Bank");
  const [trial, setTrial] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [imf, setImf] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const FormSchema = z.object({
    pin: z.string().min(5, {
      message: "Your pin must be 5 digits.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ pin: data });
    if (data.pin == user.pin) {
      setTrial(1);
      setOpenModal(true);
    } else {
      alert("Wrong pin");
    }
  }

  const sendMoney = (e: any) => {
    setIsloading(true);
    e.preventDefault();
    setTimeout(() => {}, 3000);

    setShowPin(true);
    setIsloading(false);
  };

  const checkPin = (e: any) => {
    setIsloading(true);
    e.preventDefault();
    setTimeout(pinnnn, 1);
    setIsloading(false);
  };

  function pinnnn() {
    setIsloading(true);
    setTimeout(() => {
      if (pin == `70${index.padEnd(4, "3")}` && trial == 1) {
        setTrial(trial + 1);
        setError("");
        setPin("");
      } else if (pin == `USA82${index.padEnd(3, "8")}` && trial == 2) {
        setTrial(trial + 1);
        setError("");
        setPin("");
      } else if (pin == `VIAM${index.padEnd(3, "6")}` && trial == 3) {
        setOpenModal(false);
        setImf(true);
      } else {
        setError("The Code you entered is incorrect.");
      }
      setIsloading(false);
    }, 2000);
  }

  if (imf) {
    return (
      <div className="flex justify-center gap-3 flex-col items-center w-full">
        <MessageSquareWarning className="size-24 text-orange-700 mt-14" />
        <p className="text-3xl font-medium">Transaction Failed!!!</p>
        <p>contact customer care - customercare@capitalspringsbank.com</p>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center">
        <Tabs defaultValue="local" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="local">Local transfers</TabsTrigger>
            <TabsTrigger value="international">
              International transfers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="local">
            <Card>
              <CardHeader>
                <CardTitle>Local transfers</CardTitle>
                <CardDescription>
                  Make transfers to banks in USA.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={sendMoney} className="flex flex-col gap-3">
                  <label>
                    <p>Account Number:</p>
                    <Input
                      required
                      type="number"
                      value={account_no}
                      onChange={(e) => setAccount_no(e.target.value)}
                    />
                  </label>
                  <label>
                    <p>Select Bank:</p>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                    >
                      {bankList.map((bankName, index) => (
                        <option
                          key={index}
                          value={bankName}
                          style={{ color: "black" }}
                        >
                          {bankName}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <p>Amount:</p>
                    <Input
                      required
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </label>
                  <label>
                    <p>Note:</p>
                    <textarea
                      value={note}
                      required
                      onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                  </label>
                  <Button
                    type="submit"
                    className="max-w-40 mx-auto block mb-4 bg-blue-950"
                    disabled={isLoading}
                  >
                    Send Money
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="international">
            <Card>
              <CardHeader>
                <CardTitle>International transfers</CardTitle>
                <CardDescription>
                  Make transfers to banks in Europe and Australia.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={sendMoney} className="flex flex-col gap-3">
                  <label>
                    <p>Account Number:</p>
                    <Input
                      required
                      type="number"
                      value={account_no}
                      onChange={(e) => setAccount_no(e.target.value)}
                    />
                  </label>
                  <label>
                    <p>Select Bank:</p>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Australia</SelectLabel>
                          {australianBanks.map((val, i) => (
                            <SelectItem value={val} key={val + i + "aus"}>
                              {val}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Europe</SelectLabel>
                          {europeanBanks.map((val, i) => (
                            <SelectItem value={val} key={val + i + "eu"}>
                              {val}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Pakistan</SelectLabel>
                          {pakistaniCommercialBanks.map((val, i) => (
                            <SelectItem value={val} key={val + i + "aus"}>
                              {val}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </label>
                  <label>
                    <p>Amount:</p>
                    <Input
                      required
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </label>
                  <label>
                    <p>Note:</p>
                    <textarea
                      value={note}
                      required
                      onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                  </label>
                  <Button
                    type="submit"
                    className="max-w-40 mx-auto block mb-4 bg-blue-950"
                    disabled={isLoading}
                  >
                    Send Money
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Funds Transfer</DialogTitle>
                <DialogDescription>
                  {trial == 1 &&
                    "Please enter the funds transfer TAC code for this transfer"}
                  {trial == 2 && "Please enter MLC code"}
                  {trial == 3 &&
                    "Please enter the funds transfer IMF code for this transfer"}
                </DialogDescription>
              </DialogHeader>
              <div>
                <form
                  onSubmit={checkPin}
                  className="flex gap-3 items-center w"
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "baseline",
                    paddingInline: "10px",
                    marginBottom: "12px",
                  }}
                >
                  <Input
                    required
                    placeholder={CODES[trial - 1] + " " + "Code"}
                    type="password"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      setError("");
                    }}
                  />
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="px-4 py-3 text-base text-white bg-[#0f80df] b-0 rounded disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading && <Loader className="animate-spin" />}
                    Authenticate
                  </button>
                </form>
                {error && (
                  <i className="mb-4 block text-red-800 ml-2.5">{error}</i>
                )}
                <p className="mb-4 text-teal-800 ml-2.5">
                  Don&apos;t have {trial == 1 && "TAC"} {trial == 2 && "MLC"}{" "}
                  {trial == 3 && "IMF"} code? Please contact us via
                  customercare@capitalspringsbank.com
                </p>
              </div>
              <DialogFooter>
                <button
                  onClick={() => {
                    setOpenModal(false);
                    setTrial(1);
                    setError("");
                    setPin("");
                  }}
                  className="disabled:opacity-50 px-4 py-3 text-base text-white bg-[#df3b0f] rounded b-0 flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading && <Loader className="animate-spin" />}
                  Cancel funds transfer
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={showPin} onOpenChange={setShowPin}>
            <DialogContent className="">
              <DialogHeader>
                {/* <DialogTitle>Funds Transfer</DialogTitle> */}
                <DialogDescription>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-2/3 space-y-6"
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
                            <FormDescription>
                              Please enter your account pin.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Tabs>
      </div>
    );
  }
};
export default SendMoney;
