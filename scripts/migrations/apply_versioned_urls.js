
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Load the mapping file content (we can't require .ts directly in node without ts-node)
// So we will parse it manually or just read it as text and regex it, OR better:
// We just defined it, so we can copy the object definition here for the script.
// To ensure it matches exactly, I will read the file and eval it (safe enough here) or just strictly regex extract.
// Actually, I'll paste the object here to be 100% sure I have the data structure available to the script.

const cloudinaryMapping = {
    annualFunction: [
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349451/annual-function-4_fj2zow.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349451/annual-function-1_sn7lid.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349451/annual-function-2_o45eye.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349451/annual-function-3_b9mu3t.webp",
    ],

    districtLevelTaekwando: [
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349453/taekwando-5_nufu32.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349452/taekwando-4_pajbyo.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349452/taekwando-3_krrygo.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349452/taekwando-1_zaijid.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349452/taekwando-2_snjgok.webp",
    ],

    holiCelebration: [
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349454/holi-1_nmbpuc.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349455/holi-2_arqckn.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349455/holi-3_fdjlmf.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349456/holi-4_szri8j.webp",
    ],

    infrastructure: {
        classrooms: [
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349457/classroom-1_k9z4s9.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349458/classroom-2_i2r5az.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349458/classroom-11_dcibzy.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349459/classroom-5_irogcn.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349459/classroom-6_erlxp0.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349460/classroom-8_ui87lk.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349460/classroom-9_c0muai.webp",
        ],

        building: [
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349456/infrastructure-building-1_gstqrx.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349456/infrastructure-building-2_zx4im1.webp",
        ],

        computerLab: [
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349460/infrastructure-computerlab-1_fi2nzs.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349461/infrastructure-computerlab-2_qakldc.webp",
        ],

        indoreGames: [
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349461/infrastructure-indoregames-1_lztvua.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349462/infrastructure-indoregames-2_ef5nyi.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349462/infrastructure-indoregames-3_jetncp.webp",
        ],

        library: [
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349462/infrastructure-library-1_cgdkdd.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349463/infrastructure-library-2_nzfixb.webp",
        ],

        others: [
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349461/fire-extinguisher-2_caodwl.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349463/schoolground_vs92ne.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349463/sports-4_rrsm5v.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349464/sports-ground-1_pl7jlc.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349464/_MG_8739_tzm974.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349464/_MG_8740_fsdowd.webp",
        ],
    },

    lab: {
        biology: [
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349465/lab-biology-1_hz0ivq.webp",
        ],
        chemistry: [
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349465/lab-chemistry-1_scbzyg.webp",
        ],
        computer: [
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349465/lab-computer-1_sfxfjx.webp",
        ],
        math: [
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349466/lab-math-1_exipn5.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349466/lab-math-2_i4vs6s.webp",
        ],
        physics: [
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349467/lab-physics-1_gcofnz.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349467/lab-physics-2_meaxez.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349467/lab-physics-3_l3vg0n.webp",
            "https://res.cloudinary.com/dkits80xk/image/upload/v1765349468/lab-physics-4_pnczs5.webp",
        ],
    },

    mixPhotos: [
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349468/mix-photos-1_jjhoek.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349469/mix-photos-2_en3d5b.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349469/mix-photos-4_tpz1yc.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349470/mix-photos-5_sdzgut.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349470/mix-photos-6_imyjo7.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349470/mix-photos-7_p1myit.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349471/mix-photos-8_e1qfpc.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349471/mix-photos-9_llwsky.webp",
    ],

    nationalYouthDay: [
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349471/national-youth-day-1_h0gl7k.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349472/national-youth-day-2_xqxmhr.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349472/national-youth-day-3_whvmsl.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349472/national-youth-day-4_nw90ci.webp",
    ],

    ptm: [
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765351972/ptm-1_jfssci.webp",
    ],

    rainyDay: [
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349473/rainy-day-plantation-1_vsgwbz.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349474/rainy-day-plantation-2_beiv1v.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349474/rainy-day-plantation-3_qtwp7f.webp",
    ],

    sessionStart: [
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349474/session-start-1_qshvtb.webp",
    ],

    sportsAchievements: [
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349475/sports-achievements-1_xmyfg2.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349475/sports-achievements-2_nqqixj.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349475/sports-achievements-3_gmu7hb.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349476/sports-achievements-4_hygkkb.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349476/sports-achievements-6_wdccsr.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765352332/sports-achievements-5_dzuqsi.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349477/sports-achievements-7_ho4sn3.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765349477/sports-achievements-8_pszpj1.webp",
        "https://res.cloudinary.com/dkits80xk/image/upload/v1765352154/sports-achievements-9_bfypka.webp",
    ],
};

const SRC_DIR = 'src';

// 1. Flatten the mapping to Filename_Prefix -> URL
// Prefix = filename without the random hash suffix.
// Example: "classroom-1_k9z4s9.webp" -> prefix "classroom-1"
// We want to map "infrastructure-classroom-1.webp" (from codebase) -> "https://.../classroom-1_k9z4s9.webp"
// Wait. My standardized codebase uses "infrastructure-classroom-1.webp".
// The Cloudinary one uses "classroom-1_k9z4s9.webp".
// So "infrastructure-classroom-1" roughly maps to "classroom-1".
// But look at "building": "infrastructure-building-1_gstqrx.webp". That matches closer.
// We need a smart matcher.

const urlMap = {};

function traverse(obj) {
    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            obj[key].forEach(url => {
                const filename = path.basename(url); // e.g. "classroom-1_k9z4s9.webp"
                // Extract the base part before the hash
                // Usually matching /(.+)_[^_]+\.webp/
                const match = filename.match(/(.+)_[^_]+\.(webp|jpg|png|jpeg)/);
                if (match) {
                    const coreName = match[1]; // "classroom-1" or "infrastructure-building-1"
                    urlMap[coreName.toLowerCase()] = url;

                    // Also enable mapping from "infrastructure-classroom-1" to "classroom-1" if needed?
                    // Let's inspect the keys later.
                }
            });
        } else if (typeof obj[key] === 'object') {
            traverse(obj[key]);
        }
    }
}

traverse(cloudinaryMapping);

// Add manual aliases if my standardized names differ from Cloudinary core names
// My standardized names:
// infrastructure-classroom-1 -> correlates to classroom-1
// infrastructure-library-1 -> correlates to infrastructure-library-1 (Wait, let's check mapping)
// Mapping: "infrastructure-library-1_cgdkdd.webp". So that matches!
// "classroom-1_k9z4s9.webp". That Does NOT match "infrastructure-classroom-1".
// So I need an alias for "infrastructure-classroom-X" -> "classroom-X".

// Manual Aliases based on visual inspection of the mapping object provided:
const aliases = {
    'infrastructure-classroom-1': 'classroom-1',
    'infrastructure-classroom-2': 'classroom-2',
    'infrastructure-classroom-11': 'classroom-11',
    'infrastructure-classroom-5': 'classroom-5',
    'infrastructure-classroom-6': 'classroom-6',
    'infrastructure-classroom-8': 'classroom-8',
    'infrastructure-classroom-9': 'classroom-9',
};

// Also:
// lab-biology-1 -> lab-biology-1 (Match)
// lab-chemistry-1 -> lab-chemistry-1 (Match)
// taekwando-X -> taekwando-X (Match)
// annual-function-X -> annual-function-X (Match)

function startReplacement() {
    const files = glob.sync(`${SRC_DIR}/**/*.{ts,tsx,json}`);
    let count = 0;

    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let original = content;

        // Find existing Cloudinary URLs: https://res.cloudinary.com/dkits80xk/image/upload/[filename]
        // Note: The previous script replaced them with "https://.../infrastructure-classroom-1.webp" (no version, no hash)

        const regex = /https:\/\/res\.cloudinary\.com\/dkits80xk\/image\/upload\/([^"'\s)]+)/g;

        content = content.replace(regex, (fullMatch, currentFilename) => {
            // currentFilename e.g. "infrastructure-classroom-1.webp"
            let baseName = path.basename(currentFilename, path.extname(currentFilename)).toLowerCase();
            // baseName = "infrastructure-classroom-1"

            // Check alias
            if (aliases[baseName]) {
                baseName = aliases[baseName];
            }

            if (urlMap[baseName]) {
                console.log(`Replacing ${currentFilename} -> ${urlMap[baseName]}`);
                return urlMap[baseName];
            }

            console.warn(`No mapping found for: ${currentFilename}`);
            return fullMatch;
        });

        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            count++;
        }
    });

    console.log(`Updated ${count} files with versioned URLs.`);
}

startReplacement();
