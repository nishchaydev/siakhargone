
"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, User, Briefcase } from "lucide-react";
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
      className="bg-[#2E1C11] text-[#FFFBF4]"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div variants={itemVariants} className="md:col-span-1">
             <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-white font-headline">Sanskar International Academy</span>
            </div>
            <p className="text-sm text-gray-300">
              Where knowledge, values, and culture unite.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-300 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/academics" className="text-gray-300 hover:text-accent transition-colors">Academics</Link></li>
              <li><Link href="/life-at-sia" className="text-gray-300 hover:text-accent transition-colors">Life at SIA</Link></li>
              <li><Link href="/admissions" className="text-gray-300 hover:text-accent transition-colors">Admissions</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-accent transition-colors">Careers</Link></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg text-white mb-4">Contact</h3>
             <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-1 text-accent shrink-0"/>
                <a href="tel:+917049110104" className="text-gray-300 hover:text-accent transition-colors">+91 70491 10104</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-1 text-accent shrink-0"/>
                <a href="mailto:info@siakhargone.in" className="text-gray-300 hover:text-accent transition-colors">info@siakhargone.in</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 text-accent shrink-0"/>
                <span className="text-gray-300">Khargone, Madhya Pradesh</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com/siakhargone" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <span className="sr-only">Follow us on Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com/siakhargone" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <span className="sr-only">Follow us on Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 border-t border-primary/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Sanskar International Academy. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0">
             <Link href="/admin" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2">
                <User className="h-4 w-4" />
                Admin Login
              </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
