"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { DotBackgroundDemo } from "@/components/ui/DotBackgrounddemo";
import { FloatingNav } from "@/components/ui/floating-navbar"; // Add this import
import { FaGithub, FaReddit, FaTwitter } from 'react-icons/fa'; // Add this import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsBriefcase, BsBook } from 'react-icons/bs';
import { toast } from "sonner";
import { Toaster } from "sonner";

// Types for CMS data
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  featured: boolean;
}

// Modified Hero Component with direct copy functionality
const Hero = () => {
  const copyEmail = async () => {
    const email = "eshwanthkartitr@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard!", {
        duration: 2000,
        className: "bg-black/80 border border-purple-500/20 text-white",
        description: (
          <div className="flex flex-col gap-2">
            <span className="text-gray-400">{email}</span>
            <div className="relative w-full h-1 bg-purple-500/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="absolute h-full bg-purple-500"
              />
            </div>
          </div>
        ),
      });
    } catch (err) {
      toast.error("Failed to copy email", {
        duration: 2000,
        className: "bg-black/80 border border-red-500/20 text-white",
      });
    }
  };

  const handleGithubRedirect = () => {
    toast.success("Redirecting to GitHub...", {
      duration: 1500,
      className: "bg-black/80 border border-purple-500/20 text-white",
      description: (
        <div className="flex flex-col gap-2">
          <span className="text-gray-400">github.com/eshwanthkartitr</span>
          <div className="relative w-full h-1 bg-purple-500/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5 }}
              className="absolute h-full bg-purple-500"
              onAnimationComplete={() => {
                window.open("https://github.com/eshwanthkartitr", "_blank");
              }}
            />
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="space-y-8 pt-10">
      <TextGenerateEffect
        words="Hello, I'm Eshwanth"
        className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400"
      />
      <TextGenerateEffect
        words="I am pursuing my UG degree in Amrita Vishwa Vidyapeetham, Coimbatore."
        className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400 text-gray-300 leading-relaxed max-w-2xl"
      />

      <div className="flex gap-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 flex items-center gap-2"
          variant="default"
          onClick={handleGithubRedirect}
        >
          <FaGithub className="w-5 h-5" />
          GitHub
        </Button>
        <Button 
          variant="outline" 
          className="border-blue-600 text-blue-500 hover:bg-blue-900/20 hover:text-white transition-colors duration-300"
          onClick={copyEmail}
        >
          Contact Me
        </Button>
      </div>
    </div>
  );
};

// Enhanced Project Card Component with 3D Effect
const ProjectCard = ({ project }: { project: Project }) => {
  const handleProjectClick = () => {
    toast.success("Opening project...", {
      duration: 1500,
      className: "bg-black/80 border border-purple-500/20 text-white",
      description: (
        <div className="flex flex-col gap-2">
          <span className="text-gray-400">{project.title}</span>
          <div className="relative w-full h-1 bg-purple-500/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5 }}
              className="absolute h-full bg-purple-500"
              onAnimationComplete={() => {
                window.open(project.link, '_blank');
              }}
            />
          </div>
        </div>
      ),
    });
  };

  return (
    <CardContainer className="w-full min-h-[300px]">
      <CardBody className="bg-black/50 relative group/card border border-gray-800 hover:border-white hover:text-white rounded-xl p-8">
        <CardItem translateZ="50" className="text-xl font-medium text-gray-200">
          {project.title}
        </CardItem>
        
        <CardItem translateZ="60" className="text-gray-500 text-sm max-w-sm mt-2">
          {project.description}
        </CardItem>
        
        <CardItem translateZ="100" className="w-full mt-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge 
                key={tech}
                variant="secondary" 
                className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardItem>

        <CardItem translateZ="120" className="mt-6">
          <Button size="sm" 
            className="bg-white/10 text-white hover:bg-white/20"
            onClick={handleProjectClick}
          >
            View Project
          </Button>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

// Modified Projects Section with adjusted spacing
const Projects = ({ projects = [] }: { projects?: Project[] }) => (
  <div className="space-y-16 min-h-[200px]"> {/* Added minimum height */}
    <TextGenerateEffect
      words="Featured Projects"
      className="text-2xl font-semibold text-gray-200/90"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </div>
);

// Modified Background Component
// Modified Background Component
const Background = () => (
  <div className="fixed inset-0 z-0">
    <DotBackgroundDemo />
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
  </div>
);

// Modified DotBackgroundDemo Component

// Update the skillsData array
const skillsData = [
  {
    name: "React",
    logo: "/logos/react-original.png",
    color: "text-blue-400"
  },
  {
    name: "Firebase",
    logo: "/logos/firebase-original.png",
    color: "text-orange-400"
  },
  {
    name: "Appwrite",
    logo: "/logos/Appwrite-original.png",
    color: "text-pink-400"
  },
  {
    name: "Flutter",
    logo: "/logos/flutter-original.png",
    color: "text-cyan-400"
  },
  {
    name: "Python",
    logo: "/logos/python-original.png",
    color: "text-yellow-400"
  }
];

// Updated SkillCard component with glow effect
const SkillCard = ({ skill, logo, color }: { skill: string; logo: string; color: string }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
    className={`bg-black/20 backdrop-blur-sm rounded-xl px-6 py-4 
    border border-gray-800/50 hover:border-gray-700/50 
    shadow-[0_0_15px_rgba(0,0,0,0.2)] 
    hover:shadow-[0_0_20px_rgba(var(--hover-glow),0.3)]`}
    style={{
      '--hover-glow': color === 'text-blue-400' ? '59,130,246' :
                      color === 'text-orange-400' ? '251,146,60' :
                      color === 'text-pink-400' ? '236,72,153' :
                      color === 'text-cyan-400' ? '34,211,238' :
                      '234,179,8'
    } as React.CSSProperties}
  >
    <div className="flex items-center justify-between w-full gap-6">
      <div className="w-8 h-8 relative">
        <Image
          src={logo}
          alt={skill}
          fill
          className="object-contain drop-shadow-[0_0_10px_rgba(var(--hover-glow),0.3)]"
          priority
        />
      </div>
      <span className={`text-base font-medium ${color} tracking-wide`}>
        {skill}
      </span>
    </div>
  </motion.div>
);

// Updated Skills component with tighter layout
const Skills = () => (
  <div className="space-y-8">
    <TextGenerateEffect
      words="Skills"
      className="text-2xl font-semibold text-gray-200/90"
    />
    
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl">
      {skillsData.map((skill) => (
        <SkillCard 
          key={skill.name}
          skill={skill.name}
          logo={skill.logo}
          color={skill.color}
        />
      ))}
    </div>
  </div>
);

// Create a FadeInSection component for the staggered animation
const FadeInSection = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: delay,
      ease: [0.04, 0.62, 0.23, 0.98],
    }}
  >
    {children}
  </motion.div>
);

// Main Portfolio Component with adjusted z-indices and positioning
// Add this near your other interface definitions
const navItems = [
  {
    name: "GitHub",
    link: "https://github.com/eshwanthkartitr",
    icon: <FaGithub className="w-5 h-5" />,
  },
  {
    name: "Reddit",
    link: "https://www.reddit.com/user/SouthIndication3373/",
    icon: <FaReddit className="w-5 h-5" />,
  },
  {
    name: "X",
    link: "https://x.com/TrKarti",
    icon: <FaTwitter className="w-5 h-5" />,
  },
];

// Add a Footer component
const Footer = () => (
  <motion.footer 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="relative z-10 py-10 px-4 mt-20 border-t border-purple-500/20"
  >
    <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
      <div className="text-center">
        <motion.p 
          className="text-gray-400"
          whileHover={{ scale: 1.05 }}
        >
          Made with{' '}
          <span className="text-red-500 animate-pulse">❤</span>
          {' '}by{' '}
          <a 
            href="https://github.com/eshwanthkartitr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
          >
            eshwanthkartitr
          </a>
        </motion.p>
      </div>
      
      <div className="text-sm text-gray-500">
        <motion.p
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          © 2024 All rights reserved
        </motion.p>
      </div>
    </div>
  </motion.footer>
);

// Add these interfaces
interface TimelineItem {
  date: string;
  title: string;
  location: string;
  description: string;
}

const educationData: TimelineItem[] = [
  {
    date: "2022 - Present",
    title: "B.Tech Computer Science Engineering",
    location: "Amrita Vishwa Vidyapeetham, Coimbatore",
    description: "Specializing in AI and ML with a current CGPA of 8.5"
  },
  {
    date: "2020 - 2022",
    title: "Higher Secondary Education",
    location: "Sunbeam Hr Sec School, Vellore",
    description: "Completed with with 83% in Science Stream"
  },
  // Add more education items as needed
];

const workData: TimelineItem[] = [
  {
    date: "2025",
    title: "Software Developer Intern",
    location: "Location has not yet been confirmed",
    description: "Got selected for 2 month internship for Cisco Fy 25"
  },
  // Add more work items as needed
];

// Create Timeline Item Component
const TimelineItem = ({ item }: { item: TimelineItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative pl-8 pb-12 last:pb-0"
  >
    {/* Timeline line */}
    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-purple-500/20" />
    
    {/* Timeline dot */}
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
      className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-purple-500"
    />
    
    {/* Content */}
    <div className="space-y-3">
      <span className="text-sm text-purple-400">{item.date}</span>
      <h3 className="text-xl font-semibold text-gray-200">{item.title}</h3>
      <p className="text-gray-400 text-sm">{item.location}</p>
      <p className="text-gray-500">{item.description}</p>
    </div>
  </motion.div>
);

// Create Timeline Section Component
const TimelineSection = () => (
  <div className="space-y-8">
    <TextGenerateEffect
      words="Experience & Education"
      className="text-2xl font-semibold text-gray-200/90"
    />
    
    <Tabs defaultValue="education" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-black/50 border text-white border-purple-500/20">
        <TabsTrigger
          value="education"
          className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
        >
          <BsBook className="mr-2" />
          Education
        </TabsTrigger>
        <TabsTrigger
          value="work"
          className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
        >
          <BsBriefcase className="mr-2" />
          Work
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="education" className="mt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {educationData.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </motion.div>
      </TabsContent>
      
      <TabsContent value="work" className="mt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {workData.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </motion.div>
      </TabsContent>
    </Tabs>
  </div>
);

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
    // Start the animation sequence
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      <Toaster position="top-center" />
      <div className="fixed inset-0 z-0">
        <DotBackgroundDemo />
      </div>
      
      <FloatingNav navItems={navItems} />
      
      <div className="relative z-10">
        <TracingBeam>
          <div className="flex flex-col min-h-screen">
            <main className="w-full">
              <div className="max-w-4xl mx-auto px-4 py-20 space-y-40">
                <FadeInSection delay={0.2}>
                  <Hero />
                </FadeInSection>
                
                <FadeInSection delay={0.4}>
                  <Skills />
                </FadeInSection>
                
                <FadeInSection delay={0.6}>
                  <TimelineSection />
                </FadeInSection>
                
                <FadeInSection delay={0.8}>
                  <div className="min-h-[200px]">
                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 hover:border-white border-purple-500"></div>
                      </div>
                    ) : error ? (
                      <div className="text-center text-red-500 mt-8">{error}</div>
                    ) : (
                      <Projects projects={projects} />
                    )}
                  </div>
                </FadeInSection>
              </div>
            </main>
            
            <Footer />
          </div>
        </TracingBeam>
      </div>
    </div>
  );
};

export default Portfolio;
