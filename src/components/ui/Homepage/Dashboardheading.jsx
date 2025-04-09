import React from "react";

const Dashboardheading = () => {
  return (
    <div className="flex items-center pb-[20px] justify-between">
      <div className="flex items-center ">
        <p className="text-[20px] font-normal text-[#303030] leading-[25.2px]">
          Dashboard
        </p>
      </div>
      <div>
        <select
          className="px-[15px] py-[8px] rounded-md bg-[#E3E3E3] text-[14px] leading-[17.64px] font-light "
          name=""
          id=""
        >
          <option value="">Last 30 days</option>
          <option value="">Last 60 days</option>
          <option value="">Last 90 days</option>
          <option value="">Last 120 days</option>
        </select>
      </div>
    </div>
  );
};

export default Dashboardheading;
