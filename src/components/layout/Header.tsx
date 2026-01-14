"use client";

import Link from "next/link";
import Image from "next/image";
import schoolLogo from "@/assets/school-logo.png";
import * as React from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle as DTitle, DialogDescription as DDesc } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
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
import { AnnouncementMarquee } from "./AnnouncementMarquee";
import type { Announcement } from "@/lib/definitions";

import { getCMSNotices } from "@/lib/cms-fetch";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Shaping Minds. Building Futures. | Admissions Open 2026–27",
    content: "Admissions Open",
    date: "2026-03-01",
    isUrgent: true
  }
];

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/about/overview",
    children: [
      { title: "Overview", href: "/about/overview", description: "Learn more about our mission and values." },
      { title: "Vision & Mission", href: "/about/vision", description: "Our guiding principles and aspirations." },
      { title: "Principal's Message", href: "/about/principal", description: "Guidance from our academic leader." },
      { title: "Management & Committee", href: "/about/management", description: "Meet our dedicated leadership team." },
      { title: "Student Achievements", href: "/about/achievements", description: "Celebrating the successes of our students." },
    ],
  },
  {
    title: "Academics",
    href: "/academics",
    children: [
      { title: "Curriculum", href: "/academics#curriculum", description: "Our comprehensive and engaging learning framework." },
      { title: "Teaching Methodology", href: "/academics#methodology", description: "Innovative approaches to foster effective learning." },
      { title: "Faculty", href: "/academics#faculty", description: "Meet our experienced and passionate educators." },
      { title: "Learning Support", href: "/academics#support", description: "Dedicated resources for student success." },
      { title: "Career Guidance", href: "/academics#career", description: "Empowering students for future pathways." },
    ],
  },
  {
    title: "Admissions",
    href: "/admissions",
    children: [
      { title: "Admission Process", href: "/admissions#process", description: "Step-by-step guide to joining our school." },
      { title: "Fee Structure", href: "/admissions#fees", description: "Transparent details on tuition and other charges." },
      { title: "Scholarships", href: "/admissions#scholarships", description: "Opportunities for deserving students." },
      { title: "FAQs", href: "/admissions#faqs", description: "Answers to commonly asked questions." },
      { title: "Schedule a Tour", href: "/tour", description: "Book a personalized campus visit." },
    ],
  },
  {
    title: "Beyond Academics",
    href: "/beyond-academics",
    children: [
      { title: "Dream Path", href: "/dream-path", description: "Discover your path to future success." },
      { title: "Sports", href: "/beyond-academics#sports", description: "Excellence in physical development and teamwork." },
      { title: "Co-Curricular", href: "/beyond-academics#co-curricular", description: "Creative, innovative and self-expression activities." },
      { title: "Personality Development", href: "/beyond-academics#personality", description: "Shaping confident and compassionate individuals." },
      { title: "Mentorship", href: "/beyond-academics#mentorship", description: "Guidance and support for every student." },
    ],
  },
  {
    title: "News & Events",
    href: "/news-events",
    children: [
      { title: "Notice Board", href: "/notices", description: "All official circulars and updates." },
      { title: "Latest News", href: "/news-events#news", description: "Stay updated with the latest happenings." },
      { title: "Upcoming Events", href: "/news-events#events", description: "Calendar of school activities and programs." },
      { title: "Gallery", href: "/news-events#gallery", description: "Visual memories of school life." },
    ],
  },
  { title: "Downloads", href: "/downloads" },
  { title: "Contact Us", href: "/contact" },
];

// ... imports

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);

  const isHomePage = pathname === "/";

  useEffect(() => {
    // Disabled CMS fetch to ensure 2026-27 consistency as per new requirements
    /*
    const fetchNotices = async () => {
      try {
        const notices = await getCMSNotices();
        if (notices.length > 0) {
          const mapped = notices.map(n => ({
            id: n.id.toString(),
            title: n.text,
            content: n.text,
            date: n.date,
            isUrgent: n.isImportant
          }));
          setAnnouncements(mapped);
        } else {
          setAnnouncements(mockAnnouncements);
        }
      } catch (e) {
        console.error(e);
        setAnnouncements(mockAnnouncements);
    } catch (e) {
      console.error(e);
      setAnnouncements(mockAnnouncements);
    } finally {
      setLoadingAnnouncements(false);
    }
  };
  fetchNotices();
  */
    setAnnouncements(mockAnnouncements);
    setLoadingAnnouncements(false);
  }, []);

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
          ? "bg-navy/95 border-b border-gold/20 shadow-sm"
          : "bg-navy text-white border-b border-transparent"
      )}
    >
      <AnnouncementMarquee announcements={announcements} isLoading={loadingAnnouncements} />
      <TopBar isTransparent={false} />
      <div className="container mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6 py-2">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0 overflow-hidden">
            <Image src={schoolLogo}
              alt="Sia Khargone Logo"
              fill
              className="object-contain"
              priority />
          </div>

          <div className="flex flex-col justify-center">
            <span className="font-display font-bold text-xl md:text-2xl leading-none tracking-wide text-white">SANSKAR</span>
            <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] text-white/80">International Academy</span>
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

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white hover:bg-white/10"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Search Overlay */}
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogContent className="sm:max-w-[600px] top-[20%] translate-y-0 p-0 overflow-hidden bg-white">
              <VisuallyHidden>
                <DTitle>Search Site</DTitle>
                <DDesc>Search for news, notices, and other content.</DDesc>
              </VisuallyHidden>
              <div className="flex items-center border-b px-4">
                <Search className="mr-2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search news, notices, TCs..."
                  className="flex-1 border-0 shadow-none focus-visible:ring-0 text-lg h-16"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {(searchResults.length > 0 || isSearching) && (
                <div className="max-h-[60vh] overflow-y-auto p-2">
                  {isSearching ? (
                    <div className="p-4 text-center text-muted-foreground">Searching...</div>
                  ) : (
                    <div className="grid gap-1">
                      {searchResults.map((result, i) => (
                        <Link
                          key={i}
                          href={result.url}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex flex-col px-4 py-3 hover:bg-muted rounded-md transition-colors"
                        >
                          <span className="font-medium text-navy">{result.title}</span>
                          <span className="text-sm text-muted-foreground flex items-center justify-between">
                            {result.description}
                            <Badge variant="secondary" className="text-[10px] h-5">{result.type}</Badge>
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

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
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 bg-white text-foreground flex flex-col h-full border-l-gold/20">
              <SheetHeader className="p-6 border-b border-gray-100 bg-gray-50/50">
                <VisuallyHidden>
                  <SheetTitle>Main Menu</SheetTitle>
                  <SheetDescription>
                    Navigation links for the Sanskar International Academy website.
                  </SheetDescription>
                </VisuallyHidden>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden">
                    <Image src={schoolLogo}
                      alt="Sia Khargone Logo"
                      fill
                      className="object-contain"
                      priority />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display font-bold text-xl leading-none tracking-tight text-navy">SANSKAR</span>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-gray-500">International Academy</span>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <nav className="flex flex-col gap-2">
                  <Link href="/" onClick={() => setIsOpen(false)} className={cn("py-4 text-lg font-bold font-display border-b border-gray-100 transition-colors", pathname === "/" ? "text-primary" : "text-navy hover:text-primary")}>
                    Home
                  </Link>
                  <Accordion type="single" collapsible className="w-full">
                    {navItems.filter(item => item.href !== "/").map((item) => (
                      !item.children ? (
                        <SheetClose asChild key={item.title}>
                          <Link
                            href={item.href}
                            onClick={(e) => {
                              handleLinkClick(e, item.href);
                            }}
                            className={cn(
                              "flex w-full py-4 text-lg font-bold font-display border-b border-gray-100 transition-colors",
                              ((isHomePage && activeSection && item.href.includes(activeSection)) || pathname === item.href) ? "text-primary" : "text-navy hover:text-primary"
                            )}
                          >
                            {item.title}
                          </Link>
                        </SheetClose>
                      ) : (
                        <AccordionItem key={item.title} value={item.title} className="border-b border-gray-100">
                          <AccordionTrigger className={cn("py-4 text-lg font-bold font-display hover:no-underline", (pathname.startsWith(item.href)) ? "text-primary" : "text-navy hover:text-primary")}>
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-1 px-2">
                            <div className="flex flex-col gap-2 border-l-2 border-gold/30 pl-4 ml-1">
                              {item.children.map(child => (
                                <SheetClose asChild key={child.title}>
                                  <Link
                                    href={child.href}
                                    onClick={(e) => handleLinkClick(e, child.href)}
                                    className="py-2 text-base font-medium text-gray-600 hover:text-navy block transition-colors"
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
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50/50 mt-auto">
                <Button asChild className="w-full bg-gold hover:bg-gold-dark text-navy font-bold shadow-md" size="lg">
                  <Link href="/admissions" onClick={() => setIsOpen(false)}>Admissions</Link>
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  © {new Date().getFullYear()} Sanskar International Academy
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
