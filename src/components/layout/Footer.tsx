"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
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
      <div className="bg-navy-dark rounded-t-[3rem] border-t-4 border-gold text-white px-6 pt-20 pb-10 shadow-2xl mx-auto w-full">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-white/10 pb-12">

            {/* Column 1: Brand & About (4 cols) */}
            <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6 pr-4">
              <div className="flex flex-col">
                <span className="font-display font-bold text-4xl text-white tracking-tight">SANSKAR</span>
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold/80">International Academy</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                A premier CBSE institution committed to nurturing global citizens through a blend of academic excellence, cultural values, and modern innovation.
              </p>

              <div className="flex gap-4 pt-4">
                <a href="https://www.facebook.com/siakhargone/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-gold hover:text-navy transition-all group"><Facebook className="h-5 w-5" /></a>
                <a href="https://www.instagram.com/sanskarinternationalacademy/?hl=en" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-gold hover:text-navy transition-all group"><Instagram className="h-5 w-5" /></a>
                <a href="https://www.youtube.com/channel/UCZJ-rKvV_Ln5qWgJs0iBnEw" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-gold hover:text-navy transition-all group"><Youtube className="h-5 w-5" /></a>
              </div>
            </motion.div>

            {/* Column 2: Quick Links (2 cols) */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h3 className="font-display font-bold text-lg text-white mb-6">Discovery</h3>
              <ul className="space-y-3 text-sm font-medium text-white/60">
                <li><Link href="/about" className="hover:text-gold transition-colors inline-block">Our Story</Link></li>
                <li><Link href="/admissions" className="hover:text-gold transition-colors inline-block">Admissions</Link></li>
                <li><Link href="/academics" className="hover:text-gold transition-colors inline-block">Academics</Link></li>
                <li><Link href="/gallery" className="hover:text-gold transition-colors inline-block">Campus Life</Link></li>
                <li><Link href="/contact" className="hover:text-gold transition-colors inline-block">Contact Us</Link></li>
              </ul>
            </motion.div>

            {/* Column 3: Resources (2 cols) */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h3 className="font-display font-bold text-lg text-white mb-6">Portals</h3>
              <ul className="space-y-3 text-sm font-medium text-white/60">
                <li><a href="#" className="hover:text-gold transition-colors inline-block">Student Portal</a></li>
                <li><a href="#" className="hover:text-gold transition-colors inline-block">Parent Login</a></li>
                <li><a href="#" className="hover:text-gold transition-colors inline-block">Staff Area</a></li>
                <li><Link href="/careers" className="hover:text-gold transition-colors inline-block">Careers @ SIA</Link></li>
                <li><Link href="/alumni" className="hover:text-gold transition-colors inline-block">Alumni Network</Link></li>
              </ul>
            </motion.div>

            {/* Column 4: Location Map (4 cols) */}
            <motion.div variants={itemVariants} className="lg:col-span-4">
              <h3 className="font-display font-bold text-lg text-white mb-6">Visit Campus</h3>
              <div className="rounded-xl overflow-hidden border border-white/20 h-40 w-full bg-navy-light relative group">
                {/* Google Map Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3702.308731307684!2d75.58981431495404!3d21.821990985573456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd89acf88888889%3A0x6b88888888888888!2sSanskar%20International%20Academy!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  className="opacity-80 group-hover:opacity-100 transition-opacity"
                ></iframe>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 flex items-center justify-between text-xs text-white">
                  <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-gold" /> Khargone - Khandwa Hwy</span>
                  <a href="https://goo.gl/maps/..." target="_blank" className="font-bold text-gold hover:underline">Get Directions</a>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <Phone className="w-4 h-4 text-gold" />
                  <a href="tel:+917049110104" className="hover:text-white">+91 70491 10104</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <Mail className="w-4 h-4 text-gold" />
                  <a href="mailto:info@siakhargone.in" className="hover:text-white">info@siakhargone.in</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-white/40">
            <p>© {new Date().getFullYear()} Sanskar International Academy. All Rights Reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Use</Link>
              <span className="flex items-center gap-1">
                Managed by <a href="https://bynn.vercel.app/" target="_blank" className="text-gold hover:underline font-bold">BYN Agency</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
