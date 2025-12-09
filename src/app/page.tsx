export const dynamic = "force-static";

export default function ComingSoon() {
  return (
    <main className="min-h-screen w-full bg-[#0B1F3A] text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-indigo-800/40 to-blue-900/60 backdrop-blur-3xl" />
      <div className="absolute top-20 left-[-100px] w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-[-100px] w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-3xl animate-ping"></div>

      <div className="relative z-10 text-center max-w-3xl">

        {/* Logo */}
        <img
          src="/school-logo.png"
          alt="Sanskar International Academy"
          className="mx-auto mb-8 w-28 h-28 object-contain drop-shadow-xl animate-fadeIn"
        />

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-yellow-500">
          A New Era of Excellence
          <span className="block text-blue-300">is Coming Soon</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          We're crafting a modern digital experience for the students, parents, and community of
          <span className="font-semibold text-white"> Sanskar International Academy</span>.
          <br />
          Stay tuned for the official launch!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="tel:07049110104"
            className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition-all"
          >
            📞 Call Us
          </a>
          <a
            href="mailto:info@siakhargone.in"
            className="px-8 py-3 bg-blue-700 font-semibold rounded-full shadow-lg hover:bg-blue-800 transition-all"
          >
            ✉️ Email Us
          </a>
        </div>

        {/* Loading Indicator */}
        <div className="animate-pulse text-blue-300 text-lg">
          Website Launching Soon…
        </div>

        {/* Footer */}
        <footer className="mt-12 text-xs text-blue-400">
          © {new Date().getFullYear()} Sanskar International Academy — All Rights Reserved
        </footer>
      </div>
    </main>
  );
}
