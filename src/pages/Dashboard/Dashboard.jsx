import React, { useContext, useEffect, useState } from "react";
import cardsImage from "../../assets/cardsImages/CardsImage.png";
import upwordIcon from "../../assets/icons/upwordIcon.png";
import Matrix from "../../components/common/Matrix";
import RevenueChart from "../../components/common/HomeCharts";
import GraphController from "../../components/common/GraphController";
import TopProducts from "../../components/ui/Homepage/TopProducts";
import HomePieChart from "../../components/common/HomePieChart";
import Dashboardheading from "../../components/ui/Homepage/Dashboardheading";
import productsIcon from "../../assets/DashboardIcons/TotalProducts.png";
import salesIcon from "../../assets/DashboardIcons/TotalSales.png";
import ordersIcon from "../../assets/DashboardIcons/Orders.png";
import earningsIcon from "../../assets/DashboardIcons/Earning.png";
import receivableIcon from "../../assets/DashboardIcons/Recievable.png";
import visitorsIcon from "../../assets/DashboardIcons/Visitors.png";
import avgOrderIcon from "../../assets/DashboardIcons/Orders.png";
import { useNavigate } from "react-router-dom";
import { useFetchDashboardStatusList } from "../../services/apis/Dashboard/Hooks";
import Loader from "../../utils/Loader";
import { useFetchManageAuthPermissions } from "../../services/apis/AuthPermission/Hooks";
const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) {
      navigate("/login");
    }
  }, []);

  const {
    data: da,
    isLoading: Df,
    error: df,
  } = useFetchManageAuthPermissions();

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
    // {
    //   title: "Categories Count",
    //   amount: data?.categories_count?.toLocaleString("en-IN"),
    //   icon: productsIcon,
    // },
    { title: "Total User Visits", amount: "44,689", icon: visitorsIcon },
    { title: "Total Sales", amount: " 24,689", icon: salesIcon },
    {
      title: "Total Orders",
      amount: data?.orders_count?.toLocaleString("en-IN"),
      icon: ordersIcon,
    },

    {
      title: "Total Cod (Cash On Delivery) ",
      amount: "20,689",
      icon: receivableIcon,
    },
    {
      title: "Total Credit Cards",
      amount: "16,689",
      icon: receivableIcon,
    },
    {
      title: "Total Returns",
      amount: "11,989",
      icon: receivableIcon,
    },
  ];
  return (
    <>
      <Dashboardheading setStatFilter={setStatFilter} statFilter={statFilter} />
      {isLoading ? (
        <div className="h-[300px] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 gap-5">
          {cardData.map((item) => {
            return (
              <Matrix
                title={item?.title}
                amount={item?.amount}
                growth={8.5}
                growthType={upwordIcon}
                icon={item?.icon}
              />
            );
          })}
        </div>
      )}
      <div className="flex flex-wrap">
        {/* Revenue Chart */}
        <div className="bg-[white] box-shadow: 6px 6px 54px flex-1 0px #0000000D; w-[50%]  mt-[20px] rounded-[10px] ">
          <GraphController title={"Revenue Analytics"} />
          <RevenueChart />
        </div>
        {/* Top Products Card */}
        <div className="bg-[white] box-shadow: 6px 6px 54px 0px #0000000D; flex-2 mt-[20px] w-[25%]  rounded-[10px] ml-[20px]">
          <GraphController title={"Top products by unit sold"} />
          <TopProducts />
          <TopProducts />
          <TopProducts />
          <TopProducts />
          <TopProducts />
          <TopProducts />
        </div>
        <div className="bg-[white] box-shadow: 6px 6px 54px 0px #0000000D; flex-2 w-[24%] mt-[20px] rounded-[10px] ml-[20px]">
          <HomePieChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
