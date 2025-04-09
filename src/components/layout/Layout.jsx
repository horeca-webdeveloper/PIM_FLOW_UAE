import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex bg-[#F1F1F1] p-[10px] mt-[48px] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className=" p-[10px] ml-[220px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
