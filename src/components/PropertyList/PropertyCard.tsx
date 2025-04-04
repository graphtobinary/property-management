import { PropertyCardProps } from "../../interfaces/listing";
import Button from "../ui/button/Button";
const fallBackImg = "images/product/placeholder-thumb.jpg";

const PropertyCard: React.FC<PropertyCardProps> = ({
  name,
  propertyAddress,
  pricePerNight,
  imagePath,
  onClick,
}) => {
  return (
    <div
      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg flex-col sm:flex-row gap-5"
      onClick={onClick}
    >
      <div className="flex items-center gap-5 md:gap-8">
        <img
          src={imagePath || fallBackImg}
          alt="Property"
          className="w-12 h-12 rounded-md object-cover"
        />
        <div className="w-full md:w-56">
          <h3 className="text-md font-medium">{name}</h3>
          <p className="text-xs text-gray-500">{`${propertyAddress?.addressLine1}, ${propertyAddress?.addressLine2}, ${propertyAddress?.city} ${propertyAddress?.state} ${propertyAddress?.zipCode}`}</p>
        </div>
        {/* Price section */}
        <div className="border-l border-l-gray-200 pl-4">
          <p className="text-xs text-gray-400">Your price per night</p>
          <p className="text-sm text-gray-900">{pricePerNight}</p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex items-center gap-3">
        <Button size="sm" variant="outline">
          Edit
        </Button>
        <Button size="sm" variant="outline">
          Delist
        </Button>
        <Button size="sm" variant="primary">
          Publish Property
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
