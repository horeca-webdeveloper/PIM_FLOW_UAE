import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import HeaderComponent from "../../components/common/HeaderComponent";
import { COLORS } from "../../utils/colors";

import CreateBrandsPopup from "../../components/ui/Categories/CreateBrandsPopup";
import { Apis } from "../../services/apis/Brands/Api";
import Loader from "../../utils/Loader";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../components/common/CommonTable";
import CommonTableForPage from "../../components/common/CommonTableForPage";
import BrandTablePage from "../../components/ui/Brand/BrandTablePage";
import FullScreenLoader from "../../utils/FullScreenLoader";
const SecondBrandList = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [fetchBrandloader, setBrandLoader] = useState(false);
  const [getBrandDatas, setBrandData] = useState([]);
  const [getBrands, setBrands] = useState([]);

  const [getFamilyDataById, setFamilyDataById] = useState([]);
  const [loader, setLoader] = useState(false);
  const [getResponse, setResponse] = useState([]);

  const buttons = [
    {
      label: "Create Brand Second Page ",
      popup: true,
      icon: "icons/download.png",
      type: "button",
      bgColor: COLORS.bgPrimary,
      textColor: "white",
      textSize: "14px",
      fontWeight: "normal",
    },
  ];

  const th = [
    {
      title: "ID",
      key: "id", // Ensure this matches the object key in datas
    },

    {
      title: "Brand ID",
      key: "brand_id", // Ensure this matches the object key in datas
    },
    {
      title: "Brand Name",
      key: "brand_name", // Ensure this matches the object key in datas
    },
    {
      title: "Created At",
      key: "created_at",
      type: "date" // Ensure this matches the object key in datas
    },
    {
      title: "Updated At",
      key: "updated_at",
      type: "date" // Ensure this matches the object key in datas
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
    defaultValues: { category: "" },
  });

  const fetchBrandById = (uid, id, name) => {
    const datas = {
      uid: uid,
      brand: {
        value: id,
        label: name,
      },
    };

    navigate("/brand/second-create", {
      state: { datas: datas },
    });
  };

  const deleteBrandById = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this group?"
    );
    if (confirmDelete) {
      Apis.deleteBrandSecond(id, setLoader, setResponse);
    }
  };

  useEffect(() => {
    Apis.fetchBrands(setBrandLoader, setBrands);
    Apis.fetchBrandSecondPage(setBrandLoader, setBrandData);
  }, []);

  useEffect(() => {
    if (getBrandDatas.success) {
      setTotalPages(getBrandDatas.total_pages);
      setTotalRecords(getBrandDatas.total_records);
    }
  }, [getBrandDatas]);

  useEffect(() => {
    Apis.fetchBrandSecondPage(setBrandLoader, setBrandData);
  }, [page]);

  useEffect(() => {
    Apis.fetchBrandSecondPage(setBrandLoader, setBrandData);
  }, [getResponse]);

  const onSubmit = (data) => {
    navigate("/brand/second-create", {
      state: { datas: data },
    });
  };

  return (
    <>
      {fetchBrandloader ? (
        <FullScreenLoader bgTransparent={true} />
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HeaderComponent
              label="Brand List"
              setShow={setShow}
              span={`(${!!getBrandDatas && getBrandDatas?.data?.length
                } Results)`}
              buttons={buttons}
            />

            <BrandTablePage
              title="List of Brands"
              totalPages={totalPages}
              changePage={changePage}
              setPage={setPage}
              currentPage={page}
              deleteData={deleteBrandById}
              getDatafn={fetchBrandById}
              tableHeading={th}
              datas={!!getBrandDatas && getBrandDatas?.data}
              showCheckBox={false}
              showFilter={true}
              
            />

            {loader ? (
              <div className="w-full h-[100vh] flex items-center justify-center  fixed left-0 top-0 z-[999]">
                <Loader />
              </div>
            ) : (
              ""
            )}
            <CreateBrandsPopup
              title="Create Third Brand Template"
              loader={loader}
              control={control}
              getFamilyDataById={getFamilyDataById}
              register={register}
              errors={errors}
              setValue={setValue}
              getBrands={getBrands && getBrands?.brands}
              isOpen={show}
              onClose={() => setShow(false)}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default React.memo(SecondBrandList);
