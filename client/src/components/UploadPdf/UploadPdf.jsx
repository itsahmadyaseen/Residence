import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Group } from "@mantine/core";
import "../UploadImage/UploadImage.css"; // reuse the same styles

const UploadPDF = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [pdfURL, setPdfURL] = useState(propertyDetails.pdfUrl || "");
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, pdfUrl: pdfURL }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: "ml_default",
        maxFiles: 1,
        resourceType: "raw", // ✅ important for non-images like PDF
        clientAllowedFormats: ["pdf"],
      },
      (err, result) => {
        if (result.event === "success") {
          setPdfURL(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {!pdfURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload PDF Brochure</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <p>
            📄{" "}
            <a href={pdfURL} target="_blank" rel="noopener noreferrer">
              View Uploaded PDF
            </a>
          </p>
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!pdfURL}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadPDF;
