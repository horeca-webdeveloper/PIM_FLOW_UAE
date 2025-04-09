import React, { useEffect } from "react";
import InputComponent from "../../common/InputComponent";
import MultiSelectComponent from "../../common/MultiSelectComponent";
import { Controller } from "react-hook-form";
const CreateSubCategoriesPopUp = ({ isOpen, onClose, getCategories, register, errors, loader, setValue, control, getFamilyDataById }) => {

    useEffect(() => {
        if (getFamilyDataById.success) {
            setValue('category', getFamilyDataById?.data?.category)
        }

    }, [getFamilyDataById]);

    if (!isOpen) return null;



    return (
        <div className="fixed  inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[40%] max-w-full  mx-4">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-medium">Create Sub Category</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4 space-y-4">

                    <div>

                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: "Category is required" }}

                            render={({ field }) => (
                                <MultiSelectComponent
                                    label="Category (required)" width="full"
                                    isMulti={false}
                                    option={getCategories || []}
                                    {...field}
                                />
                            )}
                        />
                        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                    </div>


                </div>

                <div className="flex p-[20px] ">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-[#A8A4A4] mr-[10px] cursor-pointer rounded bg-[#F1EFEF] py-3 text-[#303030] text-[18px] font-medium border-r"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        {...loader ? 'disabled' : ''}
                        className="flex-1 py-3 text-white font-medium rounded cursor-pointer text-white bg-[#26683A] text-[18px] hover:bg-green-700 "

                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateSubCategoriesPopUp;
