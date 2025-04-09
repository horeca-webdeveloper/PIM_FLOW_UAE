import React, { useState, useEffect } from "react";
import CommonMediaInput from "./CommonMediaInput";
const CategoriesSectionComponent = ({ title, spanTags, mediaData, setMediaData,fileName,altText }) => {
  const [highQualityImages, setHighQualityImages] = useState([]);
  const [show, setShow] = useState(true);
  const [videoUrls, setVideoUrls] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [documents, setDocuments] = useState([]);

  // Load images, videos, and documents from mediaData on mount
  useEffect(() => {
    if (mediaData?.images) {
      const parsedImages = Array.isArray(mediaData.images)
        ? mediaData.images
        : [mediaData.images];
      setHighQualityImages(parsedImages);
    }

    if (mediaData?.video_url) {
      setVideoUrls([mediaData.video_url]);
    }

    if (mediaData?.documents) {
      setDocuments(mediaData.documents);
    }
  }, [mediaData]);


  return (
    <div className="bg-white mt-[-20px]">

      <p className="text-[#616161] font-semibold mb-[20px] mt-[30px]">{title}</p>
      <div className="border-2 rounded-lg border-dashed">
        <p className="mt-2 p-2 text-[#616161]">{spanTags}</p>
        <>

          <div className="mb-[10px] p-4">
            <div className="grid grid-cols-4 gap-3">
            <CommonMediaInput  fileName={fileName} altText={altText} />
            <CommonMediaInput  fileName={fileName} altText={altText} />
            <CommonMediaInput  fileName={fileName} altText={altText} />
            <CommonMediaInput   />
              
            
            </div>
          </div>



        </>
      </div>


    </div>
  );
};

export default CategoriesSectionComponent;
