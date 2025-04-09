import React, { useEffect } from "react";
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
const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) {
      navigate("/login");
    }
  }, []);
  const cardData = [
    { title: "Total Products", amount: "40,689", icon: productsIcon },
    { title: "Total Sales", amount: " 24,689", icon: salesIcon },
    { title: "Total Orders", amount: "89,689", icon: ordersIcon },
    { title: "Total Earnings", amount: "19,689", icon: earningsIcon },
    { title: "Total Receivable", amount: "20,689", icon: receivableIcon },
    { title: "Total Visitors", amount: "44,689", icon: visitorsIcon },
    { title: "Average Order Value", amount: "10,689", icon: avgOrderIcon },
    { title: "Total Orders", amount: "21,0689", icon: ordersIcon },
  ];
  return (
    <>
      <Dashboardheading />
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
