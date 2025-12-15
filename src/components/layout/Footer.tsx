"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, User, Youtube } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="bg-navy-dark rounded-t-[3rem] border-t-4 border-gold text-white px-6 pt-16 pb-8 shadow-2xl mx-auto w-full">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            {/* Column 1: Brand */}
            <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-display font-bold text-3xl leading-none tracking-wide text-white">SANSKAR</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/60">International Academy</span>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                Sanskar International Academy commits to academic excellence, holistic growth, and ethical values.
              </p>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="font-display font-bold text-xl text-white mb-6">Quick Links</h3>
              <ul className="space-y-4 text-sm font-medium text-white/70">
                <li><Link href="/" className="hover:text-gold transition-colors block">Home</Link></li>
                <li><Link href="/about" className="hover:text-gold transition-colors block">About Us</Link></li>
                <li><Link href="/admissions" className="hover:text-gold transition-colors block">Admissions</Link></li>
                <li><Link href="/contact" className="hover:text-gold transition-colors block">Contact</Link></li>
              </ul>
            </motion.div>

            {/* Column 3: Resources/Contest */}
            <motion.div variants={itemVariants}>
              <h3 className="font-display font-bold text-xl text-white mb-6">Resources</h3>
              <ul className="space-y-4 text-sm font-medium text-white/70">
                <li><Link href="/gallery" className="hover:text-gold transition-colors block">Gallery</Link></li>
                <li><Link href="/academics" className="hover:text-gold transition-colors block">Academics</Link></li>
                <li><Link href="/life-at-sia" className="hover:text-gold transition-colors block">Life at SIA</Link></li>
                <li><Link href="/best-school-in-khargone" className="text-gold/80 hover:text-gold transition-colors block font-bold text-xs mt-2 uppercase tracking-wider">Why SIA is #1?</Link></li>
              </ul>
            </motion.div>

            {/* Column 4: Address */}
            <motion.div variants={itemVariants}>
              <h3 className="font-display font-bold text-xl text-white mb-6">Address</h3>
              <ul className="space-y-5 text-sm text-white/70">
                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-2 rounded-full shrink-0">
                    <Phone className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <a href="tel:+917049110104" className="hover:text-gold transition-colors">+91 70491 10104</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-2 rounded-full shrink-0">
                    <MapPin className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <span>Gowadi Fata , Khargone - Khandwa Hwy,Badgaon [Nagjhiri]</span>
                  </div>
                </li>
              </ul>

              {/* Socials */}
              <div className="flex gap-4 mt-8">
                <a href="https://www.facebook.com/siakhargone/" target="_blank" rel="noopener noreferrer" className="bg-white text-navy p-2 rounded-full hover:bg-gold hover:text-white transition-all flex items-center justify-center"><Facebook className="h-5 w-5" /></a>
                <a href="https://www.instagram.com/sanskarinternationalacademy/?hl=en" target="_blank" rel="noopener noreferrer" className="bg-white text-navy p-2 rounded-full hover:bg-gold hover:text-white transition-all flex items-center justify-center"><Instagram className="h-5 w-5" /></a>
                <a href="https://www.youtube.com/channel/UCZJ-rKvV_Ln5qWgJs0iBnEw" target="_blank" rel="noopener noreferrer" className="bg-white text-navy p-2 rounded-full hover:bg-gold hover:text-white transition-all flex items-center justify-center"><Youtube className="h-5 w-5" /></a>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
            <p>© {new Date().getFullYear()} SIA Khargone. All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-0 w-full md:w-auto">
              <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Note</Link>
              <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
              <div className="hidden md:block w-px h-4 bg-white/20"></div>
              <a href="https://bynn.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors text-white/40">Built & Managed by BYN Agency</a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
