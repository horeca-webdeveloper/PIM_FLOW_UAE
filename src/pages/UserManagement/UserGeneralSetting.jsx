import React from "react";
import UserGeneralSettingHeader from "./components/UserGeneralSettingHeader";
import UserManagementHeader from "./components/UserManagementHeader";
import { useLocation } from "react-router-dom";

const UserGeneralSetting = () => {
  const location = useLocation();
  const roleData = location.state?.roleData;
  console.log(roleData);
  return (
    <div className="h-[100vh]">
      {/* Tabs */}
      <UserManagementHeader />
      <UserGeneralSettingHeader />

      {/* Content Box */}
      <div className="border border-[#979797] rounded-md">
        {/* Header */}
        <div className="flex justify-between items-center rounded-t-md border-b border-[#979797] bg-[#F9F9FB] px-4 py-3">
          <h3 className="text-gray-800 font-medium">General properties</h3>
          <div className="flex items-center text-red-600 text-sm">
            <span>• 6 missing required attribute</span>
            <button className="ml-2">{/* <ChevronUp size={16} /> */}</button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 rounded-md bg-[white]">
          <div className="mb-6 w-[50%]">
            <label className="block text-gray-800 mb-2">User Role Name</label>
            <div className="relative">
              <input
                type="text"
                value={roleData?.name}
                className="w-full border border-gray-300 rounded-md p-2 pr-10 text-gray-700"
              />
              {/* <Lock
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              /> */}
            </div>
          </div>

          <div className="w-[50%]">
            <label className="block text-gray-800 mb-2">Role Description</label>
            <textarea
              rows={8}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-600 text-sm"
              value={roleData?.description}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGeneralSetting;
