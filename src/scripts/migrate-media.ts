import connectToDatabase from '../lib/db';
import { SiteMedia, TeamMember, Service, Tool } from '../lib/models';
import { uploadMedia } from '../lib/cloudinary';
import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function migrate() {
    await connectToDatabase();
    console.log("Connected to MongoDB. Starting migration...");

    // 1. Migrate SiteMedia
    const siteMedias = await SiteMedia.find({});
    console.log(`Found ${siteMedias.length} SiteMedia items.`);
    for (const item of siteMedias) {
        if (item.data && item.data.startsWith('data:')) {
            console.log(`Uploading ${item.name} from SiteMedia...`);
            const url = await uploadMedia(item.data, 'sitemedia');
            item.data = url;
            await item.save();
            console.log(`Updated ${item.name} -> ${url}`);
        }
    }

    // 2. Migrate TeamMembers
    const teamMembers = await TeamMember.find({});
    console.log(`Found ${teamMembers.length} TeamMember items.`);
    for (const item of teamMembers) {
        if (item.imageUrl && item.imageUrl.startsWith('data:')) {
            console.log(`Uploading ${item.name} image...`);
            const url = await uploadMedia(item.imageUrl, 'team');
            item.imageUrl = url;
            await item.save();
            console.log(`Updated ${item.name} -> ${url}`);
        }
    }

    // 3. Migrate Services
    const services = await Service.find({});
    console.log(`Found ${services.length} Service items.`);
    for (const item of services) {
        if (item.imageUrl && item.imageUrl.startsWith('data:')) {
            console.log(`Uploading ${item.title} image...`);
            const url = await uploadMedia(item.imageUrl, 'services');
            item.imageUrl = url;
            await item.save();
            console.log(`Updated ${item.title} -> ${url}`);
        }
    }

    // 4. Migrate Tools
    const tools = await Tool.find({});
    console.log(`Found ${tools.length} Tool items.`);
    for (const item of tools) {
        if (item.imageUrl && item.imageUrl.startsWith('data:')) {
            console.log(`Uploading ${item.name} image...`);
            const url = await uploadMedia(item.imageUrl, 'tools');
            item.imageUrl = url;
            await item.save();
            console.log(`Updated ${item.name} -> ${url}`);
        }
    }

    console.log("Migration complete!");
    process.exit(0);
}

migrate().catch(console.error);
