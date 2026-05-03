'use client';
import { useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { handleResumeSubmission } from '@/app/actions';
import { Loader2, FileUp } from 'lucide-react';

const initialState: any = {
  message: '',
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><FileUp className="mr-2 h-4 w-4" /> Submit Resume</>}
    </Button>
  );
}

export default function ResumeSubmissionForm() {
    const { toast } = useToast();
    const [state, formAction] = useActionState(handleResumeSubmission, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast({
                    title: "Success!",
                    description: state.message,
                });
                formRef.current?.reset();
            } else {
                 toast({
                    variant: "destructive",
                    title: "Submission Failed",
                    description: state.message,
                });
            }
        }
    }, [state, toast]);

    return (
        <form ref={formRef} action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Anshuman Sahoo" required />
                {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2 relative">
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="xelaris@example.com"
                    required
                />
                 {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="resume">Resume (PDF, DOC, DOCX)</Label>
                <Input 
                    id="resume" 
                    name="resume" 
                    type="file" 
                    required 
                    accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                {state.errors?.resume && <p className="text-sm font-medium text-destructive">{state.errors.resume[0]}</p>}
            </div>
            <SubmitButton />
        </form>
    );
}
