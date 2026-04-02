'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveTool, deleteTool } from '@/app/admin/data-actions';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

import { useRouter } from 'next/navigation';

export default function ToolManager({ initialData, services = [] }: { initialData: any[], services?: any[] }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [currentTool, setCurrentTool] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { toast } = useToast();

    const handleOpen = (tool: any = null) => {
        setCurrentTool(tool);
        setSelectedImage(tool?.imageUrl || null);
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
        if (confirm("Are you sure you want to delete this tool?")) {
            await deleteTool(id);
            toast({ title: "Tool Deleted", description: "Tool removed successfully." });
            router.refresh();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (currentTool && currentTool._id) {
            formData.append('id', currentTool._id);
        }

        if (selectedImage) {
            formData.set('imageUrl', selectedImage);
        } else {
            formData.set('imageUrl', '');
        }

        const result = await saveTool(null, formData);
        if (result.success) {
            toast({ title: "Success", description: "Tool saved successfully." });
            setIsOpen(false);
            router.refresh();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tools & Technologies</h2>
                <Button onClick={() => handleOpen()} className="bg-primary text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Tool
                </Button>
            </div>

            <div className="rounded-md border bg-white/90 backdrop-blur-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Icon</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialData && initialData.length > 0 ? (
                            initialData.map((tool) => (
                                <TableRow key={tool._id}>
                                    <TableCell>
                                        {tool.imageUrl ? (
                                            <div className="relative h-10 w-10 overflow-hidden rounded-md border bg-gray-50 flex items-center justify-center">
                                                <img
                                                    src={tool.imageUrl}
                                                    alt={tool.name}
                                                    className="w-full h-full object-contain p-1"
                                                />
                                            </div>
                                        ) : tool.icon ? (
                                            <img
                                                src={`https://cdn.simpleicons.org/${tool.icon}`}
                                                alt={tool.name}
                                                className="h-8 w-8 object-contain"
                                            />
                                        ) : <span className="text-xs text-muted-foreground">No Icon</span>}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {tool.name}
                                        <div className="text-xs text-muted-foreground">{tool.category}</div>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate" title={tool.description}>{tool.description}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpen(tool)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(tool._id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No tools found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentTool ? 'Edit Tool' : 'Add New Tool'}</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" defaultValue={currentTool?.name} required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    name="category"
                                    defaultValue={currentTool?.category || (services.length > 0 ? services[0].title : 'Other')}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {services.map(service => (
                                        <option key={service._id || service.title} value={service.title}>{service.title}</option>
                                    ))}
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="icon">
                                    Icon Slug
                                    <a href="https://simpleicons.org/" target="_blank" rel="noreferrer" className="text-xs text-blue-500 ml-2 hover:underline">(SimpleIcons)</a>
                                </Label>
                                <Input id="icon" name="icon" defaultValue={currentTool?.icon} placeholder="e.g. react, docker" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" defaultValue={currentTool?.description} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Custom Image (Optional fallback)</Label>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-4 items-center">
                                    {selectedImage ? (
                                        <div className="relative h-16 w-16 overflow-hidden rounded-md border text-center flex items-center justify-center bg-gray-50 group">
                                            <img
                                                src={selectedImage}
                                                alt="Preview"
                                                className="w-full h-full object-contain p-1"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedImage(null);
                                                    // Also reset file input if possible, but difficult with React ref. 
                                                    // We can just rely on selectedImage state being null.
                                                }}
                                                className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                            >
                                                <Trash2 className="h-6 w-6" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="h-16 w-16 border border-dashed rounded-md flex items-center justify-center text-muted-foreground text-xs">
                                            No Image
                                        </div>
                                    )}
                                    <div className="flex-1 space-y-2">
                                        <Input
                                            placeholder="Paste Image URL or Upload File"
                                            value={selectedImage || ''}
                                            onChange={(e) => setSelectedImage(e.target.value)}
                                            className="font-mono text-xs"
                                        />
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Paste a direct image URL above or upload a file. The content above is what will be saved.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="link">Link (Optional)</Label>
                            <Input id="link" name="link" defaultValue={currentTool?.link} />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit">Save Tool</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
