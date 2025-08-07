import Hero from "@/components/Hero";
import About from "@/components/About";
import DepositCard from "@/components/DepositCard";
import Services from "@/components/Services";
import Banner from "@/components/Banner";
import LoanCard from "@/components/LoanCard";
import ContactForm from "@/components/ContactForm";
import ToastDisplay from "@/components/redirect-display";

export default async function Home() {
  return (
    <main className="pb-10 bg-white">
      <Hero />
      <About />
      <DepositCard />
      <LoanCard />
      <section className="py-24 px-4 sm:px-8 md:px-24">
        <Banner />
      </section>
      <Services />
      <ContactForm />
      <h1 className="mt-6 text-4xl">We served over 500+ Customers</h1>
      <div className="line"></div>
      <ToastDisplay />
    </main>
  );
}
