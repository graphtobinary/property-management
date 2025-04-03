import PageMeta from "../../components/common/PageMeta";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import { lazy, useState } from "react";
import { PropertyImageProps } from "../../interfaces";
import { useAuthStore } from "../../store/auth.store";
import { useListingStore } from "../../store/listing.store";

const UploadPropertyPhotos = lazy(
  () => import("../../components/UploadPropertyPhotos")
);

const StepEleven: React.FC = () => {
  const [error, setError] = useState("");
  const [images, setImages] = useState<PropertyImageProps[]>([]);
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (images.length === 0) {
      setError("Upload photos");
      return;
    } else {
      setError("");
    }
    console.log("form submitted", images);
    navigate("/create-listing-step-twelve");
  };

  const { token } = useAuthStore();
  const { listingFormData } = useListingStore();
  const uploadMedia = async (media: { url: string; id: string }) => {
    console.log(media, "img data");
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const formdata = new FormData();
      // Get the file object from the URL
      const fileResponse = await fetch(media.url);
      const blob = await fileResponse.blob();
      const file = new File([blob], media.id, { type: blob.type });
      formdata.append("file", file);

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow" as RequestRedirect
      };

      const apiResponse = await fetch(
        `${import.meta.env.VITE_BASE_API_ENDPOINT}/upload-image/1/${listingFormData.propertyTempId}`,
        requestOptions
      );
      
      const data = await apiResponse.json();
      console.log(data, "uploaded img");
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  console.log(images);
  const handleImageUpload = (data: PropertyImageProps[], isRemove = false) => {
    if (isRemove) {
      setImages(data);
    } else {
      setImages((prevImages) => [...prevImages, ...data]);
      data.forEach((image) => uploadMedia({ url: image.url, id: image.id }));
    }
  };

  return (
    <>
      <PageMeta
        title="Manzil"
        description="Property Management Dashboard"
      />

      <>
        <div className="bg-white p-0 md:p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5 h-full">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 11
            </h3>
            <Button size="sm" variant="outline" onClick={() => navigate("/")}>
              Exit
            </Button>
          </div>
          <div className="flex flex-col w-2/3">
            <span className="text-lg pb-1 text-gray-500 dark:text-gray-400">
              Tell us about your place
            </span>

            <span className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              In this step, you'll add some of the amenities your place offers,
              plus 5 or more photos. Then you'll create a title and description.
            </span>
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-col mb-3">
              <span className=" text-base font-semibold text-gray-800 dark:text-white/90">
                Add some photos of your property
                <span className="text-error-500">*</span>
              </span>
              <small className="text-gray-400">
                You'll need 5 photos to get started. You can add upto 15 more or
                make changes later.
              </small>
            </div>
            <div className=" ">
              <div className="col-span-12 space-y-4 ">
                {/*  */}
                <UploadPropertyPhotos
                  images={images}
                  handleImageUpload={handleImageUpload}
                  error={error.length > 0}
                  hint={error}
                />
                {/*  */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-3">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>

            <Button onClick={handleSubmit}>Next</Button>
          </div>
        </div>
      </>
    </>
  );
};

export default StepEleven;
