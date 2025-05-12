import { useEffect, useState } from "react";
import UserManagementHeader from "../UserManagement/components/UserManagementHeader";
import UserGeneralSettingHeader from "../UserManagement/components/UserGeneralSettingHeader";
import PermissionTable from "../UserManagement/components/PermissionTable";
import { useLocation } from "react-router-dom";
import { useFetchRolesPermission } from "../../services/apis/Roles/Hooks";
import Loader from "../../utils/Loader";
import AddPermissionTable from "../UserManagement/components/AddPermissionTable";
import AddRolePopup from "./components/AddRolePopup";

const AddPermission = () => {
  const location = useLocation();
  const id = location.state?.id;
  const { data, isLoading, error } = useFetchRolesPermission();
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
        title={"Add New Role"}
        setShowPopup={setShowPopup}
        heading={"Add Role"}
        addPermission={addPermission}
      />
      <div className="overflow-x-auto h-[80vh] bg-white rounded-lg ">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <table className="min-w-full border border-gray-200">
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
            {permission?.map((item) => {
              return (
                <AddPermissionTable
                  data={item}
                  setAddPermission={setAddPermission}
                />
              );
            })}
          </table>
        )}
        {showPopup && (
          <AddRolePopup
            setShowPopup={setShowPopup}
            addPermission={addPermission}
          />
        )}
      </div>
    </>
  );
};

export default AddPermission;
