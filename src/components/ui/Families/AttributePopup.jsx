import React from "react";
import { Controller } from "react-hook-form";
import Loader from "../../../utils/Loader";
import MultiSelectComponent from "../../common/MultiSelectComponent";

const AttributePopup = ({ isOpen, onSubmit, onClose, getAttributes, control, errors, loader,name,label,heading, selectedAttributes }) => {
 
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[40%] max-w-full mx-4">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-medium">{heading}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    {getAttributes?.length>0?  <div>
                        <Controller
                            name={name}
                            control={control}
                            // rules={{ required: `${name} are required` }}
                            render={({ field }) => (
                                <MultiSelectComponent
                                    defaultValues={!!selectedAttributes && selectedAttributes}
                                    label={`${label} (required)`}  
                                    width="100%"
                                    option={getAttributes || []}
                                    {...field}
                                />
                            )}
                        />
                    </div>:<Loader/>}
                  
                    {/* {errors.name && <p className="text-red-500">{errors.name.message}</p>} */}
                </div>

                <div className="flex p-[20px] ">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-[#A8A4A4] mr-[10px] cursor-pointer rounded bg-[#F1EFEF] py-3 text-[#303030] text-[18px] font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        {...loader ? 'disabled' : ''}
                        type="submit"

                        className="flex-1 py-3 text-white font-medium rounded cursor-pointer bg-[#26683A] text-[18px] hover:bg-green-700"
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AttributePopup;
