import { useNavigate } from "react-router";

const properties = [
  {
    id: 1,
    name: "The Royal Lotus Inn",
    location: "Bhubaneswar",
    image: "/hotel.png",
    prices: { "2025-03-08": 2345, "2025-03-09": 2345, "2025-03-10": 2345 },
  },
  // Add more properties...
];

const CalendarPropertyList = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 bg-white p-2">Property</th>
            {Object.keys(properties[0].prices).map((date) => (
              <th key={date} className="px-4 py-2">
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {properties.map(
            (property: {
              id: number;
              name: string;
              location: string;
              image: string;
              prices: {
                [key: string]: number;
              };
            }) => (
              <tr
                onClick={() => navigate(`/calendar/${property.id}`)}
                key={property.id}
              >
                <td className="sticky left-0 bg-white p-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-500"></div>
                    <div className="cursor-pointer">
                      <p>{property.name}</p>
                      <p className="text-xs text-gray-500">
                        {property.location}
                      </p>
                    </div>
                  </div>
                </td>
                {Object.keys(property.prices).map((date) => (
                  <td key={date} className="text-center px-4 py-2">
                    ₹{property.prices[date]}
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarPropertyList;
