export interface SectionData {
    section: string;
    rte: number;
    girls: number;
    boys: number;
    total: number;
    hold: number;
}

export interface ClassData {
    className: string;
    sections: SectionData[];
    classTotal: {
        rte: number;
        girls: number;
        boys: number;
        total: number;
        hold: number;
    };
}

export const SESSION = "2025-2026";

export const studentStrengthData: ClassData[] = [
    {
        className: "Nursery",
        sections: [
            { section: "Lotus", rte: 8, girls: 10, boys: 21, total: 31, hold: 1 },
            { section: "Rose", rte: 7, girls: 10, boys: 22, total: 32, hold: 0 },
        ],
        classTotal: { rte: 15, girls: 20, boys: 43, total: 63, hold: 1 },
    },
    {
        className: "L.K.G",
        sections: [
            { section: "Lotus", rte: 11, girls: 22, boys: 20, total: 42, hold: 1 },
            { section: "Rose", rte: 0, girls: 15, boys: 24, total: 39, hold: 0 },
        ],
        classTotal: { rte: 11, girls: 37, boys: 44, total: 81, hold: 1 },
    },
    {
        className: "UKG",
        sections: [
            { section: "Lotus", rte: 9, girls: 13, boys: 22, total: 35, hold: 0 },
            { section: "Rose", rte: 2, girls: 11, boys: 21, total: 32, hold: 0 },
        ],
        classTotal: { rte: 11, girls: 24, boys: 43, total: 67, hold: 0 },
    },
    {
        className: "1st",
        sections: [
            { section: "Diamond", rte: 4, girls: 12, boys: 23, total: 35, hold: 1 },
            { section: "Pearl", rte: 3, girls: 17, boys: 18, total: 35, hold: 0 },
            { section: "Sapphire", rte: 4, girls: 7, boys: 19, total: 26, hold: 0 },
        ],
        classTotal: { rte: 11, girls: 36, boys: 60, total: 96, hold: 1 },
    },
    {
        className: "2nd",
        sections: [
            { section: "Diamond", rte: 4, girls: 16, boys: 26, total: 42, hold: 0 },
            { section: "Pearl", rte: 5, girls: 18, boys: 16, total: 34, hold: 0 },
            { section: "Sapphire", rte: 1, girls: 10, boys: 13, total: 23, hold: 0 },
        ],
        classTotal: { rte: 10, girls: 44, boys: 55, total: 99, hold: 0 },
    },
    {
        className: "3rd",
        sections: [
            { section: "Diamond", rte: 2, girls: 16, boys: 22, total: 38, hold: 0 },
            { section: "Pearl", rte: 0, girls: 13, boys: 23, total: 36, hold: 1 },
        ],
        classTotal: { rte: 2, girls: 29, boys: 45, total: 74, hold: 1 },
    },
    {
        className: "4th",
        sections: [
            { section: "Abhimanyu", rte: 4, girls: 15, boys: 15, total: 30, hold: 0 },
            { section: "Arjun", rte: 3, girls: 20, boys: 20, total: 40, hold: 1 },
            { section: "Eklavya", rte: 3, girls: 18, boys: 23, total: 41, hold: 0 },
        ],
        classTotal: { rte: 10, girls: 53, boys: 58, total: 111, hold: 1 },
    },
    {
        className: "5th",
        sections: [
            { section: "Abhimanyu", rte: 2, girls: 8, boys: 13, total: 21, hold: 0 },
            { section: "Arjun", rte: 3, girls: 14, boys: 26, total: 40, hold: 0 },
            { section: "Eklavya", rte: 4, girls: 11, boys: 27, total: 38, hold: 0 },
        ],
        classTotal: { rte: 9, girls: 33, boys: 66, total: 99, hold: 1 },
    },
    {
        className: "6th",
        sections: [
            { section: "Arjun", rte: 7, girls: 21, boys: 24, total: 45, hold: 0 },
            { section: "Eklavya", rte: 5, girls: 18, boys: 26, total: 44, hold: 0 },
        ],
        classTotal: { rte: 12, girls: 39, boys: 50, total: 89, hold: 0 },
    },
    {
        className: "7th",
        sections: [
            { section: "Arjun", rte: 5, girls: 20, boys: 27, total: 47, hold: 0 },
            { section: "Eklavya", rte: 4, girls: 18, boys: 26, total: 44, hold: 0 },
        ],
        classTotal: { rte: 9, girls: 38, boys: 53, total: 91, hold: 0 },
    },
    {
        className: "8th",
        sections: [
            { section: "Arjun", rte: 0, girls: 14, boys: 21, total: 35, hold: 0 },
            { section: "Eklavya", rte: 0, girls: 12, boys: 24, total: 36, hold: 0 },
        ],
        classTotal: { rte: 0, girls: 26, boys: 45, total: 71, hold: 0 },
    },
    {
        className: "9th",
        sections: [
            { section: "Arjun", rte: 0, girls: 17, boys: 12, total: 29, hold: 0 },
            { section: "Eklavya", rte: 0, girls: 15, boys: 14, total: 29, hold: 0 },
        ],
        classTotal: { rte: 0, girls: 32, boys: 26, total: 58, hold: 0 },
    },
    {
        className: "10th",
        sections: [
            { section: "Arjun", rte: 0, girls: 24, boys: 17, total: 41, hold: 0 },
            { section: "Eklavya", rte: 0, girls: 7, boys: 16, total: 23, hold: 0 },
        ],
        classTotal: { rte: 0, girls: 31, boys: 33, total: 64, hold: 0 },
    },
    {
        className: "11th",
        sections: [
            { section: "Commerce", rte: 0, girls: 15, boys: 6, total: 21, hold: 0 },
        ],
        classTotal: { rte: 0, girls: 15, boys: 6, total: 21, hold: 0 },
    },
];

export const grandTotal = {
    rte: 100,
    girls: 457,
    boys: 627,
    total: 1084,
    hold: 6,
};
