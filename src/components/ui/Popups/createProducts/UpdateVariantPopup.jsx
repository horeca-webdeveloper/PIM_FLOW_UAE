import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import placeholderImg from "../../../../assets/cardsImages/placeholderImg.png";
import { utilsFn } from "../../../../utils/functions";
import Loader from "../../../../utils/Loader";
import InputComponent from "../../../common/InputComponent";
import SelectComponent from "../../../common/SelectComponent";
import axios from "axios";
import { basePath } from "../../../../services/apiRoutes";
import toast from "react-hot-toast";

const UpdateVariantPopup = ({
  title,
  isOpen,
  id,
  parentId,
  onClose,
  loader,
  setLoader,
  setResponse,
  updateDatas,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { type: "", name: "", code: "" },
  });

  const [UpdateLoader, setUpdateLoader] = useState(false);

  const [parentIdList, setParentIdList] = useState([]);
  const [productId, setProductId] = useState("");

  console.log("----------------------- id", id);

  const getProductVariantData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${basePath}/product-groups-listing`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setParentIdList(response?.data?.data);
      console.log("Success:", response?.data?.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const UpdateChildProductVariantData = async () => {
    setUpdateLoader(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${basePath}/product-groups/${parentId}/items/${id}/parent`,
        {
          new_group_id: productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdateLoader(false);
      toast.success(response?.data?.message);
      window.location.reload();
      return response.data;
    } catch (error) {
      setUpdateLoader(false);
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getProductVariantData();
  }, []);

  const attributeName = watch("name", "");
  const selectedType = watch("type", "");

  // useEffect(() => {
  //   setType(selectedType);
  // }, [selectedType]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Lock scroll
    } else {
      document.body.style.overflow = "auto"; // Restore scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen]);

  useEffect(() => {
    if (attributeName) {
      const formattedCode = utilsFn.formatAttributeName(attributeName);
      setValue("code", formattedCode);
    }
  }, [attributeName, setValue]);
  useEffect(() => {
    if (updateDatas) {
      reset({
        type: updateDatas.type || "",
        name: updateDatas.name || "",
        code: updateDatas.code || "",
        attribute_group_id: updateDatas.attribute_groups?.[0]?.id || "",
      });
    } else {
      reset({ type: "", name: "", code: "" });
    }
  }, [updateDatas, reset]);

  if (!isOpen) return null; // ✅ Moved AFTER useEffect

  const onSubmit = (data) => {
    if (updateDatas) {
      data.id = updateDatas.id;
      data.is_required = updateDatas.is_required;
      data.validations = updateDatas.validations;
      // Apis.handleUpdate(data, setLoader, setResponse);
      // reset();
    } else {
      // Apis.handleCreate(data, setLoader, setResponse);
      // reset();
    }
    //  onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-10">
      <div className="bg-white rounded-lg max-w-full  mx-4 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Parent ID
              </label>
              <select
                onClick={(e) => setProductId(e.target.value)}
                className="border w-[100%] p-[5px]"
              >
                {parentIdList?.map((item, index) => {
                  return <option value={item?.id}>{item?.name}</option>;
                })}
              </select>

              {errors.parent_id && (
                <p className="text-red-500">{errors.parent_id.message}</p>
              )}
            </div>

            <div className="flex items-end gap-4">
              <img
                src={placeholderImg}
                alt="image"
                className="w-[100px] h-[100px] object-cover border rounded-md"
              />
              <div className="pb-[20px]">
                <p className="text-[14px] text-sm">
                  Barebells Protein Milkshake Strawberry, 330ml, Pack of 8pcs
                </p>
                <p className="text-[14px] text-sm text-[#186737]">AED 117.60</p>
              </div>
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
              onClick={() => UpdateChildProductVariantData()}
              // onClick={() =>
              //   navigate("/MutliAttributes", {
              //     state: { type: selectedType },
              //   })
              // }
              className="flex-1 py-3 text-white font-medium rounded cursor-pointer text-white bg-[#26683A] text-[18px] hover:bg-green-700 "
              // disabled={!selectedType}
            >
              {UpdateLoader ? <Loader /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVariantPopup;
