export type TuitionFee = {
    id: number;
    class: string;
    installments: {
        apr_june: number;
        july_sept: number;
        oct_dec: number;
        jan_mar: number;
    };
    total: number;
};

export type BusFee = {
    id: number;
    village: string;
    installments: {
        apr_june: number;
        july_sept: number;
        oct_dec: number;
        jan_mar: number;
    };
    total: number;
};

export const oneTimeFees = {
    registration: 1000,
    admission: 3000,
    total: 4000,
};

export const tuitionFees: TuitionFee[] = [
    { id: 1, class: "Nursery", installments: { apr_june: 4500, july_sept: 4500, oct_dec: 4500, jan_mar: 4500 }, total: 18000 },
    { id: 2, class: "LKG", installments: { apr_june: 4925, july_sept: 4925, oct_dec: 4925, jan_mar: 4925 }, total: 19700 },
    { id: 3, class: "UKG", installments: { apr_june: 4925, july_sept: 4925, oct_dec: 4925, jan_mar: 4925 }, total: 19700 },
    { id: 4, class: "1st", installments: { apr_june: 5125, july_sept: 5125, oct_dec: 5125, jan_mar: 5125 }, total: 20500 },
    { id: 5, class: "2nd", installments: { apr_june: 5225, july_sept: 5225, oct_dec: 5225, jan_mar: 5225 }, total: 20900 },
    { id: 6, class: "3rd", installments: { apr_june: 5225, july_sept: 5225, oct_dec: 5225, jan_mar: 5225 }, total: 20900 },
    { id: 7, class: "4th", installments: { apr_june: 5475, july_sept: 5475, oct_dec: 5475, jan_mar: 5475 }, total: 21900 },
    { id: 8, class: "5th", installments: { apr_june: 5475, july_sept: 5475, oct_dec: 5475, jan_mar: 5475 }, total: 21900 },
    { id: 9, class: "6th", installments: { apr_june: 5625, july_sept: 5625, oct_dec: 5625, jan_mar: 5625 }, total: 22500 },
    { id: 10, class: "7th", installments: { apr_june: 5625, july_sept: 5625, oct_dec: 5625, jan_mar: 5625 }, total: 22500 },
    { id: 11, class: "8th", installments: { apr_june: 5725, july_sept: 5725, oct_dec: 5725, jan_mar: 5725 }, total: 22900 },
    { id: 12, class: "9th", installments: { apr_june: 6050, july_sept: 6050, oct_dec: 6050, jan_mar: 6050 }, total: 24200 },
    { id: 13, class: "10th", installments: { apr_june: 6325, july_sept: 6325, oct_dec: 6325, jan_mar: 6325 }, total: 25300 },
    { id: 14, class: "11th", installments: { apr_june: 6875, july_sept: 6875, oct_dec: 6875, jan_mar: 6875 }, total: 27500 },
    { id: 15, class: "12th", installments: { apr_june: 7500, july_sept: 7500, oct_dec: 7500, jan_mar: 7500 }, total: 30000 },
];

export const busFees: BusFee[] = [
    { id: 1, village: "Badgaon", installments: { apr_june: 1375, july_sept: 1375, oct_dec: 1375, jan_mar: 1375 }, total: 5500 },
    { id: 2, village: "Balgaon", installments: { apr_june: 1750, july_sept: 1750, oct_dec: 1750, jan_mar: 1750 }, total: 7000 },
    { id: 3, village: "Bamnala", installments: { apr_june: 2000, july_sept: 2000, oct_dec: 2000, jan_mar: 2000 }, total: 8000 },
    { id: 4, village: "Bediyaon", installments: { apr_june: 1750, july_sept: 1750, oct_dec: 1750, jan_mar: 1750 }, total: 7000 },
    { id: 5, village: "Beed", installments: { apr_june: 1750, july_sept: 1750, oct_dec: 1750, jan_mar: 1750 }, total: 7000 },
    { id: 6, village: "BehrampurTema", installments: { apr_june: 1875, july_sept: 1875, oct_dec: 1875, jan_mar: 1875 }, total: 7500 },
    { id: 7, village: "Bijalgaon", installments: { apr_june: 1750, july_sept: 1750, oct_dec: 1750, jan_mar: 1750 }, total: 7000 },
    { id: 8, village: "Bilali", installments: { apr_june: 1750, july_sept: 1750, oct_dec: 1750, jan_mar: 1750 }, total: 7000 },
    { id: 9, village: "Dasanawal", installments: { apr_june: 2125, july_sept: 2125, oct_dec: 2125, jan_mar: 2125 }, total: 8500 },
    { id: 10, village: "Daudkhedi", installments: { apr_june: 2125, july_sept: 2125, oct_dec: 2125, jan_mar: 2125 }, total: 8500 },
    { id: 11, village: "Dewalgaon", installments: { apr_june: 1625, july_sept: 1625, oct_dec: 1625, jan_mar: 1625 }, total: 6500 },
    { id: 12, village: "Gadi", installments: { apr_june: 2125, july_sept: 2125, oct_dec: 2125, jan_mar: 2125 }, total: 8500 },
    { id: 13, village: "Ghughriyakhedi", installments: { apr_june: 1625, july_sept: 1625, oct_dec: 1625, jan_mar: 1625 }, total: 6500 },
    { id: 14, village: "Gopalpura", installments: { apr_june: 1500, july_sept: 1500, oct_dec: 1500, jan_mar: 1500 }, total: 6000 },
    { id: 15, village: "Gowadi", installments: { apr_june: 1375, july_sept: 1375, oct_dec: 1375, jan_mar: 1375 }, total: 5500 },
    { id: 16, village: "Gogawan", installments: { apr_june: 2000, july_sept: 2000, oct_dec: 2000, jan_mar: 2000 }, total: 8000 },
    { id: 17, village: "Jamali", installments: { apr_june: 1875, july_sept: 1875, oct_dec: 1875, jan_mar: 1875 }, total: 7500 },
    { id: 18, village: "Jamanya", installments: { apr_june: 1625, july_sept: 1625, oct_dec: 1625, jan_mar: 1625 }, total: 6500 },
    { id: 19, village: "Kharda", installments: { apr_june: 1750, july_sept: 1750, oct_dec: 1750, jan_mar: 1750 }, total: 7000 },
    { id: 20, village: "Khargone", installments: { apr_june: 2000, july_sept: 2000, oct_dec: 2000, jan_mar: 2000 }, total: 8000 },
    { id: 21, village: "Kheda", installments: { apr_june: 1625, july_sept: 1625, oct_dec: 1625, jan_mar: 1625 }, total: 6500 },
    { id: 22, village: "Khedi khurd", installments: { apr_june: 1875, july_sept: 1875, oct_dec: 1875, jan_mar: 1875 }, total: 7500 },
    { id: 23, village: "Khedikhanpura", installments: { apr_june: 1500, july_sept: 1500, oct_dec: 1500, jan_mar: 1500 }, total: 6000 },
    { id: 24, village: "Kukdol", installments: { apr_june: 2000, july_sept: 2000, oct_dec: 2000, jan_mar: 2000 }, total: 8000 },
    { id: 25, village: "Lakhi", installments: { apr_june: 1875, july_sept: 1875, oct_dec: 1875, jan_mar: 1875 }, total: 7500 },
    { id: 26, village: "Lalni", installments: { apr_june: 1750, july_sept: 1750, oct_dec: 1750, jan_mar: 1750 }, total: 7000 },
    { id: 27, village: "Magriya", installments: { apr_june: 1375, july_sept: 1375, oct_dec: 1375, jan_mar: 1375 }, total: 5500 },
    { id: 28, village: "Magrul", installments: { apr_june: 1875, july_sept: 1875, oct_dec: 1875, jan_mar: 1875 }, total: 7500 },
    { id: 29, village: "Meharja", installments: { apr_june: 1375, july_sept: 1375, oct_dec: 1375, jan_mar: 1375 }, total: 5500 },
    { id: 30, village: "Mogargaon", installments: { apr_june: 2250, july_sept: 2250, oct_dec: 2250, jan_mar: 2250 }, total: 9000 },
    { id: 31, village: "Mohammadpur", installments: { apr_june: 1750, july_sept: 1750, oct_dec: 1750, jan_mar: 1750 }, total: 7000 },
    { id: 32, village: "Nagziri", installments: { apr_june: 1625, july_sept: 1625, oct_dec: 1625, jan_mar: 1625 }, total: 6500 },
    { id: 33, village: "Rajpura", installments: { apr_june: 1500, july_sept: 1500, oct_dec: 1500, jan_mar: 1500 }, total: 6000 },
    { id: 34, village: "Retwa", installments: { apr_june: 2125, july_sept: 2125, oct_dec: 2125, jan_mar: 2125 }, total: 8500 },
    { id: 35, village: "Sagur", installments: { apr_june: 1875, july_sept: 1875, oct_dec: 1875, jan_mar: 1875 }, total: 7500 },
    { id: 36, village: "Selda", installments: { apr_june: 2125, july_sept: 2125, oct_dec: 2125, jan_mar: 2125 }, total: 8500 },
    { id: 37, village: "Sibar", installments: { apr_june: 1625, july_sept: 1625, oct_dec: 1625, jan_mar: 1625 }, total: 6500 },
    { id: 38, village: "Solna", installments: { apr_june: 1750, july_sept: 1750, oct_dec: 1750, jan_mar: 1750 }, total: 7000 },
    { id: 39, village: "Temrani", installments: { apr_june: 1750, july_sept: 1750, oct_dec: 1750, jan_mar: 1750 }, total: 7000 },
    { id: 40, village: "Thibgaon", installments: { apr_june: 1750, july_sept: 1750, oct_dec: 1750, jan_mar: 1750 }, total: 7000 },
];
