"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsForm from "@/components/admin/SettingsForm";
import TeamManager from "@/components/admin/TeamManager";
import ServiceManager from "@/components/admin/ServiceManager";
import CareerManager from "@/components/admin/CareerManager";
import ToolManager from "@/components/admin/ToolManager";
import MediaManager from "@/components/admin/MediaManager";
import ManagerManager from "@/components/admin/ManagerManager";
import PromoManager from "@/components/admin/PromoManager";
import ActivityLog from "@/components/admin/ActivityLog";

interface DashboardTabsProps {
    role: string;
    permissions: string[];
    data: {
        settings: any;
        teamMembers: any[];
        services: any[];
        tools: any[];
        careers: any[];
        media: any;
        activities: any[];
        managers: any[];
    }
}

export default function DashboardTabs({ role, permissions, data }: DashboardTabsProps) {
    const isSuperAdmin = role === 'SUPER_ADMIN';
    const hasAccess = (perm: string) => isSuperAdmin || permissions.includes(perm);

    // Use a state for mounted to ensure we only render the Tabs on the client
    // this avoids hydration mismatches with server-rendered HTML
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Or a skeleton loader
    }

    const { settings, teamMembers, services, tools, careers, media, activities, managers } = data;

    // Determine default tab safely
    let defaultTab = "activity";
    if (isSuperAdmin) defaultTab = "managers";
    else if (hasAccess('settings')) defaultTab = "settings";
    else if (permissions.length > 0) defaultTab = permissions[0];

    return (
        <Tabs defaultValue={defaultTab} className="space-y-6">
            <TabsList className="bg-black/20 p-1 backdrop-blur-md border border-white/10 rounded-xl w-full justify-start h-auto flex-wrap">
                {/* Super Admin Only: Managers Tab */}
                {isSuperAdmin && (
                    <TabsTrigger value="managers" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">👥 Managers</TabsTrigger>
                )}

                {/* Conditionally Render Tabs */}
                {hasAccess('settings') && <TabsTrigger value="settings" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">General Settings</TabsTrigger>}
                {hasAccess('media') && <TabsTrigger value="media" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Images & Logo</TabsTrigger>}
                {hasAccess('team') && <TabsTrigger value="team" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Team</TabsTrigger>}
                {hasAccess('services') && <TabsTrigger value="services" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Services</TabsTrigger>}
                {hasAccess('careers') && <TabsTrigger value="careers" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Careers</TabsTrigger>}
                {hasAccess('tools') && <TabsTrigger value="tools" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Tools</TabsTrigger>}
                {hasAccess('settings') && <TabsTrigger value="promo" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Promotions</TabsTrigger>}

                {/* Activity Log - Restricted access */}
                {hasAccess('activity') && <TabsTrigger value="activity" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Activity Log</TabsTrigger>}
            </TabsList>

            <div className="rounded-2xl bg-white/80 border border-white/10 p-6 backdrop-blur-sm shadow-inner text-foreground">
                {isSuperAdmin && <TabsContent value="managers"><ManagerManager initialManagers={managers} /></TabsContent>}

                {hasAccess('settings') && <TabsContent value="settings"><SettingsForm initialData={settings} /></TabsContent>}
                {hasAccess('media') && <TabsContent value="media"><MediaManager initialMedia={media} /></TabsContent>}
                {hasAccess('team') && <TabsContent value="team"><TeamManager initialData={teamMembers} /></TabsContent>}
                {hasAccess('services') && <TabsContent value="services"><ServiceManager initialData={services} /></TabsContent>}
                {hasAccess('careers') && <TabsContent value="careers"><CareerManager initialData={careers} /></TabsContent>}
                {hasAccess('tools') && <TabsContent value="tools"><ToolManager initialData={tools} services={services} /></TabsContent>}
                {hasAccess('settings') && <TabsContent value="promo"><PromoManager settings={settings} initialMedia={media} /></TabsContent>}
                {hasAccess('activity') && <TabsContent value="activity"><ActivityLog activities={activities} isSuperAdmin={isSuperAdmin} /></TabsContent>}
            </div>
        </Tabs>
    );
}
