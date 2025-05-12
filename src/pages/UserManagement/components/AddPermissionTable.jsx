import React, { useEffect, useState } from "react";

const AddPermissionTable = ({ data, addedPermissions, setAddPermission }) => {
  const { name, permissions } = data;
  const [rolePermission, setRolePermission] = useState([]);

  useEffect(() => {
    setRolePermission(permissions || []);
  }, [permissions]);

  const handleRole = (permissionName) => {
    setAddPermission((prev) =>
      prev?.includes(permissionName)
        ? prev.filter((perm) => perm !== permissionName)
        : [...prev, permissionName]
    );
  };

  const permissionKeys = [
    "list",
    "add",
    "update",
    "delete",
    "show",
    "import",
    "export",
    "upload",
    "view",
    "download",
    "image",
    "document",
  ];

  return (
    <tbody key={name} className="bg-white">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
          <div className="text-sm font-medium text-gray-900">{name}</div>
        </td>

        {permissionKeys.map((key) => {
          const fullPermissionName = `${key} ${name}`;
          const permissionObj = rolePermission.find(
            (perm) => perm.name === fullPermissionName
          );

          const isChecked = addedPermissions?.includes(fullPermissionName);

          return (
            <td
              key={key}
              className="px-6 py-4 whitespace-nowrap border border-gray-200"
            >
              <input
                type="checkbox"
                onChange={() => handleRole(fullPermissionName)}
                checked={isChecked}
                disabled={!permissionObj}
                className={`h-4 w-4 rounded border-gray-300 ${
                  permissionObj
                    ? "text-blue-600 cursor-pointer"
                    : "text-gray-300 cursor-not-allowed"
                }`}
              />
            </td>
          );
        })}
      </tr>
    </tbody>
  );
};

export default AddPermissionTable;
