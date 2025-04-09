import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserGeneralSettingHeader = () => {
  const [activeButton, setActiveButton] = useState("General");
  const navigate = useNavigate();
  const location = useLocation();
  const buttons = [
    { name: "General", path: "/user-general-setting" },
    { name: "Privileges", path: "/premission-table" },
    { name: "Attribute privileges", path: "/attribute-privileges" },
    { name: "Page Privileges", path: "" },
  ];

  const handleNavigation = (btn) => {
    setActiveButton(btn.name);
    navigate(btn.path);
  };

  return (
    <div className="flex border border-[#979797] px-4 py-2 rounded-md mb-4">
      {buttons.map((btn) => (
        <button
          key={btn.name}
          className={`px-4 py-1.5 text-sm rounded-md mr-2 ${
            location.pathname === btn.path
              ? "bg-green-700 text-white"
              : "text-gray-700"
          }`}
          onClick={() => navigate(btn.path)}
        >
          {btn.name}
        </button>
      ))}
    </div>
  );
};

export default UserGeneralSettingHeader;
