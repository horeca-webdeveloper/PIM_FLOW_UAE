import React, { useEffect, useState } from "react";
import CollapseComponent from "../../components/common/CollapseComponent";
import { COLORS } from "../../utils/colors";
import InputComponent from "../../components/common/InputComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import { Apis } from "../../services/apis/Family/Api";
import { useLocation,useParams } from "react-router-dom";
import FullScreenLoader from "../../utils/FullScreenLoader";
import { useForm, Controller } from "react-hook-form";
import { notify } from "../../utils/notify";
import MultiSelectComponent from "../../components/common/MultiSelectComponent";
import AttributePopup from "../../components/ui/Families/AttributePopup";
import AttributGroupTable from "../../components/ui/Families/AttributGroupTable";

const AttributeGroupDetails = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm();

    const {id} =useParams();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [getAttributeDetails, setAttributeDetails] = useState([]);
    const [getAttributes, setAttributes] = useState([]);
    const [show, setShow] = useState(false);
    const [getResponse, setResponse] = useState([]);
    const [loader, setLoader] = useState(false);
    const [selectedType, setSelectedType] = useState('Properties');
    const selectedCategories = watch("categories", []);
    const selectedAttributes = watch("selectedAttr", []);
    const tableOptions = ["Option One", "Option Two", "Option Three", "Option Four"];
    const has_group = false;
    const options = [
        {
            'label': 'Properties',
            'link': '',
            'icon': '',
            'type': 'button',
            'icon': 'icons/import.png',
            'textColor': 'white',
            'fontSize': '14px',
            'fontWeight': 'normal'
        },
        {
            'label': 'Attributes',
            'popup': true,
            'icon': 'icons/download.png',
            'type': 'button',
            'textColor': 'white',
            'textSize': '14px',
            'fontWeight': 'normal'
        },
        {
            'label': 'Variants',
            'popup': true,
            'icon': 'icons/download.png',
            'type': 'button',
            'textColor': 'white',
            'textSize': '14px',
            'fontWeight': 'normal'
        }

    ];

    const buttons = [
        {
            'label': 'Import',
            'link': '',
            'icon': '',
            'type': 'button',
            'bgColor': '#E2E2E2',
            'icon': 'icons/import.png',
            'textColor': COLORS.darkCharcoal,
            'fontSize': '14px',
            'fontWeight': 'normal'
        },
        {
            'label': 'Save',
            'popup': false,
            'icon': 'icons/download.png',
            'type': 'submit',
            'bgColor': COLORS.bgPrimary,
            'textColor': 'white',
            'textSize': '14px',
            'fontWeight': 'normal'
        }

    ];
    const th = [
        {
            title: 'Family Name',
            key: 'name', // Ensure this matches the object key in datas
        },
        {
            title: 'Attribute as label',
            key: 'label', // Ensure this matches the object key in datas
        },

    ];
    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    useEffect(() => {
        Apis.handleFetchFamilyById(id, setLoader, setAttributeDetails);
        Apis.fetchAttributes(setLoader, setAttributes, has_group);
    }, [id]);

    useEffect(() => {
        Apis.handleFetchFamilyById(id, setLoader, setAttributeDetails);
    }, [page]);

    useEffect(() => {
        if (getAttributeDetails?.success) {
            setValue("name", getAttributeDetails?.data[0].name);

            // Map categories to { value, label } format
            const defaultValues =
                getAttributeDetails?.data?.[0]?.categories?.map((item) => ({
                    value: item.id,
                    label: item.name, // Assuming "name" should be the label
                }));
            const seletedAttributes =
                getAttributeDetails?.data?.[0]?.groupAttributes?.map((item) => ({
                    value: item.id,
                    label: item.name, // Assuming "name" should be the label
                }));
            setValue("selectedAttr", seletedAttributes); // Set multi-select values
            setValue("categories", defaultValues); // Set multi-select values

            setTotalPages(getAttributeDetails?.data[0].total_pages)
            setTotalRecords(getAttributeDetails?.data[0].total_records)
        }
    }, [getAttributeDetails, setValue]);

    const onSubmit = (data) => {

        const datas = {
            "name": data.name,
            "attribute_ids": data?.attributes?.map(attributes => attributes.value),

        }
        datas.id = getAttributeDetails.data[0].id;
        Apis.handleUpdate(datas, setLoader, setResponse);

    };
    const deleteGroupById = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this group?");
        if (confirmDelete) {
            Apis.deleteFamily(id, setLoader, setResponse);
        }

    }

    useEffect(() => {
        if (getResponse.success) {
            notify(getResponse.message)
            setShow(false);
            reset();
            Apis.handleFetchFamilyById(id, setLoader, setAttributeDetails);
        }
    }, [getResponse]);

 
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="min-h-screen">
                    {loader ? <FullScreenLoader bgTransparent={true} /> : ''}

                    {!!getAttributeDetails && getAttributeDetails.data ? <> <HeaderComponent label="Attribute Group Details" buttons={buttons} />
                        <div className="mt-5 bg-white border-2 border-[#DFDFDF] rounded-lg">
                            {/* Header (Click to Expand/Collapse) */}
                            <div className="flex rounded-md py-[5px] border-[#DFDFDF] bg-[#F9F9FB] px-4 items-center cursor-pointer justify-between">

                                {/* Left Side (Options) */}
                                <div className="flex gap-2">
                                    {options &&
                                        options.map((item) => (
                                            <div
                                                key={item.label}
                                                onClick={() => setSelectedType(item.label)}
                                                className={`text-[16px] leading-[17.64px] font-light text-[${item.textColor}] ${item.label == selectedType ? `bg-[${COLORS.bgPrimary}]` : "bg-[#E2E2E2]"
                                                    } px-[20px] font-${item.fontWeight} rounded-[5px] py-[8px] flex items-center gap-2`}
                                            >
                                                {item.label}
                                            </div>
                                        ))}
                                </div>
                                {
                                    selectedType === 'Attributes' ?
                                        <div className="flex flex-wrap gap-2 justify-end w-full">

                                            <div
                                                onClick={() => setShow(true)}
                                                className={`text-[16px] leading-[17.64px] font-light text-white bg-[${COLORS.bgPrimary}] px-[20px] rounded-[5px] py-[8px] flex items-center gap-2`}
                                            >
                                                Add Attributes
                                            </div>
                                        </div> : ''
                                }


                            </div>
                        </div>

                        {/* for properties */}
                        {selectedType === 'Properties' ? <>   <CollapseComponent title="General properties">
                            <InputComponent label="Attribute Group (Required)"
                                {...register("name", { required: "Name is required" })}
                                type="text" name="name"
                                placeholder="Text Field"
                                disabled
                                icons="icons/lock.png"
                            />

                            {errors.code && <p className="text-red-500">{errors.code.message}</p>}
                            <br />

                            <Controller
                                name="categories"
                                control={control}
                                rules={{ required: `Product family is required` }}

                                render={({ field }) => (
                                    <MultiSelectComponent
                                        defaultValues={selectedCategories}
                                        option={!!getAttributeDetails && getAttributeDetails?.data?.[0]?.categories}
                                        label="Product Family (Required)"
                                        disabled={true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.categories && <p className="text-red-500">{errors.categories.message}</p>}


                        </CollapseComponent>

                            <CollapseComponent title="Label translations">
                                <div className="mb-2">


                                    <InputComponent bgTransparent={true} label="English (United States)" type="text" name="text" placeholder="Text Field" />
                                </div>
                                <div className="mb-2">
                                    <InputComponent bgTransparent={true} label="Spanish (Spain)" type="text" name="text" placeholder="Text Field" />
                                </div>
                                <div className="mb-2">
                                    <InputComponent bgTransparent={true} label="Chinese (China)" type="text" name="text" placeholder="Text Field" />
                                </div>
                            </CollapseComponent></> : ''}

                        {/* for Attributes           */}
                        {selectedType === 'Attributes' ? <>   <CollapseComponent title="General properties">
                            <AttributGroupTable
                                totalPages={totalPages}
                                changePage={changePage}
                                setPage={setPage}
                                currentPage={page}
                                deleteData={deleteGroupById} tableHeading={th}
                                options={tableOptions} datas={!!getAttributeDetails && getAttributeDetails?.data?.[0]}
                                showCheckBox={true} showFilter={true} />

                        </CollapseComponent>

                        </> : ''}

                        {/* for Variants */}
                        {selectedType === 'Variants' ? <>   <CollapseComponent title="General properties">
                        <p>In progress...</p>
                            {/* <InputComponent label="Attribute Group (Required)"
                                {...register("name", { required: "Name is required" })}
                                type="text" name="name"
                                placeholder="Text Field" />

                            {errors.code && <p className="text-red-500">{errors.code.message}</p>}
                            <br />

                            <MultiSelectComponent label="Product Family (required)"
                                defaultValues={selectedCategories}
                                option={!!getAttributeDetails && getAttributeDetails?.data?.[0]?.categories} /> */}

                        </CollapseComponent>

                            <CollapseComponent title="Label translations">
                            <p>In progress...</p>
                            </CollapseComponent></> : ''}
                    </> : ''}

                    <AttributePopup
                        loader={loader}
                        control={control}
                        heading="Select Attributes"
                        name="attributes"
                        label="Select Attribute"
                        selectedAttributes={!!selectedAttributes && selectedAttributes}
                        register={register} errors={errors} setValue={setValue}
                        getAttributes={getAttributes && getAttributes.data}
                        isOpen={show}
                        onClose={() => setShow(false)}

                    />
                </div>
            </form>
        </>
    );
};

export default React.memo(AttributeGroupDetails);
