"use client";
import React from 'react';
import "../app/globals.css"; // Import your global CSS file
export function GlobalStyles() {
    return (
      <style jsx global>{`
        ::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background-color: rgba(229, 217, 193, 0.5); /* Light beige background */
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(101, 67, 33, 0.8); /* Dark brown thumb */
  border-radius: 8px;
  border: 3px solid rgba(229, 217, 193, 0.5); /* Border same as track */
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(121, 85, 50, 0.9); /* Slightly lighter brown on hover */
}


* {
  scrollbar-width: thin;
  scrollbar-color: rgba(101, 67, 33, 0.8) rgba(229, 217, 193, 0.5);
}
      `}</style>
    );
  }