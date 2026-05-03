import { Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Logo from "../icons/logo";

import { getSiteMedia, getSiteSettings } from "@/app/admin/data-actions";

const Footer = async () => {
  const media = await getSiteMedia();
  const settings = await getSiteSettings();
  const logoUrl = media['footer-logo']?.data || media['logo']?.data;

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ];

  const socialIcons = [
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    { icon: <Youtube className="h-5 w-5" />, href: "#" },
  ];

  return (
    <footer id="footer" className="bg-[#071436] text-primary-foreground relative">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-[1.5fr_0.8fr_1.2fr_1fr]">
          <div className="lg:pr-8">
            <Link href="/" className="flex items-center gap-0.5 mb-2">
              {logoUrl ? (
                <div className="relative mr-2 flex items-center justify-start" style={{ height: 'var(--logo-size, 64px)' }}>
                  <img src={logoUrl} alt="Logo" className="object-contain h-full w-auto max-w-[200px]" />
                </div>
              ) : (
                <div className="flex items-center justify-start" style={{ height: 'var(--logo-size, 64px)' }}>
                  <Logo className="h-full w-auto" />
                </div>
              )}
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Your expert partner for innovative software solutions across multiple domains, driving excellence and growth.
            </p>
          </div>
          <div>
            <h3 className="gradient-underline relative pb-2 text-lg font-semibold tracking-wider text-accent">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-accent"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="gradient-underline relative pb-2 text-lg font-semibold tracking-wider text-accent">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              {settings?.addresses && settings.addresses.length > 0 ? (
                settings.addresses.map((address: any, index: number) => (
                  <li key={`address-${index}`} className="space-y-2">
                    <a
                      href={address.mapsUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent"
                    >
                      {address.addressLine1}
                      {address.addressLine2 && <><br />{address.addressLine2}</>}
                    </a>
                  </li>
                ))
              ) : (
                <li className="space-y-2">
                  <a
                    href="https://maps.app.goo.gl/ZqeEXR2WJ1yJL5CE7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    89, Kulasukarpada, Cuttack, Odisha,<br />
                    India, 754209
                  </a>
                </li>
              )}

              {settings?.contactEmails && settings.contactEmails.length > 0 ? (
                settings.contactEmails.map((email: string, index: number) => (
                  <li key={`email-${index}`} className="space-y-2">
                    <a
                      href={`mailto:${email}`}
                      className="hover:text-accent break-all"
                    >
                      {email}
                    </a>
                  </li>
                ))
              ) : (
                <li className="space-y-2">
                  <a
                    href="mailto:contact.xelaris@gmail.com"
                    className="hover:text-accent break-all"
                  >
                    contact.xelaris@gmail.com
                  </a>
                </li>
              )}

              {settings?.phoneNumbers && settings.phoneNumbers.length > 0 ? (
                settings.phoneNumbers.map((phone: string, index: number) => (
                  <li key={`phone-${index}`} className="space-y-2">
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-accent break-all">
                      {phone}
                    </a>
                  </li>
                ))
              ) : (
                <li className="space-y-2">
                  <a href="tel:+919776198414" className="hover:text-accent break-all">
                    +91 9776198414
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="md:col-span-3 lg:col-span-1">
            <h3 className="gradient-underline relative pb-2 text-lg font-semibold tracking-wider text-accent">
              Follow Us
            </h3>
            <div className="mt-4 flex space-x-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-primary-foreground/10 p-2 text-primary-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {social.icon}
                  <span className="sr-only">
                    {social.href.includes("twitter")
                      ? "Twitter"
                      : social.href.includes("linkedin")
                        ? "LinkedIn"
                        : "YouTube"}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Xelaris. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
