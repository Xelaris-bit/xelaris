import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { SiteMedia, TeamMember, Service, Tool } from '@/lib/models';
import { uploadMedia } from '@/lib/cloudinary';

export async function GET() {
    try {
        await connectToDatabase();
        console.log("Connected to MongoDB from API. Starting migration...");
        const results = {
            sitemedia: 0,
            team: 0,
            services: 0,
            tools: 0,
        };

        // 1. Migrate SiteMedia
        const siteMedias = await SiteMedia.find({});
        for (const item of siteMedias) {
            if (item.data && item.data.startsWith('data:')) {
                const url = await uploadMedia(item.data, 'sitemedia');
                item.data = url;
                await item.save();
                results.sitemedia++;
            }
        }

        // 2. Migrate TeamMembers
        const teamMembers = await TeamMember.find({});
        for (const item of teamMembers) {
            if (item.imageUrl && item.imageUrl.startsWith('data:')) {
                const url = await uploadMedia(item.imageUrl, 'team');
                item.imageUrl = url;
                await item.save();
                results.team++;
            }
        }

        // 3. Migrate Services
        const services = await Service.find({});
        for (const item of services) {
            if (item.imageUrl && item.imageUrl.startsWith('data:')) {
                const url = await uploadMedia(item.imageUrl, 'services');
                item.imageUrl = url;
                await item.save();
                results.services++;
            }
        }

        // 4. Migrate Tools
        const tools = await Tool.find({});
        for (const item of tools) {
            if (item.imageUrl && item.imageUrl.startsWith('data:')) {
                const url = await uploadMedia(item.imageUrl, 'tools');
                item.imageUrl = url;
                await item.save();
                results.tools++;
            }
        }

        return NextResponse.json({ success: true, migrated: results });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
