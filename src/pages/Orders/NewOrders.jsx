import React, { useEffect, useState } from "react";
import { notify } from "../../utils/notify";
import FullScreenLoader from "../../utils/FullScreenLoader";
import { useDebounce } from "use-debounce";
import HeaderComponent from "../../components/common/HeaderComponent";
import { COLORS } from "../../utils/colors";
import UpdateVariantPopup from "../../components/ui/Popups/createProducts/UpdateVariantPopup";
import OrderTables from "../../components/ui/Orders/OrderTables";
import { useFetchDashboardStatusList } from "../../services/apis/Dashboard/Hooks";
import upwordIcon from "../../assets/icons/upwordIcon.png";
import Matrix from "../../components/common/Matrix";
import productsIcon from "../../assets/DashboardIcons/TotalProducts.png";
import pendingOrders from "../../assets/icons/pendingOrderIcon.png";
import confirmedOrder from "../../assets/icons/confirmedOrder.png";
import readyToShip from "../../assets/icons/ReadyToShip.png";
import supplierDelivery from "../../assets/icons/supplierDelivery.png";
import outForDelivery from "../../assets/icons/out_for_delivery.png";
import deliveredOrder from "../../assets/icons/deliveredOrder.png";
import cancelledOrder from "../../assets/icons/cancelledOrder.png";

const NewOrders = () => {
    const [activeTab, setActiveTab] = useState('All Orders');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10000);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [fetchAttloader, setAttrLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [getResponse, setResponse] = useState([]);
    const [getDeleteResponse, setDeleteResponse] = useState([]);
    const [getAttributes, setAttibutes] = useState([]);
    const [updateDatas, setUpdateDatas] = useState([]);
    const [id, setId] = useState("");
    const [editData, setEditData] = useState({});
    const [showDelete, setShowDelete] = useState(false);

    const [uploadShow, setUploadShow] = useState(false);
    const [searchquery, setSearchQuery] = useState("");
    const [fetchLoading, setFetchLoading] = useState(false);
    const [fetchData, setFetchData] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [sort, setSort] = useState("asc");
    const [sortBy, setSortBy] = useState("");
    const [query] = useDebounce(searchquery, 300);
    const [statFilter, setStatFilter] = useState("lifetime");
    const { data, isLoading, error } = useFetchDashboardStatusList({
        range: statFilter,
    });
    const cardData = [
        {
            title: "Total Orders",
            amount: data?.products_count?.toLocaleString("en-IN"),
            icon: productsIcon,
            tags: "8.5% AED 524,9689.00"
        },
        {
            title: "Pending Orders",
            amount: data?.draft_products?.toLocaleString("en-IN"),
            icon: pendingOrders,
            tags: "55 Mints to Order Confirmation",
        },
        {
            title: "Confirmed Orders",
            amount: data?.published_products?.toLocaleString("en-IN"),
            icon: confirmedOrder,
            tags: "55 Mints to Order Confirmation"
        },

        { title: "Ready to Ship", amount: "44,689", icon: readyToShip, tags: "72 hrs Taken in Ready to ship" },
        { title: "Supplier Delivery", amount: " 24,689", icon: supplierDelivery, tags: "8.5% Avg time supplier taken" },
        {
            title: "Out For Delivery",
            amount: data?.orders_count?.toLocaleString("en-IN"),
            icon: outForDelivery,
            tags: "8.5% Up from yesterday",
        },

        {
            title: "Delivered Order",
            amount: "20,689",
            icon: deliveredOrder,
            tags: "72 hrs Avg taken to deliver"
        },
        {
            title: "Cancelled Order",
            amount: "16,689",
            icon: cancelledOrder,
            tags: "8.5% Up from last month"
        },

    ];

    const tabs = ['All Orders', 'Pending', 'Confirmed', 'Supplier Delivery', 'International', 'Export', 'On hold', 'Ready to ship', 'Pickups', 'Out for delivery', 'Delivered', 'Re-Attempt', 'Returned', 'Cancelled'];


    const buttons = [
        {
            'label': 'Export',
            'link': '',
            'icon': '',
            'type': 'button',
            'bgColor': '#E2E2E2',
            'icon': '',
            'textColor': COLORS.darkCharcoal,
            'fontSize': '14px',
            'fontWeight': 'normal'
        },
        {
            'label': 'Import',
            'link': '',
            'icon': '',
            'type': 'button',
            'bgColor': '#E2E2E2',
            'icon': '',
            'textColor': COLORS.darkCharcoal,
            'fontSize': '14px',
            'fontWeight': 'normal'
        },
        {
            label: "Add Order ",
            popup: true,
            icon: "",
            type: "button",
            bgColor: COLORS.bgPrimary,
            textColor: "white",
            textSize: "14px",
            fontWeight: "normal",
        },
       


    ];
    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    const updateAttributeTypes = (data) => {
        setUpdateDatas(data)
        setShowModal(true);
    }
    useEffect(() => {
        //  Apis.fetchAttributes(page, limit, setAttrLoader, setAttibutes);
    }, []);

    useEffect(() => {
        if (getResponse.success) {
            notify(getResponse.message);

            window.location.href = `/MutliAttributes/${getResponse.data.id}`

            setShowModal(false);
        }

    }, [getResponse]);

    const deleteAttributes = () => {
        // Apis.deleteAttributes(id, setAttrLoader, setDeleteResponse);

    }
    useEffect(() => {
        if (getDeleteResponse.success) {
            notify(getDeleteResponse.message);
            // Apis.fetchAttributes(page, limit, setAttrLoader, setAttibutes);
        }
    }, [getDeleteResponse]);



    useEffect(() => {
        if (getAttributes.success) {
            setTotalPages(getAttributes.total_pages)
            setTotalRecords(getAttributes.total_records)
        }
    }, [getAttributes]);

    useEffect(() => {
        //  Apis.fetchAttributes(page, limit, setAttrLoader, setAttibutes);
    }, [page]);




    return (
        <>
            <div className="">

                {fetchAttloader ? <FullScreenLoader bgTransparent={true} /> :
                    <>
                        <HeaderComponent label="Orders" buttons={buttons}
                            setShow={setShowModal}
                            span={`20 (Results)`}

                        />
                        <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 gap-5 mt-3 mb-3">
                            {cardData.map((item) => {
                                return (
                                    <Matrix
                                        title={item?.title}
                                        amount={item?.amount}

                                        growthType={upwordIcon}
                                        icon={item?.icon}
                                        tag={item?.tags}
                                    />
                                );
                            })}
                        </div>
                        <OrderTables
                            setActiveTab={setActiveTab}
                            activeTab={activeTab}
                            searchPlaceholder="Search Variants"
                            updateAttributeTypes={updateAttributeTypes}
                            totalPages={totalPages}
                            changePage={changePage}
                            setPage={setPage}
                            currentPage={page}
                            deleteAttribute={deleteAttributes}
                            tabs={tabs}
                            setShowModal={setShowModal}
                            setUpdateDatas={setUpdateDatas}
                            setLimit={setLimit}
                            setSortBy={setSortBy}
                            sortBy={sortBy}
                            setShowDelete={setShowDelete}
                            isLoading={loader}
                            setSearchQuery={setSearchQuery}
                            setId={setId}
                            setSort={setSort}
                            searchquery={searchquery}
                            setEditData={setEditData}
                            setShowEdit={setShowEdit}



                        />


                        <UpdateVariantPopup
                            title="Update Product Variant"
                            loader={loader}
                            setLoader={setLoader}
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            setResponse={setResponse}
                            getResponse={getResponse}
                            updateDatas={updateDatas && updateDatas}

                        /></>}

                {/* <div className="flex items-center justify-center mt-[40px]">
                    <PaginationComponent
                      setPage={setPage}
                      totalPages={totalPages}
                      changePage={changePage}
                      currentPage={page}
                    />
                  </div> */}

            </div>
        </>
    );
};

export default NewOrders;
