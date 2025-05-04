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
            parentId: node.parent_id,
            title: `${node.name} (${totalDescendants})`, // e.g., "Food Equipment (5)"
            children,
        };
    });
};





const CategoryDragAndDrop = () => {
    const [treeData, setTreeData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [getCategories, setCategories] = useState([]);
    const [response,setResponse]=useState(null);
    const [reorderResponse,setReorderResponse]=useState(null);
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
        formState: { errors },
    } = useForm();

    const buttons = [
        {
            label: "Update Changes",
            link: "/",
            icon: "icons/import.png",
            type: "button",
            bgColor: "#E2E2E2",
            textColor: COLORS.darkCharcoal,
            fontSize: "14px",
            fontWeight: "normal",
        },
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
                parentId,
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
           const categories={
                    changes
           }
            // You can now send only these to your API
            Apis.categoryReorder(changes,setLoader,setReorderResponse)
        }
    
        setTreeData(newTree);
    };
    

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("name", data.category_name);
        formData.append("is_featured", data.featured);
        formData.append("parent_id", parseInt(data.parentId));
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
    }, []);


    useEffect(() => {
        if (getCategories.success) {
            const treeDatas = convertToTreeData(getCategories.categories);

            setTreeData(treeDatas);
        }
    }, [getCategories]);

    useEffect(()=>{
       
        if(!!response && response?.success){
            notify(response.message)
            Apis.allCategoriesTree(setLoader, setCategories);
            reset();
            
        }
    },[response]);
  
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <InputComponent
                                label="Category Name"
                                bgTransparent={true}
                                width="full"
                                name="category_name"
                                placeholder="Text Field"
                                {...register("category_name", { required: "Category name is required" })}
                            />
                            {errors.category_name && <p className="text-red-500">{errors.category_name.message}</p>}
                            </div>
                            <div>
                            <InputComponent
                                label="Category URL"
                                bgTransparent={true}
                                width="full"
                                name="url"
                                placeholder="https://"
                                {...register("url", { required: "Url  is required" })}
                            />
                            {errors.url && <p className="text-red-500">{errors.url.message}</p>}
                            </div>
                            <div>
                            <SelectComponent width="full" label="Parent " name="parentId" option={!!getCategories && getCategories.categories} {...register("parentId", { required: "Parent Id is required" })} />
                            {errors.parentId && <p className="text-red-500">{errors.parentId.message}</p>}
                            </div>
                            <div>

                            <SelectComponent width="full" label="Status " name="status" option={status} {...register("status", { required: "Status is required" })} />
                            {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                            </div>
                        </div>

                        <div>
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
                            {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p>}
                        </div>

                        <div>
                            <SelectComponent width="full" label="Featured " name="featured" option={featured} {...register("featured", { required: "Featured is required" })} />
                            {errors.featured && <p className="text-red-500">{errors.featured.message}</p>}

                        </div>

                        {/* <div className="flex gap-4 flex-wrap mt-4">
                            {buttons2.map((item, index) => {
                                const textColorClass = item.textColor ? `text-[${item.textColor}]` : "";
                                const bgColorClass = item.bgColor ? `bg-[${item.bgColor}]` : "";
                                const textSizeClass = item.textSize ? `text-[${item.textSize}]` : "";
                                const fontWeightClass = item.fontWeight ? `font-${item.fontWeight}` : "";

                                return (
                                    <button
                                        key={index}
                                        type={item.type}
                                        className={`${textSizeClass} leading-[17.64px] ${textColorClass} ${bgColorClass} px-[20px] ${fontWeightClass} rounded-[5px] py-[8px] flex items-center gap-2 cursor-pointer`}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div> */}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default React.memo(CategoryDragAndDrop);
