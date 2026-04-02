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
import { User } from 'lucide-react';
import { updateTeamMember } from '@/app/admin/data-actions';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

import { useRouter } from 'next/navigation';

export default function TeamManager({ initialData }: { initialData: any[] }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [currentMember, setCurrentMember] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { toast } = useToast();

    const handleOpen = (member: any = null) => {
        setCurrentMember(member);
        setSelectedImage(member?.imageUrl || null);
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append('id', currentMember?._id || 'new');

        if (selectedImage) {
            formData.set('imageUrl', selectedImage); // Use set to ensure overwrite/create
        }

        const result = await updateTeamMember(null, formData);
        if (result.success) {
            toast({ title: "Success", description: "Team member saved successfully." });
            setIsOpen(false);
            router.refresh();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Team Members</h2>
                <Button onClick={() => handleOpen()} className="bg-primary text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Member
                </Button>
            </div>

            <div className="rounded-md border bg-white/90 backdrop-blur-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialData && initialData.map((member) => (
                            <TableRow key={member._id}>
                                <TableCell>
                                    {member.imageUrl ? (
                                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                            <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                                        </div>
                                    ) : <User className="h-10 w-10 bg-gray-200 rounded-full p-2" />}
                                </TableCell>
                                <TableCell className="font-medium">{member.name}</TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleOpen(member)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    {/* Delete functionality not visible in screenshot/snippet but assumed present or out of scope for now?
                      The snippet showed 'getSiteSettings, getTeamMembers...' but delete action isn't imported here?
                      Checking data-actions later if needed. For now sticking to update/add. 
                  */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{currentMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" defaultValue={currentMember?.name} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Input id="role" name="role" defaultValue={currentMember?.role} required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                            <Input id="linkedinUrl" name="linkedinUrl" defaultValue={currentMember?.linkedinUrl} type="url" placeholder="https://linkedin.com/in/..." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Short Description (Bio)</Label>
                            <Textarea id="bio" name="bio" defaultValue={currentMember?.bio} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="detailedDescription">Detailed Description</Label>
                            <Textarea id="detailedDescription" name="detailedDescription" defaultValue={currentMember?.detailedDescription} className="min-h-[150px]" placeholder="Full profile description for their specific page..." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Profile Image</Label>
                            <div className="flex gap-4 items-center">
                                {selectedImage && (
                                    <div className="relative h-16 w-16 overflow-hidden rounded-full border">
                                        <Image src={selectedImage} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit">Save Member</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
