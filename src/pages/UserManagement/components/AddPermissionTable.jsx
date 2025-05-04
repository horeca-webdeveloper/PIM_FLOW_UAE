import React, { useEffect, useState } from "react";

const AddPermissionTable = ({ data, setAddPermission }) => {
  const { name, permissions } = data;

  const [rolePermission, setRolePermission] = useState([]);

  useEffect(() => {
    setRolePermission(permissions);
  }, [permissions]);

  const handleRole = (permissionName) => {
    setAddPermission((prev) =>
      prev.includes(permissionName)
        ? prev.filter((perm) => perm !== permissionName)
        : [...prev, permissionName]
    );
  };

  return (
    <tbody key={name} className="bg-white">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
          <div className="text-sm font-medium text-gray-900">{name}</div>
        </td>

        {["list", "add", "update", "delete", "show", "import", "export"].map(
          (key, index) => {
            const isChecked =
              rolePermission?.[index]?.name.includes(key) || false;

            if (isChecked) {
              return (
                <td
                  key={key}
                  className="px-6 py-4 whitespace-nowrap border border-gray-200"
                >
                  <input
                    type="checkbox"
                    onChange={() =>
                      handleRole(rolePermission?.[index]?.name, index)
                    }
                    // checked={isChecked}
                    className="h-4 w-4 text-blue-600 cursor-pointer rounded border-gray-300"
                    readOnly // Optional: prevent direct user editing if needed
                  />
                </td>
              );
            }
          }
        )}
      </tr>
    </tbody>
  );
};

export default AddPermissionTable;
