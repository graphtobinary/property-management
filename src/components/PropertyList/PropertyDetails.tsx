import React from "react";
import Button from "../ui/button/Button";
import { motion } from "framer-motion";
import { ChevronLeftIcon } from "../../icons";

interface PropertyDetailsProps {
  property: {
    name: string;
    location: string;
    price: string;
    thumbnail: string;
    details: {
      type: string;
      furnishing: string;
      area: string;
      guests: number;
      bathrooms: number;
      kingBedrooms: number;
      queenBedrooms: number;
      kitchen: number;
      amenities: string[];
      tags: string[];
    };
  };
  onClose: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/[0.6] bg-opacity-50 flex justify-end z-50">
      <motion.div
        initial={{ x: "100%" }} // Start off-screen to the right
        animate={{ x: 0 }} // Slide in from right
        exit={{ x: "100%" }} // Slide out to right
        transition={{ type: "tween", duration: 0.3 }} // Smooth transition
        className="w-[40%] h-full bg-white shadow-lg p-6 overflow-visible  relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 -left-4 text-gray-500 hover:text-black bg-gray-400 shadow w-8 h-8 rounded-full z-10 flex justify-center items-center"
        >
          <ChevronLeftIcon />
        </button>

        <div className="">
          {/* Title & Price */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">The Royal Lotus Inn</h2>
              <p className="text-gray-500 text-xs font-light">
                C211, Z-One, Patia, Bhubaneswar
              </p>
            </div>
            <div className=" bg-gray-100 p-2">
              <p className="text-gray-500 text-xs font-thin">
                Your price per night
              </p>
              <p className="text-md">₹2,345</p>
            </div>
          </div>

          {/* Property Info */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-100 p-3 rounded-md text-center flex flex-col">
              <span className="text-xs text-gray-500 font-thin">
                Property Type
              </span>
              <span className="text-sm">2 Bhk</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-md text-center flex flex-col">
              <span className="text-xs text-gray-500 font-thin">
                Furnishing Type
              </span>
              <span className="text-sm">Fully Furnished</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-md text-center flex flex-col">
              <span className="text-xs text-gray-500 font-thin">Area</span>
              <span className="text-sm">324 sq mtr</span>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-gray-200 h-24 rounded-lg"></div>
            <div className="bg-gray-200 h-24 rounded-lg"></div>
            <div className="bg-gray-200 h-24 rounded-lg"></div>
            <div className="bg-gray-200 h-24 rounded-lg"></div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Features */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-100 p-3 rounded-md text-center flex flex-col">
              <span className="text-sm">4</span>
              <span className="text-xs text-gray-500 font-thin"> Guests</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-md text-center flex flex-col">
              <span className="text-sm">3</span>
              <span className="text-xs text-gray-500 font-thin">Bathrooms</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-md text-center flex flex-col">
              <span className="text-sm">2</span>
              <span className="text-xs text-gray-500 font-thin">
                King Size Bedrooms
              </span>
            </div>
            <div className="bg-gray-100 p-3 rounded-md text-center flex flex-col">
              <span className="text-sm">2</span>
              <span className="text-xs text-gray-500 font-thin">
                Queen Size Bedrooms
              </span>
            </div>
            <div className="bg-gray-100 p-3 rounded-md text-center flex flex-col">
              <span className="text-sm">2</span>
              <span className="text-xs text-gray-500 font-thin">Kitchen</span>
            </div>
          </div>
          <hr className="my-3 border-gray-300" />
          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-200 px-3 py-1 text-sm rounded-md">TV</span>
            <span className="bg-gray-200 px-3 py-1 text-sm rounded-md">
              Refrigerator
            </span>
            <span className="bg-gray-200 px-3 py-1 text-sm rounded-md">
              Wifi
            </span>
            <span className="text-xs text-gray-500 font-light py-1">
              +15 more
            </span>
          </div>

          <hr className="my-3 border-gray-300" />
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-gray-200 text-sm px-3 py-1 rounded-md">
              Family Friendly
            </span>
            <span className="bg-gray-200 text-sm px-3 py-1 rounded-md">
              Stylish
            </span>
            <span className="text-xs text-gray-500 font-light py-1">
              +2 more
            </span>
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-2 absolute bottom-5 right-5">
            <Button variant="outline">Edit</Button>
            <Button variant="outline">Delist</Button>
            <Button variant="primary">Publish Property</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyDetails;
