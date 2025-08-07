"use client";

const LoadingPage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full h-[calc(100vh-64px)] text-primary dark:text-white text-6xl">
      <div className="relative flex gap-2">
        <span className="relative inline-block flip">L</span>
        <span className="relative inline-block flip">O</span>
        <span className="relative inline-block flip">A</span>
        <span className="relative inline-block flip">D</span>
        <span className="relative inline-block flip">I</span>
        <span className="relative inline-block flip">N</span>
        <span className="relative inline-block flip">G</span>
        <span className="relative inline-block flip">.</span>
      </div>
      {/* <div className="relative">
        <span className="relative inline-block flip">.</span>
        <span className="relative inline-block flip">.</span>
        <span className="relative inline-block flip">.</span>
        <span className="relative inline-block flip">.</span>
        <span className="relative inline-block flip">.</span>
        <span className="relative inline-block flip">.</span>
      </div> */}
    </div>
  );
};

export default LoadingPage;
