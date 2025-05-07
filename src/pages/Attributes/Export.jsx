import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HeaderComponent from "../../components/common/HeaderComponent";
import { COLORS } from "../../utils/colors";
import InputComponent from "../../components/common/InputComponent";
import SelectComponent from "../../components/common/SelectComponent";
import CollapseComponent from "../../components/common/CollapseComponent";
import { Apis } from "../../services/apis/ImportExport/Api";
import FullScreenLoader from "../../utils/FullScreenLoader";
import { notify } from "../../utils/notify";
const Export = () => {
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategories] = useState([]);
  const [secondryCategory, setSecondCategories] = useState([]);
  const [thirdCategory, setThirdCategories] = useState([]);
  const [fourthCategory, setFourthCategories] = useState([]);
  const [fileName, setFileName] = useState(null);
  const url = "/attributes/export";
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const parentId = watch("primary_category", "");
  const secondCatId = watch("second_category", "");
  const thirdCatId = watch("third_category", "");
  const fourthCatId = watch("fourth_category", "");
  const findName = (id) => {
    const name = categories.categories.find((it) => it.id == id);
    if (name) {
      const formattedName = name.name.toLowerCase().replace(/\s+/g, "_");
      setFileName(formattedName);
      return formattedName;
    }
    return null; // Return null if no name is found
  };
  const onSubmit = (data) => {
    let categoryId;
    if (data.fourth_category) {
      categoryId = data.fourth_category;
    } else if (data.third_category) {
      categoryId = data.third_category;
    } else if (data.second_category) {
      categoryId = data.second_category;
    } else if (data.primary_category) {
      categoryId = data.primary_category;
    }
    const datas = {
      parent_category_id: parseInt(categoryId),
      range_from: parseInt(data.from),
      range_to: parseInt(data.to),
    };
    const name = findName(categoryId);
    Apis.exportData(
      datas,
      setLoader,
      setResponse,
      response,
      url,
      `${name}_products_${data.from}-${data.to}`
    );
    //  notify("Start product importing...")
    reset();
  };
  useEffect(() => {
    if (categories && categories?.categories?.length > 0) {
      const parentCat = categories.categories.filter((it) => it.parent_id == 0);
      setParentCategories(parentCat);
    }
    if (parentId && categories.categories.length > 0) {
      const secondCat = categories.categories.filter(
        (it) => it.parent_id == parentId
      );
      setSecondCategories(secondCat);
    }
    if (secondCatId && categories.categories.length > 0) {
      const thirdCat = categories.categories.filter(
        (it) => it.parent_id == secondCatId
      );
      setThirdCategories(thirdCat);
    }
    if (thirdCatId && categories.categories.length > 0) {
      const fourthCat = categories.categories.filter(
        (it) => it.parent_id == thirdCatId
      );
      setFourthCategories(fourthCat);
    }
  }, [parentId, secondCatId, thirdCatId, categories]);

  const buttons = [
    {
      label: "Download",
      link: "",
      icon: "icons/download.png",
      type: "submit",
      bgColor: COLORS.bgPrimary,
      textColor: "white",
      textSize: "14px",
      fontWeight: "normal",
    },
  ];

  useEffect(() => {
    Apis.fetchCategories(setLoader, setCategories);
  }, []);

  useEffect(() => {
    setThirdCategories([]);
    setFourthCategories([]);
  }, [parentId]);
  return (
    <>
      {loader ? <FullScreenLoader bgTransparent={true} /> : ""}
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderComponent label="Export" span="" buttons={buttons} />

        {/* Collapsible Section */}
        <CollapseComponent title="Export" errors={errors}>
          <div className="space-y-2">
            {/* <SelectComponent label="Select Export Type" name="export_type" /> */}
            <SelectComponent
              label="Primary Category (Required)"
              name="primary_category"
              option={!!parentCategory && parentCategory}
              {...register("primary_category", {
                required: "Primary category is required",
              })}
            />
            {errors.primary_category && (
              <p className="text-red-500">{errors.primary_category.message}</p>
            )}

            {secondryCategory && secondryCategory.length > 0 ? (
              <>
                <SelectComponent
                  label="Second Category "
                  option={secondryCategory && secondryCategory}
                  name="second_category"
                  {...register("second_category")}
                />
                {errors.second_category && (
                  <p className="text-red-500">
                    {errors.second_category.message}
                  </p>
                )}
              </>
            ) : (
              ""
            )}
            {thirdCategory && thirdCategory.length > 0 ? (
              <>
                <SelectComponent
                  label={`${
                    fourthCategory.length > 0
                      ? "Third Category"
                      : "Product Family"
                  }`}
                  option={thirdCategory && thirdCategory}
                  name="third_category"
                  {...register("third_category")}
                />
              </>
            ) : (
              ""
            )}

            {fourthCategory && fourthCategory.length > 0 ? (
              <>
                <SelectComponent
                  label="Product Family"
                  option={fourthCategory && fourthCategory}
                  name="fourth_category"
                  {...register("fourth_category")}
                />
              </>
            ) : (
              ""
            )}

            <InputComponent
              label="From Range (Required)"
              type="number"
              minLength={0}
              min="1"
              placeholder="Enter from range"
              name="from"
              {...register("from", { required: "From range is required" })}
            />
            {errors.from && (
              <p className="text-red-500">{errors.from.message}</p>
            )}
            <InputComponent
              label="To Range (Required)"
              min="1"
              type="number"
              minLength={0}
              placeholder="Enter To range"
              name="to"
              {...register("to", { required: "To range is required" })}
            />
            {errors.to && <p className="text-red-500">{errors.to.message}</p>}
          </div>
        </CollapseComponent>
      </form>
    </>
  );
};

export default React.memo(Export);
