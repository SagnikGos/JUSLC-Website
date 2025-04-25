"use client"; // Needed for Framer Motion and event handlers

import React, { useState, useRef, useEffect } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
    ArrowRight, Mail, Instagram, Globe, MessageCircle, MapPin, Heart,
    ChevronDown, ChevronUp, Code, Palette, Music, Dumbbell, Users,
    Calendar, Share2, Lightbulb, Image, Coffee, Book, Cpu, Goal,
    Activity, BrainCircuit, TrendingUp, Paintbrush, Sprout, BookOpen, Gamepad2, Drama // Added icons
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FloatingNavbar } from "@/components/FloatingNavbar"; // Assuming you have a Navbar component
// Removed: import type { ReactNode } from 'react';
import { MaskedImage } from "@/components/ui/masked-image"; // Assuming you have a MaskedImage component
import { CommunityModal, CommunityDetails } from '@/components/CommunityModal';

// Animation variants
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ParallaxSection - Removed React.FC and type annotation
const ParallaxSection = ({ children }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

    return (
        <div ref={ref} className="relative h-screen">
            <motion.div style={{ y, opacity }} className="absolute inset-0">
                {children}
            </motion.div>
        </div>
    );
};


// Counter
const Counter = ({ number, label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start bottom", "end bottom"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(value => {
            if (value > 0.3) {
                let start = 0;
                const end = number;
                if (start === end) return;

                let duration = 1500;
                let startTime = null;

                const step = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    const currentCount = Math.floor(progress * (end - start) + start);
                    setCount(currentCount);
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        setCount(end);
                    }
                };
                requestAnimationFrame(step);

                // Return a cleanup function for the effect when the condition is no longer met (or component unmounts)
                // although Framer Motion's onChange might handle this internally, explicit cleanup is good practice
                // In this specific case, the animation runs once, so cleanup might not be strictly necessary after it finishes
                // but returning an empty function prevents potential errors if `unsubscribe` is called later.
                return () => {};
            }
        });

        return () => unsubscribe();
    }, [number, scrollYProgress]);


    return (
        <div ref={ref} className="text-center">
            <span className="text-4xl md:text-5xl font-bold text-primary">{count}+</span>
            <p className="text-muted-foreground text-lg mt-2">{label}</p>
        </div>
    );
};


// CommunityCard
// CommunityCard Component (either in its own file or within page.tsx)

const CommunityCard = ({ icon, title, description, onClick }) => {
    return (
        <motion.div
            variants={itemVariants} // Ensure itemVariants is defined/imported
            whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }}
            className="h-full group" // Added group here for hover effect on text
            onClick={onClick}
            id='community-card' // Note: Using the same ID for all cards is invalid HTML, use unique keys in map instead
        >
            {/* Applied flex-grow to CardContent equivalent (padding div) to push text to bottom */}
            <Card className="text-center p-6 border border-border bg-card hover:border-primary/50 transition-all duration-300 h-full flex flex-col items-center justify-start overflow-hidden shadow-sm hover:shadow-md">
                
                {/* Icon */}
                <div className="mb-4 text-primary transform group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm mb-0">{description}</p> 
                 

                {/* Click to know more text */}
                <p className="text-xs text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto pt-2 border-t border-transparent group-hover:border-border/30"> 
                   Click to know more 
                </p>
            </Card>
        </motion.div>
    );
};


export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState<CommunityDetails | null>(null);

    const handleCommunityClick = (community: CommunityDetails) => {
        console.log("Community card clicked:", community.title);
        setSelectedCommunity(community);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Optionally reset selectedCommunity after a delay to allow fade-out
        // setTimeout(() => setSelectedCommunity(null), 300);
    }
    const scrollToJoin = () => {
        document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const testimonials = [
        { name: "Aarav Patel", dept: "IT", text: "SL Communities brought life to our campus. Weekly game nights are now my favorite part of college!" },
        { name: "Priya Sharma", dept: "Power", text: "I found my artistic side through the cultural community. Made friends across departments I'd never have met otherwise." },
        { name: "Rahul Banerjee", dept: "Instrumentation", text: "The technical workshops changed how I approach my projects. Amazing knowledge-sharing happens here." },
    ];

    const faqItems = [
        { question: "Who can join SL Communities?", answer: "Any student from JU Salt Lake Campus can join, regardless of department or year of study." },
        { question: "Do I need prior experience to join a community?", answer: "Not at all! Our communities welcome beginners and experienced members alike. It's all about learning and growing together." },
        { question: "How much time commitment is required?", answer: "It's completely flexible! You can participate as much or as little as your schedule allows. Most activities happen once a week." },
        { question: "Can I be part of multiple communities?", answer: "Absolutely! Many members are active in several communities based on their diverse interests." },
        { question: "How do I start my own community?", answer: "Reach out to us with your idea, and we'll help you gather interested members and set up the necessary resources." }
    ];

    const communities: CommunityDetails[] = [ // Use CommunityDetails type
        {
            icon: <Music size={36} />, title: "Cultural", description: "Music, Drama, Art, Dance, Literature",
            longDescription: "Explore your artistic side! From jamming sessions and theatre workshops to art exhibitions and literary discussions, the Cultural Community is the hub for creative expression on campus.",
            meetingInfo: "Fridays 5:00 PM @ Common Room",
            coordinator: "Priya Sharma"
        },
        {
            icon: <Cpu size={36} />, title: "Technical", description: "Coding, Electronics, Robotics, ML",
            longDescription: "Dive into the world of technology. Participate in coding competitions, build cool robotics projects, explore machine learning, and collaborate on innovative tech solutions.",
            meetingInfo: "Wednesdays 6:00 PM @ Lab 101",
            coordinator: "Rahul Banerjee"
        },
        {
            icon: <Goal size={36} />, title: "Sports", description: "Football, Cricket, Chess, Indoor games",
            longDescription: "Get active and join fellow sports enthusiasts! We organize regular matches, tournaments, and practice sessions for various outdoor and indoor sports.",
            meetingInfo: "Daily Evenings @ Campus Field / Indoor Hall",
            coordinator: "Vikram Singh"
        },
        {
            icon: <TrendingUp size={36} />, title: "Growth", description: "Debate, MUNs, Linguistics, Public Speaking",
            longDescription: "Sharpen your mind and communication skills. Engage in stimulating debates, participate in Model United Nations, explore linguistics, and practice public speaking.",
            meetingInfo: "Tuesdays 4:30 PM @ Seminar Hall",
            coordinator: "Ananya Gupta"
        },
        {
            icon: <Paintbrush size={36} />, title: "Creative Arts", description: "Painting, Photography, Digital Design",
            longDescription: "Unleash your visual creativity. Join workshops on painting techniques, go on photo walks, learn digital design tools, and showcase your work.",
            meetingInfo: "Thursdays 5:00 PM @ Art Room",
            coordinator: "Sameer Khan"
        },
        {
            icon: <Sprout size={36} />, title: "Environmental", description: "Gardening, Sustainability, Campus Greening",
            longDescription: "Passionate about sustainability? Get involved in campus greening initiatives, learn about sustainable practices, and contribute to a greener campus environment.",
            meetingInfo: "Saturdays 10:00 AM @ Campus Garden",
            coordinator: "Neha Reddy"
        },
        {
            icon: <BookOpen size={36} />, title: "Academic", description: "Study groups, Research, Publication",
            longDescription: "Collaborate with peers on academic pursuits. Form study groups for challenging subjects, participate in research projects, and explore opportunities for academic writing.",
            meetingInfo: "Varies by subject/group @ Library/Dept.",
            coordinator: "Faculty Advisor TBD"
        },
        {
            icon: <Gamepad2 size={36} />, title: "Gaming", description: "Esports, Board Games, Game Dev",
            longDescription: "Connect with fellow gamers! Participate in esports tournaments, enjoy casual board game nights, or even try your hand at game development.",
            meetingInfo: "Bi-weekly Fridays 7:00 PM @ Common Room",
            coordinator: "Aarav Patel"
        },
    ];

    const galleryItems = [
        { type: 'large', icon: Image, label: 'Campus Fest 2024', bg: 'from-amber-100 to-orange-200', span: 'col-span-2 row-span-2' },
        { type: 'small', icon: Music, label: 'Music Jam', bg: 'from-blue-100 to-sky-200', span: 'col-span-1' },
        { type: 'small', icon: Code, label: 'Hackathon', bg: 'from-emerald-100 to-green-200', span: 'col-span-1' },
        { type: 'small', icon: Palette, label: 'Art Exhibition', bg: 'from-violet-100 to-purple-200', span: 'col-span-1' },
        { type: 'small', icon: Dumbbell, label: 'Sports Meet', bg: 'from-red-100 to-rose-200', span: 'col-span-1' },
    ];



    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Floating Navbar */}
            <FloatingNavbar />

            {/* Hero Section */}
            {/* Hero Section with Better Contrast */}
<section className="relative h-screen overflow-hidden" id="home-section">
  {/* Background Image Layer */}
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80 z-10"></div>
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full h-full"
    >
      <MaskedImage 
        src="/images/jusl-h1.png" // Replace with your campus image path
        alt="JU Salt Lake Campus" 
        width={900} 
        height={900} 
        variant="shape1"
        className="w-full h-full object-cover"
      />
    </motion.div>
  </div>

  {/* Content Layer - Positioned for better readability */}
  <div className="relative z-20 flex flex-col h-full justify-center items-center px-4 md:px-6">
    <div className="max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 font-display tracking-tight drop-shadow-sm">
          Reimagine Campus Life at JU Salt Lake
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/90 mb-8 drop-shadow-sm">
          Small, vibrant communities. Big, meaningful impact.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {["Cultural", "Technical", "Sports", "Growth", "Creative"].map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + (i * 0.1) }}
              className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium shadow-sm"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Button
          size="lg"
          onClick={scrollToJoin}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-6 shadow-md hover:shadow-lg transition-all duration-300 group"
        >
          Join the Movement
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </div>
  </div>
</section>

            {/* Stats Counter Section */}
            <motion.section
                className="py-16 px-6 bg-primary/5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        <Counter number={12} label="Communities" />
                        <Counter number={350} label="Students" />
                        <Counter number={24} label="Events" />
                        <Counter number={8} label="Departments" />
                    </div>
                </div>
            </motion.section>

            {/* About Section */}
            <motion.section
                className="py-16 md:py-24 px-6 max-w-4xl mx-auto border-t border-border bg-background"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                id='about-section'
            >
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 font-display inline-block relative">
                            About SL Communities
                            <motion.div
                                className="absolute bottom-0 left-1/2 h-1 bg-primary/50 rounded-full"
                                initial={{ width: 0, x: '-50%' }}
                                whileInView={{ width: '60%', x: '-50%' }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            />
                        </h2>
                    </motion.div>
                    <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                        JU SL Campus has immense potential, but it often feels inactive compared to the Jadavpur campus.
                        We're a bunch of motivated students trying to change that — one community at a time.
                        Whether you're into coding, sports, painting, or music — there's a place for you here.
                    </p>
                    <div className="bg-secondary/20 p-6 rounded-xl border border-secondary/30 shadow-inner">
                        <p className="italic text-foreground/70 font-medium">
                            "We believe in creating a campus where everyone feels connected,
                            inspired, and empowered to pursue their passions alongside their academic journey."
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Vision Bento Grid Section */}
            <motion.section
                className="py-16 md:py-24 px-6 bg-secondary/10 border-t border-border"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                id='vision-section'
                
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-display">Our Vision</h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-4 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        {/* Item 1 */}
                        <motion.div className="md:col-span-2" variants={itemVariants} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} id='vision-card'>
                            <Card className="h-full p-6 bg-card border border-border hover:border-primary/40 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md">
                                <Lightbulb size={36} className="mb-3 text-primary" />
                                <h3 className="text-xl font-bold mb-2 text-foreground">Activate the Campus</h3>
                                <p className="text-muted-foreground text-sm flex-grow">Events, games, art, and bonding activities that bring life to our campus spaces.</p>
                            </Card>
                        </motion.div>
                        {/* Item 2 */}
                        <motion.div variants={itemVariants} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} id='vision-card'>
                            <Card className="h-full p-6 bg-card border border-border hover:border-primary/40 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md">
                                <Users size={36} className="mb-3 text-primary" />
                                <h3 className="text-xl font-bold mb-2 text-foreground">Empower Students</h3>
                                <p className="text-muted-foreground text-sm flex-grow">Learn, grow, and build portfolios through active engagement.</p>
                            </Card>
                        </motion.div>
                        {/* Item 3 */}
                        <motion.div variants={itemVariants} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} id='vision-card'>
                            <Card className="h-full p-6 bg-card border border-border hover:border-primary/40 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md">
                                <Share2 size={36} className="mb-3 text-primary" />
                                <h3 className="text-xl font-bold mb-2 text-foreground">Connect Departments</h3>
                                <p className="text-muted-foreground text-sm flex-grow">Foster collaboration and break down silos across all departments.</p>
                            </Card>
                        </motion.div>
                        {/* Item 4 */}
                        <motion.div className="md:col-span-2" variants={itemVariants} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} id='vision-card'>
                            <Card className="h-full p-6 bg-card border border-border hover:border-primary/40 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md">
                                <Calendar size={36} className="mb-3 text-primary" />
                                <h3 className="text-xl font-bold mb-2 text-foreground">Regular Activities</h3>
                                <p className="text-muted-foreground text-sm flex-grow">Weekly meetups, monthly events, and seasonal festivals to keep the campus buzzing.</p>
                            </Card>
                        </motion.div>
                        {/* Item 5 */}
                        <motion.div variants={itemVariants} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} id='vision-card'>
                            <Card className="h-full p-6 bg-card border border-border hover:border-primary/40 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md">
                                <Coffee size={36} className="mb-3 text-primary" />
                                <h3 className="text-xl font-bold mb-2 text-foreground">Build Connections</h3>
                                <p className="text-muted-foreground text-sm flex-grow">Create friendships and networks that last beyond college years.</p>
                            </Card>
                        </motion.div>
                        {/* Item 6 */}
                        <motion.div variants={itemVariants} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} id='vision-card'>
                            <Card className="h-full p-6 bg-card border border-border hover:border-primary/40 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md">
                                <Book size={36} className="mb-3 text-primary" />
                                <h3 className="text-xl font-bold mb-2 text-foreground">Skill Development</h3>
                                <p className="text-muted-foreground text-sm flex-grow">Workshops, mentoring, and projects to enhance technical and soft skills.</p>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Communities Section */}
            <motion.section
                className="py-16 md:py-24 px-6 max-w-6xl mx-auto border-t border-border bg-background"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }} // Reduced amount slightly
                variants={sectionVariants}
                id='communities-section'
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-display">Our Communities</h2>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                    // Animation props moved to parent section, inherit staggering from variants
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }} // Slightly faster stagger
                >
                    {communities.map((community, index) => (
                        <CommunityCard
                            key={index}
                            icon={community.icon}
                            title={community.title}
                            description={community.description}
                            onClick={() => handleCommunityClick(community)} // Added onClick
                        />
                    ))}
                </motion.div>
            </motion.section>

            {/* How It Works Section */}
            <motion.section
                className="py-16 md:py-24 px-6 bg-secondary/10 border-t border-border overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-display">How It Works</h2>
                    <div className="relative">
                        {/* Timeline Line - Hidden on mobile, visible on md+ */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 md:block hidden -z-10" />
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
                        >
                            {[
                                { title: "Join a WhatsApp group", description: "Connect with like-minded students instantly", icon: MessageCircle },
                                { title: "Attend weekly meets", description: "Fun, zero-pressure gatherings to connect", icon: Calendar },
                                { title: "Contribute & collaborate", description: "Share ideas and work on projects together", icon: Users },
                                { title: "Build a vibrant SL culture", description: "Be part of the campus transformation 💫", icon: Heart },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start mb-12 last:mb-0 relative"
                                    variants={{
                                        hidden: { opacity: 0, x: -30 },
                                        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                                    }}
                                >
                                    <motion.div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 mr-6 font-bold z-10 shadow-lg" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <item.icon size={28} />
                                    </motion.div>
                                    <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex-1 hover:border-primary/40 transition-colors duration-300">
                                        <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Testimonials Section */}
            <motion.section
                className="py-16 md:py-24 px-6 max-w-6xl mx-auto border-t border-border bg-background"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-display">Student Voices</h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                            id='testimonials-section'
                        >
                            <Card className="h-full bg-card border-border hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md">
                                <CardContent className="pt-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold mr-4 text-lg">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                                            <p className="text-sm text-muted-foreground">{testimonial.dept} Department</p>
                                        </div>
                                    </div>
                                    <p className="italic text-foreground/80">"{testimonial.text}"</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            {/* FAQ Section */}
            <motion.section
                className="py-16 md:py-24 px-6 bg-secondary/10 border-t border-border"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                id='faq-section'
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-display">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full space-y-2">
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border border-border bg-card rounded-lg shadow-sm px-4 hover:border-primary/40 transition-colors duration-300">
                                <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary transition-colors hover:no-underline text-left">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-4 pt-0">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </motion.section>

            {/* Gallery Section */}
            <motion.section
                className="py-16 md:py-24 px-6 max-w-6xl mx-auto border-t border-border bg-background"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-display">Campus Life Snapshots</h2>
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]"
                    variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {galleryItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={index}
                                className={`${item.span} rounded-xl overflow-hidden group relative shadow-sm border border-border`}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} transition-opacity duration-300 group-hover:opacity-80`} />
                                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
                                    <IconComponent size={item.type === 'large' ? 48 : 32} className="mb-2 opacity-70 group-hover:opacity-90 transition-opacity text-foreground/80" />
                                    <p className={`font-semibold text-foreground/90 ${item.type === 'large' ? '' : 'text-sm'}`}>{item.label}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.section>

            {/* Call to Action Section */}
            <motion.section
                id="join-form"
                className="py-20 px-6 bg-primary/5 text-foreground relative overflow-hidden border-t border-border"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/10 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary/5 translate-x-1/3 translate-y-1/3 blur-3xl opacity-50"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display text-primary">Join Us Now!</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto text-foreground/80">
                            Be a part of something awesome. Build your own space, your way.
                            Get involved in any community that excites you!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">

                            {/* Button 1: Fill the Form */}
                            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-sm hover:shadow-md transition-all">
                                <a href="#" className="flex items-center justify-center">
                                    <span className="mr-2 text-xl">📋</span> Fill the Form
                                </a>
                            </Button>

                            {/* Button 2: Join WhatsApp Groups */}
                            <Button size="lg" asChild variant="outline" className="border-primary text-primary bg-background/50 hover:bg-primary/10 hover:text-primary font-semibold shadow-sm hover:shadow-md transition-all">
                                <a href="#" className="flex items-center justify-center">
                                    <MessageCircle className="mr-2 h-5 w-5" /> Join WhatsApp Groups
                                </a>
                            </Button>

                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Footer Section */}
            <footer className="bg-muted/80 text-muted-foreground py-16 px-6 border-t border-border">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Col 1 */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-foreground font-display">SL Communities | JU</h2>
                            <p className="text-muted-foreground/90 mb-6 max-w-sm">"Let's build the campus we dream of. Join us in making Salt Lake Campus vibrant, collaborative, and unforgettable."</p>
                            <div className="flex space-x-3">
                                <a href="#" className="hover:text-primary transition-colors p-2 bg-muted rounded-full border border-border hover:border-primary/50" aria-label="Instagram"><Instagram size={20} /></a>
                                <a href="#" className="hover:text-primary transition-colors p-2 bg-muted rounded-full border border-border hover:border-primary/50" aria-label="WhatsApp"><MessageCircle size={20} /></a>
                                <a href="#" className="hover:text-primary transition-colors p-2 bg-muted rounded-full border border-border hover:border-primary/50" aria-label="Website"><Globe size={20} /></a>
                            </div>
                        </div>
                        {/* Col 2 */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Communities</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
                                <li><a href="#join-form" onClick={(e) => { e.preventDefault(); scrollToJoin(); }} className="hover:text-primary transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        {/* Col 3 */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-foreground">Contact Us</h3>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <MapPin size={20} className="mr-3 flex-shrink-0 mt-1 text-muted-foreground/70" />
                                    <span>Salt Lake Campus, Jadavpur University<br />Block LB, Sector III, Salt Lake<br />Kolkata 700098</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail size={20} className="mr-3 flex-shrink-0 text-muted-foreground/70" />
                                    <a href="mailto:sl.communities.ju@gmail.com" className="hover:text-primary transition-colors">sl.communities.ju@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer Bottom */}
                    <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-muted-foreground/80 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} SL Communities. All rights reserved.</p>
                        <div className="flex items-center text-muted-foreground/80 text-sm">
                            <span className="flex items-center">Made with <Heart size={16} className="mx-1.5 text-red-500 fill-current" /> by SL students</span>
                        </div>
                    </div>
                </div>
            </footer>
            {selectedCommunity && (
  <CommunityModal
    isOpen={isModalOpen}
    onClose={closeModal}
    community={selectedCommunity}
  />
)}
        </div>
    );
}