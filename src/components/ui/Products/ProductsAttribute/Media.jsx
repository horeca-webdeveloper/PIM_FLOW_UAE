import React, { useState, useEffect } from "react";
import uploadIcon from "../../../../assets/icons/uploadIcon.png";
import axios from "axios";

const Media = ({ mediaData, setMediaData }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [show, setShow] = useState(true);
  const [metadata, setMetadata] = useState({
    images: [],
    videos: [],
    documents: [],
  });

  const MAX_FILES = 10;

  useEffect(() => {
    if (!mediaData) return;

    const formData = new FormData();

    // ===== IMAGES =====
    const existingImages = (mediaData.images || []).map((url) => {
      const isFile = url instanceof File;
      return {
        preview: isFile ? URL.createObjectURL(url) : url,
        file: isFile
          ? url
          : { name: url?.split("/").pop() || "Existing Image" },
      };
    });
    setImageFiles([
      ...existingImages,
      ...Array(Math.min(MAX_FILES - existingImages.length, 5)).fill(null),
    ]);

    // ===== VIDEOS =====
    const videoPath = Array.isArray(mediaData.video_path)
      ? mediaData.video_path
      : JSON.parse(mediaData.video_path || "[]");

    const existingVideos = (videoPath || []).map((url) => {
      const isFile = url instanceof File;
      return {
        preview: isFile ? URL.createObjectURL(url) : url,
        file: isFile
          ? url
          : { name: url?.split("/").pop() || "Existing Video" },
      };
    });
    setVideoFiles([
      ...existingVideos,
      ...Array(Math.min(MAX_FILES - existingVideos.length, 5)).fill(null),
    ]);

    // ===== DOCUMENTS =====
    const existingDocs = (mediaData.documents || []).map((doc) => {
      const url = doc?.path;
      const isFile = url instanceof File;
      return {
        preview: isFile ? URL.createObjectURL(url) : url,
        file: isFile
          ? url
          : {
              name:
                doc?.title?.trim() ||
                url?.split("/").pop() ||
                "Document Uploaded",
            },
      };
    });
    setDocumentFiles([
      ...existingDocs,
      ...Array(Math.min(MAX_FILES - existingDocs.length, 5)).fill(null),
    ]);

    // ===== METADATA =====
    setMetadata({
      images: Array(Math.max(5, existingImages.length))
        .fill()
        .map(() => ({
          fileName: "",
          altText: "",
        })),
      videos: Array(Math.max(5, existingVideos.length))
        .fill()
        .map(() => ({
          fileName: "",
          altText: "",
        })),
      documents: Array(Math.max(5, existingDocs.length))
        .fill()
        .map(() => ({
          fileName: "",
          altText: "",
        })),
    });
  }, [mediaData]);

  const handleFileUpload = async (e, index, type) => {
    const file = e.target.files[0];
    if (!file) return;

    let filesList, setFilesList;
    const fileUrl = URL.createObjectURL(file);
    const formData = new FormData();

    if (type === "images") {
      filesList = [...imageFiles];
      setFilesList = setImageFiles;
      formData.append("images[]", file);
      try {
        setMediaData((prevData) => ({
          ...prevData,
          images: [...(prevData.images || []), file],
          imageFormData: formData,
        }));
      } catch (error) {
        console.error("Error handling image upload:", error);
        alert("Failed to process image!");
        return;
      }
    } else if (type === "videos") {
      filesList = [...videoFiles];
      setFilesList = setVideoFiles;
      formData.append("videos[]", file);
      try {
        setMediaData((prevData) => ({
          ...prevData,
          video_path: [...(prevData.video_path || []), file],
          videoFormData: formData,
        }));
      } catch (error) {
        console.error("Error handling video upload:", error);
        alert("Failed to process video!");
        return;
      }
    } else {
      filesList = [...documentFiles];
      setFilesList = setDocumentFiles;
      formData.append("documents[]", file);
      try {
        setMediaData((prevData) => ({
          ...prevData,
          documents: [...(prevData.documents || []), file],
          documentFormData: formData,
        }));
      } catch (error) {
        console.error("Error handling document upload:", error);
        alert("Failed to process document!");
        return;
      }
    }

    filesList[index] = {
      file,
      preview: fileUrl,
    };

    setFilesList(filesList);

    const filledSlotsCount = filesList.filter(Boolean).length;
    const totalSlotsCount = filesList.length;

    if (filledSlotsCount === totalSlotsCount && totalSlotsCount < MAX_FILES) {
      setFilesList([...filesList, null]);
      const updatedMetadata = { ...metadata };
      updatedMetadata[type] = [
        ...updatedMetadata[type],
        { fileName: "", altText: "" },
      ];
      setMetadata(updatedMetadata);
    }
  };

  const handleMetadataChange = (type, index, field, value) => {
    const updatedMetadata = { ...metadata };
    if (!updatedMetadata[type]) {
      updatedMetadata[type] = [];
    }
    if (!updatedMetadata[type][index]) {
      updatedMetadata[type][index] = { fileName: "", altText: "" };
    }
    updatedMetadata[type][index] = {
      ...updatedMetadata[type][index],
      [field]: value,
    };
    setMetadata(updatedMetadata);
  };

  const removeFile = (type, index) => {
    let filesList, setFilesList;

    if (type === "images") {
      filesList = [...imageFiles];
      setFilesList = setImageFiles;
      setMediaData((prevData) => ({
        ...prevData,
        images: prevData.images.filter((_, i) => i !== index),
      }));
    } else if (type === "videos") {
      filesList = [...videoFiles];
      setFilesList = setVideoFiles;
      const videoPath =
        typeof mediaData.video_path === "string"
          ? JSON.parse(mediaData.video_path || "[]")
          : mediaData.video_path;
      setMediaData((prevData) => ({
        ...prevData,
        video_path: videoPath.filter((_, i) => i !== index),
      }));
    } else {
      filesList = [...documentFiles];
      setFilesList = setDocumentFiles;
      setMediaData((prevData) => ({
        ...prevData,
        documents: prevData.documents.filter((_, i) => i !== index),
      }));
    }

    if (filesList[index]?.preview && filesList[index]?.file instanceof File) {
      URL.revokeObjectURL(filesList[index].preview);
    }

    filesList[index] = null;
    setFilesList(filesList);

    const updatedMetadata = { ...metadata };
    updatedMetadata[type][index] = { fileName: "", altText: "" };
    setMetadata(updatedMetadata);
  };

  const renderUploadSection = (title, description, files, type) => {
    return (
      <div className="w-[75%] mb-8">
        <h2 className="text-[16px] font-bold mb-4 text-[#616161]">{title}</h2>
        <div className="mb-2">
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="grid grid-cols-1 bg-[white] border border-dotted border-[#A8A4A4] p-[10px] rounded-[10px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file, index) => (
            <div key={`${type}-${index}`} className="border rounded-md p-2">
              {file ? (
                <>
                  <div className="relative w-full h-32 mb-2 bg-gray-100">
                    {type === "images" && (
                      <img
                        src={file.preview}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    )}
                    {type === "videos" && (
                      <video
                        src={file.preview}
                        className="w-full h-full object-contain"
                        controls
                      />
                    )}
                    {type === "documents" && (
                      <div className="w-full h-full flex items-center justify-center">
                        {file.file.name.toLowerCase().endsWith(".pdf") ? (
                          <iframe
                            src={file.preview}
                            className="w-full h-full"
                            title="PDF preview"
                          />
                        ) : (
                          <div className="text-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-12 w-12 mx-auto text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <p className="text-sm mt-2 truncate">
                              {file.file.name}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(type, index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="text-xs block">File Name:</label>
                      <input
                        type="text"
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={metadata[type][index]?.fileName || ""}
                        onChange={(e) =>
                          handleMetadataChange(
                            type,
                            index,
                            "fileName",
                            e.target.value
                          )
                        }
                        placeholder="Text Field"
                      />
                    </div>
                    <div>
                      <label className="text-xs block">Alt Text:</label>
                      <input
                        type="text"
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={metadata[type][index]?.altText || ""}
                        onChange={(e) =>
                          handleMetadataChange(
                            type,
                            index,
                            "altText",
                            e.target.value
                          )
                        }
                        placeholder="Text Field"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-40 bg-gray-50">
                  <label className="cursor-pointer flex flex-col items-center p-4">
                    <div className="w-24 h-24 mb-2 flex items-center justify-center">
                      <img src={uploadIcon} alt="Upload" />
                    </div>
                    <span className="text-sm text-gray-500">
                      Upload {type.charAt(0).toUpperCase() + type.slice(1)} Here
                    </span>
                    <input
                      type="file"
                      accept={
                        type === "images"
                          ? "image/*"
                          : type === "videos"
                          ? "video/*"
                          : ".pdf,.doc,.docx,.txt,.xlsx,.ppt,.pptx"
                      }
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, index, type)}
                    />
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className=" border border-[#979797]  rounded-lg p-0 bg-white shadow-sm mt-[20px]">
      <div
        onClick={() => setShow(!show)}
        className={`flex cursor-pointer rounded-t-md h-[49px] border-b border-b-[#979797] bg-[#F9F9FB] px-4 justify-between items-center ${
          show ? "mb-4" : "mb-0"
        }`}
      >
        <h2 className="text-[20px] text-[#4A4A4A] leading-[27.28px] font-normal">
          Media Attributes
        </h2>
      </div>

      {show && (
        <div className="rounded-md p-4 bg-[white]">
          {renderUploadSection(
            "High Quality Images",
            "Upload Image (WebP)",
            imageFiles,
            "images"
          )}

          {renderUploadSection(
            "Videos URL",
            "Upload Videos Here",
            videoFiles,
            "videos"
          )}

          {renderUploadSection(
            "Documents",
            "Upload Documents (PDF)",
            documentFiles,
            "documents"
          )}
        </div>
      )}
    </div>
  );
};

export default Media;
