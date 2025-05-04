import React, { useState } from "react";
import {
  MdDashboard,
  MdInventory,
  MdKeyboardArrowDown,
  MdShoppingCart,
  MdSettings,
  MdLogout,
  MdHelp,
  MdDescription,
  MdManageHistory,
} from "react-icons/md";
import { BiPackage, BiLineChart, BiBarChartAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import sidebarAttributeIcon from "../../../assets/sidebar/sidebarAttributeIcon.png";
import { FaUsersCog } from "react-icons/fa";

const Sidebar = ({
  sidebarWidth,
  activeLink,
  setActiveLink,
  openSubmenus,
  setOpenSubmenus,
}) => {
  const navigate = useNavigate();

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => {
      const isCurrentlyOpen = !!prev[label];
      // Close all menus and open only the clicked one (if it wasn't already open)
      return isCurrentlyOpen ? {} : { [label]: true };
    });
  };

  const menuItems = [
    { icon: <MdDashboard size={20} />, label: "Dashboard", link: "/" },
    {
      icon: <BiPackage size={20} />,
      label: "Products",
      link: "/",
      submenu: [
        {
          label: "Manage Products",
          link: "/Products/1",
          icon: sidebarAttributeIcon,
        },
        {
          label: "Parent Category",
          link: "/categories",
          icon: sidebarAttributeIcon,
        },
        {
          label: "Product Families",
          link: "/sub-categories",
          icon: sidebarAttributeIcon,
        },
        // { label: "Schemas", link: "/", icon: sidebarAttributeIcon },
        // { label: "Lifecycles", link: "/", icon: sidebarAttributeIcon },
        {
          label: "Import",
          link: "/product/import",
          icon: sidebarAttributeIcon,
        },

        {
          label: "Export",
          link: "/product/export",
          icon: sidebarAttributeIcon,
        },
        {
          label: "Import Features",
          link: "/import-features-and-benefits",
          icon: sidebarAttributeIcon,
        },

        {
          label: "Export Features",
          link: "/export-features-and-benefits",
          icon: sidebarAttributeIcon,
        },
        {
          label: "Import Image",
          link: "/product/import-images",
          icon: sidebarAttributeIcon,
        },
        {
          label: "Import Documents",
          link: "/product/import-documents",
          icon: sidebarAttributeIcon,
        },
      ],
    },
    {
      icon: <BiPackage size={20} />,
      label: "Attributes",
      link: "#",
      submenu: [
        {
          label: "Manage Attributes",
          link: "/Attributes",
          icon: sidebarAttributeIcon,
        },
        {
          label: "Attribute Grps",
          link: "/attribute-groups",
          icon: sidebarAttributeIcon,
        },
        {
          label: "Product Family",
          link: "/product-families",
          icon: sidebarAttributeIcon,
        },
        { label: "Export", link: "/export", icon: sidebarAttributeIcon },
        { label: "Import", link: "/import", icon: sidebarAttributeIcon },
      ],
    },
    ,
    {
      icon: <BiPackage size={20} />,
      label: "Brands",
      link: "#",
      submenu: [
        {
          label: "Manage Brands",
          link: "/BrandManagement",
          icon: sidebarAttributeIcon,
        },
        {
          label: "TempOne",
          link: "/brand/first",
          icon: sidebarAttributeIcon,
        },
        {
          label: "TempTwo",
          link: "/brand/second",
          icon: sidebarAttributeIcon,
        },
        {
          label: "TempThree",
          link: "/brand/third",
          icon: sidebarAttributeIcon,
        },
      ],
    },
    {
      icon: <BiPackage size={20} />,
      label: "Vendors",
      link: "#",
      submenu: [
        {
          label: "Manage Vendor",
          link: "/VendorManagement",
          icon: sidebarAttributeIcon,
        },
        {
          label: "Pre Evaluate Vendor",
          link: "/PreVendorManagement",
          icon: sidebarAttributeIcon,
        },
        {
          label: "Export",
          link: "/VendorExport",
          icon: sidebarAttributeIcon,
        },
        {
          label: "Import",
          link: "/vendor-import",
          icon: sidebarAttributeIcon,
        },
      ],
    },
    { icon: <MdDescription size={20} />, label: "Pricing" },
    { icon: <BiPackage size={20} />, label: "FAQ", link: "/Faq" },
    {
      icon: <BiPackage size={20} />,
      label: "SEO",
      link: "/seoexport",
      submenu: [
        {
          label: "Export",
          link: "/seoexport",
          icon: sidebarAttributeIcon,
        },
        {
          label: "Import",
          link: "/seoimport",
          icon: sidebarAttributeIcon,
        },
      ],
    },

    {
      icon: <BiPackage size={20} />,
      link: "/media-management",
      label: "Media Management",
    },
    { icon: <MdShoppingCart size={20} />, label: "Orders" },
    { icon: <BiLineChart size={20} />, label: "Performance" },
    { icon: <BiBarChartAlt2 size={20} />, label: "Analytics" },
    { icon: <MdDescription size={20} />, label: "Invoice" },
    { icon: <MdSettings size={20} />, label: "Settings" },
    {
      icon: <FaUsersCog size={20} />,
      label: "Users",
      link: "/user-management",
    },
    {
      icon: <MdManageHistory size={20} />,
      label: "Roles & Permission",
      link: "/role-management",
    },
    { icon: <MdLogout size={20} />, label: "Logout" },
  ];

  const handleNavigation = (link) => {
    setActiveLink(link);
    navigate(link);
  };

  return (
    <div
      style={{ width: sidebarWidth }}
      className="fixed left-0 top-[30px] w-[220px]  bg-[#EBEBEB] overflow-y-scroll max-h-[85vh] border-r-2 border-[#DFDFDF] flex flex-col"
    >
      {/* Menu Items */}
      <div className="flex-1 py-4">
        <nav className="space-y-1 mt-[15px]">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 transition-all duration-200
                  hover:text-white   group hover:bg-[#26683A]
                  ${openSubmenus[item.label] ? "bg-[#26683A] text-white" : ""}`}
                onClick={() => {
                  if (item?.label == "Logout") {
                    localStorage.removeItem("token");
                    navigate("/login");
                  } else {
                    if (item.submenu) {
                      toggleSubmenu(item.label);
                      if (item?.link == "/Products/1") navigate(item.link);
                    } else {
                      navigate(item.link);
                    }
                  }
                }}
              >
                <span className="mr-3 group-hover:text-white">{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                {item.submenu && (
                  <MdKeyboardArrowDown
                    size={16}
                    className={`transform transition-transform group-hover:text-white
                      ${openSubmenus[item.label] ? "rotate-180" : ""}`}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.submenu && openSubmenus[item.label] && (
                <div className="pl-12 space-y-1 bg-[#EBEBEB]">
                  {item.submenu.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleNavigation(subItem.link)}
                      className={`min-w-[200px] mt-[10px] ml-[-20px] whitespace-nowrap flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-[#26683A] hover:my-[10px] hover:text-white hover:w-[90%] hover:rounded-md ${activeLink === subItem.link
                          ? "bg-[#26683A] text-white rounded-md"
                          : ""
                        }`}
                    >
                      <img
                        className="mr-[10px]  mt-[-10px]"
                        src={subItem.icon}
                        alt="icon"
                      />
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Help Section */}
      <div className="bg-[#26683A] rounded-[12px] m-[10px] p-4">
        <div className="flex flex-col items-left text-white mb-2">
          <MdHelp size={20} className="mr-2" />
          <span className="text-sm font-medium">Need help?</span>
        </div>
        <p className="text-xs text-white">Please check our docs</p>
        <button className="mt-2 bg-white w-full p-[5px] font-semibold rounded-[4px] text-xs text-[#26683A]">
          DOCUMENTATION
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
