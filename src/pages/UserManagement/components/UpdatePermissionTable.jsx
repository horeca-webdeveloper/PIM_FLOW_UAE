import React, { useEffect, useState } from "react";

const UpdatePermissionTable = ({ data, setAddPermission, allowed }) => {
  const { name, permissions } = data;
  const [rolePermission, setRolePermission] = useState([]);

  // Store selected permission names
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Sync initial permissions from props
  useEffect(() => {
    setRolePermission(permissions);

    const allowedForThisModule = allowed?.find((item) => item.name === name);
    const allowedPermNames =
      allowedForThisModule?.permissions.map((p) => p.name) || [];

    setSelectedPermissions(allowedPermNames);
    setAddPermission((prev) => {
      const merged = [...new Set([...prev, ...allowedPermNames])];
      return merged;
    });
  }, [permissions, allowed, name, setAddPermission]);

  // Toggle permission name
  const handleRole = (permissionName) => {
    setSelectedPermissions((prev) => {
      let updated;
      if (prev.includes(permissionName)) {
        updated = prev.filter((perm) => perm !== permissionName);
      } else {
        updated = [...prev, permissionName];
      }

      // Update parent without removing other module's permissions
      setAddPermission((prevAdd) => {
        const merged = updated.concat(
          prevAdd.filter(
            (perm) => !rolePermission.some((rp) => rp.name === perm)
          )
        );
        return [...new Set(merged)];
      });

      return updated;
    });
  };

  return (
    <tbody key={name} className="bg-white">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
          <div className="text-sm font-medium text-gray-900">{name}</div>
        </td>

        {[
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
          // "importfeatures",
          // "exportfeatures",
          "image",
          "document",
        ].map((key) => {
          const fullPermissionName = `${key} ${name}`;
          const currentPermission = rolePermission?.find(
            (perm) => perm?.name === fullPermissionName
          );

          const isChecked = selectedPermissions?.includes(
            currentPermission?.name
          );

          if (currentPermission) {
            return (
              <td
                key={key}
                className="px-6 py-4 whitespace-nowrap border border-gray-200"
              >
                <input
                  type="checkbox"
                  onChange={() => handleRole(currentPermission.name)}
                  checked={isChecked}
                  className="h-4 w-4 text-blue-600 cursor-pointer rounded border-gray-300"
                />
              </td>
            );
          } else {
            return (
              <td
                key={key}
                className="px-6 py-4 whitespace-nowrap border border-gray-200"
              >
                <input
                  type="checkbox"
                  disabled
                  className="h-4 w-4 text-blue-600 cursor-not-allowed  rounded border-gray-300"
                />
              </td>
            );
          }
        })}
      </tr>
    </tbody>
  );
};

export default UpdatePermissionTable;
