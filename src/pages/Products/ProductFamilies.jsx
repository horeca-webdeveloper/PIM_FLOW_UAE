import React, { useState } from "react";
import HeaderComponent from "../../components/common/HeaderComponent";
import { COLORS } from "../../utils/colors";
import CommonTable from "../../components/common/CommonTable";

const ProductFamilies = () => {
  const options = ["Option One", "Option Two", "Option Three", "Option Four"];
  const buttons = [
    {
      label: "Import",
      link: "",
      icon: "",
      type: "button",
      bgColor: "#E2E2E2",
      icon: "icons/import.png",
      textColor: COLORS.darkCharcoal,
      fontSize: "14px",
      fontWeight: "normal",
    },
    {
      label: "Create Family",
      link: "/product/import",
      icon: "icons/download.png",
      type: "button",
      bgColor: COLORS.bgPrimary,
      textColor: "white",
      textSize: "14px",
      fontWeight: "normal",
    },
  ];

  const [formState, setFormState] = useState({
    file: "",
    fileType: "",
  });

  const th = [
    {
      title: "Family Name",
      key: "familyName", // Ensure this matches the object key in datas
    },
    {
      title: "Attribute as label",
      key: "label", // Ensure this matches the object key in datas
    },
  ];
  const datas = [
    {
      familyName: "family name",
      label: "Example Attribute",
    },
  ];

  return (
    <>
      <HeaderComponent label="Import Log" span="" buttons={buttons} />
      <CommonTable
        tableHeading={th}
        datas={datas}
        options={options}
        showFilter={true}
      />
    </>
  );
};

export default React.memo(ProductFamilies);
