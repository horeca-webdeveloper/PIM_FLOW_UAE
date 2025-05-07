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
import FullScreenLoader from "../../utils/FullScreenLoader";
import ProductFamilyTable from "../../components/common/ProductFamilyTable";
const ProductFamily = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(100000);
    const [totalPages, setTotalPages] = useState(0);

    const [fetchAttloader, setAttrLoader] = useState(false);
    const [getFamilyData, setFamilyData] = useState([]);
    const [getCategories, setCategories] = useState([]);
    const [getFamilyDataById, setFamilyDataById] = useState([]);
    const [loader, setLoader] = useState(false);
    const [getResponse, setResponse] = useState([]);
    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const options = ["Option One", "Option Two", "Option Three", "Option Four"];
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


    ];

    const th = [
        {
            title: 'Family Name',
            key: 'name', // Ensure this matches the object key in datas
        },
        {
            title: 'Total Attribute',
            key: 'total_attr', // Ensure this matches the object key in datas
        },
        {
            title: 'Attribute as label',
            key: 'label', // Ensure this matches the object key in datas
        },

    ];


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
        window.open(`/product-families-details/${id}`);


    }
    const deleteGroupById = (id) => {
        Apis.deleteFamily(id, setLoader, setResponse);
    }


    const onSubmit = (data) => {

        const datas = {
            "name": data.name,
            "category_ids": data?.category?.map(categories => categories.value)

        }
        if (getFamilyDataById.success) {
            datas.id = getFamilyDataById.data.id;
            Apis.handleUpdateCategoryAttr(datas, setLoader, setResponse);
        } else {
            Apis.handleCreate(datas, setLoader, setResponse);
        }


    };
    useEffect(() => {
        const fetchData = async () => {
            setAttrLoader(true);
            await Promise.all([
                Apis.fetchCategories(page, limit, setAttrLoader, setCategories),
                Apis.fetchCategoryAttributes(page, limit, setAttrLoader, setFamilyData),
            ]);
            setAttrLoader(false);
        };
        fetchData();
    }, [page]); // Now listens for `page` changes as well

    useEffect(() => {
        if (getResponse.success) {
            notify(getResponse.message);
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

    useEffect(() => {
        if (getFamilyData.success && getFamilyData.total_pages !== totalPages) {
            setTotalPages(getFamilyData.total_pages);
        }
    }, [getFamilyData]); // Prevent unnecessary state updates

    return (
        <>
            {fetchAttloader ? <FullScreenLoader bgTransparent={true} /> : <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <HeaderComponent label="Product Families" setShow={setShow} span={`(${!!getFamilyData && getFamilyData?.total_records} Results)`} buttons={buttons} />
                   
                   <ProductFamilyTable
                    totalPages={totalPages}
                        changePage={changePage}
                        setPage={setPage}
                        currentPage={page}
                        deleteData={deleteGroupById}
                        getDatafn={fetchAttrGroupByid}
                        tableHeading={th}
                        datas={!!getFamilyData && getFamilyData.data}
                        options={options} showCheckBox={true} showFilter={true}
                        disableDelete={true} />
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

export default React.memo(ProductFamily)