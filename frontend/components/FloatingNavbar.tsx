"use client";

import React, { useState, useEffect, useRef, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils"; // Assuming you have this utility (e.g., from shadcn/ui)

// Define the type for a navigation item
interface NavItem {
    name: string;
    sectionId: string; // The ID of the section to scroll to
}

// Define the props for the FloatingNavbar component
interface FloatingNavbarProps {
    className?: string; // Optional className prop to allow further styling
}

// Define the actual navigation items
// Make sure the `sectionId` matches the `id` attribute of the target sections in your page
const navItems: NavItem[] = [
    { name: "Home", sectionId: "home-section" },
    { name: "About", sectionId: "about-section" },
    { name: "Vision", sectionId: "vision-section" },
    { name: "Communities", sectionId: "communities-section" },
    { name: "FAQ", sectionId: "faq-section" },
    { name: "Join", sectionId: "join-form" }, // Example: could be a form section
];

// --- Hamburger Icon Component ---
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props} // Pass other props like className, width, height
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

// --- Close Icon Component ---
const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);


export const FloatingNavbar: FC<FloatingNavbarProps> = ({ className }) => {
    // State to control overall navbar visibility based on scroll direction
    const [isVisible, setIsVisible] = useState<boolean>(true);
    // State to control the mobile menu's open/closed status
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    // Ref to store the last scroll position
    const lastScrollY = useRef<number>(0);
    // Scroll distance threshold to trigger hide/show
    const scrollThreshold: number = 50; // Pixels

    // Function to handle scroll events
    const handleScroll = () => {
        const currentScrollY: number = window.scrollY;

        // Automatically close mobile menu if user scrolls
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }

        // Logic to hide/show navbar based on scroll direction and threshold
        if (currentScrollY > scrollThreshold) { // Only apply logic after scrolling down a bit
            // Scrolling Down
            if (currentScrollY > lastScrollY.current) {
                 if (isVisible) setIsVisible(false); // Hide if visible
            }
            // Scrolling Up
            else {
                 if (!isVisible) setIsVisible(true); // Show if hidden
            }
        } else {
            // Near the top of the page, always ensure navbar is visible
             if (!isVisible) setIsVisible(true);
        }

        // Update last scroll position
        lastScrollY.current = currentScrollY;
    };

    // Effect to add and remove scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true }); // Use passive listener for performance
        // Cleanup function to remove the listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // Dependencies: Re-run effect if these state variables change
        // (needed to ensure handleScroll has access to the latest state)
    }, [isVisible, isMobileMenuOpen]);

    // Function to smoothly scroll to a specific section
    const scrollToSection = (sectionId: string): void => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile menu automatically after clicking a navigation link
        setIsMobileMenuOpen(false);
    };

    // Function to toggle the mobile menu's visibility
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    // Framer Motion animation variants for the main navbar container
    const navbarVariants = {
        visible: {
            y: 0, // Position at the top
            opacity: 1,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
        hidden: {
            y: '-150%', // Move significantly above the viewport to ensure it's hidden
            opacity: 0,
            transition: { duration: 0.3, ease: 'easeIn' },
        },
    };

    // Framer Motion animation variants for the mobile menu dropdown
     const mobileMenuVariants = {
        open: {
            opacity: 1,
            y: 0, // Slide down into view
            transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.05 } // Stagger children animation slightly
        },
        closed: {
            opacity: 0,
            y: "-20%", // Slide slightly upwards on close
            transition: { duration: 0.2, ease: 'easeIn' }
        }
    };

     // Framer Motion variants for individual mobile menu items
     const mobileMenuItemVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: -20 } // Slide in from left slightly
    };


    return (
        // Use AnimatePresence to enable exit animations for both navbar and mobile menu
        <AnimatePresence>
            {/* --- Main Navbar Container --- */}
            {/* It's always in the DOM but animates based on `isVisible` state */}
            <motion.nav
                key="floating-navbar" // Unique key for AnimatePresence tracking
                initial="visible" // Start in the 'visible' state
                animate={isVisible ? 'visible' : 'hidden'} // Control animation based on state
                variants={navbarVariants} // Apply the defined animation variants
                className={cn(
                    // Positioning: Fixed, centered horizontally, slightly down from top
                    "fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50",
                    // Sizing: Responsive width
                    "w-[90vw] max-w-lg md:w-auto", // Use viewport width on small screens, max-width, auto on larger
                    // Padding
                    "px-4 py-2",
                    // Layout: Flexbox, center items, space elements apart on mobile
                    "flex items-center justify-between md:justify-center",
                    // Appearance: Background with blur, border, rounded shape, shadow
                    "bg-card/80 backdrop-blur-sm", // Use theme colors with opacity
                    "border border-border",
                    "rounded-full shadow-lg", // Slightly larger shadow
                    // Merge with any additional classes passed via props
                    className
                )}
            >
                {/* --- Optional: Logo/Brand --- */}
                {/* Shown only on mobile to utilize space from justify-between */}
                <div className="text-sm font-bold text-primary md:hidden">
                    {/* Replace with your actual Logo Component or text */}
                    JUSL Communities
                </div>

                {/* --- Desktop Navigation Links --- */}
                {/* Hidden by default, shown as flex container on medium screens and up */}
                <div className="hidden md:flex items-center md:space-x-4">
                    {navItems.map((item) => (
                        <button
                            key={`desktop-${item.sectionId}`} // Unique key for list rendering
                            onClick={() => scrollToSection(item.sectionId)}
                            className={cn(
                                // Styling for desktop links
                                "px-3 py-1 rounded-full",
                                "text-sm font-medium",
                                "text-muted-foreground hover:text-primary", // Theme colors
                                "transition-colors duration-200",
                                // Focus styles for accessibility
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            )}
                            aria-label={`Scroll to ${item.name} section`} // Accessibility label
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* --- Mobile Menu Toggle Button --- */}
                {/* Shown only on small screens (below medium breakpoint) */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="p-1 rounded-full text-muted-foreground hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMobileMenuOpen} // Indicate state to screen readers
                        aria-controls="mobile-menu-list" // Link button to the menu it controls
                    >
                        {/* Show Close or Menu icon based on state */}
                        {isMobileMenuOpen ? (
                            <CloseIcon className="w-6 h-6" />
                        ) : (
                            <MenuIcon className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </motion.nav>

            {/* --- Mobile Menu Dropdown --- */}
            {/* Conditionally rendered only when isMobileMenuOpen is true */}
            {/* AnimatePresence handles the mount/unmount animation */}
                {isMobileMenuOpen && (
                    <motion.div
                        key="mobile-menu" // Unique key for AnimatePresence
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={mobileMenuVariants} // Apply dropdown animation
                        id="mobile-menu-list" // ID for aria-controls linkage
                        className={cn(
                            // Positioning: Fixed, below navbar, centered
                            "fixed top-16 left-1/2 transform -translate-x-1/2 z-40", // z-40 so it's below navbar (z-50)
                            // Sizing: Match mobile navbar width
                            "w-[90vw] max-w-lg",
                             // Appearance: Background, border, padding, rounded, shadow
                            "mt-2 p-4",
                            "bg-card/95 backdrop-blur-md", // Slightly more opaque background
                            "border border-border",
                            "rounded-xl shadow-lg",
                            // Layout: Stack items vertically
                            "flex flex-col items-stretch space-y-2", // items-stretch makes buttons full width
                            // Visibility: Hide on medium screens and up
                            "md:hidden"
                        )}
                    >
                        {navItems.map((item) => (
                            <motion.button
                                key={`mobile-${item.sectionId}`}
                                variants={mobileMenuItemVariants} // Apply item animation
                                onClick={() => scrollToSection(item.sectionId)}
                                className={cn(
                                    // Styling for mobile links (full width, centered text)
                                     "w-full text-center px-4 py-2 rounded-md",
                                     "text-base font-medium", // Larger text for touch targets
                                     "text-muted-foreground hover:text-primary hover:bg-muted/50",
                                     "transition-colors duration-200",
                                     "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                                )}
                                aria-label={`Scroll to ${item.name} section`}
                            >
                                {item.name}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
        </AnimatePresence>
    );
};