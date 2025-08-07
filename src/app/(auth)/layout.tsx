import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh h-full flex-col items-center justify-center gap-6 p-6 md:p-10 bg-[#ffdbdb]">
      <div className="flex w-full max-w-sm flex-col gap-1">
        <Link href="/" className="logo mb-5 text-lg w-fit px-2 py-1">
          Capital Springs Bank
        </Link>
        {children}
      </div>
    </div>
  );
}
