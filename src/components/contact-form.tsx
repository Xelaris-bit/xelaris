
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { handleContactFormSubmission } from "@/app/actions";
import { Loader2, Send } from "lucide-react";
import { Label } from "./ui/label";
import PhoneInput from 'react-phone-number-input';

interface ContactFormState {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    subject?: string[];
    message?: string[];
  };
  success: boolean;
}

const initialState: ContactFormState = {
  message: '',
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Send Message
    </Button>
  );
}

export default function ContactForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(handleContactFormSubmission, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [phoneValue, setPhoneValue] = useState<string | undefined>();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Message Sent!",
          description: state.message,
        });
        formRef.current?.reset();
        setPhoneValue(undefined);
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
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your Name" required />
        {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Your Email" required />
        {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Mobile Number</Label>
        <PhoneInput
          id="phone"
          name="phone"
          placeholder="Enter phone number"
          value={phoneValue}
          onChange={setPhoneValue}
          international
          countryCallingCodeEditable={false}
          limitMaxLength={true}
          suppressHydrationWarning
        />
        {state.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" placeholder="What Is This About?" required />
        {state.errors?.subject && <p className="text-sm font-medium text-destructive">{state.errors.subject[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Your Message..." rows={5} required />
        {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
