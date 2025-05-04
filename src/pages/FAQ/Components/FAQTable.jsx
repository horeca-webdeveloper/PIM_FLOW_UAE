import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { urls } from "../../../config/baseUrls";
import rightIcon from "../../../assets/icons/rightIcon.png";
import downIcon from "../../../assets/icons/downIcon.png";
import Loader from "../../../utils/Loader";

const FAQTable = ({
  faqData,
  setEditPopup,
  setLimit,
  setId,
  isLoading,
  setShowDelete,
  setEditData,
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  console.log(isLoading);

  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-0 bg-white border-t border-l border-r border-[#BCBCBC] rounded-md mt-[20px] ">
      {/* Tabs */}
      <div className="flex px-4 items-center justify-between bg-white rounded-md">
        <div>
          <button
            type="button"
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-6 py-3 m-[4px] rounded-md text-[#4A4A4A] text-[16px] font-semibold underline leading-[19.1px] hover:bg-gray-200 transition-all"
          >
            {showAnswer ? "Hide Answers" : "Show Answers"}
          </button>
        </div>
        <div className="flex  justify-between ">
          <div className="flex items-center ml-[10px] justify-center">
            <span>Limit :</span>
            <select
              onChange={(e) => setLimit(e.target.value)}
              className="w-[110px] border border-[#BCBCBC] rounded-md p-[5px] ml-[10px] text-[14px]"
            >
              <option value={"10"}>10 Faqs</option>
              <option value={"20"}>20 Faqs</option>
              <option value={"50"}>50 Faqs</option>
            </select>
          </div>
          <div className="p-1 mt-0 ml-2 mr-2 w-[100px] bg-[#FAFBFD] border-[#BCBCBC] flex items-center justify-center space-x-3 border rounded-md">
            <button className="text-blue-500 hover:text-blue-700">
              <img src={`${urls.hostUrl}/icons/search.png`} alt="search" />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-[#979797]"></div>

            <button className="text-red-500 hover:text-red-700">
              <img src={`${urls.hostUrl}/icons/filter.png`} alt="filter" />
            </button>
          </div>
          <button className="text-red-500 p-2 bg-[#FAFBFD] hover:text-red-700 ml-1 border rounded-md">
            <img src={`${urls.hostUrl}/icons/sorting.png`} alt="sorting" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="overflow-auto bg-white ">
          <table className="w-full  text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700 text-sm">
              <tr className="border border-[#BCBCBC]">
                <th className="p-3 w-10 border border-[#BCBCBC]">
                  <input type="checkbox" />
                </th>
                <th className="p-3 text-[#4A4A4A] text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                  FAQ
                </th>
                <th className="p-3 w-[100px] text-[#4A4A4A] text-center text-[14px] font-normal leading-[19.1px]  border border-[#BCBCBC]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {faqData?.map((faq, index) => (
                <React.Fragment key={index}>
                  <tr
                    className="hover:bg-gray-100 transition border-b border-[#BCBCBC]"
                    onClick={() => toggleAnswer(index)}
                  >
                    <td className="p-3 cursor-pointer border-b border-r border-[#BCBCBC]">
                      {openIndex === index ? (
                        <img src={downIcon} />
                      ) : (
                        <img className="ml-[5px]" src={rightIcon} />
                      )}
                    </td>
                    <td className="p-3 cursor-pointer border-r text-[14px] font-light leading-[100%] border-b border-[#BCBCBC]">
                      {faq.question}
                    </td>
                    <td className="flex p-3  items-center justify-center">
                      <div className="flex  justify-center justify-between space-x-3 w-[100px] p-1 border rounded-md border-[#BCBCBC]">
                        <span
                          onClick={() => {
                            setEditPopup(true);
                            setEditData(faq);
                          }}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        >
                          <img
                            src={`${urls.hostUrl}/icons/pencil-write.png`}
                            alt="edit"
                          />
                        </span>

                        <div className="w-px h-5 bg-gray-300"></div>

                        <span
                          onClick={() => {
                            setShowDelete(true);
                            setId(faq?.id);
                          }}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <img
                            src={`${urls.hostUrl}/icons/bin.png`}
                            alt="trash"
                          />
                        </span>
                      </div>
                    </td>
                  </tr>
                  {((openIndex === index && faq.answer) || showAnswer) && (
                    <tr className="hover:bg-gray-100 transition border-b border-[#BCBCBC]">
                      <td className="p-3 border-b border-r border-[#BCBCBC]"></td>
                      <td
                        colSpan={2}
                        className="text-[#26683A] p-3 cursor-pointer border-r text-[14px] font-light leading-[22px] border-b border-[#BCBCBC]"
                      >
                        {faq.answer}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FAQTable;
