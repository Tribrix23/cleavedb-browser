"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Database, Link as LinkIcon, Cpu, Zap, Network, Shield, ArrowRight, ChevronRight, CheckCircle2, Copy, Check } from "lucide-react";

import { FloatingDock } from "@/components/ui/floating-dock";

import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TerminalAnimation } from "@/components/ui/terminal-animation";
import { MatrixRain } from "@/components/ui/matrix-rain";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install cleavedb");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dockItems = [
    {
      title: "Home",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
      href: "#",
    },
    {
      title: "Documentation",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
      href: "/docs",
    }
  ];

  
  return (
    <div className="flex flex-col min-h-screen text-zinc-900 font-sans selection:bg-blue-100">
      <div className="fixed top-8 left-8 z-50 flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80">
        <Image src="/logo-full.png" alt="CleaveDB Logo" width={480} height={120} className="w-30 h-auto object-contain" priority />
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <FloatingDock items={dockItems} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden flex flex-col justify-center pointer-events-none min-h-[85vh]">
        <div className="absolute top-0 right-0 w-[60%] h-[70vh] max-w-200 z-0 pointer-events-auto overflow-hidden">
          <BackgroundRippleEffect rows={14} cols={18} cellSize={50} />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-12 relative z-10 w-full pointer-events-none">
          {/* Left Column */}
          <div className="flex flex-col items-start text-left w-full lg:w-[45%] xl:w-1/2 lg:pt-12 relative">
            <div className="absolute -top-75 -left-50 w-250 h-250 pointer-events-none -z-10 opacity-80">
              <MatrixRain color="#4D3CF7" />
            </div>
            
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-[1.15] mb-10 pointer-events-auto"
            >
              Connect data natively. <br className="hidden lg:block" /> <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Search it semantically.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 w-full sm:w-auto pointer-events-auto"
            >
              <Link href="/docs">
                <HoverBorderGradient
                  containerClassName="rounded-md"
                  as="div"
                  className="font-medium flex items-center justify-center gap-2"
                >
                  Read Documentation
                </HoverBorderGradient>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 flex flex-col gap-5 pointer-events-auto"
            >
              <div className="flex items-center justify-between gap-6 text-sm font-mono text-zinc-600 bg-zinc-100/50 pl-4 pr-3 py-2 rounded-md border border-zinc-200 w-fit group cursor-pointer hover:bg-zinc-100 transition-colors" onClick={handleCopy}>
                <div><span className="text-zinc-400 select-none mr-3">$</span>npm install cleavedb</div>
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700 transition-colors" />
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-zinc-500 font-medium">
                <span>Rust Engine</span>
                <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                <span>Native ONNX AI</span>
                <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                <span>Hybrid Relational Document</span>
              </div>
              
              <div className="mt-6 pt-6 border-t border-zinc-100/80 w-full max-w-lg">
                <p className="text-xs font-semibold text-zinc-400 mb-4 uppercase tracking-wider">Built for extreme performance with</p>
                <div className="flex flex-wrap items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 text-zinc-800">
                  <div className="flex items-center gap-1.5 text-sm font-bold font-mono"><Cpu className="w-4 h-4"/> AVX-512</div>
                  <div className="flex items-center gap-1.5 text-sm font-bold"><Image src="/rust.png" alt="Rust" width={16} height={16} className="w-4 h-4 object-contain" /> Rust</div>
                  <div className="flex items-center gap-1.5 text-sm font-bold"><Network className="w-4 h-4"/> ONNX</div>
                  <div className="flex items-center gap-1.5 text-sm font-bold"><Image src="/python.png" alt="Python" width={16} height={16} className="w-4 h-4 object-contain" /> Python 3.13</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dashboard/Code Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full lg:w-[55%] xl:w-1/2 mt-12 lg:mt-0 pointer-events-auto"
          >
            <div className="rounded-2xl overflow-hidden w-full bg-transparent">
              <TerminalAnimation />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="pt-8 pb-24 px-6 relative pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
              Everything you need. <br />Nothing you don't.
            </h2>
            <p className="text-lg text-zinc-600">
              CleaveDB eliminates the complexity of traditional databases, vector search services, and opaque graph databases, combining them into one high-performance engine.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-3xl bg-white border border-zinc-200 hover:border-zinc-300 transition-colors cursor-default relative overflow-hidden flex flex-col group ${feature.className || ""}`}
              >
                <div className="p-8 md:p-10 relative z-10 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-zinc-50 rounded-xl border border-zinc-200 flex items-center justify-center text-blue-600 shrink-0">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900">{feature.title}</h3>
                  </div>
                  <p className="text-zinc-500 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                  <div className="mt-auto pt-8">
                    {/* Inline visuals will flow here */}
                  </div>
                </div>
                
                {/* Absolute and flowing visuals */}
                <div className="text-zinc-400 group-hover:text-blue-500 transition-colors duration-700 pointer-events-none">
                  {feature.visual}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-32 px-6 pointer-events-auto bg-zinc-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4">Our Mission</h2>
              <h3 className="text-2xl font-semibold text-zinc-900 mb-4">Make data intuitive.</h3>
              <p className="text-zinc-600 leading-relaxed text-lg">
                We believe building scalable architecture shouldn't require years of specialized SQL knowledge. Our mission is to make high-performance data storage inherently readable, learnable, and accessible to developers of any background through simple, conversational semantics.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4">Our Vision</h2>
              <h3 className="text-2xl font-semibold text-zinc-900 mb-4">Infrastructure without friction.</h3>
              <p className="text-zinc-600 leading-relaxed text-lg">
                A future where backend complexity simply gets out of the way. We envision a world where bridging complex graph relationships and neural AI search is as easy as storing a JSON document, empowering you to build the next generation of software without limits.
              </p>
            </div>
          </div>

          <div className="mt-32 max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-zinc-500 italic font-normal leading-relaxed mb-6">
              "Data infrastructure shouldn't be a barrier to entry. It should be the invisible bridge between a great idea and its execution."
            </p>
            <div className="text-zinc-800 font-medium">
              — John David L. Perez
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-100 pt-12 pb-32 px-6 pointer-events-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="CleaveDB Logo" width={96} height={96} className="w-6 h-6 object-contain" />
            <span className="font-semibold text-zinc-900">CleaveDB</span>
          </div>
          <div className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} CleaveDB. Built for speed.
          </div>
          <div className="flex gap-6 text-sm font-medium text-zinc-500">
            <a href="https://github.com/Tribrix23/CleaveDB" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-zinc-900 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <LinkIcon className="w-5 h-5" />,
    title: "Native Graph-Relational",
    description: "Documents are deeply relational, linked natively through functional graph bonds. Traverse with conversational English, completely eliminating JOINs.",
    className: "md:col-span-2 md:row-span-2",
    visual: (
      <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none opacity-20">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="50" r="20" stroke="currentColor" strokeWidth="4"/>
          <circle cx="50" cy="150" r="20" stroke="currentColor" strokeWidth="4"/>
          <circle cx="150" cy="150" r="20" stroke="currentColor" strokeWidth="4"/>
          <path d="M90 68L60 132" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8"/>
          <path d="M110 68L140 132" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8"/>
          <path d="M70 150H130" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8"/>
        </svg>
      </div>
    )
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Blazing Fast Rust Engine",
    description: "A high-performance storage engine built entirely from scratch in Rust — no SQLite, no RocksDB, no external storage bloat.",
    className: "md:col-span-2 md:row-span-1",
    visual: (
      <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-linear-to-l from-orange-500/5 to-transparent flex items-end justify-end p-6">
         <div className="font-mono text-[10px] text-orange-600/40 text-right leading-relaxed">
            fn execute_query() -&gt; Result&lt;(), DbError&gt; &#123;<br/>
            &nbsp;&nbsp;let mem = MemPool::new();<br/>
            &nbsp;&nbsp;engine.scan(&mem)<br/>
            &#125;
         </div>
      </div>
    )
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "AVX-512 SIMD",
    description: "Vector search and data processing run on ultra-fast C++ AVX-512 extensions wired directly to the storage engine.",
    className: "md:col-span-1 md:row-span-2",
    visual: (
      <div className="mt-auto grid grid-cols-4 gap-1 opacity-40 px-8 pb-8 md:px-10 md:pb-10">
        {[0.2, 0.5, 0.3, 0.6, 0.1, 0.4, 0.5, 0.2, 0.6, 0.3, 0.4, 0.1, 0.5, 0.2, 0.6, 0.3].map((op, i) => (
          <div key={i} className="aspect-square rounded-sm bg-blue-500" style={{ opacity: op }}></div>
        ))}
      </div>
    )
  },
  {
    icon: <Network className="w-5 h-5" />,
    title: "Neural Transformers",
    description: "Real neural Transformer embeddings for semantic search via a quantized ONNX model, running directly in-memory.",
    className: "md:col-span-1 md:row-span-1",
    visual: (
      <div className="absolute right-4 bottom-4 font-mono text-xs text-indigo-500/30">
        [0.12, -0.45, 0.89, 0.33, ...]
      </div>
    )
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: "Distributed Coordinator",
    description: "Go-based distributed coordinator for massive multi-shard deployments, natively connected to the Rust engine.",
    className: "md:col-span-2 md:row-span-1",
    visual: (
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-30">
        <div className="w-8 h-8 rounded border-2 border-current flex items-center justify-center"><Database className="w-4 h-4" /></div>
        <div className="w-8 h-0.5 bg-current"></div>
        <div className="w-8 h-8 rounded border-2 border-current flex items-center justify-center"><Database className="w-4 h-4" /></div>
        <div className="w-8 h-0.5 bg-current"></div>
        <div className="w-8 h-8 rounded border-2 border-current flex items-center justify-center"><Database className="w-4 h-4" /></div>
      </div>
    )
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Multi-tenant Security",
    description: "TCP server with full authentication, background Cron workers, and granular Document-Level Security (DLS).",
    className: "md:col-span-1 md:row-span-1",
    visual: (
      <div className="mt-auto space-y-2 opacity-30 px-8 pb-8 md:px-10 md:pb-10">
        <div className="h-2 w-full bg-current rounded-full"></div>
        <div className="h-2 w-2/3 bg-current rounded-full"></div>
        <div className="h-2 w-4/5 bg-current rounded-full"></div>
      </div>
    )
  }
];