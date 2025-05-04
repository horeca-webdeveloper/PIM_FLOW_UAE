import { useState, useEffect } from "react";
import { X, Upload, FileText, Image as ImageIcon } from "lucide-react";
import vendorDocUploadIcon from "../../../assets/icons/vendorDocUploadIcon.png";
import axios from "axios";
import { baseUrls } from "../../../utils/apiWrapper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UploadVendorFile({
  setUploadShow,
  onClose,
  onUpload,
  id,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState("");
  const [name, setName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clean up the object URL when component unmounts or file changes
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Determine if file is an image
      const fileType = file.type;
      const isImageFile = fileType.startsWith("image/");
      setIsImage(isImageFile);

      // Create preview URL if it's an image
      if (isImageFile) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    console.log(id);
    console.log(name);
    console.log(selectedFile);
    try {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      formData.append("document", selectedFile);
      formData.append("name", name);
      const response = await axios.post(
        `${baseUrls}/vendors/${id}/documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.success) {
        setLoading(false);
        toast.success("Uploaded Successfully");
        setTimeout(() => {
          navigate(`/VendorAsset/${id}`);
        }, 500);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setName("");
    setPreviewUrl(null);
    setIsImage(false);
  };

  const handleRemoveFile = () => {
    resetForm();
  };

  if (!setUploadShow) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[20px] font-semibold text-[#1D1C1C] underline pb-[0px]">
            Upload Vendor Files
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex flex-col items-center justify-center">
            {!selectedFile ? (
              <>
                <div>
                  <img
                    className="w-[60px]"
                    src={vendorDocUploadIcon}
                    alt="Upload Image"
                  />
                </div>
                <p className="text-[#186737] font-normal text-[16px] mb-4">
                  Browse file to upload
                </p>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-green-700 underline"
                >
                  Select a file
                </label>
              </>
            ) : (
              <div className="w-full flex flex-col items-center">
                {isImage && previewUrl ? (
                  <div className="mb-4 max-w-full">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-48 max-w-full object-contain rounded border border-gray-200"
                    />
                  </div>
                ) : (
                  <div className="mb-4 p-4 bg-gray-100 rounded flex items-center">
                    <FileText className="text-gray-600 mr-2" size={24} />
                    <span className="text-gray-800">
                      Document file selected
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <p className="font-medium text-gray-800">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                  <button
                    onClick={handleRemoveFile}
                    className="mt-2 px-3 py-1 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Write Here"
            className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <div className="relative">
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Video">Video</option>
              <option value="Image">Image</option>
              <option value="Document">Document</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div> */}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setUploadShow(false)}
            className="w-1/2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || !name}
            className={`w-1/2 py-2 px-4 rounded-md text-white focus:outline-none 
              ${
                selectedFile && name
                  ? "bg-[#26683A] hover:bg-[#26683A]"
                  : "bg-[#26683A] cursor-not-allowed"
              }`}
          >
            {loading ? "Uploading Data..." : "Upload Data"}
          </button>
        </div>
      </div>
    </div>
  );
}
