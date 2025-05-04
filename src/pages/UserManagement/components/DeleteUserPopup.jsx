import React from "react";

const DeleteUserPopup = ({
  setShowDelete,
  deleteUser,
  deleteLoading,
  title,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-[18px] text-center mb-[10px] font-semibold text-[#1D1C1C]">
          Delete {title}
        </h2>
        <div className="flex mt-[20px] justify-end space-x-2 mt-[10px]">
          <button
            onClick={() => {
              setShowDelete(false);
              document.body.style.overflow = "auto";
            }}
            className="flex-1 bg-[#F1EFEF] border border-[#A8A4A4] text-[#303030] py-2 px-4 mr-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteUser()}
            className="flex-1 bg-[#26683A]  text-white py-2 px-4 rounded"
          >
            {deleteLoading ? `Deleting ${title}...` : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserPopup;
