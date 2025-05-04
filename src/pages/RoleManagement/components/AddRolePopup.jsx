import axios from "axios";
import React, { useState } from "react";
import { basePath } from "../../../services/apiRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRolePopup = ({ setShowPopup, addPermission }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameAlert, setNameAlert] = useState(false);
  const [loader, setLoader] = useState(false);

  //this function is for create new role
  const CreateNewRole = async () => {
    setLoader(true);
    const token = localStorage.getItem("token");
    if (name.length == 0) {
      setNameAlert(true);
      return;
    }
    const data = {
      name: name,
      permissions: addPermission,
    };
    try {
      const response = await axios.post(`${basePath}/roles`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Success:", response.data);
      setLoader(false);
      if (response?.data) {
        toast.success("Role Created Successfully");
        setTimeout(() => {
          navigate("/role-management");
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {" "}
        <h2 className="text-[18px] text-left mb-[10px] font-semibold text-[#1D1C1C]">
          Create Role
        </h2>
        <div>
          <div className="flex flex-col">
            <label className="text-[16px] text-[#616161] font-semibold block mb-[4px]">
              Name
            </label>
            <input
              className="border border-[#A8A4A4] w-full rounded-[4px] px-3 py-2 h-[42px] text-[#616161]"
              onChange={(e) => {
                setName(e.target.value);
                setNameAlert(false);
              }}
              value={name}
              placeholder="User Role Name"
            />
            {nameAlert && (
              <span className="text-[red] text-[14px]">please write name</span>
            )}
            <div className="flex mt-[20px] justify-end space-x-2 mt-[10px]">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 bg-[#F1EFEF] border border-[#A8A4A4] text-[#303030] py-2 px-4 mr-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => CreateNewRole()}
                className="flex-1 bg-[#26683A]  text-white py-2 px-4 rounded"
              >
                {loader ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRolePopup;
