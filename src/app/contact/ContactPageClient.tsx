
"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ContactPageClient() {
  return (
    <>
      <div className="bg-cream min-h-screen pb-20">

        {/* Main Content Container */}
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Column: Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-3xl font-display font-medium text-gold-accent">Our Address & Details</h2>

              <div className="bg-white p-2 rounded-3xl shadow-lg border border-gray-100">
                <div className="bg-gray-50 rounded-2xl overflow-hidden relative h-64 w-full mb-6">
                  {/* Map Replacement - Using iframe for functionality but styled like the image */}
                  <iframe
                    src="https://maps.google.com/maps?q=Sanskar+International+Academy,+Khargone+(SIA)&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    className="absolute inset-0 grayscale-[0.2]"
                  ></iframe>
                </div>

                <div className="px-6 pb-6 space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-navy-dark">Sanskar International Academy</h3>
                    <p className="text-gray-600 leading-relaxed">Gowadi, Khargone - Khandwa Hwy, Fata, Badgaon [Nagjhiri], Khargone, Madhya Pradesh 451001</p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-white transition-colors">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy uppercase tracking-wider">Phone Number</p>
                        <p className="text-gray-700 font-medium">+91 70491 10104</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-white transition-colors">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy uppercase tracking-wider">Email Address</p>
                        <p className="text-gray-700 font-medium">info@siakhargone.in</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-white transition-colors">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy uppercase tracking-wider">Office Hours</p>
                        <p className="text-gray-700 font-medium">Monday - Friday: 8:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-3xl font-display font-medium text-gold-accent">Send an Enquiry</h2>

              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-10 -mt-10" />

                <form className="space-y-5 relative z-10">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy">Full Name</label>
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-accent focus:ring-1 focus:ring-gold-accent outline-none transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy">Phone Number</label>
                    <input type="tel" placeholder="+91 000 000 0000" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-accent focus:ring-1 focus:ring-gold-accent outline-none transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy">Email Address</label>
                    <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-accent focus:ring-1 focus:ring-gold-accent outline-none transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy">Student's Prospective Class</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-accent focus:ring-1 focus:ring-gold-accent outline-none transition-all appearance-none cursor-pointer">
                      <option value="">Select a class</option>
                      <option value="nursery">Nursery</option>
                      <option value="kg1">KG 1</option>
                      <option value="kg2">KG 2</option>
                      <option value="1">Class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                      <option value="4">Class 4</option>
                      <option value="5">Class 5</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy">Message</label>
                    <textarea rows={4} placeholder="Your message..." className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-accent focus:ring-1 focus:ring-gold-accent outline-none transition-all resize-none"></textarea>
                  </div>

                  <Button className="w-full bg-navy hover:bg-navy-light text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg mt-4">
                    Submit Enquiry
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Visit Our Campus Section */}
        <section className="relative py-24 overflow-hidden mt-12">
          <div className="absolute inset-0 bg-navy-dark z-0">
            <Image
              src="/siakhargone-content/Album/Photo For Uploads/Infrastructure Photos/Building Photos/building photos (2).webp"
              alt="Campus Background"
              fill
              className="object-cover opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/90 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Visit Our Campus</h2>
              <p className="text-xl text-gray-300 font-light leading-relaxed">
                Experience the vibrant atmosphere and state-of-the-art facilities at Sanskar International Academy firsthand. We invite you to schedule a personalized tour to see what makes our school special.
              </p>
              <a href="/admissions" className="inline-block">
                <button className="px-8 py-4 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-navy-dark transition-all duration-300 rounded-full font-bold text-lg flex items-center gap-3 group">
                  Schedule a School Tour
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
