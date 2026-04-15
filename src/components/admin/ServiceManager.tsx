'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveService, deleteService } from '@/app/admin/data-actions';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { getIcon, iconList } from '@/lib/icons';


export default function ServiceManager({ initialData }: { initialData: any[] }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [currentService, setCurrentService] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [processSteps, setProcessSteps] = useState<{ title: string; description: string }[]>([]);

    const { toast } = useToast();

    const handleOpen = (service: any = null) => {
        setCurrentService(service);
        setSelectedImage(service?.imageUrl || null);
        setProcessSteps(service?.process || []);

        setIsOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            await deleteService(id);
            toast({ title: "Service Deleted", description: "Service removed successfully." });
            router.refresh();
        }
    };

    const handleAddStep = () => {
        setProcessSteps([...processSteps, { title: '', description: '' }]);
    };

    const handleRemoveStep = (index: number) => {
        const newSteps = [...processSteps];
        newSteps.splice(index, 1);
        setProcessSteps(newSteps);
    };

    const handleStepChange = (index: number, field: 'title' | 'description', value: string) => {
        const newSteps = [...processSteps];
        newSteps[index][field] = value;
        setProcessSteps(newSteps);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (currentService && currentService._id) {
            formData.append('id', currentService._id);
        }

        // Add image
        if (selectedImage) {
            formData.append('imageUrl', selectedImage);
        } else {
            formData.append('imageUrl', '');
        }

        // Add process steps as JSON string
        formData.append('process', JSON.stringify(processSteps));


        const result = await saveService(null, formData);
        if (result.success) {
            toast({ title: "Success", description: "Service saved successfully." });
            setIsOpen(false);
            router.refresh();
        }
    };

    return (
        <div>
            {/* ... Header and Table remain same ... */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Services</h2>
                <Button onClick={() => handleOpen()} className="bg-primary text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Service
                </Button>
            </div>

            <div className="rounded-md border bg-white/90 backdrop-blur-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Icon</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialData && initialData.length > 0 ? (
                            initialData.map((service) => (
                                <TableRow key={service._id}>
                                    <TableCell className="font-medium">{service.icon}</TableCell>
                                    <TableCell>{service.title}</TableCell>
                                    <TableCell>{service.slug}</TableCell>
                                    <TableCell>
                                        {service.imageUrl ? (
                                            service.imageUrl.startsWith('data:video/') ? (
                                                <video src={service.imageUrl} className="rounded object-cover h-10 w-10" muted playsInline />
                                            ) : (
                                                <Image src={service.imageUrl} alt="Service" width={40} height={40} className="rounded object-cover" />
                                            )
                                        ) : <span className="text-muted-foreground text-xs">No Image/Video</span>}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpen(service)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(service._id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">No services found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{currentService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" defaultValue={currentService?.title} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug (URL)</Label>
                                <Input id="slug" name="slug" defaultValue={currentService?.slug} required />
                            </div>
                        </div>



                        <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea id="description" name="description" defaultValue={currentService?.description} required rows={3} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="longDescription">Detailed Description (For Service Page)</Label>
                            <Textarea
                                id="longDescription"
                                name="longDescription"
                                defaultValue={currentService?.longDescription}
                                placeholder="A comprehensive overview of the service..."
                                className="min-h-[150px]"
                            />
                        </div>

                        <div className="space-y-4 rounded-lg border p-4 bg-muted/20">
                            <div className="flex items-center justify-between">
                                <Label className="text-base font-semibold">Our Process Steps</Label>
                                <Button type="button" variant="outline" size="sm" onClick={handleAddStep} className="gap-2">
                                    <Plus className="h-3 w-3" /> Add Step
                                </Button>
                            </div>

                            {processSteps.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">No process steps added yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {processSteps.map((step, index) => (
                                        <div key={index} className="grid gap-2 border-b pb-4 last:border-0 relative bg-white p-3 rounded shadow-sm">
                                            <div className="absolute right-2 top-2">
                                                <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => handleRemoveStep(index)}>
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2">
                                                <Label className="text-xs">Step {index + 1} Title</Label>
                                                <Input
                                                    value={step.title}
                                                    onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                                                    placeholder="e.g. Discovery & Research"
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 gap-2">
                                                <Label className="text-xs">Step Description</Label>
                                                <Textarea
                                                    value={step.description}
                                                    onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                                                    placeholder="Describe this step..."
                                                    required
                                                    rows={2}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2">
                                <Label>Service Icon</Label>
                                <div className="border rounded-md p-4 bg-background">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex-1">
                                            <Input
                                                placeholder="Search icons..."
                                                onChange={(e) => {
                                                    const search = e.target.value.toLowerCase();
                                                    const icons = document.querySelectorAll('.icon-btn');
                                                    icons.forEach((btn: any) => {
                                                        const name = btn.getAttribute('title').toLowerCase();
                                                        if (name.includes(search)) {
                                                            btn.style.display = 'flex';
                                                        } else {
                                                            btn.style.display = 'none';
                                                        }
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 border px-3 py-2 rounded-md bg-muted/50">
                                            <span className="text-sm text-muted-foreground">Selected:</span>
                                            {(() => {
                                                const Icon = getIcon(currentService?.icon || 'Code');
                                                return <Icon className="h-5 w-5 text-primary" />;
                                            })()}
                                            <span className="font-medium">{currentService?.icon || 'Code'}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-[200px] overflow-y-auto p-1">
                                        {iconList.map((iconName) => {
                                            const Icon = getIcon(iconName);
                                            const isSelected = (currentService?.icon || 'Code') === iconName;
                                            return (
                                                <button
                                                    key={iconName}
                                                    type="button"
                                                    title={iconName}
                                                    className={`icon-btn flex items-center justify-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${isSelected ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted/30'}`}
                                                    onClick={() => setCurrentService({ ...currentService, icon: iconName })}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-4 space-y-2 border-t pt-4">
                                        <Label htmlFor="customIconSlug">
                                            Or enter a Custom Icon Slug
                                            <a href="https://simpleicons.org/" target="_blank" rel="noreferrer" className="text-xs text-blue-500 ml-2 hover:underline">(SimpleIcons)</a>
                                        </Label>
                                        <Input
                                            id="customIconSlug"
                                            name="icon"
                                            value={currentService?.icon || 'Code'}
                                            onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
                                            placeholder="e.g. react, docker, typescript"
                                        />
                                        <p className="text-xs text-muted-foreground">Type a SimpleIcons slug to use it, or click a Lucide icon above.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Removed original icon input, using hidden input above */}
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="image" className="text-base">Service Media</Label>
                                    <p className="text-[0.8rem] text-muted-foreground">
                                        Upload an image, GIF, or video. <strong>Bento Grid Display:</strong> To support the asymmetrical "Our Best Services" grid, we recommend a <strong>1:1 (e.g., 1080x1080)</strong> or <strong>16:9 (e.g., 1920x1080)</strong> resolution with a center-focused subject. Our system will automatically center crop (object-cover) the image based on whether the service appears in a wide or narrow card.
                                    </p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    {selectedImage ? (
                                        <div className="flex items-center gap-2">
                                            <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                                                {selectedImage.startsWith('data:video/') ? (
                                                    <video src={selectedImage} autoPlay loop muted playsInline className="object-cover w-full h-full" />
                                                ) : (
                                                    <Image src={selectedImage} alt="Preview" fill className="object-cover" />
                                                )}
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => {
                                                    setSelectedImage(null);
                                                    const fileInput = document.getElementById('image') as HTMLInputElement;
                                                    if (fileInput) fileInput.value = '';
                                                }}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ) : null}
                                    <Input id="image" type="file" accept="image/*,video/*" onChange={handleImageChange} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit">Save Service</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
}
