import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import TextAttributes from "./TextAttributes";
import NumberAttributes from "./NumberAttributes";
import MeasurementAttributes from "./MeasurementAttributes";
import YesNoAttributes from "./YesNoAttributes";
import FileAttributes from "./FileAttributes";
import ImageAttributes from "./ImageAttributes";
import DateAttributes from "./DateAttributes";
import SingleSelectAttributes from "./SingleSelectAttributes";
import MultiSelectAttributes from "./MultiSelectAttributes";
import VideoAttributes from "./VideoAttributes";
import PriceAttributes from "./PriceAttributes";
import TableAttributes from "./TableAttributes";
import { Apis } from "../../../services/apis/Attributes/Api";
import Loader from "../../../utils/Loader";

import { notify } from "../../../utils/notify";
const AddAttribute = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [getResponse, setResponse] = useState([]);
  const [attrData, setAttrData] = useState(null);
  const [type, setType] = useState(null);
  const [allowedExtension, setAllowedExtension] = useState([]);
 
  const [attributeGroups, setAttributeGroups] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      Apis.handleFetchAttributeById(id, setLoader, setAttrData);
      Apis.fetchAttributeGroups(setLoader, setAttributeGroups)
    }

  }, [id]);


  useEffect(() => {
    if (attrData?.data?.type) {
      setType(attrData?.data?.type);
    } else {
      console.warn("Attribute type is undefined:", attrData);
    }
  }, [attrData]);

  
  const attributeComponents = {
    text: <TextAttributes stateData={attrData?.data} control={control} register={register} errors={errors} setValue={setValue} attributeGroups={!!attributeGroups && attributeGroups.data} />,
    number: <NumberAttributes stateData={attrData?.data} control={control} register={register} errors={errors} setValue={setValue} attributeGroups={!!attributeGroups && attributeGroups.data} />,
    select: <SingleSelectAttributes stateData={attrData?.data} control={control} register={register} errors={errors} setValue={setValue} attributeGroups={!!attributeGroups && attributeGroups.data} allowedExtension={allowedExtension} setAllowedExtension={setAllowedExtension} />,
    multiselect: <MultiSelectAttributes stateData={attrData?.data} control={control} register={register} errors={errors} setValue={setValue} attributeGroups={!!attributeGroups && attributeGroups.data} allowedExtension={allowedExtension} setAllowedExtension={setAllowedExtension} />,
    price: <PriceAttributes stateData={attrData?.data} register={register} control={control} errors={errors} setValue={setValue} attributeGroups={!!attributeGroups && attributeGroups.data} />,
    measurement: <MeasurementAttributes stateData={attrData?.data} register={register} control={control} errors={errors} setValue={setValue} attributeGroups={!!attributeGroups && attributeGroups.data} />,
    toggle: <YesNoAttributes stateData={attrData?.data} register={register} control={control} errors={errors} setValue={setValue} attributeGroups={!!attributeGroups && attributeGroups.data} />,
    date: <DateAttributes stateData={attrData?.data} register={register} control={control} errors={errors} setValue={setValue} attributeGroups={!!attributeGroups && attributeGroups.data} />,
    file: <FileAttributes stateData={attrData?.data} register={register} control={control} errors={errors} setValue={setValue} allowedExtension={allowedExtension} setAllowedExtension={setAllowedExtension} attributeGroups={!!attributeGroups && attributeGroups.data} />,
    image: <ImageAttributes stateData={attrData?.data} register={register} control={control} errors={errors} setValue={setValue} allowedExtension={allowedExtension} setAllowedExtension={setAllowedExtension} attributeGroups={!!attributeGroups && attributeGroups.data} />,
    video: <VideoAttributes stateData={attrData?.data} register={register} control={control} errors={errors} setValue={setValue} allowedExtension={allowedExtension} setAllowedExtension={setAllowedExtension} attributeGroups={!!attributeGroups && attributeGroups.data} />,
    table: <TableAttributes stateData={attrData?.data} register={register} control={control} errors={errors} setValue={setValue} attributeGroups={!!attributeGroups && attributeGroups.data} />,
  };
  const onSubmit = (data) => {

    const groupIdData = data.attribute_group_id;
    const attributeGroupId = Array.isArray(groupIdData)
      ? groupIdData[0]?.value
      : groupIdData?.value;
    const datas = {
      "id": attrData.data.id,
      "attribute_group_id": attributeGroupId,
      ...(allowedExtension.length > 0 ? { attribute_values: allowedExtension } : {}),
      "name": attrData.data.name,
      "code": attrData.data.code,
      "type": attrData.data.type,
      // "is_required": data.is_required ? 1 : 0,
      // "is_required": 1,
      "validations": {
        "min": data.min,
        "max": data.max,
        "required": data.is_required === 'Yes' ? 1 : 0,
        ...((attrData.data.type === "file" || attrData.data.type === "image" || attrData.data.type === "video" || attrData.data.type === 'select' || attrData.data.type === 'multiselect') && {
          allowedExtension: allowedExtension,
        }),
        ...((attrData.data.type === "toggle" || attrData.data.type === "table") && {

          default_value: data.default_value === 'Yes' ? 1 : 0,
        }),
        ...(attrData.data.type === "text" && {
          editor: data.editor === 'Yes' ? 1 : 0,
        }),
        ...(attrData.data.type === "measurement" && {
          measurment_family: data.measurment_family,
          negative: data.negative === 'Yes' ? 1 : 0,
          decimal: data.decimal === 'Yes' ? 1 : 0,
        }),
        ...(attrData.data.type === "number" && {
          negative: data.negative === 'Yes' ? 1 : 0,
          decimal: data.decimal === 'Yes' ? 1 : 0,
        }),

      }

    }


    Apis.handleUpdate(datas, setLoader, setResponse);
  };

  useEffect(() => {
    if (getResponse.success) {
      notify(getResponse.message);
      navigate("/Attributes");

    }

  }, [getResponse]);


  return (
    <>
      {loader ? <div className="w-full h-[100vh] flex items-center justify-center bg-white fixed left-0 top-0 z-[999]">
        <Loader />
      </div> :
        <form onSubmit={handleSubmit(onSubmit)}>
          {attributeComponents[!!type && type] || <div>Invalid Attribute</div>}

        </form>
      }
    </>
  );
};

export default AddAttribute;
