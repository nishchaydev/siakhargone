// ═══════════════════════════════════════════════════════════════════════════════
// READY-TO-USE CODE: Student Leadership Page
// File: app/about/student-leadership/page.tsx (or pages/about/student-leadership.tsx)
// Framework: Next.js with TypeScript & Tailwind CSS
// ═══════════════════════════════════════════════════════════════════════════════

import type { Metadata } from 'next'
import Image from 'next/image'

// SEO Metadata
export const metadata: Metadata = {
  title: 'Student Leadership 2025-26 | Sanskar International Academy',
  description: 'Meet the House Captains and Student Council of Sanskar International Academy Khargone for academic year 2025-26. Building future leaders through student representation.',
  keywords: 'student council, house captains, student leadership, SIA Khargone, CBSE school leadership',
  openGraph: {
    title: 'Student Leadership 2025-26 | Sanskar International Academy',
    description: 'Meet our student leaders - House Captains and Student Council members',
    images: [
      {
        url: 'https://res.cloudinary.com/dkits80xk/image/upload/v1770863355/ea18b716-7de8-4f91-95d7-84dd7e4da118.png',
        width: 1200,
        height: 630,
        alt: 'Student Leadership at SIA Khargone',
      },
    ],
  },
}

// Main Component
export default function StudentLeadershipPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Student Leadership 2025-26
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Empowering Tomorrow's Leaders Today
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            Building Leaders of Character
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At Sanskar International Academy, student leadership is not just a title—it's a 
            responsibility. Our student leaders represent the voice of their peers, uphold school 
            values, and contribute to creating a positive learning environment for all. The House 
            System and Student Council provide opportunities for students to develop leadership 
            skills, teamwork, and a sense of community service.
          </p>
        </div>
      </section>

      {/* House Captains Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 flex items-center">
              <span className="mr-3">🏠</span> House Captains & Vice Captains
            </h2>
            <p className="text-gray-600 text-lg">
              Our four houses—Aravalli, Himalaya, Satpura, and Vindyachal—compete throughout 
              the year in academics, sports, and cultural activities. Each house is led by 
              dedicated Captains and Vice Captains who inspire their teams to excellence.
            </p>
          </div>

          <div className="relative w-full rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src="https://res.cloudinary.com/dkits80xk/image/upload/v1770863355/ea18b716-7de8-4f91-95d7-84dd7e4da118.png"
              alt="House Captains and Vice Captains 2025-26 - Aravalli, Himalaya, Satpura, and Vindyachal Houses at Sanskar International Academy Khargone"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
              quality={90}
            />
          </div>
        </div>
      </section>

      {/* Student Council Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 flex items-center">
              <span className="mr-3">🎓</span> Student Council
            </h2>
            <p className="text-gray-600 text-lg">
              The Student Council serves as the bridge between students and school administration. 
              Council members take on various responsibilities including discipline, sports 
              coordination, cultural activities, and student welfare initiatives.
            </p>
          </div>

          <div className="relative w-full rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              src="https://res.cloudinary.com/dkits80xk/image/upload/v1770863349/9690af22-e610-4828-a6f6-14eaf7e5c4dd.png"
              alt="Student Council 2025-26 - Head Boy, Head Girl, and Council Members at Sanskar International Academy Khargone"
              width={1200}
              height={800}
              className="w-full h-auto"
              quality={90}
            />
          </div>
        </div>
      </section>

      {/* Leadership Opportunities Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            📋 Leadership Opportunities at SIA
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Student leadership positions at Sanskar International Academy include:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-2xl">•</span>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">House Captains & Vice Captains</h3>
                <p className="text-gray-600">Leading their respective houses in all inter-house competitions</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-2xl">•</span>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Head Boy & Head Girl</h3>
                <p className="text-gray-600">Overall student representatives and role models</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-2xl">•</span>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Discipline Secretaries</h3>
                <p className="text-gray-600">Maintaining discipline and decorum across campus</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-2xl">•</span>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Sports Secretaries</h3>
                <p className="text-gray-600">Organizing and promoting sports activities</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-2xl">•</span>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Cultural Secretaries</h3>
                <p className="text-gray-600">Managing cultural events and celebrations</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-2xl">•</span>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Student Welfare</h3>
                <p className="text-gray-600">Addressing student concerns and well-being</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION UPDATE CODE
// File: components/Header.tsx (or wherever your navigation is)
// ═══════════════════════════════════════════════════════════════════════════════

// Add this to your About Us dropdown items array:

const aboutUsMenuItems = [
  {
    icon: 'ℹ️',
    label: 'Overview',
    description: 'Learn more about our mission and values.',
    href: '/about',
  },
  {
    icon: '👁️',
    label: 'Vision & Mission',
    description: 'Our guiding principles and aspirations.',
    href: '/about/vision',
  },
  {
    icon: '👤',
    label: "Principal's Message",
    description: 'Guidance from our academic leader.',
    href: '/about/principal',
  },
  {
    icon: '👥',
    label: 'Management & Committee',
    description: 'Meet our dedicated leadership team.',
    href: '/about/management',
  },
  {
    icon: '🏆',
    label: 'Student Achievements',
    description: 'Celebrating the successes of our students.',
    href: '/achievements',
  },
  // ⬇️ ADD THIS NEW ITEM ⬇️
  {
    icon: '🎓',
    label: 'Student Leadership',
    description: 'House Captains and Student Council 2025-26.',
    href: '/about/student-leadership',
  },
  // ⬆️ NEW ITEM ENDS HERE ⬆️
]


// ═══════════════════════════════════════════════════════════════════════════════
// ALTERNATIVE: Simple HTML Version (if not using Next.js Image component)
// ═══════════════════════════════════════════════════════════════════════════════

/*
<section class="max-w-6xl mx-auto px-4 py-12">
  <div class="bg-white rounded-xl shadow-lg p-6 md:p-10">
    <h2 class="text-3xl font-bold text-blue-900 mb-6">
      🏠 House Captains & Vice Captains
    </h2>
    <img 
      src="https://res.cloudinary.com/dkits80xk/image/upload/v1770863355/ea18b716-7de8-4f91-95d7-84dd7e4da118.png"
      alt="House Captains 2025-26"
      class="w-full h-auto rounded-lg shadow-xl"
      loading="lazy"
    />
  </div>
</section>
*/


// ═══════════════════════════════════════════════════════════════════════════════
// UPDATE MANAGEMENT & COMMITTEE PAGE
// File: app/about/management/page.tsx
// ═══════════════════════════════════════════════════════════════════════════════

// Add this section at the end of the Management & Committee page:

/*
<section className="max-w-6xl mx-auto px-4 py-12">
  <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
      👨‍🏫 Our Teaching Team
    </h2>
    <p className="text-gray-600 text-lg mb-6">
      Our 50+ qualified and experienced teachers are the backbone of Sanskar International 
      Academy. Each brings unique expertise and passion to create an engaging learning 
      environment for our 1100+ students.
    </p>
    
    <div className="relative w-full rounded-lg overflow-hidden shadow-xl">
      <Image
        src="https://res.cloudinary.com/dkits80xk/image/upload/v1770862707/7230c484-46a1-4f9b-afb6-a9f0a9dd6f18.png"
        alt="Teaching Faculty at Sanskar International Academy Khargone"
        width={1200}
        height={600}
        className="w-full h-auto"
        quality={90}
      />
    </div>
  </div>
</section>
*/


// ═══════════════════════════════════════════════════════════════════════════════
// END OF CODE SNIPPETS
// ═══════════════════════════════════════════════════════════════════════════════
