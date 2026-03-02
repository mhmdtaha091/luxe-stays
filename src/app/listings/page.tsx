"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { properties } from "@/data/properties";
import { Star, Users, Home } from "lucide-react";

// The Map component uses browser APIs (window), so it MUST be dynamically 
// imported by Next.js to prevent SSR crashes.
const DynamicMap = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-secondary animate-pulse" />
});

export default function ListingsPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [hoveredCoord, setHoveredCoord] = useState<[number, number] | null>(null);

    const filters = ["All", "Beachfront", "Mountains", "Urban"];

    const filteredProps = activeFilter === "All"
        ? properties
        : properties.filter(p => p.type === activeFilter);

    return (
        <>
            {/* We need a solid navbar here instead of transparent */}
            <div className="bg-foreground text-white">
                <Navbar />
            </div>

            <main className="flex flex-col md:flex-row h-screen pt-[88px] overflow-hidden">

                {/* Left Side: Property List */}
                <div className="w-full md:w-1/2 lg:w-[55%] h-full flex flex-col bg-background relative z-20 shadow-xl">
                    <div className="p-6 border-b border-border bg-white shadow-sm flex flex-col gap-4">
                        <h1 className="font-serif text-3xl text-foreground">Discover Stays</h1>

                        {/* Minimalist filter tags */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {filters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-colors whitespace-nowrap ${activeFilter === filter
                                            ? "bg-foreground text-white shadow-md"
                                            : "bg-background border border-border text-foreground hover:border-primary"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                        <p className="text-secondary-foreground text-sm font-medium">
                            Showing {filteredProps.length} properties
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
                        {filteredProps.map(prop => (
                            <Link
                                href={`/property/${prop.id}`}
                                key={prop.id}
                                onMouseEnter={() => setHoveredCoord(prop.coords)}
                                onMouseLeave={() => setHoveredCoord(null)}
                                className="group flex flex-col xl:flex-row gap-6 bg-white p-4 rounded-xl border border-border/50 hover:shadow-2xl hover:border-primary transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative w-full xl:w-72 h-64 xl:h-auto rounded-lg overflow-hidden shrink-0">
                                    <Image
                                        src={prop.imageUrl}
                                        alt={prop.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors">
                                        <svg className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-xs uppercase tracking-widest text-secondary-foreground font-semibold">{prop.location}</p>
                                            <div className="flex items-center gap-1 text-sm font-bold text-foreground">
                                                <Star size={14} className="fill-primary text-primary" />
                                                {prop.rating} <span className="text-gray-400 font-normal">({prop.reviews})</span>
                                            </div>
                                        </div>

                                        <h2 className="font-serif text-2xl text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">{prop.title}</h2>

                                        <div className="flex items-center gap-4 text-sm text-secondary-foreground mb-4">
                                            <div className="flex items-center gap-1"><Users size={16} /> {prop.guests} Guests</div>
                                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                            <div className="flex items-center gap-1"><Home size={16} /> {prop.bedrooms} Beds</div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {prop.amenities.slice(0, 3).map(amenity => (
                                                <span key={amenity} className="px-2 py-1 bg-background text-xs font-medium text-foreground rounded">
                                                    {amenity}
                                                </span>
                                            ))}
                                            {prop.amenities.length > 3 && (
                                                <span className="px-2 py-1 bg-background text-xs font-medium text-foreground rounded">
                                                    +{prop.amenities.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end mt-4 pt-4 border-t border-border">
                                        <p className="text-sm text-secondary-foreground underline cursor-pointer hover:text-foreground">View details</p>
                                        <p className="font-serif text-2xl font-bold text-foreground">
                                            ${prop.pricePerNight} <span className="text-sm font-sans font-normal text-secondary-foreground">/ night</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Side: Map */}
                <div className="hidden md:block md:w-1/2 lg:w-[45%] h-full relative z-10">
                    <DynamicMap highlightedCoord={hoveredCoord} />
                </div>

            </main>
        </>
    );
}
