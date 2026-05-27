const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Try CLOUDINARY_TC first, then fallback to main CLOUDINARY credentials
const PLACEHOLDERS = {
    cloudName: "your_tc_cloud_name_here",
    apiKey: "your_tc_api_key_here",
    apiSecret: "your_tc_api_secret_here"
};

const cloudName = (process.env.CLOUDINARY_TC_CLOUD_NAME && 
    process.env.CLOUDINARY_TC_CLOUD_NAME.trim() !== "" && 
    process.env.CLOUDINARY_TC_CLOUD_NAME !== PLACEHOLDERS.cloudName)
    ? process.env.CLOUDINARY_TC_CLOUD_NAME
    : process.env.CLOUDINARY_CLOUD_NAME;

const apiKey = (process.env.CLOUDINARY_TC_API_KEY && 
    process.env.CLOUDINARY_TC_API_KEY.trim() !== "" && 
    process.env.CLOUDINARY_TC_API_KEY !== PLACEHOLDERS.apiKey)
    ? process.env.CLOUDINARY_TC_API_KEY
    : process.env.CLOUDINARY_API_KEY;

const apiSecret = (process.env.CLOUDINARY_TC_API_SECRET && 
    process.env.CLOUDINARY_TC_API_SECRET.trim() !== "" && 
    process.env.CLOUDINARY_TC_API_SECRET !== PLACEHOLDERS.apiSecret)
    ? process.env.CLOUDINARY_TC_API_SECRET
    : process.env.CLOUDINARY_API_SECRET;

const uploadPreset = process.env.CLOUDINARY_TC_UPLOAD_PRESET;

if (!uploadPreset || uploadPreset.trim() === "") {
    console.error("Error: CLOUDINARY_TC_UPLOAD_PRESET is undefined or empty in environment variables.");
    process.exit(1);
}

console.log(`Using Cloud Name: ${cloudName}`);
console.log(`Using Upload Preset: ${uploadPreset}`);

if (!cloudName || !apiKey || !apiSecret) {
    console.error("Missing Cloudinary credentials in env.");
    process.exit(1);
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});

async function run() {
    try {
        console.log("Updating upload preset with incoming transformations...");
        // Check if preset exists
        let presetExists = false;
        try {
            const presetInfo = await cloudinary.api.upload_preset(uploadPreset);
            console.log("Found existing upload preset:", presetInfo.name);
            presetExists = true;
        } catch (e) {
            const statusCode = e.http_code || (e.error && e.error.http_code) || e.statusCode || (e.error && e.error.statusCode);
            if (statusCode === 404) {
                console.log(`Upload preset ${uploadPreset} does not exist (404 from cloudinary.api.upload_preset). Proceeding to create.`);
            } else {
                console.error(`Failed to verify upload preset ${uploadPreset} via cloudinary.api.upload_preset. Error message: ${e.message || 'unknown'}. Full error:`, e);
                process.exit(1);
            }
        }

        const presetOptions = {
            unsigned: false,
            transformation: [
                { width: 1920, crop: "limit" },
                { quality: "auto" },
                { fetch_format: "webp" }
            ],
        };

        if (presetExists) {
            const result = await cloudinary.api.update_upload_preset(uploadPreset, presetOptions);
            console.log("Upload preset updated successfully:", result);
        } else {
            const result = await cloudinary.api.create_upload_preset({
                name: uploadPreset,
                ...presetOptions
            });
            console.log("Upload preset created successfully:", result);
        }
    } catch (error) {
        console.error("Failed to update/create upload preset:", error);
        process.exit(1);
    }
}

run();
