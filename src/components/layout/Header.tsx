"use client";

import Link from "next/link";
import Image from "next/image";
// import schoolLogo from "@/assets/school-logo.png";
const schoolLogo = "https://res.cloudinary.com/dkits80xk/image/upload/v1768373239/school-logo_npmwwm.png";
import * as React from "react";
import { Menu, Search, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { trackEvent } from "@/lib/analytics";
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
    title: "Admissions", href: "/admissions", children: [
      { title: "Admission Process", href: "/admissions#process", description: "Step-by-step guide to joining our school.", iconName: "FileText" },
      { title: "Fee Structure", href: "/fees", description: "Transparent details on tuition and other charges.", iconName: "IndianRupee" },
      { title: "Scholarships", href: "/admissions#scholarships", description: "Opportunities for deserving students.", iconName: "GraduationCap" },
      { title: "FAQs", href: "/admissions#faqs", description: "Answers to commonly asked questions.", iconName: "HelpCircle" },
      { title: "Schedule a Tour", href: "/tour", description: "Book a personalized campus visit.", iconName: "MapPin" },
    ]
  },
  { title: "Contact Us", href: "/contact" },
  {
    title: "About Us",
    href: "/about/overview",
    children: [
      { title: "Overview", href: "/about/overview", description: "Learn more about our mission and values.", iconName: "Info" },
      { title: "Vision & Mission", href: "/about/vision", description: "Our guiding principles and aspirations.", iconName: "Eye" },
      { title: "Principal's Message", href: "/about/principal", description: "Guidance from our academic leader.", iconName: "User" },
      { title: "Management & Committee", href: "/about/management", description: "Meet our dedicated leadership team.", iconName: "Users" },
      { title: "Student Achievements", href: "/about/achievements", description: "Celebrating the successes of our students.", iconName: "Trophy" },
    ],
  },
  {
    title: "Academics",
    href: "/academics",
    children: [
      { title: "Curriculum", href: "/academics#curriculum", description: "Our comprehensive and engaging learning framework.", iconName: "BookOpen" },
      { title: "Teaching Methodology", href: "/academics#methodology", description: "Innovative approaches to foster effective learning.", iconName: "Lightbulb" },
      { title: "Faculty", href: "/academics#faculty", description: "Meet our experienced and passionate educators.", iconName: "GraduationCap" },
      { title: "Learning Support", href: "/academics#support", description: "Dedicated resources for student success.", iconName: "HeartHandshake" },
      { title: "Career Guidance", href: "/academics#career", description: "Empowering students for future pathways.", iconName: "Compass" },
    ],
  },
  {
    title: "Sports & Activities",
    href: "/beyond-academics",
    children: [
      { title: "Sports", href: "/beyond-academics#sports", description: "Excellence in physical development and teamwork.", iconName: "Trophy" },
      { title: "Co-Curricular", href: "/beyond-academics#co-curricular", description: "Creative, innovative and self-expression activities.", iconName: "Palette" },
      { title: "Personality Development", href: "/beyond-academics#personality", description: "Shaping confident and compassionate individuals.", iconName: "UserCheck" },
      { title: "Mentorship", href: "/beyond-academics#mentorship", description: "Guidance and support for every student.", iconName: "Users" },
    ],
  },
  {
    title: "Updates",
    href: "/news-events",
    children: [
      { title: "Notice Board", href: "/notices", description: "All official circulars and updates.", iconName: "ClipboardList" },
      { title: "Latest News", href: "/news-events#news", description: "Stay updated with the latest happenings.", iconName: "Newspaper" },
      { title: "Upcoming Events", href: "/news-events#events", description: "Calendar of school activities and programs.", iconName: "Calendar" },
      { title: "Gallery", href: "/news-events#gallery", description: "Visual memories of school life.", iconName: "Image" },
    ],
  },
  {
    title: "Forms & Documents",
    href: "/downloads",
    children: [
      { title: "Student Resources", href: "/downloads", description: "Forms, production calendars and study materials.", iconName: "Download" },
      { title: "Mandatory Disclosures", href: "/mandatory-disclosure", description: "Public disclosures and legal documents.", iconName: "ShieldCheck" },
    ]
  },
];

// ... imports

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const notices = await getCMSNotices();
        if (notices.length > 0) {
          const mapped = notices.map(n => ({
            id: n.id.toString(),
            title: n.text, // Use 'text' as that's what CMSNoticeItem has
            content: n.text,
            date: n.date,
            isUrgent: n.isImportant
          }));
          setAnnouncements(mapped);
        } else {
          setAnnouncements(mockAnnouncements);
        }
      } catch (e) {
        console.error("Failed to fetch notices for header:", e);
        setAnnouncements(mockAnnouncements);
      } finally {
        setLoadingAnnouncements(false);
      }
    };

    fetchNotices();
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
              alt=""
              fill
              className="object-contain"
              priority />
          </div>

          <div className="flex flex-col justify-center ml-1">
            <span className="font-display font-bold text-2xl md:text-3xl leading-none tracking-tight text-white mb-[2px]">SANSKAR</span>
            <div className="flex flex-col leading-none">
              <span className="font-sans text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.25em] text-gold/90">INTERNATIONAL</span>
              <span className="font-sans text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.25em] text-gold/90">ACADEMY</span>
            </div>
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
                    <NavigationMenuContent className={["Forms & Documents", "Updates"].includes(item.title) ? "right-0 left-auto" : ""}>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white text-foreground rounded-xl shadow-xl border border-gold/10">
                        {item.children.map((child) => (
                          <ListItem
                            key={child.title}
                            title={child.title}
                            href={child.href}
                            iconName={child.iconName}
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

        <div className="flex items-center gap-2 md:gap-4">

          {/* Sticky Header CTAs - Visible only when scrolled */}
          <div className={cn("hidden items-center gap-3 transition-all duration-300", isScrolled ? "flex" : "hidden opacity-0")}>
            <a href="tel:07049110104" onClick={() => trackEvent('phone_click', { location: 'sticky_header' })} className="bg-gold/10 hover:bg-gold/20 text-gold p-2 rounded-full transition-colors" aria-label="Call Us">
              <Phone className="h-4 w-4" />
            </a>
            <a href="https://wa.me/917049110104" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { location: 'sticky_header' })} className="bg-green-500/10 hover:bg-green-500/20 text-green-500 p-2 rounded-full transition-colors" aria-label="WhatsApp Us">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white hover:bg-white/10"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogContent className="sm:max-w-[550px] top-[20%] translate-y-0 p-0 overflow-hidden bg-white">
              <DialogTitle className="sr-only">Search Site</DialogTitle>
              <DialogDescription className="sr-only">Search for pages, sections, and resources.</DialogDescription>

              <div className="flex items-center border-b px-4 py-3">
                <Search className="mr-2 h-5 w-5 opacity-50 text-navy" />
                <input
                  placeholder="Search pages (e.g., Fees, Admissions)..."
                  className="flex h-10 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="max-h-[300px] overflow-y-auto p-2">
                {(() => {
                  const allItems = [
                    { title: "Home", href: "/", category: "Page" },
                    { title: "About Us", href: "/about/overview", category: "Page" },
                    { title: "Principal's Message", href: "/about/principal", category: "About" },
                    { title: "Admission Process", href: "/admissions", category: "Admissions" },
                    { title: "Apply Online", href: "/admissions", category: "Admissions" },
                    { title: "Fee Structure", href: "/fees", category: "Admissions" },
                    { title: "Academic Calendar", href: "/", category: "Academics" },
                    { title: "Gallery", href: "/gallery", category: "Media" },
                    { title: "Contact Us", href: "/contact", category: "Support" },
                    { title: "Careers", href: "/careers", category: "More" },
                    { title: "Mandatory Disclosure", href: "/mandatory-disclosure", category: "Legal" },
                  ];

                  // If query is empty, show Quick Links
                  if (!searchQuery.trim()) {
                    return (
                      <div className="px-2 py-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Quick Links</p>
                        <div className="grid gap-1">
                          {allItems.slice(3, 7).map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={() => setIsSearchOpen(false)}
                              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100 transition-colors"
                            >
                              <span className="text-sm font-medium text-navy">{item.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  const filtered = allItems.filter(item =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.category.toLowerCase().includes(searchQuery.toLowerCase())
                  );

                  if (filtered.length === 0) {
                    return <p className="p-4 text-center text-sm text-muted-foreground">No results found for "{searchQuery}".</p>;
                  }

                  return (
                    <div className="space-y-1">
                      {filtered.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center justify-between rounded-md px-4 py-3 hover:bg-gray-100 transition-colors group"
                        >
                          <span className="font-medium text-navy group-hover:text-gold-dark transition-colors">{item.title}</span>
                          <Badge variant="secondary" className="text-[10px] bg-gray-100 text-gray-500 group-hover:bg-white">{item.category}</Badge>
                        </Link>
                      ))}
                    </div>
                  );
                })()}
              </div>
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
              <SheetHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Main navigation for mobile devices</SheetDescription>
                </VisuallyHidden>
                <div className="flex items-center gap-3">
                  <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden">
                      <Image src={schoolLogo}
                        alt=""
                        fill
                        className="object-contain"
                        priority />
                    </div>
                    <div className="flex flex-col text-left ml-1">
                      <span className="font-display font-bold text-2xl leading-none tracking-tight text-navy mb-[2px]">SANSKAR</span>
                      <div className="flex flex-col leading-none">
                        <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gold-dark/90">INTERNATIONAL</span>
                        <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gold-dark/90">ACADEMY</span>
                      </div>
                    </div>
                  </Link>
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
    </header >
  );
}

export default Header;
