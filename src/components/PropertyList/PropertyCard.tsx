import Button from "../ui/button/Button";

export interface PropertyCardProps {
  title: string;
  address: string;
  price: string;
  thumbnail: string;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  address,
  price,
  thumbnail,
  onClick,
}) => {
  return (
    <div
      className="flex items-center justify-between p-2 bg-gray-100 rounded-lg gap-3"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <img
          src={thumbnail}
          alt="Property"
          className="w-16 h-16 rounded-md object-cover"
        />
        <div>
          <h3 className=" text-md">{title}</h3>
          <p className="text-xs text-gray-400">{address}</p>
        </div>
      </div>

      {/* Center section */}
      <div className="flex-1 pl-3">
        <p className="text-xs text-gray-400">Your price per night</p>
        <p className=" text-md">{price}</p>
      </div>

      {/* Buttons Section */}
      <div className="flex gap-2">
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
