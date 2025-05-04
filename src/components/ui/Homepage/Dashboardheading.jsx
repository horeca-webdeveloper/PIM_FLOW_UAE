import React from "react";

const Dashboardheading = ({ statFilter, setStatFilter }) => {
  return (
    <div className="flex items-center pb-[20px] justify-between">
      <div className="flex items-center ">
        <p className="text-[20px] font-normal text-[#303030] leading-[25.2px]">
          Dashboard
        </p>
      </div>
      <div>
        <select
          onChange={(e) => setStatFilter(e.target.value)}
          className="px-[15px] py-[8px] rounded-md bg-[#E3E3E3] text-[14px] leading-[17.64px] font-light "
          name=""
          value={statFilter}
        >
          <option value="15_days">Last 15 days</option>
          <option value="30_days">Last 30 days</option>
          <option value="2_months">Last 2 months</option>
          <option value="3_months">Last 3 months</option>
          <option value="6_months">Last 6 months</option>
          <option value="lifetime">Life Time</option>
        </select>
      </div>
    </div>
  );
};

export default Dashboardheading;
