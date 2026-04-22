
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import QuotePopover from "@/components/quote-popover";
import Logo from "../icons/logo";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
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
              <div className="relative h-full w-8 mr-full">
                <img src={logoUrl} alt="Logo" className="object-contain h-full w-full" />
              </div>
            ) : (
              <Logo className="h-full w-full" />
            )}
            {/* <span className="text-2xl font-bold text-primary">elaris</span> */}
          </Link>

          <nav className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                data-active={pathname === item.href}
                className="nav-link-hover text-sm font-medium text-foreground/70 transition-colors hover:text-primary data-[active=true]:text-primary"
              >
                {item.name}
              </Link>
            ))}
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
                      <Logo className="h-8 w-8" />
                      <span className="text-2xl font-bold text-primary">
                        elaris
                      </span>
                    </Link>
                  </div>
                  <nav className="mt-8 flex flex-col gap-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={handleLinkClick}
                        className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-8">
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
