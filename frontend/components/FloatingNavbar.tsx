"use client";

import React, { useState, useEffect, useRef, FC } from 'react'; // Added FC for component typing
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils"; // Assuming you have this utility

// Define the type for a navigation item
interface NavItem {
    name: string;
    sectionId: string;
}

// Define the props for the FloatingNavbar component
interface FloatingNavbarProps {
    className?: string; // Optional className prop
}

// Define the navigation items with the NavItem type
const navItems: NavItem[] = [
    { name: "Home", sectionId: "home-section" },
    
    { name: "About", sectionId: "about-section" },
    { name: "Vision", sectionId: "vision-section" },
    { name: "Communities", sectionId: "communities-section" },
    { name: "FAQ", sectionId: "faq-section" },
    { name: "Join", sectionId: "join-form" },
];

export const FloatingNavbar: FC<FloatingNavbarProps> = ({ className }) => {
    // Type the state hooks
    const [isVisible, setIsVisible] = useState<boolean>(true); // Start visible
    const lastScrollY = useRef<number>(0); // Ref to store number
    const scrollThreshold: number = 50; // Explicitly type threshold

    const handleScroll = () => {
        const currentScrollY: number = window.scrollY;

        if (currentScrollY > scrollThreshold) {
            // Scrolling down
            if (currentScrollY > lastScrollY.current) {
                 if (isVisible) setIsVisible(false);
            }
            // Scrolling up
            else {
                 if (!isVisible) setIsVisible(true);
            }
        } else {
            // Near the top of the page
            if (!isVisible) setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // Adding isVisible to dependencies is optional but can help catch edge cases
    }, [isVisible]);

    // Type the sectionId parameter
    const scrollToSection = (sectionId: string): void => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Animation variants for the navbar
    const navbarVariants = {
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
        hidden: {
            y: '-150%', // Move further up to ensure it's hidden
            opacity: 0,
            transition: { duration: 0.3, ease: 'easeIn' },
        },
    };

    return (
        <AnimatePresence>
            <motion.nav
                key="floating-navbar" // Key is needed for AnimatePresence
                initial="visible" // Start visible
                animate={isVisible ? 'visible' : 'hidden'}
                variants={navbarVariants}
                className={cn(
                    "fixed top-6 left-1/2 transform -translate-x-1/2 z-50", // Positioning
                    "px-4 py-2", // Padding
                    "flex items-center justify-center space-x-4", // Layout
                    "bg-card/80 backdrop-blur-sm", // Matsu theme background + blur
                    "border border-border", // Border consistent with theme
                    "rounded-full shadow-md", // Rounded edges and shadow
                    className // Merge incoming className
                )}
            >
                {navItems.map((item) => (
                    <button
                        key={item.sectionId}
                        onClick={() => scrollToSection(item.sectionId)}
                        className={cn(
                            "px-3 py-1 rounded-full", // Button padding & shape
                            "text-sm font-medium", // Text style
                            "text-muted-foreground hover:text-primary", // Text colors
                            "transition-colors duration-200", // Smooth color transition
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" // Focus styling
                        )}
                        aria-label={`Scroll to ${item.name} section`} // Accessibility improvement
                    >
                        {item.name}
                    </button>
                ))}
            </motion.nav>
        </AnimatePresence>
    );
}