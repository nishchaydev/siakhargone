export const SCHOOL_CLASS_OPTIONS = [
    "Nursery",
    "LKG",
    "UKG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
] as const;

const ROMAN_TO_CLASS: Record<string, number> = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5,
    VI: 6,
    VII: 7,
    VIII: 8,
    IX: 9,
    X: 10,
    XI: 11,
    XII: 12,
};

export function normalizeClassName(value: string): string {
    const raw = value.trim();
    if (!raw) return "";

    const upper = raw.toUpperCase().replace(/\s+/g, " ").trim();

    if (upper === "NURSERY") return "Nursery";
    if (upper === "LKG" || upper === "KG 1" || upper === "KG1") return "LKG";
    if (upper === "UKG" || upper === "KG 2" || upper === "KG2") return "UKG";

    const classMatch = upper.match(/^CLASS\s*(\d{1,2})$/);
    if (classMatch) {
        const classNum = Number(classMatch[1]);
        if (classNum >= 1 && classNum <= 12) {
            return `Class ${classNum}`;
        }
    }

    const numberOnlyMatch = upper.match(/^(\d{1,2})$/);
    if (numberOnlyMatch) {
        const classNum = Number(numberOnlyMatch[1]);
        if (classNum >= 1 && classNum <= 12) {
            return `Class ${classNum}`;
        }
    }

    const roman = upper.replace(/^CLASS\s+/, "");
    if (ROMAN_TO_CLASS[roman]) {
        return `Class ${ROMAN_TO_CLASS[roman]}`;
    }

    return raw;
}
