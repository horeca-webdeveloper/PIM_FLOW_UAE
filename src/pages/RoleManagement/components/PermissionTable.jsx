import React from "react";

const PermissionTable = ({ name, permission }) => {
  return (
    <tbody className="bg-white">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
          <div className="flex items-center">
            <div className="text-sm font-medium text-gray-900">
              {"Permission Table"}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
          <input
            type="checkbox"
            checked={true}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
          <input
            type="checkbox"
            checked={true}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
          <input
            type="checkbox"
            checked={true}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
          <input
            type="checkbox"
            checked={true}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default PermissionTable;
