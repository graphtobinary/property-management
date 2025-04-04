import { FC, useState } from "react";
import {
  ServicesListDataProps,
  ServicesListItemProps,
} from "../../interfaces/listing";

const ServicesList: FC<ServicesListDataProps> = ({
  listData,
  isTags = false,
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleCount = 4;

  const visibleItems = showAll ? listData : listData.slice(0, visibleCount);
  const remainingCount = listData.length - visibleCount;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {visibleItems.map((item: ServicesListItemProps) => (
        <span
          key={item.id}
          className="bg-gray-200 text-sm px-3 py-1 rounded-md"
        >
          {isTags ? item?.tag?.name : item?.amenity?.name}
        </span>
      ))}
      {remainingCount > 0 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-xs text-gray-500 font-light py-1 cursor-pointer"
        >
          +{remainingCount} more
        </button>
      )}
      {showAll && (
        <button
          onClick={() => setShowAll(false)}
          className="text-xs text-gray-500 font-light py-1 cursor-pointer"
        >
          Show Less
        </button>
      )}
    </div>
  );
};

export default ServicesList;
