const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.production') });

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!API_TOKEN) {
    console.error('❌ STRAPI_API_TOKEN is missing in .env.production');
    process.exit(1);
}

const api = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
    },
});

const SINGLE_TYPES = ['about', 'homepage', 'vision-mission', 'principal-message', 'director-message', 'fee-structure'];
const COLLECTION_TYPES = ['albums', 'certificates', 'download-items', 'academic-stages', 'school-managing-committees', 'news-items', 'events'];

async function publishSingleTypes() {
    console.log('\n--- Publishing Single Types ---');
    for (const type of SINGLE_TYPES) {
        try {
            await api.put(`/${type}`, {
                data: { publishedAt: new Date() }
            });
            console.log(`✅ Published: ${type}`);
        } catch (error) {
            console.error(`❌ Failed to publish ${type}:`, error.response?.status, error.response?.data?.error || error.message);
        }
    }
}

async function publishCollectionTypes() {
    console.log('\n--- Publishing Collection Types ---');
    for (const type of COLLECTION_TYPES) {
        try {
            const res = await api.get(`/${type}?publicationState=preview&fields[0]=id&pagination[limit]=100`);
            const items = res.data.data;

            if (!items || items.length === 0) {
                console.log(`ℹ️ No items found for ${type}`);
                continue;
            }

            console.log(`Found ${items.length} items for ${type}. Publishing...`);

            for (const item of items) {
                try {
                    await api.put(`/${type}/${item.id}`, {
                        data: { publishedAt: new Date() }
                    });
                    console.log(`  ✅ Published ${type} ID: ${item.id}`);
                } catch (err) {
                    console.error(`  ❌ Failed ID ${item.id}:`, err.response?.status, err.response?.data?.error || err.message);
                }
            }

        } catch (error) {
            console.error(`❌ Failed to list ${type}:`, error.response?.status, error.response?.data?.error || error.message);
        }
    }
}

async function main() {
    console.log(`🚀 Starting Publication Process on ${STRAPI_URL}...`);
    await publishSingleTypes();
    await publishCollectionTypes();
    console.log('🎉 Publication Complete!');
}

main();
