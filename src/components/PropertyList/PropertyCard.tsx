import Button from "../ui/button/Button";
const fallBackImg = "images/product/placeholder-thumb.jpg";
export interface PropertyCardProps {
  name: string;
  address: string;
  pricePerNight: string;
  thumbnail?: string;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  name,
  address,
  pricePerNight,
  thumbnail,
  onClick,
}) => {
  return (
    <div
      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
      onClick={onClick}
    >
      <div className="flex items-center gap-8">
        <img
          src={thumbnail || fallBackImg}
          alt="Property"
          className="w-16 h-16 rounded-md object-cover"
        />
        <div>
          <h3 className="text-sm font-medium">{name}</h3>
          <p className="text-xs text-gray-500">{address}</p>
        </div>
        {/* Price section */}
        <div>
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
