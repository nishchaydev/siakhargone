"use client";

import Link from "next/link";
import Image from "next/image";
import schoolLogo from "@/assets/school-logo.png";
import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { NavItem } from "@/lib/definitions";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import { useActiveSection } from "@/hooks/use-active-section";
import { ListItem } from "./ListItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/about",
    children: [
      { title: "Overview", href: "/about#overview", description: "Learn more about our mission and values." },
      { title: "From Our Principal’s Desk", href: "/about#principal", description: "A message from our school principal." },
      { title: "Words of Wisdom", href: "/about#chairman", description: "A message from our chairman." },
      { title: "Student Achievements", href: "/about#achievements", description: "Celebrating the successes of our students." },
    ],
  },
  {
    title: "Academics",
    href: "/academics",
    children: [
      { title: "Curriculum", href: "/academics#curriculum", description: "Explore our comprehensive curriculum." },
      { title: "Infrastructure", href: "/academics#infrastructure", description: "Discover our state-of-the-art facilities." },
      { title: "Methodology", href: "/academics#methodology", description: "Our approach to teaching and learning." },
    ],
  },
  {
    title: "Life at SIA",
    href: "/life-at-sia",
    children: [
      { title: "Why Study at SIA", href: "/life-at-sia#why-sia", description: "Discover the benefits of joining our community." },
      { title: "Learning Methodology", href: "/life-at-sia#learning", description: "Our innovative approach to education." },
      { title: "A Day in the Life of SIA", href: "/gallery", description: "A glimpse into daily life at our school." },
    ],
  },
  {
    title: "Beyond School",
    href: "/beyond-school",
    children: [
      { title: "Sports", href: "/beyond-school#sports", description: "Excellence in physical development and teamwork." },
      { title: "Co-Curricular", href: "/beyond-school#co-curricular", description: "Creative, innovative and self-expression activities." },
      { title: "Personality Development", href: "/beyond-school#personality", description: "Shaping confident and compassionate individuals." },
      { title: "Mentorship", href: "/beyond-school#mentorship", description: "Guidance and support for every student." },
    ],
  },
  {
    title: "Admissions",
    href: "/admissions",
    children: [
      { title: "Career Counselling", href: "/admissions#career", description: "Guidance for a purposeful future." },
      { title: "Your Child’s Journey Begins Here", href: "/admissions#process", description: "Step-by-step guide to join our school." },
      { title: "Student TC Search", href: "/admissions#tc", description: "Find Transfer Certificates for students." },
      { title: "Mandatory Disclosure", href: "/admissions#disclosure", description: "Important information and disclosures." },
    ],
  },
  { title: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        if (currentScrollY > lastScrollY.current + 10) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current - 10) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 10);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const activeSection = useActiveSection(
    isHomePage
      ? navItems.flatMap(item => item.children ? item.children.map(c => c.href.substring(c.href.indexOf('#') + 1)) : [item.href.substring(1)]).filter(Boolean)
      : []
  );

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const url = new URL(href, window.location.origin);
    if (url.pathname === pathname && url.hash) {
      e.preventDefault();
      const element = document.getElementById(url.hash.substring(1));
      if (element) {
        const yOffset = -80; // Header height offset
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 backdrop-blur-md",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled
          ? "bg-royal-blue/95 border-b border-white/10 shadow-sm py-3"
          : "bg-royal-blue text-white py-5"
      )}
    >
      <TopBar isTransparent={false} />
      <div className="container mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0 overflow-hidden">
            <Image
              src={schoolLogo}
              alt="Sia Khargone Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-display font-bold text-2xl leading-none tracking-wide text-white">SANSKAR</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/80">International School</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger
                      className={cn(navigationMenuTriggerStyle(), "bg-transparent font-sans font-semibold text-white", `hover:text-accent focus:bg-accent/10`,
                        (pathname.startsWith(item.href)) ? `font-bold text-accent` : ""
                      )}
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white text-foreground">
                        {item.children.map((child) => (
                          <ListItem
                            key={child.title}
                            title={child.title}
                            href={child.href}
                            onClick={(e) => handleLinkClick(e, child.href)}
                          >
                            {child.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={cn(navigationMenuTriggerStyle(), "bg-transparent font-sans font-semibold text-white", `hover:text-accent`,
                        ((isHomePage && activeSection && item.href.includes(activeSection)) || pathname === item.href) ? `font-bold text-accent` : ""
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden lg:flex" size="sm">
            <Link href="/contact">Enquire Now</Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("lg:hidden", "text-white hover:text-white hover:bg-white/10")}
                aria-label="Toggle Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 bg-white text-foreground">
              <SheetHeader>
                <VisuallyHidden>
                  <SheetTitle>Main Menu</SheetTitle>
                  <SheetDescription>
                    Navigation links for the Sanskar International Academy website.
                  </SheetDescription>
                </VisuallyHidden>
              </SheetHeader>
              <div className="p-4 pt-8">
                <Link href="/" className="mb-8 flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <span className="font-bold text-foreground font-headline text-lg">Sanskar Academy</span>
                </Link>
                <nav className="mt-8 flex flex-col">
                  <Accordion type="single" collapsible className="w-full">
                    {navItems.map((item) => (
                      !item.children ? (
                        <SheetClose asChild key={item.title}>
                          <Link
                            href={item.href}
                            onClick={(e) => {
                              handleLinkClick(e, item.href);
                            }}
                            className={cn(
                              "py-3 text-lg font-medium border-b",
                              ((isHomePage && activeSection && item.href.includes(activeSection)) || pathname === item.href) ? "text-primary" : "text-muted-foreground"
                            )}
                          >
                            {item.title}
                          </Link>
                        </SheetClose>
                      ) : (
                        <AccordionItem key={item.title} value={item.title} className="border-b">
                          <AccordionTrigger className={cn("py-3 text-lg font-medium no-underline hover:no-underline", (pathname.startsWith(item.href)) ? "text-primary" : "text-muted-foreground")}>
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent className="pl-4">
                            <div className="flex flex-col gap-4 mt-2">
                              {item.children.map(child => (
                                <SheetClose asChild key={child.title}>
                                  <Link
                                    href={child.href}
                                    onClick={(e) => handleLinkClick(e, child.href)}
                                    className="text-base text-muted-foreground"
                                  >
                                    {child.title}
                                  </Link>
                                </SheetClose>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    ))}
                  </Accordion>
                </nav>
                <Button asChild className="mt-8 w-full">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>Enquire Now</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
