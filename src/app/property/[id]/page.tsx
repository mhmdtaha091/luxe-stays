"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { properties } from "@/data/properties";
import { Star, CheckCircle, Navigation, MapPin, Users, Key, Wifi, Coffee } from "lucide-react";
import { format, addDays } from "date-fns";

export default function PropertyDetail() {
    const { id } = useParams();
    const property = properties.find((p) => p.id === id);

    const [checkIn, setCheckIn] = useState<Date>(new Date());
    const [checkOut, setCheckOut] = useState<Date>(addDays(new Date(), 3));
    const [guests, setGuests] = useState(2);

    if (!property) return <div className="p-20 text-center">Property not found.</div>;

    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
    const basePrice = property.pricePerNight * nights;
    const cleaningFee = 250;
    const serviceFee = Math.round(basePrice * 0.1);
    const total = basePrice + cleaningFee + serviceFee;

    return (
        <>
            <div className="bg-foreground text-white">
                <Navbar />
            </div>

            <main className="pt-24 pb-32">
                <div className="container mx-auto px-4 md:px-8 xl:px-20">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-serif text-4xl text-foreground mb-4">{property.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-secondary-foreground">
                            <span className="flex items-center gap-1 font-bold"><Star size={16} className="fill-primary text-primary" /> {property.rating} ({property.reviews} reviews)</span>
                            <span className="flex items-center gap-1"><MapPin size={16} /> {property.location}</span>
                        </div>
                    </div>

                    {/* Masonry Gallery */}
                    <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[60vh] min-h-[500px] mb-16 rounded-2xl overflow-hidden">
                        <div className="col-span-2 row-span-2 relative group cursor-pointer">
                            <Image src={property.imageUrl} alt="Main" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="col-span-1 row-span-1 relative group cursor-pointer">
                            <Image src={property.imageUrl} alt="Detail" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="col-span-1 row-span-1 relative group cursor-pointer">
                            <Image src={property.imageUrl} alt="Detail" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="col-span-2 row-span-1 relative group cursor-pointer">
                            <Image src={property.imageUrl} alt="Detail" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="bg-white/90 backdrop-blur px-4 py-2 rounded font-medium text-sm shadow-lg">View all photos</button>
                            </div>
                        </div>
                    </div>

                    {/* Layout Split */}
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* Left: Info & Amenities */}
                        <div className="w-full lg:w-2/3">
                            <div className="flex justify-between border-b border-border pb-8 mb-8">
                                <div>
                                    <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Hosted by Luxe Properties</h2>
                                    <p className="text-secondary-foreground">{property.guests} guests · {property.bedrooms} bedrooms · {property.bathrooms} baths</p>
                                </div>
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-serif text-xl font-bold shadow-md">
                                    LP
                                </div>
                            </div>

                            <div className="space-y-6 border-b border-border pb-8 mb-8">
                                <div className="flex items-start gap-4">
                                    <Key size={28} className="text-secondary-foreground shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-foreground">Self check-in</h3>
                                        <p className="text-secondary-foreground text-sm">Check yourself in with the bespoke smart lock.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Navigation size={28} className="text-secondary-foreground shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-foreground">Exceptional location</h3>
                                        <p className="text-secondary-foreground text-sm">100% of recent guests gave the location a 5-star rating.</p>
                                    </div>
                                </div>
                            </div>

                            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Exclusive Amenities</h2>
                            <div className="grid grid-cols-2 gap-y-4 mb-8">
                                {property.amenities.map(amenity => (
                                    <div key={amenity} className="flex items-center gap-3 text-secondary-foreground">
                                        <CheckCircle size={20} className="text-primary" />
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                                <div className="flex items-center gap-3 text-secondary-foreground"><Wifi size={20} className="text-primary" /> Fast WiFi</div>
                                <div className="flex items-center gap-3 text-secondary-foreground"><Coffee size={20} className="text-primary" /> Premium Espresso</div>
                            </div>

                            <button className="px-6 py-3 border border-foreground font-medium rounded hover:bg-foreground hover:text-white transition-colors">Show all 42 amenities</button>
                        </div>

                        {/* Right: Booking Card Sticky */}
                        <div className="w-full lg:w-1/3 relative">
                            <div className="sticky top-32 glass-panel p-8 rounded-2xl">
                                <div className="flex items-end gap-1 mb-6">
                                    <span className="font-serif text-3xl font-bold text-foreground">${property.pricePerNight}</span>
                                    <span className="text-secondary-foreground"> / night</span>
                                </div>

                                <div className="border border-border rounded-lg overflow-hidden mb-6">
                                    <div className="flex divide-x divide-border">
                                        <div className="w-1/2 p-3">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-secondary-foreground mb-1">Check-in</label>
                                            <div className="text-sm font-medium">{format(checkIn, 'MMM do, yyyy')}</div>
                                        </div>
                                        <div className="w-1/2 p-3">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-secondary-foreground mb-1">Check-out</label>
                                            <div className="text-sm font-medium">{format(checkOut, 'MMM do, yyyy')}</div>
                                        </div>
                                    </div>
                                    <div className="border-t border-border p-3">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-secondary-foreground mb-1">Guests</label>
                                        <div className="text-sm font-medium">{guests} guests</div>
                                    </div>
                                </div>

                                <Link
                                    href="/booking"
                                    className="block w-full text-center bg-foreground text-white py-4 font-bold tracking-wide rounded-lg hover:bg-[#3d3831] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mb-6"
                                >
                                    Reserve Now
                                </Link>

                                <p className="text-center text-sm text-secondary-foreground mb-6">You won't be charged yet</p>

                                <div className="space-y-4 text-sm text-foreground">
                                    <div className="flex justify-between">
                                        <span className="underline">${property.pricePerNight} x {nights} nights</span>
                                        <span>${basePrice}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="underline">Cleaning fee</span>
                                        <span>${cleaningFee}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="underline">Luxe service fee</span>
                                        <span>${serviceFee}</span>
                                    </div>

                                    <hr className="border-border my-4" />

                                    <div className="flex justify-between font-bold text-base">
                                        <span>Total before taxes</span>
                                        <span>${total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}
