import React from "react";
import { EventFormStepProps } from "./General";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast/headless";

function Media({
  newlySelectedImages,
  setNewlySelectedImages,
  event,
  activeStep,
  setActiveStep,
  alreadyUploadedImages,
  setAlreadyUploadedImages,
}: EventFormStepProps) {
  const uploadFilesRef = React.useRef<HTMLInputElement>(null);

  const onFileSelect = (e: any) => {
    try {
      const files = e.target.files;
      const filesArray = Array.from(files);

      // set the newly selected images with urls
      const existingNewlySelectedImages = newlySelectedImages || [];
      const newImages = filesArray.map((file: any) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setNewlySelectedImages([...existingNewlySelectedImages, ...newImages]);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onNewUploadedRemove = (index: number) => {
    const tempImages: any[] = [...newlySelectedImages];
    tempImages.splice(index, 1);
    setNewlySelectedImages(tempImages);
  };

  const onAlreadyUploadedRemove = (index: number) => {
    const tempImages: string[] = [...alreadyUploadedImages];
    tempImages.splice(index, 1);
    setAlreadyUploadedImages(tempImages);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="w-max">
        <Button onClick={() => uploadFilesRef.current?.click()}>
          <input
            type="file"
            ref={uploadFilesRef}
            hidden
            onChange={onFileSelect}
          />
          Upload New Image
        </Button>
      </div>
      {/* // show the newly selected images */}

      <div className="flex gap-5">
        {alreadyUploadedImages?.map((image: any, index: number) => (
          <div className="border flex flex-col gap-5 rounded pb-5">
            <img
              key={index}
              src={image}
              alt="newly selected"
              className="w-40 h-40 object-cover"
            />
            <h1
              className="text-center cursor-pointer text-sm underline"
              onClick={() => onAlreadyUploadedRemove(index)}
            >
              Remove
            </h1>
          </div>
        ))}
        {newlySelectedImages?.map((image: any, index: number) => (
          <div className="border flex flex-col gap-5 rounded pb-5">
            <img
              key={index}
              src={image.url}
              alt="newly selected"
              className="w-40 h-40 object-cover"
            />
            <h1
              className="text-center cursor-pointer text-sm underline"
              onClick={() => onNewUploadedRemove(index)}
            >
              Remove
            </h1>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-5">
        <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
        <Button onClick={() => setActiveStep(activeStep + 1)} color="primary">
          Next
        </Button>
      </div>
    </div>
  );
}

export default Media;
