import PageMeta from "../../components/common/PageMeta";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import { lazy, useEffect, useState } from "react";
import { PropertyImageProps } from "../../interfaces";
import { useListingStore } from "../../store/listing.store";
import ExitButton from "../../components/ExitButton";
import { updateUploadedImages, uploadImages } from "../../api/Listing.api";

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
    // console.log("form submitted", images);
    navigate("/create-listing-step-twelve");
  };

  const { listingFormData, setListingFormData } = useListingStore();
  const uploadMedia = async (media: { url: string; id: string }) => {
    if (!listingFormData?.propertyTempId) {
      console.error("Missing propertyTempId for image upload");
      return;
    }

    try {
      const fileResponse = await fetch(media.url);
      const blob = await fileResponse.blob();

      const extension = blob.type.split("/")[1];
      const filename = media.id.includes(".")
        ? media.id
        : `${media.id}.${extension}`;
      const file = new File([blob], filename, { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);
      if (listingFormData.isUpdateListing) {
        const res = (await updateUploadedImages(
          formData,
          listingFormData.propertyTempId
        )) as {
          imageId: string;
        };
        setImages((prevImages) =>
          prevImages.map((item) => {
            if (item.id === media.id) {
              return { ...item, id: res.imageId };
            } else return item;
          })
        );

        return res;
      } else {
        const data = (await uploadImages(
          formData,
          listingFormData.propertyTempId
        )) as {
          imageId: string;
        };
        setImages((prevImages) =>
          prevImages.map((item) => {
            if (item.id === media.id) {
              return { ...item, id: data.imageId };
            } else return item;
          })
        );

        // Update store with the new photo while preserving existing photos
        setListingFormData((prev) => ({
          ...prev,
          photos: [
            ...(prev.photos || []),
            {
              id: data.imageId || media.id,
              imagePath: media.url,
            },
          ],
        }));
        return data;
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleImageUpload = async (
    data: PropertyImageProps[],
    isRemove = false
  ) => {
    if (isRemove) {
      setImages(data);
    } else {
      setImages((prevImages) => [...prevImages, ...data]);
      // data.forEach((image) => uploadMedia({ url: image.url, id: image.id }));
      for (const image of data) {
        await uploadMedia({ url: image.url, id: image.id });
      }
    }
  };

  useEffect(() => {
    if (listingFormData?.photos?.length > 0) {
      setImages((prev) => {
        // Create a new array of images from listingFormData.photos
        const newImages =
          listingFormData?.photos?.map((image) => ({
            id: image.id,
            url: listingFormData.isUpdateListing
              ? `${import.meta.env.VITE_CDN_URL}${image?.imagePath}`
              : image?.imagePath,
          })) || [];

        // Filter out any new images whose id already exists in prev
        const filteredNewImages = newImages.filter(
          (newImage) => !prev.some((prevImage) => prevImage.id === newImage.id)
        );

        // Return the updated state, combining previous images with the new unique images
        return [...prev, ...filteredNewImages];
      });
    }
  }, [listingFormData]);
  return (
    <>
      <PageMeta title="Manzil" description="Property Management Dashboard" />

      <>
        <div className="bg-white p-0 md:p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5 h-full">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 11
            </h3>
            <ExitButton isListingPage />
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
