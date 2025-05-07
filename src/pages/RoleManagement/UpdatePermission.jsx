import { useEffect, useState } from "react";
import UserManagementHeader from "../UserManagement/components/UserManagementHeader";
import UserGeneralSettingHeader from "../UserManagement/components/UserGeneralSettingHeader";
import PermissionTable from "../UserManagement/components/PermissionTable";
import { useLocation } from "react-router-dom";
import {
  useFetchRolesPermission,
  useFetchRolesPermissionById,
} from "../../services/apis/Roles/Hooks";
import Loader from "../../utils/Loader";
import UpdatePermissionTable from "../UserManagement/components/UpdatePermissionTable";
import UpdateRolePopup from "./components/UpdateRolePopup";

const UpdatePermission = () => {
  const location = useLocation();
  const id = location.state?.roleData?.id;
  const { data, isLoading, error } = useFetchRolesPermission();

  const {
    data: permissionsAllowed,
    isLoading: permissionsLoading,
    error: permissionsError,
  } = useFetchRolesPermissionById(id);
  console.log("---->>>>", permissionsAllowed?.data?.modules);

  const [permission, setPermission] = useState([]);
  const [addPermission, setAddPermission] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setPermission(data?.data);
  }, [data]);

  return (
    <>
      {" "}
      <UserManagementHeader
        type={"show"}
        setShowPopup={setShowPopup}
        heading={"Update Role"}
        addPermission={addPermission}
      />
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
            {permission?.map((item, index) => {
              return (
                <UpdatePermissionTable
                  data={item}
                  allowed={permissionsAllowed?.data?.modules}
                  setAddPermission={setAddPermission}
                />
              );
            })}
          </table>
        )}
        {showPopup && (
          <UpdateRolePopup
            setShowPopup={setShowPopup}
            addPermission={addPermission}
          />
        )}
      </div>
    </>
  );
};

export default UpdatePermission;
