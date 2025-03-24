import { Link } from "react-router";
import { Plus } from "../../icons";
import Button from "../ui/button/Button";
import PropertyCard from "./PropertyCard";
import PropertyDetails from "./PropertyDetails";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const properties = [
  {
    title: "The Royal Lotus Inn",
    address: "C211, Z-One, Patia, Bhubaneswar",
    price: "₹2,345",
    thumbnail: "https://demo.tailadmin.com/src/images/grid-image/image-01.png",
    details: {
      type: "2 Bhk",
      furnishing: "Fully Furnished",
      area: "324 sq mtr",
      guests: 4,
      bathrooms: 3,
      kingBedrooms: 2,
      queenBedrooms: 2,
      kitchen: 1,
      amenities: ["TV", "Refrigerator", "Wifi", "15 more"],
      tags: ["Family Friendly", "Stylish", "+2 more"],
    },
  },
  {
    title: "The Serene Palace",
    address: "C211, Z-One, Patia, Bhubaneswar",
    price: "₹2,345",
    thumbnail: "https://demo.tailadmin.com/src/images/grid-image/image-01.png",
    details: {
      type: "2 Bhk",
      furnishing: "Fully Furnished",
      area: "324 sq mtr",
      guests: 4,
      bathrooms: 3,
      kingBedrooms: 2,
      queenBedrooms: 2,
      kitchen: 1,
      amenities: ["TV", "Refrigerator", "Wifi", "15 more"],
      tags: ["Family Friendly", "Stylish", "+2 more"],
    },
  },
  {
    title: "The Heritage Haven",
    address: "C211, Z-One, Patia, Bhubaneswar",
    price: "₹2,345",
    thumbnail: "https://demo.tailadmin.com/src/images/grid-image/image-01.png",
    details: {
      type: "2 Bhk",
      furnishing: "Fully Furnished",
      area: "324 sq mtr",
      guests: 4,
      bathrooms: 3,
      kingBedrooms: 2,
      queenBedrooms: 2,
      kitchen: 1,
      amenities: ["TV", "Refrigerator", "Wifi", "15 more"],
      tags: ["Family Friendly", "Stylish", "+2 more"],
    },
  },
  {
    title: "The Tranquil Retreat",
    address: "C211, Z-One, Patia, Bhubaneswar",
    price: "₹2,345",
    thumbnail: "https://demo.tailadmin.com/src/images/grid-image/image-01.png",
    details: {
      type: "2 Bhk",
      furnishing: "Fully Furnished",
      area: "324 sq mtr",
      guests: 4,
      bathrooms: 3,
      kingBedrooms: 2,
      queenBedrooms: 2,
      kitchen: 1,
      amenities: ["TV", "Refrigerator", "Wifi", "15 more"],
      tags: ["Family Friendly", "Stylish", "+2 more"],
    },
  },
  {
    title: "The Majestic Abode",
    address: "C211, Z-One, Patia, Bhubaneswar",
    price: "₹2,345",
    thumbnail: "https://demo.tailadmin.com/src/images/grid-image/image-01.png",
    details: {
      type: "2 Bhk",
      furnishing: "Fully Furnished",
      area: "324 sq mtr",
      guests: 4,
      bathrooms: 3,
      kingBedrooms: 2,
      queenBedrooms: 2,
      kitchen: 1,
      amenities: ["TV", "Refrigerator", "Wifi", "15 more"],
      tags: ["Family Friendly", "Stylish", "+2 more"],
    },
  },
  {
    title: "The Creative Oasis",
    address: "C211, Z-One, Patia, Bhubaneswar",
    price: "₹2,345",
    thumbnail: "https://demo.tailadmin.com/src/images/grid-image/image-01.png",
    details: {
      type: "2 Bhk",
      furnishing: "Fully Furnished",
      area: "324 sq mtr",
      guests: 4,
      bathrooms: 3,
      kingBedrooms: 2,
      queenBedrooms: 2,
      kitchen: 1,
      amenities: ["TV", "Refrigerator", "Wifi", "15 more"],
      tags: ["Family Friendly", "Stylish", "+2 more"],
    },
  },
  {
    title: "The Genius Suite",
    address: "C211, Z-One, Patia, Bhubaneswar",
    price: "₹2,345",
    thumbnail: "https://demo.tailadmin.com/src/images/grid-image/image-01.png",
    details: {
      type: "2 Bhk",
      furnishing: "Fully Furnished",
      area: "324 sq mtr",
      guests: 4,
      bathrooms: 3,
      kingBedrooms: 2,
      queenBedrooms: 2,
      kitchen: 1,
      amenities: ["TV", "Refrigerator", "Wifi", "15 more"],
      tags: ["Family Friendly", "Stylish", "+2 more"],
    },
  },
  {
    title: "The Visionary Lounge",
    address: "C211, Z-One, Patia, Bhubaneswar",
    price: "₹2,345",
    thumbnail: "https://demo.tailadmin.com/src/images/grid-image/image-01.png",
    details: {
      type: "2 Bhk",
      furnishing: "Fully Furnished",
      area: "324 sq mtr",
      guests: 4,
      bathrooms: 3,
      kingBedrooms: 2,
      queenBedrooms: 2,
      kitchen: 1,
      amenities: ["TV", "Refrigerator", "Wifi", "15 more"],
      tags: ["Family Friendly", "Stylish", "+2 more"],
    },
  },
  {
    title: "The Spice Haven",
    address: "C211, Z-One, Patia, Bhubaneswar",
    price: "₹2,345",
    thumbnail: "https://demo.tailadmin.com/src/images/grid-image/image-01.png",
    details: {
      type: "2 Bhk",
      furnishing: "Fully Furnished",
      area: "324 sq mtr",
      guests: 4,
      bathrooms: 3,
      kingBedrooms: 2,
      queenBedrooms: 2,
      kitchen: 1,
      amenities: ["TV", "Refrigerator", "Wifi", "15 more"],
      tags: ["Family Friendly", "Stylish", "+2 more"],
    },
  },
  {
    title: "The Curry Palace",
    address: "C211, Z-One, Patia, Bhubaneswar",
    price: "₹2,345",
    thumbnail: "https://demo.tailadmin.com/src/images/grid-image/image-01.png",
    details: {
      type: "2 Bhk",
      furnishing: "Fully Furnished",
      area: "324 sq mtr",
      guests: 4,
      bathrooms: 3,
      kingBedrooms: 2,
      queenBedrooms: 2,
      kitchen: 1,
      amenities: ["TV", "Refrigerator", "Wifi", "15 more"],
      tags: ["Family Friendly", "Stylish", "+2 more"],
    },
  },
  {
    title: "The Saffron Retreat",
    address: "C211, Z-One, Patia, Bhubaneswar",
    price: "₹2,345",
    thumbnail: "https://demo.tailadmin.com/src/images/grid-image/image-01.png",
    details: {
      type: "2 Bhk",
      furnishing: "Fully Furnished",
      area: "324 sq mtr",
      guests: 4,
      bathrooms: 3,
      kingBedrooms: 2,
      queenBedrooms: 2,
      kitchen: 1,
      amenities: ["TV", "Refrigerator", "Wifi", "15 more"],
      tags: ["Family Friendly", "Stylish", "+2 more"],
    },
  },
];

const PropertyList: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);

  const handleClose = () => {
    setTimeout(() => setSelectedProperty(null), 100); // Wait for animation to finish
  };

  return (
    <>
      <div className="min-h-screen flex flex-col gap-4">
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            {...property}
            onClick={() => setSelectedProperty(property)}
          />
        ))}
        <AnimatePresence>
          {selectedProperty && (
            <PropertyDetails
              property={selectedProperty}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>

        <div className="flex justify-center mt-6">
          <Link to="/create-listing-step-one">
            <Button variant="primary">
              <span className="text-lg">
                <Plus stroke="#fff" />
              </span>{" "}
              Add Another Property
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PropertyList;
