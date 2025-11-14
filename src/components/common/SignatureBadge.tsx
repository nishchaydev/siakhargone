
"use client";

import React from "react";

export default function SignatureBadge() {
  return (
    <a
      href="mailto:nishchaydev@outlook.com"
      aria-label="Email Nishchay"
      title="Contact developer"
      className={
        "fixed bottom-4 right-4 z-[9999] " +
        "bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-md shadow-lg " +
        "text-sm font-medium flex items-center gap-2 hover:bg-black hover:shadow-xl " + 
        "transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 "
      }
    >
      <span style={{lineHeight:1}}>{`Made with ❤️ by Nishchay`}</span>
    </a>
  );
}
      
