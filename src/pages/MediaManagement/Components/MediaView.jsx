import React, { useRef, useState } from "react";
import folderIcon from "../../../assets/icons/folderIcon.png";
// import threeDot from "../../../assets/icons/threeDot.png";
import { FaFileCsv, FaFolder } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";

const MediaView = ({ data, index, type }) => {
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);
  const [showControls, setShowControls] = useState(true);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (video) {
      clearTimeout(timeoutRef.current);
      video.play().catch(console.error);
      setShowControls(true);
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 1000);
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    clearTimeout(timeoutRef.current);
    if (video) {
      video.pause();
      video.currentTime = 0;
      setShowControls(true);
    }
  };

  const lowerType = type?.toLowerCase();

  const renderContent = () => {
    if (lowerType === "videos") {
      return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <video
            ref={videoRef}
            src={data?.url}
            className="h-[200px] object-cover rounded-md"
            muted
            playsInline
            controls={showControls}
          />
        </div>
      );
    } else if (lowerType === "images") {
      return (
        <img
          src={data?.url}
          alt="Uploaded"
          className="max-h-full rounded-md w-full object-contain"
        />
      );
    } else if (
      (lowerType === "documents" || lowerType === "files") &&
      data?.url
    ) {
      const fileUrl = data.url;
      const fileName = data.name;

      if (fileUrl.includes(".csv")) {
        return (
          <a
            href={fileUrl}
            target="_blank"
            download={`${fileName}.csv`}
            className="flex items-center"
          >
            <p className="mr-[5px]">{fileName}.csv</p>
            <FaFileCsv size={20} />
          </a>
        );
      } else if (fileUrl.includes(".pdf")) {
        return (
          <a
            href={fileUrl}
            target="_blank"
            download={`${fileName}.pdf`}
            className="flex items-center"
          >
            <p className="mr-[5px]">{fileName}.pdf</p>
            <FaFilePdf size={20} />
          </a>
        );
      } else if (fileUrl.includes(".xlsx")) {
        return (
          <a
            href={fileUrl}
            target="_blank"
            download={`${fileName}.xlsx`}
            className="flex items-center"
          >
            <p className="mr-[5px]">{fileName}.xlsx</p>
            <FaFileExcel size={20} />
          </a>
        );
      } else {
        return <div>No Media Found</div>;
      }
    } else {
      return <div>No Media Found</div>;
    }
  };

  return (
    <div
      key={index}
      className="w-full cursor-pointer p-2 h-[250px] bg-gray-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-grow">
          <FaFolder className="text-[#26683A] hover:text-green-700 text-xl mr-[4px] mb-[2px]" />
          <span className="text-sm">{""}</span>
        </div>
        {/* <img src={threeDot} alt="Menu" className="ml-full" /> */}
      </div>

      <div
        className={`flex items-center justify-center flex-col w-full bg-[#F6F6F6] mt-[10px] rounded-md ${
          lowerType !== "videos" ? "h-[calc(100%-30px)]" : ""
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default MediaView;
