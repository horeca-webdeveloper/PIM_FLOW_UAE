import { useEffect, useState } from "react";
import UserManagementHeader from "./components/UserManagementHeader";
import UserGeneralSettingHeader from "./components/UserGeneralSettingHeader";
import PermissionTable from "./components/PermissionTable";
import { useFetchRolesPermission } from "../../services/apis/Roles/Hooks";
import Loader from "../../utils/Loader";
import { useLocation } from "react-router-dom";

const UserPermission = () => {
  const location = useLocation();
  const id = location.state?.id;
  const { data, isLoading, error } = useFetchRolesPermission();
  const [permission, setPermission] = useState([]);

  useEffect(() => {
    setPermission(data?.data);
  }, [data]);

  return (
    <>
      {" "}
      <UserManagementHeader heading={"Roles Privileges"} />
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
                  List
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Add
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Update
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
                  Show
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Import
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Export
                </th>
              </tr>
            </thead>
            {permission?.map((item) => {
              return <PermissionTable data={item} />;
            })}
          </table>
        )}
      </div>
    </>
  );
};

export default UserPermission;
