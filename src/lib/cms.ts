export async function getHomepageData() {
    return {
        hero: {
            title: "Where Excellence Begins.",
            subtitle: "Nurturing tomorrow's leaders through a blend of tradition and innovation.",
            sanskrit: "विद्या ददाति विनयम्",
            video: "https://www.youtube.com/watch?v=HX0qY8BabGs",
            grid: [
                "https://picsum.photos/seed/hero1/600/400",
                "https://picsum.photos/seed/hero2/600/400",
                "https://picsum.photos/seed/hero3/600/400",
                "https://picsum.photos/seed/hero4/600/400"
            ],
            cta1Href: "/admissions",
            cta2Href: "/gallery"
        },
        stats: [
            { label: "Students", value: "2500+" },
            { label: "Results", value: "100%" },
            { label: "Awards", value: "50+" },
            { label: "Sports & Activities", value: "30+" }
        ],
        why: [
            { title: "Modern Infrastructure", desc: "State of the art facilities", icon: "building" },
            { title: "Personalised Mentorship", desc: "Guidance for every student", icon: "user-2" }
        ],
        gallery: [
            "https://picsum.photos/seed/gallery1/600/600",
            "https://picsum.photos/seed/gallery2/600/600",
            "https://picsum.photos/seed/gallery3/600/600",
            "https://picsum.photos/seed/gallery4/600/600",
            "https://picsum.photos/seed/gallery5/600/600",
            "https://picsum.photos/seed/gallery6/600/600"
        ]
    };
}
