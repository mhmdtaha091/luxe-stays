"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { properties } from "@/data/properties";

export default function BookingConfirmation() {
    // Using the first property as a mocked confirmed booking
    const property = properties[0];

    return (
        <>
            <div className="bg-foreground text-white">
                <Navbar />
            </div>

            <main className="min-h-screen bg-background pt-32 pb-24">
                <div className="container mx-auto px-4 flex justify-center">
                    <div className="w-full max-w-2xl bg-white p-10 md:p-16 rounded-2xl shadow-xl shadow-border/50 border border-border">

                        <div className="flex flex-col items-center text-center mb-12">
                            <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center mb-6 bg-primary/10">
                                <CheckCircle2 size={32} className="text-primary" />
                            </div>
                            <h1 className="font-serif text-4xl text-foreground mb-3">Your Escape is Confirmed</h1>
                            <p className="text-secondary-foreground text-lg">We've emailed your itinerary and receipt.</p>
                        </div>

                        <div className="bg-secondary/30 rounded-xl p-6 mb-8 border border-border/50">
                            <h2 className="text-sm uppercase tracking-widest text-secondary-foreground font-bold mb-4">Itinerary Summary</h2>

                            <div className="flex gap-6 items-center">
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 shadow-sm">
                                    <Image src={property.imageUrl} alt={property.title} fill className="object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-serif text-2xl font-bold text-foreground mb-1">{property.title}</h3>
                                    <p className="text-secondary-foreground">{property.location}</p>
                                    <p className="mt-2 text-sm font-medium text-foreground">Jul 12 – Jul 15, 2026 · {property.guests} Guests</p>
                                </div>
                            </div>
                        </div>

                        <div className="py-6 border-t border-b border-border mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-secondary-foreground">Confirmation Code</span>
                                <span className="font-mono font-bold text-foreground">LXS-8F92K-RT</span>
                            </div>
                            <div className="flex justify-between items-center text-lg">
                                <span className="text-secondary-foreground">Total Paid</span>
                                <span className="font-serif font-bold text-foreground">${property.pricePerNight * 3 + 250 + Math.round(property.pricePerNight * 3 * 0.1)}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 bg-foreground text-white py-4 font-bold tracking-wide rounded-lg hover:bg-[#3d3831] transition-colors">
                                View Detailed Itinerary
                            </button>
                            <Link href="/" className="flex-1 text-center py-4 font-bold tracking-wide rounded-lg border-2 border-primary text-foreground hover:bg-primary/5 transition-colors">
                                Return Home
                            </Link>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}
