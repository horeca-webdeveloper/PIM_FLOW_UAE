import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useAddFaqs,
  useUpdateFaqs,
  useFetchCategoriesFAQs,
} from "../../../services/apis/FAQ/Hooks";

const EditFaqPopup = ({ setEditPopup, editData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: editData?.question || "",
      answer: editData?.answer || "",
      category_id: editData?.category_id || "",
      status: "published",
    },
  });

  const { data: categoryData, isLoading: loadingCategories } =
    useFetchCategoriesFAQs();

  const { mutate, isLoading: isUpdating } = useUpdateFaqs();
  const [loader, setLoader] = useState(false);

  const onSubmit = (data) => {
    setLoader(true);
    const formData = {
      ...data,
      id: editData?.id,
    };
    mutate(formData, {
      onSuccess: () => {
        toast.success("Faq Updated Successfully");
        setLoader(false);
        setTimeout(() => {
          window.location.reload();
        }, 400);
      },
      onError: (err) => {
        console.log(err);
        setLoader(false);
        toast.error("Something went wrong!");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[32%] p-3 relative">
        <button
          onClick={() => setEditPopup(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          x
        </button>

        <h2 className="text-xl font-semibold mb-1">Update Faq</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 border-t pt-3"
        >
          {/* Category Select */}
          <div>
            <label className="block text-[14px] font-semibold text-[#616161] mb-[4px]">
              Category
            </label>
            <select
              className="w-full border border-gray-300 rounded-[4px] px-3 py-2"
              {...register("category_id", { required: "Category is required" })}
            >
              <option value="">Select Category</option>
              {categoryData?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-[14px]">
                {errors.category_id.message}
              </p>
            )}
          </div>

          {/* Question Field */}
          <div>
            <label className="block text-[14px] font-semibold text-[#616161] mb-[4px]">
              Question
            </label>
            <input
              {...register("question", { required: "Question is required" })}
              maxLength="40"
              className="w-full border border-gray-300 rounded-[4px] px-3 py-2"
              placeholder="Enter question"
            />
            {errors.question && (
              <p className="text-red-500 text-[14px]">
                {errors.question.message}
              </p>
            )}
          </div>

          {/* Answer Field */}
          <div>
            <label className="block text-[14px] font-semibold text-[#616161] mb-[4px]">
              Answer
            </label>
            <textarea
              {...register("answer", { required: "Answer is required" })}
              className="w-full border border-gray-300 rounded-[4px] px-3 py-2"
              placeholder="Enter answer"
              maxLength="100"
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
              onClick={() => setEditPopup(false)}
              className="px-4 py-2 bg-gray-200 border border-[#A8A4A4] text-gray-700 w-full rounded-[4px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#26683A] border border-[#26683A] text-white w-full rounded-[4px]"
            >
              {loader ? "Updating Faq..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFaqPopup;
