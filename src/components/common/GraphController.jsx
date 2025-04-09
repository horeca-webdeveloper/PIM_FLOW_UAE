import React from "react";

const GraphController = ({ title }) => {
  return (
    <div className="flex items-center justify-between px-[20px] pt-[20px]">
      <h1 className="text-[14px] text-[#303030] font-medium leading-[20px]">
        {title}
      </h1>
      <select
        defaultValue={"Janunary"}
        className="text-gray-700 border-2 rounded-md ml-[45px] px-[0px]"
      >
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        <option>May</option>
        <option>June</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
        <option>October</option>
        <option>November</option>
        <option>December</option>
      </select>
    </div>
  );
};

export default GraphController;
