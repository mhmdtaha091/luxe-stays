"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { properties, Property } from "@/data/properties";

// Fix Leaflet's default icon path issues in Next.js
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// A small component to recenter the map when points change or a specific point is hovered
function MapRecenter({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom(), { animate: true });
    }, [center, map]);
    return null;
}

export default function Map({ highlightedCoord }: { highlightedCoord?: [number, number] | null }) {
    const [mounted, setMounted] = useState(false);

    // Default center (USA-ish)
    const defaultCenter: [number, number] = [38.0, -97.0];
    const center = highlightedCoord || defaultCenter;
    const zoom = highlightedCoord ? 12 : 4;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full h-full bg-secondary flex items-center justify-center text-foreground font-medium animate-pulse">Loading Map...</div>;

    return (
        <div className="w-full h-full relative z-0 relative-map-container">
            {/* 
        We use styling to softly filter the map to match our "muted earth tones" aesthetic.
        CSS filter sepia and hue-rotate helps tone down the vibrant map colors.
      */}
            <style>{`
        .leaflet-container { width: 100%; height: 100%; z-index: 10; }
        .leaflet-tile-pane { filter: sepia(0.2) hue-rotate(-15deg) contrast(0.9) brightness(1.05); }
      `}</style>

            <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="w-full h-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {properties.map((prop) => (
                    <Marker
                        key={prop.id}
                        position={prop.coords}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="font-serif">
                                <h3 className="font-bold text-foreground text-sm">{prop.title}</h3>
                                <p className="text-primary font-semibold mt-1">${prop.pricePerNight} / night</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {highlightedCoord && <MapRecenter center={highlightedCoord} />}
            </MapContainer>
        </div>
    );
}
