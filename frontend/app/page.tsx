"use client"; // Needed for Framer Motion and event handlers

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  ArrowRight, Mail, Instagram, Globe, MessageCircle, MapPin, Heart, 
  ChevronDown, ChevronUp, Code, Palette, Music, Dumbbell, Users, 
  Calendar, Share2, Lightbulb, Image, Coffee, Book
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Animation variants for staggered items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Parallax effect for hero section
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

// Staggered counter component
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
        const interval = setInterval(() => {
          setCount(prevCount => {
            if (prevCount >= number) {
              clearInterval(interval);
              return number;
            }
            return prevCount + 1;
          });
        }, 30);
        
        return () => clearInterval(interval);
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

// Community card with hover effect
const CommunityCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="text-center p-6 border border-border bg-card hover:border-primary/50 transition-all duration-300 h-full flex flex-col items-center justify-center group overflow-hidden">
        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </Card>
    </motion.div>
  );
};

export default function Home() {
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
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Parallax */}
      <ParallaxSection>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-200 opacity-80"></div>
        <div className="absolute inset-0 backdrop-blur-sm bg-background/30"></div>
        
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <motion.div
            className="max-w-4xl text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 font-display tracking-tight">
              Reimagine Campus Life at JU Salt Lake
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-6">
              Small, vibrant communities. Big, meaningful impact.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["Cultural", "Technical", "Sports", "Growth", "Creative"].map((item, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="bg-primary/10 px-3 py-1 rounded-full text-primary/80 text-sm font-medium"
                >
                  {item}
                </motion.span>
              ))}
            </div>
            <Button 
              size="lg" 
              onClick={scrollToJoin} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground mx-auto group"
            >
              Join the Movement 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </ParallaxSection>

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
        className="py-16 md:py-24 px-6 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
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
        className="py-16 md:py-24 px-6 bg-secondary/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-display">Our Vision</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Feature item 1 - Spans 2 columns */}
            <motion.div 
              className="col-span-1 md:col-span-2 rounded-xl overflow-hidden h-64 md:h-80 relative group"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-orange-500/70 text-white p-6 flex flex-col justify-end">
                <Lightbulb size={42} className="mb-2" />
                <h3 className="text-2xl font-bold mb-2">Activate the Campus</h3>
                <p className="text-white/90">Events, games, art, and bonding activities that bring life to our campus spaces.</p>
              </div>
            </motion.div>
            
            {/* Feature item 2 */}
            <motion.div 
              className="col-span-1 rounded-xl overflow-hidden h-64 bg-card border border-border relative group"
              variants={itemVariants}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-b from-transparent to-primary/10">
                <Users size={36} className="mb-2 text-primary" />
                <h3 className="text-xl font-bold mb-2 text-primary">Empower Students</h3>
                <p className="text-foreground/70">Learn, grow, build portfolios through engagement.</p>
              </div>
            </motion.div>
            
            {/* Feature item 3 */}
            <motion.div 
              className="col-span-1 rounded-xl overflow-hidden h-64 bg-card border border-border relative group"
              variants={itemVariants}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-b from-transparent to-primary/10">
                <Share2 size={36} className="mb-2 text-primary" />
                <h3 className="text-xl font-bold mb-2 text-primary">Connect Departments</h3>
                <p className="text-foreground/70">Foster collaboration across all departments.</p>
              </div>
            </motion.div>
            
            {/* Feature item 4 - Spans 2 columns */}
            <motion.div 
              className="col-span-1 md:col-span-2 rounded-xl overflow-hidden h-64 bg-card border border-border relative group"
              variants={itemVariants}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-b from-transparent to-primary/10">
                <Calendar size={36} className="mb-2 text-primary" />
                <h3 className="text-xl font-bold mb-2 text-primary">Regular Activities</h3>
                <p className="text-foreground/70">Weekly meetups, monthly events, and seasonal festivals to keep the campus buzzing with energy all year round.</p>
              </div>
            </motion.div>
            
            {/* Feature item 5 */}
            <motion.div 
              className="col-span-1 md:col-span-2 rounded-xl overflow-hidden h-64 bg-gradient-to-br from-orange-400/70 to-primary/70 text-white relative group"
              variants={itemVariants}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <Coffee size={36} className="mb-2" />
                <h3 className="text-2xl font-bold mb-2">Build Meaningful Connections</h3>
                <p className="text-white/90">Create friendships and networks that last beyond your college years.</p>
              </div>
            </motion.div>
            
            {/* Feature item 6 */}
            <motion.div 
              className="col-span-1 md:col-span-2 rounded-xl overflow-hidden h-64 bg-card border border-border relative group"
              variants={itemVariants}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-b from-transparent to-primary/10">
                <Book size={36} className="mb-2 text-primary" />
                <h3 className="text-xl font-bold mb-2 text-primary">Skill Development</h3>
                <p className="text-foreground/70">Workshops, mentoring sessions, and collaborative projects to enhance both technical and soft skills.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Communities Section */}
      <motion.section
        className="py-16 md:py-24 px-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-display">Our Communities</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          <CommunityCard icon="🎸" title="Cultural" description="Music, Drama, Art, Dance, Literature" />
          <CommunityCard icon="⚙️" title="Technical" description="Coding, Electronics, Robotics, ML" />
          <CommunityCard icon="⚽" title="Sports" description="Football, Cricket, Chess, Indoor games" />
          <CommunityCard icon="🧠" title="Growth" description="Debate, MUNs, Linguistics, Public Speaking" />
          <CommunityCard icon="🎨" title="Creative Arts" description="Painting, Photography, Digital Design" />
          <CommunityCard icon="🌱" title="Environmental" description="Gardening, Sustainability, Campus Greening" />
          <CommunityCard icon="📚" title="Academic" description="Study groups, Research, Publication" />
          <CommunityCard icon="🎮" title="Gaming" description="Esports, Board Games, Game Dev" />
        </motion.div>
      </motion.section>

      {/* How It Works Section with Scrolling Effect */}
      <motion.section
        className="py-16 md:py-24 px-6 bg-secondary/20 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-display">How It Works</h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 md:block hidden" />
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                visible: { transition: { staggerChildren: 0.3 } }
              }}
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
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 mr-6 font-bold z-10 shadow-lg">
                    <item.icon size={24} />
                  </div>
                  <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-16 md:py-24 px-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-display">Student Voices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full bg-card border-border hover:border-primary/30 transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.dept} Department</p>
                    </div>
                  </div>
                  <p className="italic text-foreground/80">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section with Accordion */}
      <motion.section
        className="py-16 md:py-24 px-6 bg-secondary/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-display">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>

      {/* Gallery Bento Grid */}
      <motion.section
        className="py-16 md:py-24 px-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 font-display">Campus Life</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Using placeholder images - in a real implementation, you'd use actual images */}
          <motion.div 
            className="col-span-2 row-span-2 rounded-xl overflow-hidden"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-br from-amber-100 to-orange-200 h-full flex items-center justify-center text-center p-6">
              <div>
                <Image size={48} className="mb-4 mx-auto opacity-70" />
                <p className="font-semibold text-foreground/80">Campus Fest 2024</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="col-span-1 rounded-xl overflow-hidden"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-br from-blue-100 to-sky-200 h-full flex items-center justify-center text-center p-4">
              <div>
                <Music size={32} className="mb-2 mx-auto opacity-70" />
                <p className="font-semibold text-sm text-foreground/80">Music Jam</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="col-span-1 rounded-xl overflow-hidden"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-br from-emerald-100 to-green-200 h-full flex items-center justify-center text-center p-4">
              <div>
                <Code size={32} className="mb-2 mx-auto opacity-70" />
                <p className="font-semibold text-sm text-foreground/80">Hackathon</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="col-span-1 rounded-xl overflow-hidden"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-br from-violet-100 to-purple-200 h-full flex items-center justify-center text-center p-4">
              <div>
                <Palette size={32} className="mb-2 mx-auto opacity-70" />
                <p className="font-semibold text-sm text-foreground/80">Art Exhibition</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="col-span-1 rounded-xl overflow-hidden"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-br from-red-100 to-rose-200 h-full flex items-center justify-center text-center p-4">
              <div>
                <Dumbbell size={32} className="mb-2 mx-auto opacity-70" />
                <p className="font-semibold text-sm text-foreground/80">Sports Meet</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action Section with Scroll Animation */}
      <motion.section
        id="join-form"
        className="py-20 px-6 bg-gradient-to-r from-primary to-orange-500 text-primary-foreground relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/10 translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Join Us Now!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Be a part of something awesome. Build your own space, your way.
              Get involved in any community that excites you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-background text-primary hover:bg-background/90 font-bold">
                <a href="#">
                  <span className="mr-2 text-xl">📋</span> Fill the Form
                </a>
              </Button>
              <Button size="lg" asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <a href="#">
                  <MessageCircle className="mr-2 h-5 w-5" /> Join WhatsApp Groups
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Improved Footer Section */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white font-display">SL Communities | JU</h2>
              <p className="text-gray-400 mb-6 max-w-sm">"Let's build the campus we dream of. Join us in making Salt Lake Campus vibrant, collaborative, and unforgettable."</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary transition-colors p-2 bg-gray-800 rounded-full" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="hover:text-primary transition-colors p-2 bg-gray-800 rounded-full" aria-label="WhatsApp">
                  <MessageCircle size={20} />
                </a>
                <a href="#" className="hover:text-primary transition-colors p-2 bg-gray-800 rounded-full" aria-label="Website">
                  <Globe size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Communities</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin size={20} className="mr-3 flex-shrink-0 mt-1 text-gray-400" />
                  <span>Salt Lake Campus, Jadavpur University<br />Block LB, Sector III, Salt Lake<br />Kolkata 700098</span>
                </div>
                <div className="flex items-center">
                  <Mail size={20} className="mr-3 flex-shrink-0 text-gray-400" />
                  <span>sl.communities.ju@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} SL Communities. All rights reserved.
            </p>
            <div className="flex items-center text-gray-400 text-sm">
              <span className="flex items-center">
                Made with <Heart size={16} className="mx-1.5 text-red-500 fill-current" /> by SL students
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}