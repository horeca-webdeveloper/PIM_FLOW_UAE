import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetchStore } from "../../../services/apis/Products/Hooks";
import { useAddBrands } from "../../../services/apis/BrandsManagement/Hooks";
import toast from "react-hot-toast";
import {
  useAddFaqs,
  useFetchCategoriesFAQs,
} from "../../../services/apis/FAQ/Hooks";

const AddFaqPopup = ({ setAddPopup }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [faqListLoading, setFaqListLoading] = useState(false);

  const { data, isLoading, error } = useFetchCategoriesFAQs();

  console.log("categories", data);

  const {
    mutate,
    isLoading: faqLoading,
    error: deleteUserError,
  } = useAddFaqs();

  const onSubmit = (data) => {
    setFaqListLoading(true);
    console.log(faqListLoading);
    const formatData = {
      ...data,
      status: "published",
    };
    mutate(formatData, {
      onSuccess: (res) => {
        toast.success("Faq Added Successfully");
        setFaqListLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 400);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[32%] p-3 relative">
        <button
          onClick={() => setAddPopup(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          x
        </button>

        <h2 className="text-xl font-semibold mb-1">Add Faq</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 border-t pt-3"
        >
          <select
            {...register("category_id", {
              required: "Category is required",
            })}
            className="w-full border border-gray-300 rounded-[4px] px-3 py-2"
          >
            <option value={""}>Select Categories</option>
            {data?.map((item, index) => {
              return (
                <>
                  <option value={item.id}>{item?.name}</option>;
                </>
              );
            })}
          </select>
          {errors.category_id && (
            <p className="text-red-500 text-[14px]">
              {errors.category_id.message}
            </p>
          )}
          <div>
            <label className="block text-[14px] font-semibold text-[#616161] mb-[4px]">
              Question
            </label>
            <input
              {...register("question", { required: "Question is required" })}
              maxLength="40"
              className="w-full border border-gray-300 rounded-[4px] px-3 py-2"
              placeholder="Enter Question Here"
            />
            {errors.question && (
              <p className="text-red-500 text-[14px]">
                {errors.question.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-[#616161] mb-[4px]">
              Answer
            </label>
            <textarea
              {...register("answer", {
                required: "answer is required",
              })}
              maxLength="100"
              className="w-full border border-gray-300 rounded-[4px] px-3 py-2"
              placeholder="Enter Answer Here"
              rows={3}
            />
            {errors.answer && (
              <p className="text-red-500 mt-[-7px] text-[14px]">
                {errors.answer.message}
              </p>
            )}
          </div>
          <div className="flex justify-between gap-2 mt-4">
            <button
              type="button"
              onClick={() => setAddPopup(false)}
              className="px-4 py-2 bg-gray-200 border border-[#A8A4A4] text-gray-700 w-full rounded-[4px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#26683A] border border-[#26683A] text-white w-full rounded-[4px]"
            >
              {faqListLoading ? "Adding Faq..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFaqPopup;
