import { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Input from "../form/input/InputField";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

// Define interfaces for Type Safety
interface LatLng {
  lat: number;
  lng: number;
}

interface MapProps {
  googleMapsApiKey?: string;
}

const center = { lat: 20.2961, lng: 85.8245 }; // Bhubaneswar

const AddressPinSelector: React.FC<MapProps> = ({
  googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  });
  const [address, setAddress] = useState<string>("");
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(center);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    map.setCenter(mapCenter);
  }, []);

  const onCenterChanged = useCallback(() => {
    if (mapRef.current) {
      const newCenter: LatLng = {
        lat: mapRef.current.getCenter()?.lat() || mapCenter.lat,
        lng: mapRef.current.getCenter()?.lng() || mapCenter.lng,
      };
      setMapCenter(newCenter);
      getAddressFromCoordinates(mapCenter.lat, mapCenter.lng);
    }
  }, [mapCenter]);

  const getAddressFromCoordinates = (lat: number, lng: number) => {
    if (!window.google || !window.google.maps) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results?.length) {
        setAddress(results[0].formatted_address);
      } else {
        console.error("Geocoder failed due to: ", status);
      }
    });
  };

  console.log(address, "address", mapCenter, "mapCenter");
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className=" mx-auto space-y-4">
      {/* Address Input */}
      <Input
        type="text"
        value={address || "Patia, Bhubaneswar"}
        className="w-full bg-gray-100 p-3 rounded-md border border-gray-300"
      />

      {/* Google Map with fixed pin */}
      <div className="relative w-full h-64 rounded-md overflow-hidden">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={mapCenter}
          onLoad={onMapLoad}
          onCenterChanged={onCenterChanged}
        />

        {/* Pin Icon (Fixed in center) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-lg">📍</span>
          </div>
        </div>

        {/* Floating Button */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <button className="bg-black text-white px-4 py-2 rounded-full text-sm">
            Drag the map to reposition the pin
          </button>
        </div>
      </div>

      {/* Note */}
      <small className="text-gray-400">
        Your address is only shared with guests after they’ve made a
        reservation.
      </small>
    </div>
  );
};

export default AddressPinSelector;
