import { useState } from "react";
import UserManagementHeader from "./components/UserManagementHeader";
import UserGeneralSettingHeader from "./components/UserGeneralSettingHeader";
import PermissionTable from "./components/PermissionTable";
import { useFetchRoles } from "../../services/apis/Roles/Hooks";
import Loader from "../../utils/Loader";
import { useLocation } from "react-router-dom";

const UserPermission = () => {
  const location = useLocation();
  const id = location.state?.id;
  console.log(id);
  const { data, isLoading, error } = useFetchRoles({ id: id });

  return (
    <>
      {" "}
      <UserManagementHeader />
      <UserGeneralSettingHeader />
      <div className="overflow-x-auto bg-white rounded-lg ">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Name
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
            {Object.entries(data?.permissions).map(([name, actions]) => {
              return <PermissionTable name={name} permission={actions} />;
            })}
          </table>
        )}
      </div>
    </>
  );
};

export default UserPermission;
