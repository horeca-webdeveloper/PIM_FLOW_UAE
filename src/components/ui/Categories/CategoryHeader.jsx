import React from "react";
import DummyImage from "../../../assets/icons/DummyImage.png";
import { urls } from "../../../config/baseUrls";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader";
const CategoryHeader = ({ handleCreateProduct, updateProductLoading, categoryName, buttons,setShow }) => {
  const navigation = useNavigate();
  const handleClick = () => {
    setShow(true);
  }
  const navigate = (link) => {
    navigation(link)
  }
  return (
    <div className="rounded-lg  p-0 flex justify-between items-start">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Product Icon */}
        <div className="flex  items-center justify-center h-[120px] w-[120px] border rounded-[6px]">
          <img
            className="border-[5px] w-full rounded-[7px] border-white p-[20px]"
            src={DummyImage}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col items-between  h-[100px] ">
          <h3 className="text-[18px] font-medium text-[#303030]" key={categoryName}>
            {categoryName}
          </h3>
          <p className="text-[16px] text-[#616161]">
            Website:{" "}
            <span className="text-[#26683A] cursor-pointer">
              United Arab Emirates ▼
            </span>
          </p>
        </div>
      </div>

      {/* Right Section (Buttons) */}
      <div className="flex items-center gap-2"> {/* Ensures buttons stay in a line */}
        {buttons.map((item, index) => (
          <>
            {item.type === 'submit' ? <button type="submit" key={index}
              className={`text-[${item.textSize}] leading-[17.64px]  text-[${item.textColor}] bg-[${item.bgColor}] px-[20px] font-${item.fontWeight} rounded-[5px] py-[8px] flex items-center gap-2 cursor-pointer`}

            >
              {item.icon && (
                <img
                key={index}
                  src={`${urls.hostUrl}/${item.icon}`}
                  alt="icon"
                  className="w-5 h-5"
                />
              )} {item.label ? item.label : 'Save'}</button> : <>
              {item.download ? <a  
                href={item.link} download={item.link} className={`text-[${item.textSize}] leading-[17.64px]  text-[${item.textColor}] bg-[${item.bgColor}] px-[20px] font-${item.fontWeight} rounded-[5px] py-[8px] flex items-center gap-2 cursor-pointer`}> {item.label}</a> : <span
                  onClick={
                    item.popup
                      ? handleClick
                      : item.link
                        ? () => navigate(item.link)
                        : undefined
                  }
                  key={item.id || `button-${index}`}

                  className={`text-[${item.textSize}] leading-[17.64px]  text-[${item.textColor}] bg-[${item.bgColor}] px-[20px] font-${item.fontWeight} rounded-[5px] py-[8px] flex items-center gap-2 cursor-pointer`}
                >

                {item.icon && (
                  <img
                  key={index}
                    src={`${urls.hostUrl}/${item.icon}`}
                    alt="icon"
                    className="w-5 h-5"
                  />
                )}
                <span>{item.label}</span>
              </span>}

            </>
            }

          </>
        ))}
      </div>
    </div>
  );
};

export default CategoryHeader;
