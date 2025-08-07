import styles from "@/styles/Card.module.css";

const DepositCard = () => {
  return (
    <section className="py-24 px-4 sm:px-8 md:px-24">
      <h1>Fixed Deposit Plans</h1>
      <div className="line"></div>
      <p className="text-center">
        You will get maximum rewards with us by making long term deposit
      </p>
      <div className="flex mt-16 flex-col lg:flex-row gap-9">
        <div className="bg-white rounded-md shadow-md w-full">
          <div className="flex justify-between px-8 py-3 text-white bg-[#e12355]">
            <h4 className="text-white">Basic</h4>
            <h4 className="text-white">8.00%</h4>
          </div>
          <div className="py-5 px-6">
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Duration</span> 12 Month
            </li>

            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Interest Rate</span> 8.00%
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Minimum</span> $10.00
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Maximum</span> $500.00
            </li>
            <a className="w-full bg-[#e12355] text-white text-sm inline-block font-bold px-8 py-3 uppercase rounded-md text-center hover:bg-[#b53053]">
              APPLY NOW
            </a>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md text-[#223a66] w-full">
          <div className="flex justify-between px-8 py-3 text-white bg-[#e12355]">
            <h4 className="text-white">Standard</h4>
            <h4 className="text-white">10.00%</h4>
          </div>
          <div className="py-5 px-6">
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Duration</span> 24 Month
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Interest Rate</span> 10.00%
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Minimum</span> $100.00
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Maximum</span> $1,000.00
            </li>
            <a className="w-full bg-[#e12355] text-white text-sm inline-block font-bold px-8 py-3 uppercase rounded-md text-center hover:bg-[#b53053]">
              APPLY NOW
            </a>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md text-[#223a66] w-full">
          <div className="flex justify-between px-8 py-3 text-white bg-[#e12355]">
            <h4 className="text-white">Professional</h4>
            <h4 className="text-white">15.00%</h4>
          </div>
          <div className="py-5 px-6">
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Duration</span> 36 Month
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Interest Rate</span> 15.00%
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Minimum</span> $500.00
            </li>
            <li className="h-11 flex justify-between items-center">
              <span className="pt-2 pb-6">Maximum</span> $20,000.00
            </li>
            <a className="w-full bg-[#e12355] text-white text-sm inline-block font-bold px-8 py-3 uppercase rounded-md text-center hover:bg-[#b53053]">
              APPLY NOW
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositCard;
