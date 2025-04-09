import React from "react";

const Cards = ({ title, amount, growth, growthType, icon }) => {
    return (
        <div className="bg-white box-shadow: 6px 6px 54px 0px #0000000D; rounded-xl p-[10px] py-[10px] flex flex-col justify-between  max-w-[387px] min-h-[150px] ">
            <div className="flex  items-between justify-between w-full">
                <div className="flex flex-col items-center justify-between h-[60px]">
                    <p className="font-medium text-[16px] font-[Nunito Sans] leading-[21.82px] ">
                        {title}
                    </p>
                    <p className="text-[20px] leading-[26px] font-medium">{amount}</p>
                </div>
                <div>
                    <img className="h-[50px] w-[50px] rounded-[10px]" src={icon} />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <img src={growthType} />
                    <span className="text-[12px] text-[#26683A] ml-[5px] leading-[21.82px] font-normal">
                        {growth}%
                    </span>
                    <p className="text-[12px] ml-[5px] text-[#606060] leading-[21.82px] font-normal whitespace-nowrap">
                        Up from yersterday
                    </p>
                </div>
                <div>
                    <button className="text-[12px] bg-[#F3F3F3] rounded-[5px] px-[12px] py-[4px] whitespace-nowrap">
                        View All {">"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cards;
