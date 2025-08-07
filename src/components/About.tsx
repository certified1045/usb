import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-8 md:px-24">
      <div className="flex gap-10 items-center justify-between flex-col lg:flex-row">
        <div className="w-full h-auto flex lg:flex-grow lg:flex-shrink-0 lg:basis-1/2">
          <Image
            className="rounded-md w-full h-full"
            src="/about-us.jpg"
            alt="about us"
            width={450}
            height={300}
          />
        </div>
        <div className="w-full h-auto flex flex-col lg:flex-grow lg:flex-shrink-0 lg:basis-1/2">
          <h2 className="mb-5">About Us</h2>
          <p className="mb-7">
            Capital Springs Bank is a financial base banking system. We offer
            different types of financial services to our customers all over the
            world. We have multiple branches to provide different services such
            as Loan, Wire transfer, Long term deposit, savings and some other
            related services.
          </p>
          <button className="btnIcon w-fit">
            <Link href="/#services"></Link>
            SERVICES <span className="grey">|</span>
            <span>&#62;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
