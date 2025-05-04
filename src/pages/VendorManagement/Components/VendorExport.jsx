import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { COLORS } from "../../../utils/colors";
import FullScreenLoader from "../../../utils/FullScreenLoader";
import HeaderComponent from "../../../components/common/HeaderComponent";
import CollapseComponent from "../../../components/common/CollapseComponent";
import SelectComponent from "../../../components/common/SelectComponent";
import InputComponent from "../../../components/common/InputComponent";
import { Apis } from "../../../services/apis/ImportExport/Api";
const VendorExport = () => {
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState([]);
  const url = "/vendors/export";
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const datas = {
      range_from: parseInt(data?.from),
      range_to: parseInt(data?.to),
    };

    console.log(datas);

    Apis.exportVendorData(
      datas,
      setLoader,
      setResponse,
      url,
      `${data.from}_${data.to}`
    );
    reset();
  };
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

  return (
    <div className=" min-h-[90vh]">
      {loader ? <FullScreenLoader bgTransparent={true} /> : ""}
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderComponent label="Vendor Export" span="" buttons={buttons} />

        {/* Collapsible Section */}
        <CollapseComponent
          title="Vendor Export"
          label={
            Object.keys(errors).length > 0
              ? `${Object.keys(errors).length} missing required attributes`
              : ""
          }
        >
          <div className="space-y-4">
            <InputComponent
              label="From Range"
              type="number"
              min="1"
              placeholder="Enter from range"
              name="from"
              {...register("from", { required: "From range is required" })}
            />
            {errors.from && (
              <p className="text-red-500">{errors.from.message}</p>
            )}
            <InputComponent
              label="To Range"
              type="number"
              min="1"
              max="2000"
              placeholder="Enter To range"
              name="to"
              {...register("to", { required: "To range is required" })}
            />
            {errors.to && <p className="text-red-500">{errors.to.message}</p>}
          </div>
        </CollapseComponent>
      </form>
    </div>
  );
};

export default React.memo(VendorExport);
