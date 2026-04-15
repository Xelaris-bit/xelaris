
'use client';

import { updateSiteSettings, saveSiteMedia } from '@/app/admin/data-actions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// @ts-ignore - React 19 hook in React 18 types potentially
import { useActionState } from 'react';
import { useEffect, useState, startTransition } from 'react';
import { useToast } from "@/hooks/use-toast";

const initialState = {
    success: false,
};

export default function SettingsForm({ initialData }: { initialData: any }) {
    const [state, formAction] = useActionState(updateSiteSettings, initialState);
    const { toast } = useToast();
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (state?.success) {
            toast({
                title: "Settings Updated",
                description: "Your site settings have been saved successfully.",
            });
        }
    }, [state, toast]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const handleFormSubmit = async (formData: FormData) => {
        if (videoFile) {
            setIsUploading(true);
            try {
                // Convert file to base64
                const reader = new FileReader();
                reader.readAsDataURL(videoFile);
                await new Promise<void>((resolve) => {
                    reader.onloadend = async () => {
                        const base64Data = reader.result as string;
                        const mediaFormData = new FormData();
                        mediaFormData.append('name', 'techbot-video');
                        mediaFormData.append('type', 'video');
                        mediaFormData.append('data', base64Data);
                        await saveSiteMedia(null, mediaFormData);
                        resolve();
                    };
                });
                toast({ title: "Video Uploaded", description: "TechBot video saved successfully." });
            } catch (error) {
                console.error("Video upload failed:", error);
                toast({ title: "Upload Failed", description: "Could not upload video.", variant: "destructive" });
            } finally {
                setIsUploading(false);
            }
        }

        // Continue with normal settings save
        startTransition(() => {
            formAction(formData);
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your website's core information.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" name="companyName" defaultValue={initialData?.companyName} suppressHydrationWarning />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactEmail">Contact Email</Label>
                            <Input id="contactEmail" name="contactEmail" defaultValue={initialData?.contactEmail} suppressHydrationWarning />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input id="phoneNumber" name="phoneNumber" defaultValue={initialData?.phoneNumber} suppressHydrationWarning />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" name="address" defaultValue={initialData?.address} suppressHydrationWarning />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="logoSize">Logo Size (Height in px)</Label>
                            <Input id="logoSize" name="logoSize" type="number" defaultValue={initialData?.logoSize ?? 32} suppressHydrationWarning />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold">Social Media Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="facebookUrl">Facebook URL</Label>
                                <Input id="facebookUrl" name="facebookUrl" defaultValue={initialData?.facebookUrl} suppressHydrationWarning />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="twitterUrl">Twitter (X) URL</Label>
                                <Input id="twitterUrl" name="twitterUrl" defaultValue={initialData?.twitterUrl} suppressHydrationWarning />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                                <Input id="linkedinUrl" name="linkedinUrl" defaultValue={initialData?.linkedinUrl} suppressHydrationWarning />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="instagramUrl">Instagram URL</Label>
                                <Input id="instagramUrl" name="instagramUrl" defaultValue={initialData?.instagramUrl} suppressHydrationWarning />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="font-semibold text-lg">TechBot Configuration</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label htmlFor="techBotEnabled" className="text-base">
                                        Enable TechBot
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Show the animated robot or video on the website.
                                    </p>
                                </div>
                                <Switch
                                    id="techBotEnabled"
                                    name="techBotEnabled"
                                    defaultChecked={initialData?.techBotEnabled ?? true}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="techBotSize">TechBot Size (Width/Height in px)</Label>
                                <Input id="techBotSize" name="techBotSize" type="number" defaultValue={initialData?.techBotSize ?? 64} suppressHydrationWarning />
                                <p className="text-xs text-muted-foreground">Sets the display size for the TechBot icon. Default is 64.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="techBotVideoFile">Upload Video File (Overrides URL)</Label>
                                <Input
                                    id="techBotVideoFile"
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Upload a video file (MP4/WebM) to store in the database. Max size recommended: 10MB.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="techBotVideoUrl">Custom Video URL (Optional)</Label>
                                <Input
                                    id="techBotVideoUrl"
                                    name="techBotVideoUrl"
                                    placeholder="https://example.com/robot-video.mp4"
                                    defaultValue={initialData?.techBotVideoUrl}
                                    suppressHydrationWarning
                                />
                                <p className="text-xs text-muted-foreground">
                                    Leave empty to use the default animated CSS robot. If provided, this video will loop in place of the robot body.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" disabled={isUploading}>
                        {isUploading ? 'Uploading & Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
