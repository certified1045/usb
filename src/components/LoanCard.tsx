import Link from "next/link";

const LoanCard = () => {
  return (
    <section className="bg-[#f4f9fc] py-24 px-4 sm:px-8 md:px-24">
      <h1>Loan Packages</h1>
      <div className="line"></div>
      <p className="text-center">
        We offer different types loan with low interest rate. You will get
        hassle free loan easily.
      </p>
      <div className="flex mt-16 flex-col lg:flex-row gap-9">
        <div className="bg-white rounded-md shadow-md w-full">
          <div className="flex justify-between px-8 py-3 text-white bg-[#223a66]">
            <h4 className="text-white">Student Loan</h4>
            <h4 className="text-white">5.00 %</h4>
          </div>
          <div className="py-5 px-6">
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Term</span> 24 Month
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Interest Rate</span> 5.00 %
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Interest Type</span> Flat Rate
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Minimum</span> $100.00
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Maximum</span> $1,000.00
            </li>
            <Link
              href="/dashboard"
              className="w-full bg-[#223a66] text-white text-sm inline-block font-bold px-8 py-3 uppercase rounded-md text-center hover:bg-[#3962ac]"
            >
              APPLY NOW
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md w-full">
          <div
            className="flex justify-between px-8 py-3 text-white bg-[#223a66]"
            style={{ backgroundColor: "#223a66" }}
          >
            <h4 className="text-white">Standard</h4>
            <h4 className="text-white">10.00%</h4>
          </div>
          <div className="py-5 px-6">
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Term</span> 12 Month
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Interest Rate</span> 12.00 %
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Interest Type</span> Mortgage
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Minimum</span> $1,000.00
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Maximum</span> $10,000.00
            </li>
            <Link
              href="/dashboard"
              className="w-full bg-[#223a66] text-white text-sm inline-block font-bold px-8 py-3 uppercase rounded-md text-center hover:bg-[#3962ac]"
            >
              APPLY NOW
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md w-full">
          <div className="flex justify-between px-8 py-3 text-white bg-[#223a66]">
            <h4 className="text-white">Professional</h4>
            <h4 className="text-white">15.00%</h4>
          </div>
          <div className="py-5 px-6">
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Term</span> 36 Month
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Interest Rate</span> 12.00 %
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Interest Type</span> Mortgage
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Minimum</span> $5.000.00
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Maximum</span> $50,000.00
            </li>
            <Link
              href="/dashboard"
              className="w-full bg-[#223a66] text-white text-sm inline-block font-bold px-8 py-3 uppercase rounded-md text-center hover:bg-[#3962ac]"
            >
              APPLY NOW
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanCard;
