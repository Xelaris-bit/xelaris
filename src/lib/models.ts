
import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
    companyName: { type: String, default: 'Xelaris' },
    contactEmail: String,
    phoneNumber: String,
    address: String,
    facebookUrl: String,
    twitterUrl: String,
    linkedinUrl: String,
    instagramUrl: String,
    // Promotion Banner Settings
    promoEnabled: { type: Boolean, default: false },
    promoTitle: { type: String, default: 'WE PROVIDE GREAT IDEAS TO GROW YOUR BUSINESS!' },
    promoSubtitle: { type: String, default: 'Unlock your potential with our expert digital solutions.' },
    promoButtonText: { type: String, default: 'CONTACT US' },
    promoLink: { type: String, default: '/contact' },
    promoFullImage: { type: Boolean, default: false }, // New field
    // TechBot Settings
    techBotEnabled: { type: Boolean, default: true },
    techBotVideoUrl: { type: String, default: '' },
    techBotSize: { type: Number, default: 64 },
    // Logo Settings
    logoSize: { type: Number, default: 32 },
}, { timestamps: true });

const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true }, // e.g., CEO, CFO
    imageUrl: String,
    bio: String, // Short description
    linkedinUrl: String,
    detailedDescription: String,
}, { timestamps: true });



const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String }, // Detailed description for the service page
    process: [{
        title: { type: String, required: true },
        description: { type: String, required: true },
    }], // Array of process steps
    icon: String,
    slug: { type: String, required: true, unique: true },
    imageUrl: String,
}, { timestamps: true });

const toolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    imageUrl: String, // Kept for custom uploads/fallback
    icon: String, // SimpleIcons slug (e.g. "react", "nextdotjs")
    category: {
        type: String,
        required: true,
        default: 'Other',
    },
    link: String,
}, { timestamps: true });

const careerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    department: String,
    location: String,
    type: { type: String, enum: ['Remote', 'On-site', 'Hybrid'], default: 'Remote' },
    description: String,
    requirements: [String], // Array of strings is valid
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const siteMediaSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ['image', 'video', 'logo'], required: true },
    data: { type: String, required: true }, // Base64 or URL
    mimeType: String,
}, { timestamps: true });

const adminActivitySchema = new mongoose.Schema({
    action: { type: String, required: true }, // LOGIN, LOGOUT, UPDATE, CREATE, DELETE
    target: { type: String, required: true }, // Service, Team Member, System, etc.
    details: { type: String }, // "Updated Service: Web Dev", "User logged in"
    timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

const managerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permissions: [{ type: String }], // e.g., 'media', 'services'
    createdBy: String,
}, { timestamps: true });

// Check if models exist before compiling to prevent OverwriteModelError in hot-reload
export const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);
export const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);
export const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export const Tool = mongoose.models.Tool || mongoose.model('Tool', toolSchema);
export const Career = mongoose.models.Career || mongoose.model('Career', careerSchema);
export const SiteMedia = mongoose.models.SiteMedia || mongoose.model('SiteMedia', siteMediaSchema);
export const AdminActivity = mongoose.models.AdminActivity || mongoose.model('AdminActivity', adminActivitySchema);
export const Manager = mongoose.models.Manager || mongoose.model('Manager', managerSchema);
