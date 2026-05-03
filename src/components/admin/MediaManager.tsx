'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { saveSiteMedia } from '@/app/admin/data-actions';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { Loader2, Upload } from 'lucide-react';

const MEDIA_SLOTS = [
    { id: 'logo', label: 'Company Logo', type: 'logo' },
    { id: 'footer-logo', label: 'Footer Logo (Required for different footer)', type: 'logo' },
    { id: 'home-hero-video', label: 'Home Page Hero Video (MP4)', type: 'video' },
    { id: 'home-hero-bg', label: 'Home Page Hero Background (Fallback)', type: 'image' },
    { id: 'services-hero', label: 'Services Page Hero Image', type: 'image' },
    { id: 'about-hero', label: 'About Page Hero Image', type: 'image' },
    { id: 'tools-hero', label: 'Tools Page Hero Image', type: 'image' },
    { id: 'contact-hero', label: 'Contact Page Hero Image', type: 'image' },
    { id: 'careers-hero', label: 'Careers Page Hero Image', type: 'image' },
];

export default function MediaManager({ initialMedia }: { initialMedia: Record<string, any> }) {
    const { toast } = useToast();
    const [loading, setLoading] = useState<string | null>(null);
    const [previews, setPreviews] = useState<Record<string, string>>({});

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, slotId: string) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [slotId]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (slotId: string, type: string) => {
        const data = previews[slotId];
        if (!data) return;

        setLoading(slotId);
        const formData = new FormData();
        formData.append('name', slotId);
        formData.append('type', type);
        formData.append('data', data);

        try {
            const result = await saveSiteMedia(null, formData);
            if (result && result.success === false) {
                throw new Error(result.message || "Failed to save media.");
            }
            toast({ title: "Success", description: "Media updated successfully." });
            // Update initialMedia conceptually effectively by just relying on the preview state 
            // or a full page reload if we want to be strict, but preview is enough feedback.
        } catch (err: any) {
            toast({ title: "Error", description: err.message || "Failed to save media.", variant: "destructive" });
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEDIA_SLOTS.map((slot) => {
                const currentImage = previews[slot.id] || initialMedia[slot.id]?.data;

                return (
                    <Card key={slot.id} className="bg-white/90 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">{slot.label}</CardTitle>
                            <CardDescription>
                                {slot.type === 'image' ? 'Upload an image' : `Upload a ${slot.type}`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted flex items-center justify-center">
                                {currentImage ? (
                                    slot.type === 'video' ? (
                                        <video
                                            src={currentImage}
                                            className="h-full w-full object-contain"
                                            controls
                                        />
                                    ) : (
                                        <Image
                                            src={currentImage}
                                            alt={slot.label}
                                            fill
                                            className="object-contain"
                                        />
                                    )
                                ) : (
                                    <span className="text-muted-foreground text-sm">
                                        {slot.type === 'video' ? 'No Video' : 'No Image'}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <Input
                                    type="file"
                                    accept={slot.type === 'video' ? 'video/mp4,video/*' : 'image/*'}
                                    onChange={(e) => handleFileChange(e, slot.id)}
                                />
                            </div>

                            <Button
                                onClick={() => handleSave(slot.id, slot.type)}
                                disabled={!previews[slot.id] || loading === slot.id}
                                className="w-full"
                            >
                                {loading === slot.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading === slot.id ? 'Saving...' : 'Save Change'}
                            </Button>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
