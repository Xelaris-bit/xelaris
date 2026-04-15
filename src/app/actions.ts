
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import ContactFormEmail from '@/components/emails/contact-form-email';
import ResumeSubmissionEmail from '@/components/emails/resume-submission-email';
import * as React from 'react';
import { isValidPhoneNumber } from 'libphonenumber-js';

// Using a small list of disposable domains to avoid dependency issues.
const disposableDomains = [
    'mailinator.com',
    'temp-mail.org',
    '10minutemail.com',
    'guerrillamail.com',
    'yopmail.com',
];

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const resumeSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    resume: z.any()
        .refine((file) => file?.size > 0, "A resume file is required.")
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
            ".pdf, .doc, and .docx files are accepted."
        ),
});

export async function handleResumeSubmission(prevState: any, formData: FormData) {
    const validatedFields = resumeSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        resume: formData.get('resume'),
    });

    if (!validatedFields.success) {
        return {
            message: 'Please correct the errors below.',
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }

    if (!process.env.RESEND_API_KEY) {
        return {
            message: 'Resend API key is not configured. Email not sent.',
            errors: {},
            success: false,
        };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, resume } = validatedFields.data;

    try {
        const resumeBuffer = Buffer.from(await resume.arrayBuffer());

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['contact.xelaris@gmail.com'],
            subject: `New Resume Submission from ${name}`,
            reply_to: email,
            react: React.createElement(ResumeSubmissionEmail, {
                name,
                email,
            }),
            attachments: [
                {
                    filename: resume.name,
                    content: resumeBuffer,
                    content_type: resume.type,
                },
            ],
        });

        if (error) {
            console.error('Resend error:', error);
            return {
                message: `There was an error submitting your resume. ${error.message}`,
                errors: {},
                success: false,
            };
        }

        return {
            message: 'Your resume has been submitted successfully!',
            errors: {},
            success: true,
        };

    } catch (e: any) {
        console.error('Submission error:', e);
        return {
            message: `Something went wrong. Please try again later. ${e.message}`,
            errors: {},
            success: false,
        };
    }
}

const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }).refine(email => {
        if (!email) return false;
        const localPart = email.split('@')[0].toLowerCase();
        const domain = email.split('@')[1].toLowerCase();
        
        // Block disposable domains
        if (disposableDomains.includes(domain)) return false;

        // Block generic/dummy local parts often used to bypass forms
        const dummyPatterns = /^(anything|test|testing|dummy|fake|example|abc|12345|user|name|email|yourname)$/;
        if (dummyPatterns.test(localPart)) return false;

        return true;
    }, {
        message: "Please provide a valid, real email address.",
    }),
    phone: z.string().min(1, { message: "Mobile number is required." }).refine(isValidPhoneNumber, { message: "Please enter a valid mobile number." }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function handleContactFormSubmission(prevState: any, formData: FormData) {
    const validatedFields = contactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            message: 'Please correct the errors below.',
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }

    if (!process.env.RESEND_API_KEY) {
        console.error('SERVER ACTION: RESEND_API_KEY is missing');
        return {
            message: 'Resend API key is not configured. Email not sent.',
            errors: {},
            success: false,
        };
    }
    console.log('SERVER ACTION: Found RESEND_API_KEY length:', process.env.RESEND_API_KEY.length);
    console.log('SERVER ACTION: Attempting to send email with Resend...');

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, subject, message, phone } = validatedFields.data;

    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['contact.xelaris@gmail.com'],
            subject: `New message from ${name}: ${subject}`,
            reply_to: email,
            react: React.createElement(ContactFormEmail, {
                name,
                email,
                phone,
                message,
            }),
        });

        if (error) {
            console.error('Resend error:', error);
            return {
                message: `There was an error sending your message. ${error.message}`,
                errors: {},
                success: false,
            };
        }

        return {
            message: "Thank you for your message! We'll get back to you soon.",
            errors: {},
            success: true,
        };

    } catch (e: any) {
        console.error('Submission error:', e);
        return {
            message: `Something went wrong. Please try again later. ${e.message}`,
            errors: {},
            success: false,
        };
    }
}
