"use client";

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

// Updated cursor variants with more vibrant colors for better visibility
const cursorVariants = {
  default: {
    scale: 1,
    backgroundColor: "rgba(90, 120, 80, 0.2)", // More vibrant green with higher opacity
    borderColor: "rgb(60, 100, 60)", // Stronger green border
    borderWidth: "2px",
    transition: { type: 'spring', stiffness: 600, damping: 30 },
  },
  linkHover: {
    scale: 1.5,
    backgroundColor: "rgba(130, 150, 70, 0.3)", // Brighter green with higher opacity
    borderColor: "rgb(90, 130, 50)", // Vivid green border
    borderWidth: "2px",
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },
};

// Updated dot variants with more visible colors
const dotVariants = {
    default: {
        scale: 1,
        backgroundColor: "rgb(60, 100, 60)", // Solid green for high contrast
        transition: { type: 'spring', stiffness: 800, damping: 40 },
    },
    linkHover: {
        scale: 0.6,
        backgroundColor: "rgb(130, 150, 70)", // Bright green
        transition: { type: 'spring', stiffness: 500, damping: 25 },
    },
}

export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [cursorVariant, setCursorVariant] = useState("default");
    const controls = useAnimation();
    const dotControls = useAnimation();

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Check if hovering over a specific element
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [data-cursor-hoverable="true"]')) {
                setCursorVariant("linkHover");
            } else {
                setCursorVariant("default");
            }
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    useEffect(() => {
        controls.start(cursorVariant);
        dotControls.start(cursorVariant);
    }, [cursorVariant, controls, dotControls]);

    return (
        <>
            {/* Outer Ring */}
            <motion.div
                className={cn(
                    "fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[9999]",
                    "w-10 h-10", // Slightly larger for better visibility
                    "hidden md:block"
                )}
                style={{
                    translateX: mousePosition.x - 20, // Adjusted for new size
                    translateY: mousePosition.y - 20, // Adjusted for new size
                }}
                variants={cursorVariants}
                animate={controls}
                initial="default"
            />
            {/* Inner Dot */}
            <motion.div
                className={cn(
                    "fixed top-0 left-0 rounded-full pointer-events-none z-[9999]",
                    "w-3 h-3", // Slightly larger dot for better visibility
                    "hidden md:block"
                )}
                style={{
                    translateX: mousePosition.x - 6, // Adjusted for new size
                    translateY: mousePosition.y - 6, // Adjusted for new size
                }}
                variants={dotVariants}
                animate={dotControls}
                initial="default"
            />
        </>
    );
}