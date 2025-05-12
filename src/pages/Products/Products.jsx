import React, { useEffect, useState } from "react";
import Matrix from "../../components/common/Matrix";
import cardsImage from "../../assets/cardsImages/CardsImage.png";
import upwordIcon from "../../assets/icons/upwordIcon.png";
import ProductsTable from "../../components/ui/Products/ProductsTable";
import ProductsHeading from "../../components/ui/Products/ProductsHeading";
import CreateProduct from "../../components/ui/Popups/createProducts/CreateProduct";
import {
  useDeleteProduct,
  useFetchProducts,
} from "../../services/apis/Products/Hooks";
import productsIcon from "../../assets/DashboardIcons/TotalProducts.png";
import salesIcon from "../../assets/DashboardIcons/TotalSales.png";
import ordersIcon from "../../assets/DashboardIcons/Orders.png";
import earningsIcon from "../../assets/DashboardIcons/Earning.png";
import receivableIcon from "../../assets/DashboardIcons/Recievable.png";
import visitorsIcon from "../../assets/DashboardIcons/Visitors.png";
import { Pagination } from "../../components/Pagination/Pagination";
import { useDeleteFaq } from "../../services/apis/FAQ/Hooks";
import toast from "react-hot-toast";
import DeleteBrandPopup from "../BrandManagement/Component/DeleteBrandPopup";
import { useFetchDashboardStatusList } from "../../services/apis/Dashboard/Hooks";
import TableForCategoriesPage from "../../components/common/TableForCategoriesPage";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [page, setPage] = useState("1");
  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [sort, setSort] = useState("asc");
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [status, setStatus] = useState("")
  
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useFetchProducts({
    page: page,
    per_page: limit,
    search: globalFilter,
    sort_dir: sort,
    sort_by: sortBy,
  });

  const {
    mutate,
    isLoading: deleteProductLoading,
    error: deleteProductError,
  } = useDeleteProduct();

  const deleteProduct = () => {
    setDeleteLoading(true);
    mutate(id, {
      onSuccess: (data) => {
        setDeleteLoading(false);
        toast.success("Product Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
      onError: (err) => {
        setDeleteLoading(false);
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [statFilter, setStatFilter] = useState("lifetime");
  const { data, isLoading, error } = useFetchDashboardStatusList({
    range: statFilter,
  });


  const cardData = [
    {
      title: "Total Products",
      amount: data?.products_count?.toLocaleString("en-IN"),
      icon: productsIcon,
    },
    {
      title: "Draft Products",
      amount: data?.draft_products?.toLocaleString("en-IN"),
      icon: productsIcon,
    },
    {
      title: "Live Products",
      amount: data?.published_products?.toLocaleString("en-IN"),
      icon: productsIcon,
    },
    {
      title: "Categories Count",
      amount: data?.categories_count?.toLocaleString("en-IN"),
      icon: productsIcon,
    },
  ];

  const th = [
    {
      title: "Product Name",
      key: "name", // Ensure this matches the object key in datas
    },
    {
      title: "SKU",
      key: "sku", // Ensure this matches the object key in datas
    },
    {
      title: "Image",
      key: "image", // Ensure this matches the object key in datas
    },
    {
      title: "Vendor",
      key: "store", // Ensure this matches the object key in datas
    },
    {
      title: "Brand",
      key: "brand", // Ensure this matches the object key in datas
    },
    {
      title: "Status",
      key: "status", // Ensure this matches the object key in datas
    },
    {
      title: "Product Family",
      key: "product_family", // Ensure this matches the object key in datas
    },
    {
      title: "In Stock",
      key: "inStock", // Ensure this matches the object key in datas
    },
    {
      title: "Texanomy Path",
      key: "taxonomy_path", // Ensure this matches the object key in datas
    },
    {
      title: "Lifecycle Stage",
      key: "lifecycleStage", // Ensure this matches the object key in datas
    },
    {
      title: "Quality Score",
      key: "qualityScore", // Ensure this matches the object key in datas
    },
  ];

  const handleCardClick = (title) => {
    switch (title) {
      case "Total Products":
        setStatus("all")
        break;
      case "Draft Products":
        setStatus("draft")
        break;
      case "Live Products":
        setStatus("live")
        break;
      case "Categories Count":
        navigate("/category-drag-and-drop");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div>
        <ProductsHeading
          setShowPopup={setShowPopup}
          setStatFilter={setStatFilter}
          statFilter={statFilter}
        />
      </div>
      <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 gap-5">
        {cardData.map((item) => {
          return (
            <Matrix
              title={item?.title}
              amount={item?.amount}
              growth={8.5}
              growthType={upwordIcon}
              icon={item?.icon}
              onClick={() => handleCardClick(item.title)}
            />
          );
        })}
      </div>
      <div className="mt-[20px] sm:max-w-[50vw] md:max-w-[68vw] lg:max-w-[75vw] xl:max-w-[81vw] 2xl:max-w-[83vw] 3xl:max-w-[86vw]   overflow-x-auto">
        <ProductsTable
          tableHeading={th}
          productsData={productsData?.data}
          setId={setId}
          productsLoading={productsLoading}
          setShowDelete={setShowDelete}
          paginationData={productsData?.pagination}
          setPage={setPage}
          page={page}
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
          setSort={setSort}  
          setLimit={setLimit}

        />

        {/* Pagination  */}
        {/* <div className="mt-[20px]">
          <Pagination
            paginationData={productsData?.pagination}
            setPage={setPage}
            page={page}
          />
        </div> */}
      </div>
      {showPopup && <CreateProduct setShowPopup={setShowPopup} />}
      {showDelete && (
        <DeleteBrandPopup
          setShowDelete={setShowDelete}
          deleteBrand={deleteProduct}
          title={"Product"}
          deleteProductLoading={deleteProductLoading}
          deleteLoading={deleteLoading}
        />
      )}
    </>
  );
};

export default Products;
