import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import HeaderComponent from "../../components/common/HeaderComponent"
import { COLORS } from "../../utils/colors";

import CreateSubCategoriesPopUp from "../../components/ui/Categories/CreateSubCategoriesPopUp";
import { Apis } from "../../services/apis/CategoryApis/Api";
import Loader from "../../utils/Loader";
import { notify } from "../../utils/notify";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../components/common/CommonTable"
import CategoryTable from "../../components/ui/Categories/CategoryTable";
const CategoriesList = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [fetchCatloader, setCatLoader] = useState(false);
  const [getSubCatData, setSubCatData] = useState([]);
  const [getCategories, setCategories] = useState([]);

  const [getFamilyDataById, setFamilyDataById] = useState([]);
  const [loader, setLoader] = useState(false);
  const [getResponse, setResponse] = useState([]);

  const buttons = [

    {
      'label': 'Create Category ',
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
      title: 'Name',
      key: 'name', // Ensure this matches the object key in datas
    },
    {
      title: 'Image',
      key: 'Image', // Ensure this matches the object key in datas
    },
    {
      title: 'Slug',
      key: 'slug', // Ensure this matches the object key in datas
    },
    {
      title: 'Status',
      key: 'status', // Ensure this matches the object key in datas
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
  }
  );

  const fetchSubCategoryById = (uid, id, name) => {
    const datas = {
      "uid": uid,
      "category": {
        "value": id,
        "label": name
      }
    }

    navigate("/create-sub-categories", {
      state: { datas: datas },
    });

  }

  const deleteSubCatById = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this group?");
    if (confirmDelete) {
      Apis.deleteSubCategories(id, setLoader, setResponse);
    }
  }

  useEffect(() => {
    Apis.fetchChildCategories(setCatLoader, setCategories);
    Apis.fetchSubCategories(page, limit, setCatLoader, setSubCatData);
  }, []);

  useEffect(() => {
    if (getSubCatData.success) {
      setTotalPages(getSubCatData.total_pages)
      setTotalRecords(getSubCatData.total_records)
    }
  }, [getSubCatData]);

  useEffect(() => {
    Apis.fetchSubCategories(page, limit, setCatLoader, setSubCatData);
  }, [page]);

  useEffect(() => {
    Apis.fetchSubCategories(page, limit, setCatLoader, setSubCatData);
  }, [getResponse]);



  const onSubmit = (data) => {
    navigate("/create-sub-categories", {
      state: { datas: data },
    });

  };



  return (
    <>
      {fetchCatloader ? <div className="w-full h-[100vh] flex items-center justify-center bg-white fixed left-0 top-0 z-[999]">
        <Loader />
      </div> : <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderComponent label="Sub Categories List" setShow={setShow} span={`(${!!getSubCatData && getSubCatData?.data?.length} Results)`} buttons={buttons} />
          <CategoryTable
            totalPages={totalPages}
            changePage={changePage}
            setPage={setPage}
            currentPage={page}

            deleteData={deleteSubCatById} getDatafn={fetchSubCategoryById} tableHeading={th} datas={!!getSubCatData && getSubCatData.data} showCheckBox={false} showFilter={true} />
          {loader ? <div className="w-full h-[100vh] flex items-center justify-center  fixed left-0 top-0 z-[999]">
            <Loader />
          </div> : ''}
          <CreateSubCategoriesPopUp
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

export default React.memo(CategoriesList)