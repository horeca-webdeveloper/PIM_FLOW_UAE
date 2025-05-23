import React, { useState, useEffect } from "react";
import { FaqApis } from "../../../services/apis/FAQ/Api";
import Loader from "../../../utils/Loader";
import { ImCross } from "react-icons/im";
import { AiOutlineMinus } from "react-icons/ai";

const CommonSearchDropDown = ({ removeFaq, setFaqs, index, faqData }) => {
  const [searchTerm, setSearchTerm] = useState(faqData?.question || "");
  const [answers, setAnswers] = useState(faqData?.answer || "");
  const handleQuestion = (value) => {
    setSearchTerm(value);
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index
          ? {
              question: value,
              answer: answers,
              category_id: 2,
              status: 1,
            }
          : faq
      )
    );
  };

  const handleAnswer = (value) => {
    setAnswers(value);
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index
          ? {
              question: searchTerm,
              answer: value,
              category_id: 2,
              status: 1,
            }
          : faq
      )
    );
  };

  return (
    <div
      className="relative flex w-full mb-[0px] relative"
      onClick={(e) => e.stopPropagation()}
    >
      <div className=" w-full">
        <div className="flex items-center ">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleQuestion(e.target.value)}
            placeholder="Question :"
            className="w-full border rounded-md border-[#A8A4A4] p-[10px] text-black"
          />
        </div>
        <div className="w-full mt-[10px] rounded-md text-black">
          <input
            id="comment"
            name="comment"
            className="border p-[10px] w-full rounded-md border-[#A8A4A4]"
            value={answers}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Answer :"
          ></input>
        </div>
      </div>
      <div className=" pl-[10px]">
        <button
          onClick={removeFaq}
          className="p-3 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <AiOutlineMinus />
        </button>
      </div>
    </div>
  );
};

export default React.memo(CommonSearchDropDown);
