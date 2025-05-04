import { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

const Layout = () => {
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const isResizing = useRef(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [activeLink, setActiveLink] = useState(null);
  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const newWidth = Math.max(180, Math.min(e.clientX, 400)); // optional min/max
    setSidebarWidth(newWidth);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex mt-[48px] overflow-hidden bg-[#F1F1F1] ">
      {/* Sidebar (resizable) */}
      <div
        className="bg-[#EBEBEB] border-r border-[#DFDFDF] "
        style={{ width: sidebarWidth }}
      >
        <Sidebar sidebarWidth={sidebarWidth} setActiveLink={setActiveLink} activeLink={activeLink} openSubmenus={openSubmenus} setOpenSubmenus={setOpenSubmenus}/>
      </div>

      {/* Resizer */}
      <div
        className="w-1 cursor-col-resize  hover:bg-gray-600 transition "
        
        onMouseDown={handleMouseDown}
      />

      {/* Main Content (auto resizes) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setActiveLink={setActiveLink} activeLink={activeLink} openSubmenus={openSubmenus} setOpenSubmenus={setOpenSubmenus}/>
        <main className="p-[10px] overflow-auto hide-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
