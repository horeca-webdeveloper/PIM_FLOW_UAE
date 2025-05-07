import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryHeader from "../../components/ui/Categories/CategoryHeader";
import { COLORS } from "../../utils/colors";
import InputComponent from "../../components/common/InputComponent";
import SelectComponent from "../../components/common/SelectComponent";
import SingleSelectFileComponent from "../../components/ui/Categories/SingleSelectFileComponent";
import SortableTree from "@nosferatu500/react-sortable-tree";
import "@nosferatu500/react-sortable-tree/style.css";
import { Apis } from "../../services/apis/CategoryApis/Api";
import FullScreenLoader from "../../utils/FullScreenLoader";
import { notify } from "../../utils/notify";

const countAllDescendants = (node) => {
    if (!node.children_recursive || node.children_recursive.length === 0) return 0;
    return node.children_recursive.length + node.children_recursive.reduce((sum, child) => sum + countAllDescendants(child), 0);
};

const convertToTreeData = (nodes) => {
    return nodes.map(node => {
        const children = node.children_recursive ? convertToTreeData(node.children_recursive) : [];
        const totalDescendants = countAllDescendants(node);

        return {
            id: node.id,
            slug: node.slug,
            parentId: node.parent_id ? node.parent_id : 0,
            title: `${node.name} (${totalDescendants})`, // e.g., "Food Equipment (5)"
            children,
        };
    });
};





const CategoryDragAndDrop = () => {
    const [treeData, setTreeData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [categories, setCategoriesMain] = useState([]);
    const [getCategories, setCategories] = useState([]);
    const [parentCategory, setParentCategories] = useState([]);
    const [secondryCategory, setSecondCategories] = useState([]);
    const [thirdCategory, setThirdCategories] = useState([]);
    const [fourthCategory, setFourthCategories] = useState([]);
    const [response, setResponse] = useState(null);
    const [reorderResponse, setReorderResponse] = useState(null);
    const status = [{
        id: 'draft',
        name: 'Draft'

    }, {
        id: 'published',
        name: 'Published'
    }]
    const featured = [{
        id: 1,
        name: 'Yes'

    }, {
        id: 0,
        name: 'No'
    }]
    const {
        register,
        handleSubmit,
        setValue,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const parentId = watch("primary_category", "");
    const secondCatId = watch("second_category", "");
    const thirdCatId = watch("third_category", "");
    const fourthCatId = watch("fourth_category", "");
    const buttons = [
        // {
        //     label: "Update Changes",
        //     link: "/",
        //     icon: "icons/import.png",
        //     type: "button",
        //     bgColor: "#E2E2E2",
        //     textColor: COLORS.darkCharcoal,
        //     fontSize: "14px",
        //     fontWeight: "normal",
        // },
        {
            label: "Add Category",
            link: "",
            icon: "icons/download.png",
            type: "submit",
            bgColor: COLORS.bgPrimary,
            textColor: "white",
            textSize: "14px",
            fontWeight: "normal",
        },
    ];

    // const buttons2 = [
    //     {
    //         label: "Save & Exit",
    //         link: "/import",
    //         icon: "icons/import.png",
    //         type: "Submit",
    //         bgColor: "#E2E2E2",
    //         textColor: COLORS.darkCharcoal,
    //         fontSize: "14px",
    //         fontWeight: "normal",
    //     },
    //     {
    //         label: "Publish Category",
    //         link: "",
    //         icon: "icons/download.png",
    //         type: "submit",
    //         bgColor: COLORS.bgPrimary,
    //         textColor: "white",
    //         textSize: "14px",
    //         fontWeight: "normal",
    //     },
    // ];

    // Function to build flat structure with parentId and position
    const generateTreeMeta = (nodes, parentId = null) => {
        let result = [];

        nodes.forEach((node, index) => {
            const { id } = node;
            result.push({
                id,
                title: node.title,
                parentId: parentId ? parentId : 0,
                position: index,
            });

            if (node.children && node.children.length > 0) {
                result = result.concat(generateTreeMeta(node.children, id));
            }
        });

        return result;
    };

    const handleDrop = (newTree) => {
        const oldMeta = generateTreeMeta(treeData);
        const newMeta = generateTreeMeta(newTree);

        // Find changed nodes
        const changes = newMeta.filter(newNode => {
            const oldNode = oldMeta.find(o => o.id === newNode.id);
            return !oldNode || oldNode.parentId !== newNode.parentId || oldNode.position !== newNode.position;
        });

        if (changes.length > 0) {
            const categories = {
                changes
            }
            // You can now send only these to your API
            Apis.categoryReorder(changes, setLoader, setReorderResponse)
        }

        setTreeData(newTree);
    };


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
        const formData = new FormData();
        formData.append("name", data.category_name);
        formData.append("is_featured", data.featured);
        formData.append("parent_id", parseInt(categoryId));
        formData.append("description", '');
        formData.append("status", data.status);
        formData.append("order", '');
        formData.append("icon", data.icon);

        data.thumbnail?.forEach((banner, index) => {

            if (banner.file?.[0] instanceof File) {
                formData.append(`icon_image`, banner.file[0]);
            }
        });


        Apis.createNewCategory(formData, setLoader, setResponse);
    };

    useEffect(() => {
        Apis.allCategoriesTree(setLoader, setCategories);
        Apis.fetchCategories(setLoader, setCategoriesMain);
    }, []);


    useEffect(() => {
        if (getCategories.success) {
            const treeDatas = convertToTreeData(getCategories.categories);

            setTreeData(treeDatas);
        }
    }, [getCategories]);

    useEffect(() => {

        if (!!response && response?.success) {
            notify(response.message)
            Apis.allCategoriesTree(setLoader, setCategories);
            Apis.fetchCategories(setLoader, setCategoriesMain);
            reset();

        }

    }, [response]);

    useEffect(() => {

        if (!!reorderResponse && reorderResponse?.success) {
            notify(reorderResponse.message)
            Apis.fetchCategories(setLoader, setCategoriesMain);
        }

    }, [reorderResponse]);


    useEffect(() => {


        if (categories && categories?.categories?.length > 0) {
            const parentCat = categories.categories.filter((it) => it.parent_id == 0);
            setParentCategories(parentCat);
        }
        if (parentId && categories.categories.length > 0) {
            console.log("getCategories.categories.length", categories);
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
    useEffect(() => {
        setThirdCategories([]);
        setFourthCategories([]);
    }, [parentId]);


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="min-h-screen">
                <CategoryHeader buttons={buttons} categoryName="Categories" />

                <div className="grid h-screen grid-cols-12 gap-4 mt-5">
                    {loader ? <FullScreenLoader bgTransparent={true} /> : ''}
                    <div className="col-span-4 bg-white border border-[#979797] rounded-lg p-4">
                        <SortableTree
                            treeData={treeData}
                            onChange={handleDrop}
                        />
                    </div>

                    <div className="col-span-8 bg-white border border-[#979797] rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Category Name */}
                            <div>
                                <InputComponent
                                    label="Category Name"
                                    bgTransparent={true}
                                    width="full"
                                    name="category_name"
                                    placeholder="Text Field"
                                    {...register("category_name", { required: "Category name is required" })}
                                />
                                {errors.category_name && (
                                    <p className="text-red-500">{errors.category_name.message}</p>
                                )}
                            </div>

                            {/* Category URL */}
                            {/* <div>
                                <InputComponent
                                    label="Category URL"
                                    bgTransparent={true}
                                    width="full"
                                    name="url"
                                    placeholder="https://"
                                    {...register("url", { required: "Url is required" })}
                                />
                                {errors.url && (
                                    <p className="text-red-500">{errors.url.message}</p>
                                )}
                            </div> */}

                            {/* Primary Category */}
                            <div>
                                <SelectComponent
                                    width="full"
                                    label="Primary Category (Required)"
                                    name="primary_category"
                                    option={!!parentCategory && parentCategory}
                                    {...register("primary_category", { required: "Primary category is required" })}
                                />
                                {errors.primary_category && (
                                    <p className="text-red-500">{errors.primary_category.message}</p>
                                )}
                            </div>

                            {/* Secondary Category */}
                            {secondryCategory?.length > 0 && (
                                <div>
                                    <SelectComponent
                                        width="full"
                                        label="Second Category"
                                        name="second_category"
                                        option={secondryCategory}
                                        {...register("second_category")}
                                    />
                                    {errors.second_category && (
                                        <p className="text-red-500">{errors.second_category.message}</p>
                                    )}
                                </div>
                            )}

                            {/* Third Category */}
                            {thirdCategory?.length > 0 && (
                                <div>
                                    <SelectComponent
                                        width="full"
                                        label={fourthCategory?.length > 0 ? 'Third Category' : 'Product Family'}
                                        name="third_category"
                                        option={thirdCategory}
                                        {...register("third_category")}
                                    />
                                </div>
                            )}

                            {/* Fourth Category */}
                            {fourthCategory?.length > 0 && (
                                <div>
                                    <SelectComponent
                                        width="full"
                                        label="Product Family"
                                        name="fourth_category"
                                        option={fourthCategory}
                                        {...register("fourth_category")}
                                    />
                                </div>
                            )}

                            {/* Status */}
                            <div>
                                <SelectComponent
                                    width="full"
                                    label="Status"
                                    name="status"
                                    option={status}
                                    {...register("status", { required: "Status is required" })}
                                />
                                {errors.status && (
                                    <p className="text-red-500">{errors.status.message}</p>
                                )}
                            </div>

                            {/* Featured */}
                            <div>
                                <SelectComponent
                                    width="full"
                                    label="Featured"
                                    name="featured"
                                    option={featured}
                                    {...register("featured", { required: "Featured is required" })}
                                />
                                {errors.featured && (
                                    <p className="text-red-500">{errors.featured.message}</p>
                                )}
                            </div>

                            {/* Thumbnail (spans full width) */}
                            <div className="md:col-span-2">
                                <SingleSelectFileComponent
                                    title="Category Thumbnail"
                                    fileLength={1}
                                    fileName={false}
                                    altText={false}
                                    control={control}
                                    register={register}
                                    setValue={setValue}
                                    namePrefix="thumbnail"
                                    notInArray={true}
                                    border={false}
                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                                />
                                {errors.thumbnail && (
                                    <p className="text-red-500">{errors.thumbnail.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default React.memo(CategoryDragAndDrop);
