import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import HeaderComponent from "../../components/common/HeaderComponent"
import { COLORS } from "../../utils/colors";

import CreateSubCategoriesPopUp from "../../components/ui/Categories/CreateSubCategoriesPopUp";
import { Apis } from "../../services/apis/CategoryApis/Api";
import Loader from "../../utils/Loader";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../components/common/CommonTable"
import FullScreenLoader from "../../utils/FullScreenLoader";
import CommonTableForPage from "../../components/common/CommonTableForPage";
import TableForCategoriesPage from "../../components/common/TableForCategoriesPage";
const CategoriesList = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100000);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [fetchCatloader, setCatLoader] = useState(false);
  const [getCatData, setCatData] = useState([]);
  const [getCategories, setCategories] = useState([]);
  const [parentCategory, setParentCategories] = useState([]);

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
      title: 'Category',
      key: 'category_id', // Ensure this matches the object key in datas
    },
    {
      title: 'Title',
      key: 'title', // Ensure this matches the object key in datas
    },
    {
      title: 'Image',
      key: 'banner_image',
      type: 'image' // Ensure this matches the object key in datas
    },
    {
      title: 'Banner Link',
      key: 'banner_link',
      // Ensure this matches the object key in datas
    },
    {
      title: 'Description',
      key: 'description', // Ensure this matches the object key in datas
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

  const fetchCategoryById = (uid, id, name) => {
    const datas = {
      "uid": uid,
      "category": {
        "value": id,
        "label": name
      }
    }

    navigate("/create-categories", {
      state: { datas: datas },
    });

  }

  const deleteCatById = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this group?");
    if (confirmDelete) {
      Apis.deleteCategories(id, setLoader, setResponse);
    }
  }

  useEffect(() => {
    Apis.fetchCategories(setCatLoader, setCategories);
    // Apis.fetchCategoriesPages(setCatLoader, setCatData);
  }, []);

  useEffect(() => {
    if (getCatData.success) {

      setTotalPages(getCatData.total_pages)
      setTotalRecords(getCatData.total_records)
    }
  }, [getCatData]);

  useEffect(() => {
    // Apis.fetchCategoriesPages(setCatLoader, setCatData);
  }, [page]);

  useEffect(() => {
    // Apis.fetchCategoriesPages(setCatLoader, setCatData);
  }, [getResponse]);



  const onSubmit = (data) => {
    navigate("/create-categories", {
      state: { datas: data },
    });

  };
  useEffect(() => {
    if (!!getCategories && getCategories?.categories?.length) {

      const parentCat = getCategories.categories.filter((it) => it.parent_id == 0);
      setParentCategories(parentCat);
    }

  }, [getCategories]);



  return (
    <>
      {fetchCatloader ? <FullScreenLoader bgTransparent={true} /> : <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderComponent label="Categories List" setShow={setShow} span={`(${!!getCatData && getCatData?.data?.length} Results)`} buttons={buttons} />


           <TableForCategoriesPage
          
            title="List of categories"
            totalPages={totalPages}
            changePage={changePage}
            setPage={setPage}
            currentPage={page}
            deleteData={deleteCatById}
            getDatafn={fetchCategoryById} tableHeading={th}
            datas={!!getCatData && getCatData?.data}
            showCheckBox={false} showFilter={true}
          />


          {loader ? <FullScreenLoader bgTransparent={true} /> : ''}
          <CreateSubCategoriesPopUp
            title="Create Category"
            loader={loader}
            control={control}
            getFamilyDataById={getFamilyDataById}
            register={register} errors={errors} setValue={setValue}
            getCategories={parentCategory && parentCategory}
            isOpen={show}
            onClose={() => setShow(false)}

          />
        </form>
      </div>}

    </>
  )
}

export default React.memo(CategoriesList)