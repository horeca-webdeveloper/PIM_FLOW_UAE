import React from "react";
import PrivilegesTable from "./components/PrivilegesTable";
import UserManagementHeader from "./components/UserManagementHeader";
import UserGeneralSettingHeader from "./components/UserGeneralSettingHeader";

const AttributePrivileges = () => {
  return (
    <>
      <UserManagementHeader heading={"Attribute Privileges"} />
      <UserGeneralSettingHeader />
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
            >
              Attribute group code
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
            >
              Attribute group name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
            >
              Create
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
            >
              Delete
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
            >
              Read
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
            >
              Update
            </th>
          </tr>
        </thead>
        <PrivilegesTable />
      </table>
    </>
  );
};

export default AttributePrivileges;
