import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MediaManagementHeader from "../../MediaManagement/Components/MediaManagementHeader";
import MediaView from "../../MediaManagement/Components/MediaView";
import { baseUrls } from "../../../utils/apiWrapper";
import axios from "axios";
import Loader from "../../../utils/Loader";
import { formatDate } from "../../../utils/formatDate";
import { VendorManagementContext } from "../VendorManagementContext";

const VendorMediaFiles = () => {
  const location = useLocation();
  const { file, type, vendorId } = location.state || {};
  const [docUrl, setDocUrl] = useState([]);
  const [loader, setLoader] = useState(false);
  const getDocuments = async () => {
    setLoader(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${baseUrls}/vendors/${vendorId}/documents?type=${
          type === "document" ? "file" : type
        }`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoader(false);
      setDocUrl(response?.data?.data);
    } catch (error) {
      setLoader(false);
    }
  };

  const { vendorName } = useContext(VendorManagementContext);
  useEffect(() => {
    getDocuments();
  }, []);
  return (
    <div className="min-h-[90vh]">
      <MediaManagementHeader title={"Vendor Media Assets"} />
      {loader ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-5">
          {docUrl && docUrl?.length > 0 ? (
            docUrl?.map((item, index) => {
              return (
                <div className="flex rounded-[4px] bg-gray-200 p-[4px] flex-col">
                  <MediaView type={type + "s"} data={item} index={index} />
                  <div className=" px-[5px] bg-gray-200 border-gray-300 ">
                    <div className="flex">
                      <p className="font-bold whitespace-nowrap text-gray-600">
                        Name
                      </p>{" "}
                      : {item?.name}
                    </div>
                    <div className="flex">
                      <p className="font-bold whitespace-nowrap text-gray-600">
                        Date
                      </p>{" "}
                      : {formatDate(item?.updated_at)}
                    </div>
                    <div className="flex">
                      <p className="font-bold whitespace-nowrap text-gray-600">
                        Vendor
                      </p>{" "}
                      : {vendorName}
                    </div>
                    <div className="flex">
                      <p className="font-bold whitespace-nowrap text-gray-600">
                        Download
                      </p>{" "}
                      :{" "}
                      <a
                        target="_blank"
                        href={item?.url}
                        download={`${item?.name}.csv`}
                        className="hover:text-blue-400 cursor-pointer ml-[4px]"
                      >
                        Click Here
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Media Found For Vendor</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorMediaFiles;
