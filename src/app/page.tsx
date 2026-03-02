import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">

        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/villa_1.png"
              alt="Luxury Villa Infinity Pool"
              fill
              priority
              className="object-cover"
            />
            {/* Elegant dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 text-center mt-12">
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg max-w-4xl mx-auto leading-tight">
              Curated Escapes for the Discerning Traveler
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light tracking-wide mb-12 drop-shadow-md">
              Discover unparalleled luxury in the world's most breathtaking destinations.
            </p>

            {/* Floating Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-full shadow-2xl p-2 flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-200">

              <div className="flex-1 w-full px-6 py-3 flex items-center hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">Location</span>
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="outline-none text-sm text-gray-600 bg-transparent placeholder-gray-400 w-full truncate"
                  />
                </div>
              </div>

              <div className="flex-1 w-full px-6 py-3 flex items-center hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">Dates</span>
                  <span className="text-sm text-gray-400">Add dates</span>
                </div>
              </div>

              <div className="flex-1 w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 rounded-full transition-colors cursor-pointer">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">Guests</span>
                  <span className="text-sm text-gray-400">Add guests</span>
                </div>

                <Link href="/listings" className="bg-primary hover:bg-[#d4a317] text-white p-4 rounded-full transition-colors shadow-lg shadow-primary/30 flex-shrink-0">
                  <Search size={20} strokeWidth={2.5} />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Featured Destinations (Placeholder for design depth) */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Discover Extraordinary</h2>
              <p className="text-secondary-foreground max-w-2xl mx-auto">
                Explore our hand-picked collection of world-class properties designed for ultimate privacy and comfort.
              </p>
            </div>
            {/* Just a CTA button for now to lead to listings */}
            <div className="flex justify-center">
              <Link href="/listings" className="border border-foreground text-foreground px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-foreground hover:text-white transition-colors">
                View All Properties
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
