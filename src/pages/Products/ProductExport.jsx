import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import HeaderComponent from "../../components/common/HeaderComponent"
import { COLORS } from "../../utils/colors";
import InputComponent from "../../components/common/InputComponent";
import SelectComponent from "../../components/common/SelectComponent";
import CollapseComponent from "../../components/common/CollapseComponent";
import { Apis } from "../../services/apis/ImportExport/Api";
import FullScreenLoader from "../../utils/FullScreenLoader";
const ProductExport = () => {
    const [loader, setLoader] = useState(false);
    const [response, setResponse] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [stores, setStores] = useState([]);
    const [brandArray, setBrandArray] = useState([]);
    const [storeArray, setStoreArray] = useState([]);
    const [parentCategory, setParentCategories] = useState([]);
    const [secondryCategory, setSecondCategories] = useState([]);
    const [thirdCategory, setThirdCategories] = useState([]);
    const [fourthCategory, setFourthCategories] = useState([]);
    const [fileName, setFileName] = useState(null);

    const url = '/products/export';
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

    const types = watch("export_type", "");
    const findName = (id) => {
        const name = categories.categories.find((it) => it.id == id);
        if (name) {
            const formattedName = name.name.toLowerCase().replace(/\s+/g, '_');
            setFileName(formattedName);
            return formattedName;
        }
        return null; // Return null if no name is found
    };
    const findBrandName = (id) => {
        const name = brandArray.find((it) => it.id == id);
        if (name) {
            const formattedName = name.name.toLowerCase().replace(/\s+/g, '_');

            return formattedName;
        }
        return null; // Return null if no name is found
    };
    const findStoreName = (id) => {
        const name = storeArray.find((it) => it.id == id);
        if (name) {
            const formattedName = name.name.toLowerCase().replace(/\s+/g, '_');

            return formattedName;
        }
        return null; // Return null if no name is found
    };
    const typeOption = [
        {
            id: 'category', name: 'Category'
        },
        {
            id: 'brand', name: 'Brand'
        },
        {
            id: 'store', name: 'Store'
        },

    ]
    const onSubmit = (data) => {
        let categoryId;
        if (data.fourth_category) {
            categoryId = data.fourth_category
        }
        else if (data.third_category) {
            categoryId = data.third_category
        } else if (data.second_category) {
            categoryId = data.second_category
        }
        else if (data.primary_category) {
            categoryId = data.primary_category
        }

        const datas = {
            "brand_id": parseInt(data.brand_id),
            "store_id": parseInt(data.store_id),
            "parent_category_id": parseInt(categoryId),
            "range_from": parseInt(data.from),
            "range_to": parseInt(data.to)
        }

        let name;
        if (categoryId) {
            name = findName(categoryId);
        } else if (data.brand_id) {
            name = findBrandName(data.brand_id);
        } else if (data.store_id) {
            name = findStoreName(data.store_id);
        }

        Apis.exportData(datas, setLoader, setResponse, url, `${name}_${data.from}_${data.to}`);
        reset();

    };
    useEffect(() => {
        if (categories && categories?.categories?.length > 0) {
            const parentCat = categories.categories.filter((it) => it.parent_id == 0);
            setParentCategories(parentCat);

        }
        if (parentId && categories.categories.length > 0) {
            const secondCat = categories.categories.filter((it) => it.parent_id == parentId);
            setSecondCategories(secondCat);
        }
        if (secondCatId && categories.categories.length > 0) {
            const thirdCat = categories.categories.filter((it) => it.parent_id == secondCatId);
            setThirdCategories(thirdCat);
        }
        if (thirdCatId && categories.categories.length > 0) {
            const fourthCat = categories.categories.filter((it) => it.parent_id == thirdCatId);
            setFourthCategories(fourthCat);
        }

    }, [parentId, secondCatId, thirdCatId, categories]);

    const buttons = [

        {
            'label': 'Download',
            'link': '',
            'icon': 'icons/download.png',
            'type': 'submit',
            'bgColor': COLORS.bgPrimary,
            'textColor': 'white',
            'textSize': '14px',
            'fontWeight': 'normal'
        }

    ];

    useEffect(() => {
        if (types === 'store') {
            Apis.fetchStores(setLoader, setStores);
        } else if (types === 'brand') {

            Apis.fetchBrands(setLoader, setBrands);
        } else if (types === 'category') {
            Apis.fetchCategories(setLoader, setCategories);
        }
    }, [types]);

    useEffect(() => {
        if (brands?.success && brands.brands) {
            const brandDatas = Object.entries(brands.brands).map(([id, name]) => ({
                id,
                name,
            }));

            setBrandArray(brandDatas);
        }

        if (stores?.stores && Object.keys(stores.stores).length) {
            const storesDatas = Object.entries(stores.stores).map(([id, name]) => ({
                id,
                name,
            }));

            setStoreArray(storesDatas);
        }
    }, [brands, stores]);

    useEffect(() => {
        setThirdCategories([]);
        setFourthCategories([]);
    }, [parentId]);

    return (
        <>
            {loader ? <FullScreenLoader bgTransparent={true} /> : ''}
            <form onSubmit={handleSubmit(onSubmit)}>
                <HeaderComponent label="Export" span="" buttons={buttons} />

                {/* Collapsible Section */}
                <CollapseComponent title="Export"
                    label={Object.keys(errors).length > 0 ? `${Object.keys(errors).length} missing required attributes` : ""}
                >
                    <div className="space-y-4">
                        <SelectComponent label="Select Export Type" name="export_type" option={typeOption} {...register("export_type", { required: "Select Type is required" })} />
                        {errors.export_type && <p className="text-red-500">{errors.export_type.message}</p>}
                        {types == 'category' ? <> <SelectComponent label="Primary Category" name="primary_category" option={!!parentCategory && parentCategory} {...register("primary_category", { required: "Primary category is required" })} />
                            {errors.primary_category && <p className="text-red-500">{errors.primary_category.message}</p>}

                            {secondryCategory && secondryCategory.length > 0 ? <>
                                <SelectComponent label="Second Category" option={secondryCategory && secondryCategory} name="second_category" {...register("second_category", { required: "Secondry category is required" })} />
                                {errors.second_category && <p className="text-red-500">{errors.second_category.message}</p>}</> : ''}
                            {thirdCategory && thirdCategory.length > 0 ? <>

                                <SelectComponent label="Third Category" option={thirdCategory && thirdCategory} name="third_category" {...register("third_category")} />
                            </> : ''}

                            {fourthCategory && fourthCategory.length > 0 ? <>
                                <SelectComponent label="Fourth Category" option={fourthCategory && fourthCategory} name="fourth_category" {...register("fourth_category")} />
                            </> : ''}</> : ''}

                        {types == 'brand' ? <> <SelectComponent label="Select Brand" name="brand_id" option={!!brandArray && brandArray} {...register("brand_id", { required: "Brand is required" })} />
                            {errors.brand_id && <p className="text-red-500">{errors.brand_id.message}</p>}
                        </> : ''
                        }
                        {types == 'store' ? <> <SelectComponent label="Select Store" name="store_id" option={!!storeArray && storeArray} {...register("store_id", { required: "Store is required" })} />
                            {errors.store_id && <p className="text-red-500">{errors.store_id.message}</p>}
                        </> : ''
                        }

                        <InputComponent label="From Range" type="number" min="1" placeholder="Enter from range" name="from"  {...register("from", { required: "From range is required" })} />
                        {errors.from && <p className="text-red-500">{errors.from.message}</p>}
                        <InputComponent label="To Range" type="number" min="1" max="2000" placeholder="Enter To range" name="to"   {...register("to", { required: "To range is required" })} />
                        {errors.to && <p className="text-red-500">{errors.to.message}</p>}
                    </div>
                </CollapseComponent>
            </form>
        </>
    )
}

export default React.memo(ProductExport)