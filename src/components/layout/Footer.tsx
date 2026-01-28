"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { schoolData } from "@/data/schoolData";
import dynamic from "next/dynamic";

const FooterMap = dynamic(() => import("@/components/common/FooterMap"), {
  loading: () => <div className="w-full h-full bg-navy-light animate-pulse" />,
  ssr: false,
});

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.2
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <motion.footer
      className="bg-navy pt-12" // Outer background
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* The Rounded Card Footer */}
      <div className="bg-navy-dark rounded-t-[3rem] border-t-4 border-gold text-white px-6 pt-20 pb-10 shadow-2xl mx-auto w-full">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-white/10 pb-12">

            {/* Column 1: Brand & About (4 cols) */}
            <div className="lg:col-span-4 space-y-6 pr-4">
              <div className="flex flex-col">
                <span className="font-display font-bold text-5xl text-white tracking-tight">SANSKAR</span>
                <span className="font-sans text-sm uppercase tracking-[0.3em] text-gold/90 font-semibold">International Academy</span>
              </div>
              <p className="text-white/80 text-base leading-relaxed max-w-sm">
                A premier CBSE institution committed to nurturing global citizens through a blend of academic excellence, cultural values, and modern innovation.
              </p>

              <div className="flex gap-4 pt-6">
                <a href={schoolData.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="p-3 rounded-full bg-white/10 text-gold hover:bg-gold hover:text-navy transition-all group scale-110"><Facebook className="h-6 w-6" /></a>
                <a href={schoolData.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram profile" className="p-3 rounded-full bg-white/10 text-gold hover:bg-gold hover:text-navy transition-all group scale-110"><Instagram className="h-6 w-6" /></a>
                <a href={schoolData.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel" className="p-3 rounded-full bg-white/10 text-gold hover:bg-gold hover:text-navy transition-all group scale-110"><Youtube className="h-6 w-6" /></a>
              </div>
            </div>

            {/* Column 2: Quick Links (2 cols) */}
            <div className="lg:col-span-2">
              <h3 className="font-display font-bold text-xl text-white mb-8 border-b-4 border-gold inline-block pb-2">Explore</h3>
              <ul className="space-y-4 text-base font-medium text-white/70">
                <li><Link href="/about" className="hover:text-gold hover:pl-2 transition-all duration-300 inline-block">Our Story</Link></li>
                <li><Link href="/academics" className="hover:text-gold hover:pl-2 transition-all duration-300 inline-block">Academics</Link></li>
                <li><Link href="/gallery" className="hover:text-gold hover:pl-2 transition-all duration-300 inline-block">Campus Life</Link></li>
                <li><Link href="/faculty" className="hover:text-gold hover:pl-2 transition-all duration-300 inline-block">Faculty</Link></li>
                <li><Link href="/contact" className="hover:text-gold hover:pl-2 transition-all duration-300 inline-block">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Important Links (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="font-display font-bold text-xl text-white mb-8 border-b-4 border-gold inline-block pb-2">Important Links</h3>
              <ul className="space-y-4 text-base font-medium text-white/70">
                <li><Link href="/downloads" className="hover:text-gold transition-colors inline-block flex items-center gap-2 hover:translate-x-1 duration-300"><span className="w-2 h-2 rounded-full bg-gold"></span>Downloads Area</Link></li>
                <li><Link href="/mandatory-disclosure" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-300">Mandatory Disclosure</Link></li>
                <li><Link href="/admissions" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-300">Admissions Process</Link></li>
                <li><Link href="/fees" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-300">Pay Fees Online</Link></li>
                <li><Link href="/tc" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-300">Transfer Certificate (TC)</Link></li>
                <li><Link href="/results" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-300">Student Results</Link></li>
                <li><Link href="/careers" className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-300">Careers</Link></li>
              </ul>
            </div>

            {/* Column 4: Location Map (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="font-display font-bold text-xl text-white mb-8 border-b-4 border-gold inline-block pb-2">Visit Campus</h3>

              {/* Larger Map Style from Contact Page */}
              <div className="rounded-2xl overflow-hidden border-2 border-white/20 h-48 w-full bg-navy-light relative group shadow-lg">
                <FooterMap src={schoolData.contact.googleMapLink + "&output=embed"} />
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 text-base text-white/80">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <span>{schoolData.contact.address}</span>
                </div>
                <div className="flex items-center gap-3 text-base text-white/80">
                  <Phone className="w-5 h-5 text-gold shrink-0" />
                  <a href={`tel:${schoolData.contact.phone[0]}`} className="hover:text-white">{schoolData.contact.phone[0]}</a>
                </div>
                <div className="flex items-center gap-3 text-base text-white/80">
                  <Mail className="w-5 h-5 text-gold shrink-0" />
                  <a href="mailto:siakhargone@gmail.com" className="hover:text-white">siakhargone@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-white/40">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <p>© {new Date().getFullYear()} Sanskar International Academy. All Rights Reserved.</p>
              <p className="hidden md:block">|</p>
              <p>Last Updated: {new Date().toLocaleString('default', { month: 'short', year: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Use</Link>
              <span className="flex items-center gap-1">
                Managed by <a href="https://bynn.vercel.app/" target="_blank" className="text-gold hover:underline font-bold">Emitra technologies</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
