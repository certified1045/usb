import AdminDashboardNav from "@/components/admin/AdminDashboardNav";
import AdminDashboardNavMobile from "@/components/admin/AdminDashboardNavMobile";
import { Button } from "@/components/ui/button";
import { Bell, CircleUser } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="lg:block hidden border-r bg-muted/40 h-full">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-4 lg:px-6">
            <Link
              href="/"
              className="logo px-2 font-semibold flex justify-center flex-col items-center gap-0"
            >
              {/* <Landmark className="h-6 w-6" /> */}
              Capital Springs Bank
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 h-full">
            <AdminDashboardNav />
          </div>
          <div className="mt-auto p-4"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex items-center border-b bg-muted/40 px-4 h-16 justify-between">
          <AdminDashboardNavMobile />
        </header>
        <main className="p-4 lg:gap-6 lg:p-6 flex flex-1 flex-col overflow-hidden w-screen lg:w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
