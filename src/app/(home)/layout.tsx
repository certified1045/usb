import Footer from "@/components/Footer";
import Nav from "@/components/header/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Nav />
      </header>
      {children}
      <Footer />
    </>
  );
}
