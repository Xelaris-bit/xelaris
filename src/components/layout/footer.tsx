import { Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Logo from "../icons/logo";

import { getSiteMedia } from "@/app/admin/data-actions";

const Footer = async () => {
  const media = await getSiteMedia();
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-0.5 mb-2">
              {logoUrl ? (
                <div className="relative mr-2 flex items-start justify-start h-12 sm:h-16">
                  <img src={logoUrl} alt="Logo" className="object-contain h-full w-auto max-w-[200px]" />
                </div>
              ) : (
                <Logo className="h-12 sm:h-16 w-auto" />
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
              <li className="space-y-2">
                <a
                  href="https://maps.app.goo.gl/ZqeEXR2WJ1yJL5CE7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  89, Kulasukarpada, Cuttack, Odisha, India, 754209
                </a>
              </li>
              <li className="space-y-2">
                <a
                  href="mailto:contact.xelaris@gmail.com"
                  className="hover:text-accent"
                >
                  contact.xelaris@gmail.com
                </a>
              </li>
              <li className="space-y-2">
                <a href="tel:+919776198414" className="hover:text-accent">
                  +91 9776198414
                </a>
              </li>
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
