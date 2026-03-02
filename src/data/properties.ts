export type Property = {
    id: string;
    title: string;
    location: string;
    country: string;
    pricePerNight: number;
    rating: number;
    reviews: number;
    guests: number;
    bedrooms: number;
    bathrooms: number;
    imageUrl: string;
    coords: [number, number]; // lat, lng
    amenities: string[];
    type: string;
};

export const properties: Property[] = [
    {
        id: "prop_1",
        title: "The Glass House",
        location: "Malibu, California",
        country: "USA",
        pricePerNight: 2500,
        rating: 4.96,
        reviews: 124,
        guests: 8,
        bedrooms: 4,
        bathrooms: 4.5,
        imageUrl: "/images/villa_1.png",
        coords: [34.0259, -118.7798],
        amenities: ["Infinity Pool", "Private Beach Access", "Chef's Kitchen", "Smart Home"],
        type: "Beachfront"
    },
    {
        id: "prop_2",
        title: "Alpine Aspen Retreat",
        location: "Aspen, Colorado",
        country: "USA",
        pricePerNight: 1800,
        rating: 4.88,
        reviews: 89,
        guests: 10,
        bedrooms: 5,
        bathrooms: 6,
        imageUrl: "/images/villa_2.png",
        coords: [39.1911, -106.8175],
        amenities: ["Ski-in/Ski-out", "Outdoor Hot Tub", "Firepit", "Home Theater"],
        type: "Mountains"
    },
    {
        id: "prop_3",
        title: "Skyline Penthouse",
        location: "Manhattan, New York",
        country: "USA",
        pricePerNight: 3200,
        rating: 4.99,
        reviews: 210,
        guests: 4,
        bedrooms: 2,
        bathrooms: 2.5,
        imageUrl: "/images/villa_3.png",
        coords: [40.7580, -73.9855],
        amenities: ["Panoramic Views", "Helipad Access", "Private Elevator", "Concierge"],
        type: "Urban"
    }
];
