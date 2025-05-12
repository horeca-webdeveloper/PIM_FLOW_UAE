import { urls } from "../../config/baseUrls";
import { Link, useNavigate } from "react-router-dom";
const HeaderComponent = ({
  label,
  span,
  buttons,
  UpdateProductVariantData,
  results,
  setShow,
}) => {
  const navigation = useNavigate();
  const handleClick = () => {
    setShow(true);
  };
  const navigate = (link) => {
    navigation(link);
  };
  return (
    <div className="flex items-center pb-[20px] justify-between  border-b border-[#26683A]">
      {/* Label and Span Text */}
      <div className="flex items-center">
        <p className="text-[20px]  leading-[25.2px] font-medium">{label}</p>
        {span && span !== "(undefined Results)" && (
          <p className="text-[20px] ml-[5px] font-light leading-[22.68px] text-[#26683A]">
            {span}
          </p>
        )}
      </div>

      {/* Buttons Wrapper */}
      <div className="flex items-center gap-2">
        {" "}
        {/* Ensures buttons stay in a line */}
        {buttons.map((item, index) => (
          <>
            {item.type === "submit" ? (
              <button
                onClick={() => UpdateProductVariantData()}
                className={`text-[${item.textSize}] leading-[17.64px]  text-[${item.textColor}] bg-[${item.bgColor}] px-[20px] font-${item.fontWeight} rounded-[5px] py-[8px] flex items-center gap-2 cursor-pointer`}
              >
                {item.icon && (
                  <img
                    src={`${urls.hostUrl}/${item.icon}`}
                    alt="icon"
                    className="w-5 h-5"
                  />
                )}{" "}
                {item.label ? item.label : "Save"}
              </button>
            ) : (
              <>
                {item.download ? (
                  <a
                    href={item.link}
                    download={item.link}
                    className={`text-[${item.textSize}] leading-[17.64px]   text-[${item.textColor}] bg-[${item.bgColor}] px-[20px] font-${item.fontWeight} rounded-[5px] py-[8px] flex items-center gap-2 cursor-pointer`}
                  >
                    {" "}
                    {item.label}
                  </a>
                ) : (
                  <span
                    onClick={
                      item.popup
                        ? handleClick
                        : item.link
                        ? () => navigate(item.link)
                        : undefined
                    }
                    key={item.id || `button-${index}`}
                    className={`text-[${item.textSize}] leading-[17.64px]  text-[${item.textColor}] bg-[${item.bgColor}] px-[20px] font-${item.fontWeight} rounded-[5px] py-[8px] flex items-center gap-2 cursor-pointer  hover:text-white  group hover:bg-[#26683A]`}
                  >
                    {item.icon && (
                      <img
                        src={`${urls.hostUrl}/${item.icon}`}
                        alt="icon"
                        className="w-5 h-5"
                      />
                    )}
                    <span>{item.label}</span>
                  </span>
                )}
              </>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default HeaderComponent;
