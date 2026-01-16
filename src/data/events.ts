
const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

export const events = [
    {
        id: 101,
        title: "New Year's Day",
        date: `${currentYear}-01-01`,
        description: "Celebrating the start of 2026.",
        image: "https://images.unsplash.com/photo-1546271876-af60700d3419?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 102,
        title: "Makar Sankranti / Pongal",
        date: `${currentYear}-01-14`,
        description: "Harvest festival celebrations across India.",
        image: "https://images.unsplash.com/photo-1610457632616-43d57e2d96c3?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 103,
        title: "Vasant Panchami",
        date: `${currentYear}-01-23`,
        description: "Festival dedicated to Goddess Saraswati.",
        image: "https://images.unsplash.com/photo-1582046428780-e822066c1c87?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: 104,
        title: "Republic Day",
        date: `${currentYear}-01-26`,
        description: "77th Republic Day celebration with flag hoisting.",
        image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop"
    },
    {
        id: 1,
        title: "New Academic Session Begins",
        date: `${currentYear}-04-01`,
        description: `Welcome back students! The new academic session for ${currentYear}-${nextYear.toString().slice(-2)} commences.`,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Independence Day Celebration",
        date: `${currentYear}-08-15`,
        description: "Flag hoisting ceremony and cultural performances by students.",
        image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Teachers' Day",
        date: `${currentYear}-09-05`,
        description: "A day to honor and appreciate our dedicated teachers.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Gandhi Jayanti",
        date: `${currentYear}-10-02`,
        description: "Commemorating the birth anniversary of Mahatma Gandhi with cleanliness drive.",
        image: "https://images.unsplash.com/photo-1555431189-0fabfcaee737?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "Diwali Break Begins",
        date: `${currentYear}-10-28`,
        description: "School closed for Diwali festivities. joyous celebration to all!",
        image: "https://images.unsplash.com/photo-1511216113975-28b93e6a2eb6?q=80&w=2071&auto=format&fit=crop"
    },
    {
        id: 7,
        title: "Children's Day",
        date: `${currentYear}-11-14`,
        description: "Fun-filled activities and games organized for students.",
        image: "https://plus.unsplash.com/premium_photo-1661382011444-24d1a1290333?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 8,
        title: "Annual Sports Meet",
        date: `${currentYear}-12-20`,
        description: "Showcasing athletic talent and team spirit.",
        image: "https://res.cloudinary.com/dkits80xk/image/upload/v1765349475/sports-achievements-1_xmyfg2.webp"
    },
    {
        id: 9,
        title: "Christmas Day",
        date: `${currentYear}-12-25`,
        description: "Celebrating the joy of Christmas. Winter break begins.",
        image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 10,
        title: "Republic Day",
        date: `${nextYear}-01-26`,
        description: "Grand parade and patriotic programs.",
        image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop"
    },
    {
        id: 11,
        title: "Annual Function",
        date: `${nextYear}-02-15`,
        description: "The biggest cultural event of the year.",
        image: "https://res.cloudinary.com/dkits80xk/image/upload/v1765349451/annual-function-3_b9mu3t.webp"
    },
    {
        id: 12,
        title: "Final Examinations Begin",
        date: `${nextYear}-03-10`,
        description: "End of session examinations for all classes.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
    }
];
