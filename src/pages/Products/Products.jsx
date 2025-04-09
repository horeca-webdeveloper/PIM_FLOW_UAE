import React, { useEffect, useState } from "react";
import Matrix from "../../components/common/Matrix";
import cardsImage from "../../assets/cardsImages/CardsImage.png";
import upwordIcon from "../../assets/icons/upwordIcon.png";
import ProductsTable from "../../components/ui/Products/ProductsTable";
import ProductsHeading from "../../components/ui/Products/ProductsHeading";
import CreateProduct from "../../components/ui/Popups/createProducts/CreateProduct";
import { useFetchProducts } from "../../services/apis/Products/Hooks";
import { Pagination } from "../../components/Pagination/Pagination";

const Products = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [page, setPage] = useState("1");
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useFetchProducts({
    page: page,
    per_page: 20,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <ProductsHeading setShowPopup={setShowPopup} />
      </div>
      <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 gap-5">
        {[1, 1, 1, 1].map((item) => {
          return (
            <Matrix
              title="Total Products"
              amount={40689}
              growth={8.5}
              growthType={upwordIcon}
              icon={cardsImage}
            />
          );
        })}
      </div>
      <div className="mt-[20px] sm:max-w-[50vw] md:max-w-[68vw] lg:max-w-[75vw] xl:max-w-[81vw] 2xl:max-w-[83vw] 3xl:max-w-[86vw]   overflow-x-auto">
        <ProductsTable
          productsData={productsData?.data}
          productsLoading={productsLoading}
        />
        {/* Pagination  */}
        <div className="mt-[20px]">
          <Pagination
            paginationData={productsData?.pagination}
            setPage={setPage}
            page={page}
          />
        </div>
      </div>
      {showPopup && <CreateProduct setShowPopup={setShowPopup} />}
    </>
  );
};

export default Products;
