
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { motion } from "framer-motion";

const ContactSection = ({ settings }: { settings?: any }) => {
    return (
        <section id="contact-form" className="w-full py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-20 text-center">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-6"
                    >
                        Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Future Creators</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        Fill out the form below or use the contact details to get in touch.
                    </motion.p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-20 duration-1000">
                        <div>
                            <h3 className="text-2xl font-semibold">Get In Touch</h3>
                            <p className="text-muted-foreground mt-2">Find us at our office or reach out via email or phone.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-accent mt-1" />
                                <div>
                                    <h4 className="font-semibold">Our Office</h4>
                                    <p className="text-muted-foreground">{settings?.address || "89, Kulasukarpada, Cuttack City, 754209"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-accent mt-1" />
                                <div>
                                    <h4 className="font-semibold">Email Us</h4>
                                    <a href={`mailto:${settings?.contactEmail || "contact.xelaris@gmail.com"}`} className="text-muted-foreground hover:text-primary">{settings?.contactEmail || "contact.xelaris@gmail.com"}</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-accent mt-1" />
                                <div>
                                    <h4 className="font-semibold">Call Us</h4>
                                    <a href={`tel:${settings?.phoneNumber || "+919776198414"}`} className="text-muted-foreground hover:text-primary">{settings?.phoneNumber || "+91 9776198414"}</a>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg overflow-hidden border">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d478573.39203724137!2d85.74487751531404!3d20.430062772367847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a197d8a91ad8c5f%3A0xd12ad111b7dcfd88!2sLaxminarayan%20Temple!5e0!3m2!1sen!2sin!4v1758165482095!5m2!1sen!2sin"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full"
                            ></iframe>
                        </div>
                    </div>
                    <Card className="animate-in fade-in slide-in-from-right-20 duration-1000" style={{ animationDelay: '200ms' }}>
                        <CardHeader>
                            <CardTitle>Send A Message</CardTitle>
                            <CardDescription>We'll get back to you as soon as possible.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ContactForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
