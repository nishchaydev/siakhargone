"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, User, GraduationCap, Users, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const TESTIMONIALS = [
  {
    id: 1,
    name: "Anjali Sharma",
    role: "Parent of Aarav, Grade 5",
    category: "Parents",
    image: "https://ui-avatars.com/api/?name=Anjali+Sharma&background=random",
    rating: 5,
    text: "The holistic development approach at SIA is truly remarkable. My child has not only excelled academically but has also grown into a confident and compassionate individual. The teachers are incredibly supportive."
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Parent of Priya, Grade 10",
    category: "Parents",
    image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=random",
    rating: 5,
    text: "SIA's focus on technology integration and preparing students for the future is what impressed us the most. The infrastructure is world-class, and the safe, secure campus gives us peace of mind."
  },
  {
    id: 3,
    name: "Dr. A.P.J. Abdul Kalam",
    role: "Former President of India (Guest Visit)",
    category: "VIP",
    image: "https://ui-avatars.com/api/?name=APJ+Abdul+Kalam&background=random",
    rating: 5,
    text: "It was a delight to interact with the bright young minds at Sanskar International Academy. Their curiosity and enthusiasm for science give me great hope for the future of our nation."
  },
  {
    id: 4,
    name: "Sunita Singh",
    role: "Parent of Rohan, Grade 2",
    category: "Parents",
    image: "https://ui-avatars.com/api/?name=Sunita+Singh&background=random",
    rating: 4,
    text: "The personalized mentorship has been a game-changer for our son. The faculty takes a genuine interest in each student's progress. The sports facilities are excellent too."
  },
  {
    id: 5,
    name: "Vikram Patel",
    role: "Parent of Isha, Grade 8",
    category: "Parents",
    image: "https://ui-avatars.com/api/?name=Vikram+Patel&background=random",
    rating: 5,
    text: "The global curriculum and world-class faculty at Sanskar International Academy provide an unparalleled learning environment. My daughter is thriving and is always excited to go to school."
  },
  {
    id: 6,
    name: "Meera Desai",
    role: "Parent of Arjun, Pre-Primary",
    category: "Parents",
    image: "https://ui-avatars.com/api/?name=Meera+Desai&background=random",
    rating: 5,
    text: "As a new parent to the school, the admission process was smooth and the staff was extremely helpful. The pre-primary program is fantastic, focusing on play-based learning in a nurturing atmosphere."
  },
  {
    id: 7,
    name: "Harish Iyer",
    role: "Class of 2018",
    category: "Alumni",
    image: "https://ui-avatars.com/api/?name=Harish+Iyer&background=random",
    rating: 5,
    text: "The career counseling and university placement support are exceptional. SIA has prepared me not just for exams, but for life beyond school. We couldn't be happier with my choice."
  },
  {
    id: 8,
    name: "Hon. Minister of Education",
    role: "Chief Guest, Annual Day 2023",
    category: "VIP",
    image: "https://ui-avatars.com/api/?name=Minister+Education&background=random",
    rating: 5,
    text: "Detailed attention to value-based education along with academic excellence makes this institution stand out. A truly commendable effort by the management."
  }
];

export default function TestimonialsClient() {
  const [filter, setFilter] = useState("All Testimonials");

  const filteredTestimonials = filter === "All Testimonials"
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.category === filter);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex justify-center mb-16 overflow-x-auto">
        <div className="bg-white p-1 rounded-full shadow-md inline-flex whitespace-nowrap">
          {["All Testimonials", "Parents", "Alumni", "Students", "VIP"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${filter === tab ? 'bg-royal-blue text-white shadow-sm' : 'text-gray-600 hover:text-royal-blue'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredTestimonials.map((testimonial) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 shrink-0">
                  <Image src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover border-2 border-gold-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    {testimonial.name}
                    {testimonial.category === 'VIP' && <Award size={16} className="text-gold-accent" />}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-[#F59E0B]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < testimonial.rating ? "currentColor" : "none"} strokeWidth={i < testimonial.rating ? 0 : 2} className={i < testimonial.rating ? "" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed italic flex-grow">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Form Section */}
      <div className="mt-24 max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-royal-blue mb-4">Share Your Experience</h2>
        <p className="text-gray-600 mb-10">
          Your feedback is invaluable to us. Help us continue to build an exceptional learning environment by sharing your thoughts.
        </p>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-left border border-gray-100">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <input type="text" placeholder="Your Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Affiliation</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all bg-white">
                <option>Select Option</option>
                <option>Parent</option>
                <option>Student</option>
                <option>Alumni</option>
                <option>Guest/VIP</option>
              </select>
            </div>

            <div className="space-y-2 text-center py-4">
              <label className="text-sm font-semibold text-gray-700 block mb-2">Your Rating</label>
              <div className="flex justify-center gap-2 text-gray-300">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={28} className="cursor-pointer hover:text-gold-accent transition-colors" />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Testimonial</label>
              <textarea rows={4} placeholder="Share your detailed feedback here..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-royal-blue focus:ring-1 focus:ring-royal-blue outline-none transition-all resize-none"></textarea>
            </div>

            <div className="text-center pt-4">
              <button type="button" className="bg-royal-blue text-white font-bold py-3 px-12 rounded-full shadow-lg hover:bg-navy-dark transition-transform transform hover:-translate-y-1">
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
