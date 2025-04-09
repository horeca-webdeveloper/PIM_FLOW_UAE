import React from "react";

const Matrix = ({ title, amount, growth, growthType, icon }) => {
  return (
    <div className="bg-white box-shadow: 6px 6px 54px 0px #0000000D; rounded-xl p-[10px] py-[15px] flex flex-col justify-between  max-w-[387px] min-h-[180px] ">
      <div className="flex items-between justify-between w-full">
        <div className="flex flex-col justify-between h-[60px]">
          <p className="font-medium sm:text-[15px] 2xl:text-[16px] font-[Nunito Sans] leading-[21.82px]">
            {title}
          </p>
          <p className="sm:text-[24px] 2xl:text-[28px] leading-[26px] font-medium text-left w-full">
            {amount}
          </p>
        </div>
        <div>
          <img className="h-[60px] w-[60px] rounded-[10px]" src={icon} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <img src={growthType} />
          <span className="sm:text-[13px] xl:text-[16px]  2xl:text-[16px] text-[#26683A] ml-[5px] leading-[21.82px] font-normal">
            {growth}%
          </span>
          <p className="sm:text-[13px] xl:text-[16px]  2xl:text-[16px] ml-[5px] text-[#606060] leading-[21.82px] font-normal no-whitespace">
            Up from yersterday
          </p>
        </div>
        <div>
          <button className="sm:text-[9px] xl:text-[12px]  2xl:text-[13px]  bg-[#F3F3F3] rounded-[5px] px-[12px] py-[4px]">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Matrix;
