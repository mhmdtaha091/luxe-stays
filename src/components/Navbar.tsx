"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className={`font-serif text-2xl tracking-wide font-bold transition-colors ${isScrolled ? "text-foreground" : "text-white"
                        }`}
                >
                    LUXE STAYS
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/listings" className={`text-sm uppercase tracking-wider font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white/90"}`}>
                        Destinations
                    </Link>
                    <Link href="#" className={`text-sm uppercase tracking-wider font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white/90"}`}>
                        Experiences
                    </Link>
                    <Link href="#" className={`text-sm uppercase tracking-wider font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white/90"}`}>
                        List your Property
                    </Link>

                    <div className="h-6 w-px bg-current opacity-20 mx-4"></div>

                    <button className={`text-sm tracking-wider font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white/90"}`}>
                        Sign In
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 flex flex-col px-6 space-y-6">
                    <Link href="/listings" onClick={() => setMobileMenuOpen(false)} className="text-foreground uppercase tracking-widest text-sm font-medium">Destinations</Link>
                    <Link href="#" onClick={() => setMobileMenuOpen(false)} className="text-foreground uppercase tracking-widest text-sm font-medium">Experiences</Link>
                    <Link href="#" onClick={() => setMobileMenuOpen(false)} className="text-foreground uppercase tracking-widest text-sm font-medium">List your Property</Link>
                    <hr />
                    <button className="text-foreground uppercase tracking-widest text-sm font-medium text-left">Sign In</button>
                </div>
            )}
        </nav>
    );
}
