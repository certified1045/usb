const Banner = () => {
  return (
    <div className="flex-wrap pt-8 pb-14 items-center bg-[#223a66f2] text-white gap-5 flex justify-between px-5 md:px-8 text-center">
      <span className="flex items-center flex-col h-24 w-full sm:w-fit">
        <h3 className="text-[70px] text-white">550000</h3>
        <p className="-mt-4">Customers</p>
      </span>
      <span className="flex items-center flex-col h-24 w-full sm:w-fit">
        <h3 className="text-[70px] text-white">4</h3>
        <p className="-mt-4">Branches</p>
      </span>
      <span className="flex items-center flex-col h-24 w-full sm:w-fit">
        <h3 className="text-[70px] text-white">709580</h3>
        <p className="-mt-4">Total Transactions</p>
      </span>
      <span className="flex items-center flex-col h-24 w-full sm:w-fit">
        <h3 className="text-[70px] text-white">198</h3>
        <p className="-mt-4">Supported Countries</p>
      </span>
    </div>
  );
};

export default Banner;
