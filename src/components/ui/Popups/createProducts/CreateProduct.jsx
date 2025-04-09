import React, { useState } from "react";
import CreateProductsInputs from "./CreateProductsInputs";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "../../../../services/apis/Products/Hooks";
import toast, { LoaderIcon } from "react-hot-toast";
import Loader from "../../../../utils/Loader";
import CreateProductIcon from "../../../../../src/assets/icons/CreateProductIcon.png";
import CreateProductModal from "../../../../../src/assets/icons/CreateProductModal.png";

const CreateProduct = ({ setShowPopup }) => {
  const navigate = useNavigate();
  const [productType, setProductType] = useState("product");
  const [formData, setFormData] = useState({
    // Product fields
    productName: "",
    sku: "",
    website: [],

    // Product Model fields
    code: "",
    family: "",
    variant: "",
  });

  const { mutate, isLoading, error } = useCreateProduct();
  const [loading, setLoading] = useState(false);

  const handleCreateProduct = () => {
    if (formData.productName.trim() == "") {
      toast.error("Please Type Product Name");
      return null;
    }
    if (formData.sku.trim() == "") {
      toast.error("Please Type SKU");
      return null;
    }
    if (formData.family == "") {
      toast.error(
        "Please Select Product Family Through Primary And Secondary Category"
      );
      return null;
    }
    if (formData.website.length == 0) {
      toast.error("Please Select at least 1 Website");
      return null;
    }

    setLoading(true);
    const productData = {
      name: formData.productName,
      product_family: formData.family,
      sku: formData.sku,
      websites: formData.website, // Example default value
    };
    mutate(productData, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success == false) {
          toast.success("Sku has already been taken");
          setLoading(false);
          return;
        }
        setLoading(false);
        if (data?.success == true) {
          navigate(`/AddProducts/${data?.product?.id}`);
        } else {
          toast.error(data?.message);
        }
      },
      onError: (err) => {
        setLoading(false);
        toast.error(err?.message);
        alert("Failed to create product: " + err.message);
      },
    });
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleProductTypeChange = (type) => {
    setProductType(type);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 overflow-hidden  flex z-50 items-center mt-[0px] justify-center">
      <div className=" absolute bg-white  2xl:max-h-[900px]  rounded-md shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center px-[15px] py-[5px] border-b">
          <h2 className="sm:text-[18px] 2x:text-[20px] mt-[5px] sm:font-semibold 2xl:font-bold text-[#1D1C1C]">
            {productType === "product"
              ? "Create Product"
              : "Create Product Model"}
          </h2>
          <button
            onClick={() => setShowPopup(false)}
            className="text-gray-500 hover:text-gray-700 text-[20px]"
          >
            ×
          </button>
        </div>

        <div className="px-[15px] pt-[5px]">
          <div className="mb-4">
            <p className="sm:text-[15px] mt-[10px] 2xl:text-[16px] sm:font-semibold 2xl:font-bold mb-2 text-[#616161]">
              Select Product Type
            </p>
            <div className="flex gap-3">
              <div
                className={`border rounded p-3 flex flex-col items-center justify-center cursor-pointer w-[120px] h-[120px] ${
                  productType === "product"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleProductTypeChange("product")}
              >
                <div className="relative ">
                  <img
                    className="h-[50px] mx-[20px] my-[15px]"
                    src={CreateProductIcon}
                  />
                  {productType === "product" && (
                    <div className="absolute -top-1 -right-3 bg-[#26683A] rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="text-[13px] mt-1">Product</span>
              </div>

              <div
                className={`border rounded p-3 flex flex-col items-center justify-center cursor-pointer w-[120px] h-[120px] ${
                  productType === "model"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleProductTypeChange("model")}
              >
                <div className="relative">
                  <img
                    className="h-[50px] mx-[20px] my-[15px]"
                    src={CreateProductModal}
                  />
                  {productType === "model" && (
                    <div className="absolute -top-1 -right-3 bg-[#26683A] rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="text-[13px] mt-1 w-full text-center">
                  Product Model
                </span>
              </div>
            </div>
          </div>
          <CreateProductsInputs
            formData={formData}
            productType={productType}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
          />
        </div>

        <div className="flex p-4">
          <button
            onClick={() => setShowPopup(false)}
            className="flex-1 bg-[#F1EFEF] border border-[#A8A4A4] text-[#303030] py-2 px-4 mr-2 rounded"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={() => {
              !loading && handleCreateProduct();
            }}
            className="flex-1 bg-[#26683A]  text-white py-2 px-4 rounded"
          >
            {loading ? "Creating...." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
