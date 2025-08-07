import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="py-24 px-4 sm:px-8 md:px-24 bg-[url(/slider-bg-1.jpg)] bg-center bg-no-repeat bg-cover min-h-[550px] flex items-center relative text-white z-0 before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:-z-10 before:bg-[#223a66cc]"
      id="home"
    >
      <div className="max-w-[600px] text-white">
        <h2 className="text-white">
          Smart way to keep your money safe and secure
        </h2>
        <p className="mt-2 mb-5">
          Transfer money within minutes and save money for your future. All of
          your desired service in single platform.
        </p>
        <button className="btnIcon">
          <Link href="/dashboard" className="text-white">
            GET Started
            <span className="">
              <span className="grey">|</span>
            </span>{" "}
            <span>&#62;</span>
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Hero;
