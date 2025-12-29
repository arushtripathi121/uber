import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useBook } from "../context/BookContext";
import { useEffect, useState } from "react";

const reverseGeocode = async (lat, lng) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
  );
  const data = await res.json();
  return data.display_name;
};

const fetchRoute = async (pickup, drop) => {
  const res = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}?overview=full&geometries=geojson`
  );
  const data = await res.json();
  return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
};

const MapClickHandler = () => {
  const { mapSelectMode, setMapSelectMode, setPickupCoords, setDropCoords } =
    useBook();

  useMapEvents({
    click: async (e) => {
      if (!mapSelectMode) return;

      const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
      const address = await reverseGeocode(coords.lat, coords.lng);

      if (mapSelectMode === "pickup") {
        setPickupCoords(coords);
        window.dispatchEvent(
          new CustomEvent("pickup-selected", { detail: address })
        );
      }

      if (mapSelectMode === "drop") {
        setDropCoords(coords);
        window.dispatchEvent(
          new CustomEvent("drop-selected", { detail: address })
        );
      }

      setMapSelectMode(null);
    },
  });

  return null;
};

const AutoCenter = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], 13);
    }
  }, [coords]);

  return null;
};

const FlyToUser = ({ coords, trigger }) => {
  const map = useMap();

  useEffect(() => {
    if (coords && trigger) {
      map.flyTo([coords.lat, coords.lng], 15, { duration: 1 });
    }
  }, [coords, trigger]);

  return null;
};

const Map = () => {
  const { userCoords, pickupCoords, dropCoords, setUserCoords } = useBook();
  const [route, setRoute] = useState(null);
  const [fly, setFly] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {}
    );
  }, []);

  useEffect(() => {
    if (pickupCoords && dropCoords) {
      fetchRoute(pickupCoords, dropCoords).then(setRoute);
    }
  }, [pickupCoords, dropCoords]);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={
          userCoords ? [userCoords.lat, userCoords.lng] : [28.6139, 77.209]
        }
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapClickHandler />

        {userCoords && <AutoCenter coords={userCoords} />}
        {userCoords && <FlyToUser coords={userCoords} trigger={fly} />}

        {userCoords && (
          <Marker position={[userCoords.lat, userCoords.lng]} />
        )}

        {pickupCoords && (
          <Marker position={[pickupCoords.lat, pickupCoords.lng]} />
        )}

        {dropCoords && (
          <Marker position={[dropCoords.lat, dropCoords.lng]} />
        )}

        {route && (
          <Polyline
            positions={route}
            pathOptions={{ color: "#000", weight: 7 }}
          />
        )}
      </MapContainer>

      <button
        onClick={() => userCoords && setFly((v) => v + 1)}
        className={`absolute z-[1000] bottom-6 right-6 px-4 py-2 rounded-full shadow-lg transition ${
          userCoords
            ? "bg-black text-white"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Go To My Location
      </button>
    </div>
  );
};

export default Map;
