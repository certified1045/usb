import { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/components/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Capital Springs Bank",
  description: "Capital Springs Bank",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TooltipProvider>
            {children}
            <Toaster richColors toastOptions={{}} theme="light" />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
