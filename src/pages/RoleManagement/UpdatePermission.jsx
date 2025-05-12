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
import UpdateRoleHeader from "../UserManagement/components/UpdateRoleHeader";

const UpdatePermission = () => {
  const location = useLocation();
  const id = location.state?.roleData?.id;
  const RoleName = location?.state?.roleData?.name;
  const { data, isLoading, error } = useFetchRolesPermission();

  const {
    data: permissionsAllowed,
    isLoading: permissionsLoading,
    error: permissionsError,
  } = useFetchRolesPermissionById(id);

  const [permission, setPermission] = useState([]);
  const [addPermission, setAddPermission] = useState([]);
  console.log("added permission", addPermission);
  const [showPopup, setShowPopup] = useState(false);

  const updateRole = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPermission(data?.data);
  }, [data]);

  return (
    <>
      {" "}
      <UpdateRoleHeader
        type={"show"}
        setShowPopup={setShowPopup}
        heading={`Update Role Of (${RoleName})`}
        RoleName={RoleName}
        addPermission={addPermission}
      />
      <div className="overflow-x-auto bg-white h-[80vh] rounded-lg ">
        {permissionsLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <table className="min-w-full sticky border border-gray-200">
            <thead className="sticky top-0 bg-gray-50">
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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Upload
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  View
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Download
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Import Feature Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  {" "}
                  Export Feature Product
                </th> */}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Image Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Document Product
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
            id={id}
            fetchName={permissionsAllowed?.data?.name}
          />
        )}
      </div>
    </>
  );
};

export default UpdatePermission;
