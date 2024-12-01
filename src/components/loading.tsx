import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center absolute top-0 w-full h-full">
      <div className="flex space-x-2">
        <div className="bg-slate-500 border-b-4 animate-spin h-10 w-10 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
