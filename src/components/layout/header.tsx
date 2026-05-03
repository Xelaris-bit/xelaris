"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import QuotePopover from "@/components/quote-popover";
import Logo from "../icons/logo";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";
import { getServices } from "@/app/admin/data-actions";
import { getIcon } from "@/lib/icons";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our Tools", href: "/tools" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

const Header = ({ logoUrl }: { logoUrl?: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
  const [isMobileServicesExpanded, setIsMobileServicesExpanded] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDesktopServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesExpanded(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, toggle: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    } else if (e.key === "Escape") {
      setIsDesktopServicesOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/80 shadow-md backdrop-blur-lg"
            : "bg-white"
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-0.5">
            {logoUrl ? (
              <div className="flex items-center justify-center">
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="object-contain w-auto transition-all"
                  style={{ height: 'var(--logo-size, 40px)', maxHeight: '5rem' }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center" style={{ height: 'var(--logo-size, 40px)', maxHeight: '5rem' }}>
                <Logo className="h-full w-auto" />
              </div>
            )}
          </Link>

          <nav className="hidden md:flex md:items-center md:gap-4 lg:gap-6 relative">
            {navItems.map((item) => {
              if (item.name === "Services") {
                return (
                  <div
                    key={item.name}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setIsDesktopServicesOpen(true)}
                    onMouseLeave={() => setIsDesktopServicesOpen(false)}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        // Optional: if clicking "Services" should navigate to /services, 
                        // we can let it. If it should just open dropdown, we do e.preventDefault()
                        // Since it's a hover menu, clicking it directly should navigate.
                        setIsDesktopServicesOpen(false);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, () => setIsDesktopServicesOpen(!isDesktopServicesOpen))}
                      aria-expanded={isDesktopServicesOpen}
                      aria-haspopup="true"
                      data-active={pathname === item.href || pathname.startsWith('/services/')}
                      className="nav-link-hover flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors hover:text-primary data-[active=true]:text-primary py-4 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isDesktopServicesOpen && "rotate-180"
                        )}
                      />
                    </Link>

                    {/* Desktop Dropdown */}
                    <AnimatePresence>
                      {isDesktopServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full mt-[-8px] -translate-x-1/2 w-[500px] lg:w-[600px] bg-background/95 backdrop-blur-md shadow-2xl border border-border rounded-2xl overflow-hidden"
                        >
                          {/* Invisible bridge to keep hover state active between link and dropdown */}
                          <div className="absolute top-[-20px] left-0 w-full h-[20px] bg-transparent" />

                          <div className="p-4 grid grid-cols-2 gap-2">
                            {services.slice(0, 8).map((service: any) => {
                              const IconComponent = getIcon(service.icon);
                              return (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={() => setIsDesktopServicesOpen(false)}
                                  className="group flex items-start gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors"
                                >
                                  <div className="flex-shrink-0 mt-0.5 w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    {IconComponent && <IconComponent className="h-5 w-5" />}
                                  </div>
                                  <div className="flex flex-col flex-1 overflow-hidden">
                                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors antialiased">
                                      {service.title}
                                    </div>
                                    <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                                      {service.description}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="bg-muted/50 p-3 flex justify-center border-t border-border">
                            <Link
                              href="/services"
                              onClick={() => setIsDesktopServicesOpen(false)}
                              className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center gap-1 group antialiased transform-gpu"
                            >
                              Explore All Services
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  data-active={pathname === item.href}
                  className="nav-link-hover text-sm font-medium text-foreground/70 transition-colors hover:text-primary data-[active=true]:text-primary py-4 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <QuotePopover>
              <Button className="gradient-hover">
                Get Quotes
              </Button>
            </QuotePopover>
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-3/4 bg-background">
                <VisuallyHidden>
                  <SheetTitle>Mobile Navigation Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through the website pages using these links.
                  </SheetDescription>
                </VisuallyHidden>
                <div className="flex h-full flex-col">
                  <div className="border-b pb-4 pr-6">
                    <Link
                      href="/"
                      onClick={handleLinkClick}
                      className="flex items-center gap-0.5"
                    >
                      {logoUrl ? (
                        <div className="relative flex items-center justify-center mr-2" style={{ height: 'var(--logo-size, 40px)', maxHeight: '100%' }}>
                          <img src={logoUrl} alt="Logo" className="object-contain h-full w-auto max-w-[160px]" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center" style={{ height: 'var(--logo-size, 40px)', maxHeight: '100%' }}>
                          <Logo className="h-full w-auto" />
                        </div>
                      )}
                    </Link>
                  </div>

                  {/* Mobile Navigation List */}
                  <nav className="mt-6 flex flex-col gap-4 overflow-y-auto pb-4">
                    {navItems.map((item) => {
                      if (item.name === "Services") {
                        return (
                          <div key={item.name} className="flex flex-col">
                            <button
                              onClick={() => setIsMobileServicesExpanded(!isMobileServicesExpanded)}
                              aria-expanded={isMobileServicesExpanded}
                              className="flex items-center justify-between text-lg font-medium text-foreground/80 transition-colors hover:text-primary py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                            >
                              {item.name}
                              <ChevronDown
                                className={cn(
                                  "h-5 w-5 text-muted-foreground transition-transform duration-300",
                                  isMobileServicesExpanded && "rotate-180"
                                )}
                              />
                            </button>
                            <AnimatePresence>
                              {isMobileServicesExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden flex flex-col pl-4 mt-2 gap-3 border-l-2 border-primary/20"
                                >
                                  {services.map((service: any) => (
                                    <Link
                                      key={service.slug}
                                      href={`/services/${service.slug}`}
                                      onClick={handleLinkClick}
                                      className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-1"
                                    >
                                      {service.title}
                                    </Link>
                                  ))}
                                  <Link
                                    href="/services"
                                    onClick={handleLinkClick}
                                    className="text-base font-semibold text-primary hover:text-accent transition-colors py-1 flex items-center gap-1"
                                  >
                                    View All Services <ArrowRight className="h-4 w-4" />
                                  </Link>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={handleLinkClick}
                          className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-auto pt-8 pb-4">
                    <QuotePopover isMobile>
                      <Button
                        className="w-full gradient-hover"
                      >
                        Get Quotes
                      </Button>
                    </QuotePopover>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
