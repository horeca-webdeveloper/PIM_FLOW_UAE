import React, { useContext } from "react";
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
import { FaUsersCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";
import sidebarAttributeIcon from "../../../assets/sidebar/sidebarAttributeIcon.png";
import Loader from "../../../utils/Loader";

const Sidebar = ({
  sidebarWidth,
  activeLink,
  setActiveLink,
  openSubmenus,
  setOpenSubmenus,
}) => {
  const navigate = useNavigate();
  const { AllowedPermissions, isLoading } = useContext(AppContext);
  const permissions = AllowedPermissions?.permissions || [];

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const menuItems = [
    { icon: <MdDashboard size={20} />, label: "Dashboard", link: "/" },
    {
      icon: <BiPackage size={20} />,
      label: "Products",
      permission: "list product",
      submenu: [
        {
          label: "Manage Products",
          link: "/Products/1",
          icon: sidebarAttributeIcon,
          permission: "list product",
        },
        {
          label: "Manage Variants",
          link: "/product-variants",
          icon: sidebarAttributeIcon,
          // permission: "list product",
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
        {
          label: "Manage Category",
          link: "/category-drag-and-drop",
          icon: sidebarAttributeIcon,
          permission: "list category",
        },
        {
          label: "Import",
          link: "/product/import",
          icon: sidebarAttributeIcon,
          permission: "import product",
        },
        {
          label: "Export",
          link: "/product/export",
          icon: sidebarAttributeIcon,
          permission: "export product",
        },
        // {
        //   label: "Import Features",
        //   link: "/import-features-and-benefits",
        //   icon: sidebarAttributeIcon,
        //   permission: "importfeatures product",
        // },
        // {
        //   label: "Export Features",
        //   link: "/export-features-and-benefits",
        //   icon: sidebarAttributeIcon,
        //   permission: "exportfeatures product",
        // },
        {
          label: "Import Image",
          link: "/product/import-images",
          icon: sidebarAttributeIcon,
          permission: "image product",
        },
        {
          label: "Import Documents",
          link: "/product/import-documents",
          icon: sidebarAttributeIcon,
          permission: "document product",
        },
      ],
    },
    {
      icon: <BiPackage size={20} />,
      label: "Attributes",
      permission: "list attribute",
      submenu: [
        {
          label: "Manage Attributes",
          link: "/Attributes",
          icon: sidebarAttributeIcon,
          permission: "list attribute",
        },
        {
          label: "Attribute Grps",
          link: "/attribute-groups",
          icon: sidebarAttributeIcon,
          permission: "list attribute group",
        },
        {
          label: "Product Family",
          link: "/product-families",
          icon: sidebarAttributeIcon,
          permission: "list product family attribute group",
        },
        {
          label: "Export",
          link: "/export",
          icon: sidebarAttributeIcon,
          permission: "export attribute",
        },
        {
          label: "Import",
          link: "/import",
          icon: sidebarAttributeIcon,
          permission: "import attribute",
        },
      ],
    },
    {
      icon: <BiPackage size={20} />,
      label: "Brands",
      permission: "list brand store mgmt",
      submenu: [
        {
          label: "Manage Brands",
          link: "/BrandManagement",
          icon: sidebarAttributeIcon,
          permission: "list brand",
        },
        { label: "TempOne", link: "/brand/first", icon: sidebarAttributeIcon },
        { label: "TempTwo", link: "/brand/second", icon: sidebarAttributeIcon },
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
      permission: "list vendor",
      submenu: [
        {
          label: "Manage Vendors",
          link: "/VendorManagement",
          icon: sidebarAttributeIcon,
          permission: "list vendor",
        },
        {
          label: "Pre Evaluate Vendor",
          link: "/PreVendorManagement",
          icon: sidebarAttributeIcon,
          permission: "list vendor",
        },
        {
          label: "Export",
          link: "/VendorExport",
          icon: sidebarAttributeIcon,
          permission: "export vendor",
        },
        {
          label: "Import",
          link: "/vendor-import",
          icon: sidebarAttributeIcon,
          permission: "import vendor",
        },
      ],
    },
    // { icon: <MdDescription size={20} />, label: "Pricing", link: "#" },
    {
      icon: <BiPackage size={20} />,
      label: "FAQ",
      link: "/Faq",
      permission: "list faq",
    },
    {
      icon: <BiPackage size={20} />,
      label: "SEO",
      permission: "list seo mgmt",
      submenu: [
        {
          label: "Export",
          link: "/seoexport",
          icon: sidebarAttributeIcon,
          permission: "export seo mgmt",
        },
        {
          label: "Import",
          link: "/seoimport",
          icon: sidebarAttributeIcon,
          permission: "import seo mgmt",
        },
      ],
    },
    {
      icon: <BiPackage size={20} />,
      label: "Media Management",
      link: "/media-management",
      permission: "list media mgmtt",
    },
    // { icon: <MdShoppingCart size={20} />, label: "Orders", link: "#" },
    // { icon: <BiLineChart size={20} />, label: "Performance", link: "#" },
    // { icon: <BiBarChartAlt2 size={20} />, label: "Analytics", link: "#" },
    // { icon: <MdDescription size={20} />, label: "Invoice", link: "#" },
    // { icon: <MdSettings size={20} />, label: "Settings", link: "#" },
    {
      icon: <FaUsersCog size={20} />,
      label: "Users",
      link: "/user-management",
      permission: "list user",
    },
    {
      icon: <MdManageHistory size={20} />,
      label: "Roles & Permission",
      link: "/role-management",
      permission: "list role",
    },
    { icon: <MdLogout size={20} />, label: "Logout", link: "/login" },
  ];

  const handleNavigation = (link) => {
    if (!link || link === "#") return;
    setActiveLink(link);
    navigate(link);
  };

  return (
    <div
      style={{ width: sidebarWidth }}
      className="fixed left-0 top-[30px] w-[220px] overflow-y-scroll h-[95vh] border-r-2 border-[#DFDFDF] flex flex-col justify-between"
    >
      <div className="flex-1 py-4 overflow-y-scroll hide-scrollbar">
        <nav className="space-y-1 mt-[15px]">
          {menuItems.map((item, index) => {
            if (item.permission && !permissions.includes(item.permission))
              return null;

            const hasVisibleSubmenu = item.submenu?.some(
              (subItem) =>
                !subItem.permission || permissions.includes(subItem.permission)
            );

            if (item.submenu && !hasVisibleSubmenu) return null;

            return (
              <div key={index}>
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 transition-all duration-200 hover:text-white group hover:bg-[#26683A] ${
                    openSubmenus[item.label] ? "bg-[#26683A] text-white" : ""
                  }`}
                  onClick={() => {
                    if (item.label === "Logout") {
                      localStorage.removeItem("token");
                      navigate("/login");
                    } else if (item.submenu) {
                      toggleSubmenu(item.label);
                    } else {
                      handleNavigation(item.link);
                    }
                  }}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.submenu && (
                    <MdKeyboardArrowDown
                      size={16}
                      className={`transform transition-transform group-hover:text-white ${
                        openSubmenus[item.label] ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {item.submenu && openSubmenus[item.label] && (
                  <div className="pl-12 space-y-1 bg-[#EBEBEB]">
                    {item.submenu
                      .filter(
                        (subItem) =>
                          !subItem.permission ||
                          permissions.includes(subItem.permission)
                      )
                      .map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => handleNavigation(subItem.link)}
                          className={`min-w-[200px] mt-[10px] ml-[-20px] whitespace-nowrap flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-[#26683A] hover:my-[10px] hover:text-white hover:w-[90%] hover:rounded-md ${
                            activeLink === subItem.link
                              ? "bg-[#26683A] text-white rounded-md"
                              : ""
                          }`}
                        >
                          <img
                            className="mr-[10px] mt-[-10px]"
                            src={subItem.icon}
                            alt="icon"
                          />
                          {subItem.label}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
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
