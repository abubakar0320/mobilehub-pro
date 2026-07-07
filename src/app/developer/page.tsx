"use client";

import React from "react";
import {
  Database,
  Globe,
  Layout,
  Server,
  Shield,
  Smartphone,
  MapPin,
  GraduationCap,
  Award,
  Briefcase,
  Mail,
  ExternalLink,
  CheckCircle2,
  FileText
} from "lucide-react";

// Professional Icons
const GithubIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const getTagColor = (tag: string) => {
  const t = tag.toLowerCase();
  if (t.includes('react')) return 'text-sky-600 bg-sky-100 border-sky-300';
  if (t.includes('next.js')) return 'text-zinc-800 bg-zinc-200 border-zinc-400';
  if (t.includes('node')) return 'text-emerald-700 bg-emerald-100 border-emerald-300';
  if (t.includes('mongo')) return 'text-green-700 bg-green-100 border-green-300';
  if (t.includes('tailwind')) return 'text-teal-700 bg-teal-100 border-teal-300';
  if (t.includes('express')) return 'text-zinc-700 bg-zinc-200 border-zinc-300';
  if (t.includes('frontend')) return 'text-violet-700 bg-violet-100 border-violet-300';
  if (t.includes('seo')) return 'text-orange-700 bg-orange-100 border-orange-300';
  if (t.includes('responsive')) return 'text-indigo-700 bg-indigo-100 border-indigo-300';
  if (t.includes('typescript')) return 'text-blue-700 bg-blue-100 border-blue-300';
  return 'text-rose-700 bg-rose-100 border-rose-300';
};

export default function EnterpriseDeveloperPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-pink-500 selection:text-white pb-20 overflow-x-hidden">

      {/* MAIN CONTENT AREA */}
      <main className="max-w-5xl mx-auto px-6 py-12 lg:px-12 lg:py-20 space-y-24">
        
        {/* HERO SECTION */}
        <section id="about" className="space-y-10 scroll-mt-32">
          
          {/* Hero Profile Details */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
            {/* Avatar */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-tr from-rose-500 via-fuchsia-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-5xl md:text-6xl font-bold shadow-2xl shrink-0 border-[6px] border-white">
              AB
            </div>
            
            {/* Titles and Contacts */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center px-4 py-1.5 bg-emerald-100 text-emerald-800 text-[13px] font-bold uppercase tracking-widest rounded-full mb-5 shadow-sm border border-emerald-300">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2.5 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                Available for Opportunities
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-[900] tracking-tight leading-[1.1]">
                <span className="text-sky-500">Building</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                  Enterprise-Grade
                </span>
                <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600">
                  Web Applications.
                </span>
              </h1>
              
              <div className="flex flex-col md:flex-row items-center md:justify-start gap-6 mt-8">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-lg bg-rose-50 px-4 py-2 rounded-xl border border-rose-200">
                  <MapPin className="w-5 h-5" /> Sheikhupura, Pakistan
                </div>
                
                <div className="hidden md:block w-2 h-2 bg-zinc-300 rounded-full"></div>
                
                <div className="flex gap-3">
                  <a href="https://github.com/abubakar0320" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-white hover:bg-zinc-800 hover:scale-110 transition-all shadow-md">
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/in/abubakar0320" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#0077B5] border border-[#0077B5] rounded-full text-white hover:bg-[#005E93] hover:scale-110 transition-all shadow-md">
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a href="https://iamabubakar.site" target="_blank" rel="noopener noreferrer" className="p-3 bg-teal-500 border border-teal-500 rounded-full text-white hover:bg-teal-600 hover:scale-110 transition-all shadow-md">
                    <Globe className="w-5 h-5" />
                  </a>
                  <a href="mailto:contact@iamabubakar.site" className="p-3 bg-rose-500 border border-rose-500 rounded-full text-white hover:bg-rose-600 hover:scale-110 transition-all shadow-md">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bio Text */}
          <div className="space-y-5 max-w-4xl text-[19px] leading-relaxed pt-10 border-t-2 border-zinc-200">
            <p className="text-zinc-700">
              I am <span className="font-extrabold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-md">Abu Bakar Siddique</span>, a passionate Full Stack Web Developer specializing in building modern, responsive, and scalable web applications using the <span className="font-bold text-emerald-600 underline decoration-emerald-300 decoration-4 underline-offset-4">MERN stack</span> and <span className="font-bold text-zinc-900 underline decoration-zinc-300 decoration-4 underline-offset-4">Next.js</span>. I focus on <span className="font-semibold text-sky-600">clean code architecture</span>, <span className="font-semibold text-pink-600">modern UI/UX implementation</span>, and <span className="font-semibold text-orange-600">optimized software performance</span>.
            </p>
            <p className="text-zinc-700">
              Alongside web development, I actively improve my knowledge in <span className="font-bold text-rose-600">cybersecurity</span>, <span className="font-bold text-blue-600">networking</span>, and <span className="font-bold text-indigo-600">software engineering principles</span> to deliver secure and robust digital solutions.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
            <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 p-6 border-2 border-violet-200 rounded-2xl shadow-sm text-center md:text-left hover:-translate-y-1 transition-transform">
              <p className="text-5xl font-[900] text-violet-600 mb-2 drop-shadow-sm">10+</p>
              <p className="text-violet-900 text-[13px] font-bold uppercase tracking-widest">Projects Shipped</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 border-2 border-emerald-200 rounded-2xl shadow-sm text-center md:text-left hover:-translate-y-1 transition-transform">
              <p className="text-5xl font-[900] text-emerald-500 mb-2 drop-shadow-sm">4</p>
              <p className="text-emerald-900 text-[13px] font-bold uppercase tracking-widest">Active Internships</p>
            </div>
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-6 border-2 border-sky-200 rounded-2xl shadow-sm text-center md:text-left hover:-translate-y-1 transition-transform">
              <p className="text-5xl font-[900] text-sky-500 mb-2 drop-shadow-sm">6th</p>
              <p className="text-sky-900 text-[13px] font-bold uppercase tracking-widest">Semester BSIT</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 border-2 border-orange-200 rounded-2xl shadow-sm text-center md:text-left hover:-translate-y-1 transition-transform">
              <p className="text-5xl font-[900] text-orange-500 mb-2 drop-shadow-sm">24/7</p>
              <p className="text-orange-900 text-[13px] font-bold uppercase tracking-widest">Continuous Learner</p>
            </div>
          </div>
        </section>

        {/* TECHNICAL SKILLS */}
        <section id="skills" className="space-y-8 scroll-mt-24">
          <div className="border-b-4 border-zinc-200 pb-4">
            <h3 className="text-3xl font-[900] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Technical Skills</h3>
            <p className="text-zinc-500 mt-2 font-bold">Core competencies and technologies across the stack.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Frontend */}
            <div className="bg-white border-2 border-sky-200 rounded-3xl shadow-lg shadow-sky-100 overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <div className="bg-sky-500 px-6 py-5 border-b border-sky-600 flex items-center gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm">
                  <Layout className="text-sky-600 w-6 h-6" />
                </div>
                <h4 className="font-[800] text-white text-xl">Frontend Development</h4>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-3">
                  {["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3"].map(skill => (
                    <span key={skill} className={`px-4 py-2 text-[15px] font-bold rounded-xl border-2 ${getTagColor(skill)}`}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="bg-white border-2 border-emerald-200 rounded-3xl shadow-lg shadow-emerald-100 overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <div className="bg-emerald-500 px-6 py-5 border-b border-emerald-600 flex items-center gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm">
                  <Server className="text-emerald-600 w-6 h-6" />
                </div>
                <h4 className="font-[800] text-white text-xl">Backend Architecture</h4>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-3">
                  {["Node.js", "Express.js", "PHP", "REST APIs", "MVC Architecture", "Authentication"].map(skill => (
                    <span key={skill} className={`px-4 py-2 text-[15px] font-bold rounded-xl border-2 ${getTagColor(skill)}`}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Database */}
            <div className="bg-white border-2 border-indigo-200 rounded-3xl shadow-lg shadow-indigo-100 overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <div className="bg-indigo-500 px-6 py-5 border-b border-indigo-600 flex items-center gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm">
                  <Database className="text-indigo-600 w-6 h-6" />
                </div>
                <h4 className="font-[800] text-white text-xl">Database Management</h4>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-3">
                  {["MongoDB", "MySQL", "PostgreSQL", "SQL", "Database Design", "CRUD Operations"].map(skill => (
                    <span key={skill} className={`px-4 py-2 text-[15px] font-bold rounded-xl border-2 ${getTagColor(skill)}`}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools & Domain */}
            <div className="bg-white border-2 border-rose-200 rounded-3xl shadow-lg shadow-rose-100 overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <div className="bg-rose-500 px-6 py-5 border-b border-rose-600 flex items-center gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm">
                  <Shield className="text-rose-600 w-6 h-6" />
                </div>
                <h4 className="font-[800] text-white text-xl">Tools & Security</h4>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-3">
                  {["Git & GitHub", "Vercel", "cPanel", "Postman", "Cybersecurity", "Networking", "SEO"].map(skill => (
                    <span key={skill} className={`px-4 py-2 text-[15px] font-bold rounded-xl border-2 ${getTagColor(skill)}`}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="space-y-8 scroll-mt-24">
          <div className="border-b-4 border-zinc-200 pb-4">
            <h3 className="text-3xl font-[900] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Professional Experience</h3>
            <p className="text-zinc-500 mt-2 font-bold">Active roles and industry application.</p>
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-3xl p-10 shadow-lg shadow-blue-50">
             <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 gap-4">
               <div>
                 <h4 className="text-2xl font-[900] text-blue-900">Software Development Internships</h4>
                 <p className="text-blue-600 font-bold mt-2 bg-blue-50 px-3 py-1 inline-block rounded-lg">Multiple Organizations</p>
               </div>
               <span className="text-sm font-[900] text-white bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2 rounded-full w-fit shadow-md">
                 Present
               </span>
             </div>
             
             <p className="text-zinc-600 mb-10 leading-relaxed max-w-4xl text-lg font-medium">
               Currently participating in multiple simultaneous internships to accelerate practical learning and industry exposure. Responsibilities include <span className="text-sky-600 font-bold">frontend development</span>, <span className="text-emerald-600 font-bold">backend API creation</span>, and <span className="text-indigo-600 font-bold">database modeling</span> across diverse project requirements.
             </p>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
               {[
                 { name: "IT Genesis Software House", bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300" },
                 { name: "CodeAlpha", bg: "bg-violet-100", text: "text-violet-800", border: "border-violet-300" },
                 { name: "DecodeLabs", bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300" },
                 { name: "Oasis Infobyte", bg: "bg-sky-100", text: "text-sky-800", border: "border-sky-300" },
                 { name: "Cognifyz Technologies", bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-300" },
                 { name: "Codveda Technologies", bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" }
               ].map((company, idx) => (
                 <div key={idx} className={`flex items-center gap-3 text-[15px] font-[800] ${company.text} ${company.bg} border-2 ${company.border} p-4 rounded-2xl hover:scale-105 transition-transform shadow-sm`}>
                   <span>{company.name}</span>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="border-b-4 border-zinc-200 pb-4">
            <h3 className="text-3xl font-[900] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Featured Projects</h3>
            <p className="text-zinc-500 mt-2 font-bold">End-to-end full stack implementations.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "EstateHub",
                desc: "Smart Property & Rental Management System featuring comprehensive property listings, robust rental management workflows, secure user authentication, and an administrative dashboard.",
                tags: ["React", "Node.js", "Express", "MongoDB"],
                icon: Layout,
                url: "https://estatehub.site",
                color: "text-blue-600",
                bg: "bg-blue-100",
                border: "border-blue-200",
                shadow: "shadow-blue-100"
              },
              {
                name: "DiabetFree Pakistan",
                desc: "A comprehensive health and wellness platform dedicated to diabetes management, featuring resources, tools, and a responsive modern architecture.",
                tags: ["Next.js", "Tailwind CSS", "React"],
                icon: Shield,
                url: "https://diabetfreepakistan.site",
                color: "text-emerald-600",
                bg: "bg-emerald-100",
                border: "border-emerald-200",
                shadow: "shadow-emerald-100"
              },
              {
                name: "Jamia Sher Rabbani",
                desc: "Institutional website delivering modern responsive UI architectures and dynamically managed content for organizational outreach.",
                tags: ["Frontend", "Responsive Design", "SEO"],
                icon: Globe,
                url: "https://jamiashererabbani.com",
                color: "text-violet-600",
                bg: "bg-violet-100",
                border: "border-violet-200",
                shadow: "shadow-violet-100"
              },
              {
                name: "MobileHub Pro",
                desc: "Intelligent Online Mobile Shopping System encompassing product catalogs, wishlists, dynamic comparison utilities, and a secure checkout backend.",
                tags: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
                icon: Smartphone,
                url: "#",
                color: "text-orange-600",
                bg: "bg-orange-100",
                border: "border-orange-200",
                shadow: "shadow-orange-100"
              }
            ].map((project, idx) => (
              <div key={idx} className={`bg-white border-2 ${project.border} rounded-3xl p-8 shadow-lg ${project.shadow} hover:-translate-y-2 transition-all duration-300 flex flex-col group`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-5">
                    <div className={`p-4 ${project.bg} rounded-2xl ${project.color}`}>
                      <project.icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-2xl font-[900] text-zinc-900">{project.name}</h4>
                  </div>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className={`p-3 ${project.bg} ${project.color} hover:text-white hover:bg-zinc-900 rounded-xl transition-colors`}>
                    <ExternalLink className="w-5 h-5 font-bold" />
                  </a>
                </div>
                <p className="text-zinc-600 text-lg leading-relaxed mb-8 flex-1 font-medium">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-3 pt-6 border-t-2 border-zinc-100">
                  {project.tags.map(tag => (
                    <span key={tag} className={`text-[13px] font-[900] px-4 py-2 rounded-xl border-2 ${getTagColor(tag)}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <div className="grid lg:grid-cols-2 gap-12">
          <section id="education" className="space-y-8 scroll-mt-24">
            <div className="border-b-4 border-zinc-200 pb-4">
              <h3 className="text-3xl font-[900] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Education</h3>
            </div>
            <div className="bg-white border-2 border-indigo-200 rounded-3xl p-10 shadow-lg shadow-indigo-50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600"></div>
              <h4 className="text-2xl font-[900] text-indigo-900 mb-3 mt-2">Bachelor of Science in Information Technology</h4>
              <p className="text-fuchsia-600 font-[800] text-xl mb-6">Baba Guru Nanak University, Nankana Sahib</p>
              <div className="inline-block bg-indigo-600 text-white shadow-md text-sm font-[900] px-6 py-2 mb-8 rounded-full">
                Expected Graduation: 2027
              </div>
              <p className="text-zinc-600 text-lg leading-relaxed font-medium">
                Currently in <span className="font-[900] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">6th semester</span>. Coursework focused on <span className="text-violet-600 font-bold">software engineering principles</span>, <span className="text-fuchsia-600 font-bold">object-oriented programming</span>, <span className="text-rose-600 font-bold">database administration</span>, and <span className="text-sky-600 font-bold">networking infrastructure</span>.
              </p>
            </div>
          </section>

          <section id="certifications" className="space-y-8 scroll-mt-24">
            <div className="border-b-4 border-zinc-200 pb-4">
              <h3 className="text-3xl font-[900] text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">Certifications</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-white border-2 border-amber-200 rounded-3xl p-8 shadow-lg shadow-amber-50 hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-5 mb-6">
                  <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-md">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-2xl font-[900] text-amber-900">Google</h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-zinc-700 text-lg font-bold">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    Foundations of Project Management
                  </li>
                  <li className="flex items-start gap-4 text-zinc-700 text-lg font-bold">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    Project Initiation
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-sky-200 rounded-3xl p-8 shadow-lg shadow-sky-50 hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-5 mb-6">
                  <div className="p-4 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl shadow-md">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-2xl font-[900] text-sky-900">Cisco Networking Academy</h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-zinc-700 text-lg font-bold">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    Cybersecurity & OS Basics
                  </li>
                  <li className="flex items-start gap-4 text-zinc-700 text-lg font-bold">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    Vulnerability Scanning & Networks
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

      </main>
      
    </div>
  );
}
