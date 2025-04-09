import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import HeaderComponent from "../../components/common/HeaderComponent"
import { COLORS } from "../../utils/colors";
import CreateFamilies from "../../components/ui/Families/CreateFamilies";
import { Apis } from "../../services/apis/Family/Api";
import Loader from "../../utils/Loader";
import { notify } from "../../utils/notify";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../components/common/CommonTable"
const AttributeGroups = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [fetchAttloader, setAttrLoader] = useState(false);
    const [getFamilyData, setFamilyData] = useState([]);
    const [getCategories, setCategories] = useState([]);
    const [getFamilyDataById, setFamilyDataById] = useState([]);
    const [loader, setLoader] = useState(false);
    const [getResponse, setResponse] = useState([]);
    const options = ["Option One", "Option Two", "Option Three", "Option Four"];
    const buttons = [
        {
            'label': 'Import',
            'link': '/import',
            'icon': '',
            'type': 'button',
            'bgColor': '#E2E2E2',
            'icon': 'icons/import.png',
            'textColor': COLORS.darkCharcoal,
            'fontSize': '14px',
            'fontWeight': 'normal'
        },
        {
            'label': 'Create Attribute Group',
            'popup': true,
            'icon': 'icons/download.png',
            'type': 'button',
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

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: { name: "", category: "" },
    }
    );

    const fetchAttrGroupByid = (id) => {
        navigate("/attribute-groups-details", {
            state: { datas: id },
        });

    }
    const deleteGroupById = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this group?");
        if (confirmDelete) {
            Apis.deleteFamily(id, setLoader, setResponse);
        }
    }

    useEffect(() => {
        Apis.fetchCategories(page, limit, setAttrLoader, setCategories);
        Apis.fetchFamilies(page, limit, setAttrLoader, setFamilyData);
    }, []);

    useEffect(() => {
        if (getFamilyData.success) {
            setTotalPages(getFamilyData.total_pages)
            setTotalRecords(getFamilyData.total_records)
        }
    }, [getFamilyData]);
    useEffect(() => {
        Apis.fetchFamilies(page, limit, setAttrLoader, setFamilyData);
    }, [page]);
    const onSubmit = (data) => {

        const datas = {
            "name": data.name,
            "category_ids": data?.category?.map(categories => categories.value)

        }
        if (getFamilyDataById.success) {
            datas.id = getFamilyDataById.data.id;
            Apis.handleUpdate(datas, setLoader, setResponse);
        } else {
            Apis.handleCreate(datas, setLoader, setResponse);
        }


    };

    useEffect(() => {
        if (getResponse.success) {
            notify(getResponse.message)
            Apis.fetchFamilies(page, limit, setAttrLoader, setFamilyData);
            setShow(false);
            reset();
        }
    }, [getResponse]);

    useEffect(() => {
        if (getFamilyDataById.success) {
            setShow(true);
        } else {
            setShow(false);
        }

    }, [getFamilyDataById]);


    return (
        <>
            {fetchAttloader ? <div className="w-full h-[100vh] flex items-center justify-center bg-white fixed left-0 top-0 z-[999]">
                <Loader />
            </div> : <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <HeaderComponent label="Attribute Group List" setShow={setShow} span={`(${!!getFamilyData && getFamilyData?.data?.length} Results)`} buttons={buttons} />
                    <CommonTable
                        totalPages={totalPages}
                        changePage={changePage}
                        setPage={setPage}
                        currentPage={page}

                        deleteData={deleteGroupById} getDatafn={fetchAttrGroupByid} tableHeading={th} datas={!!getFamilyData && getFamilyData.data} options={options} showCheckBox={false} showFilter={true} />
                    {loader ? <div className="w-full h-[100vh] flex items-center justify-center  fixed left-0 top-0 z-[999]">
                        <Loader />
                    </div> : ''}
                    <CreateFamilies
                        loader={loader}
                        control={control}
                        getFamilyDataById={getFamilyDataById}
                        register={register} errors={errors} setValue={setValue}
                        getCategories={getCategories && getCategories.categories}
                        isOpen={show}
                        onClose={() => setShow(false)}

                    />
                </form>
            </div>}

        </>
    )
}

export default React.memo(AttributeGroups)