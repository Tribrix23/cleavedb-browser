import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react";

import { TutorialSidebar } from "@/components/ui/tutorial-sidebar";

const codeBlock = "rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-5 font-mono text-sm leading-7 text-zinc-200 overflow-x-auto whitespace-pre";

function CodeBlock({ children, label = "CleaveQL" }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-sm">
      <div className="border-b border-zinc-800 px-5 py-3 text-xs font-medium tracking-wide text-zinc-500">{label}</div>
      <pre className={codeBlock}><code>{children}</code></pre>
    </div>
  );
}

export default function StoringDocumentsPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image 
              src="/logo-full.png" 
              alt="CleaveDB Logo" 
              width={480} 
              height={120} 
              className="w-[100px] h-auto object-contain" 
            />
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium text-zinc-600">
            <Link href="/" className="hover:text-zinc-900 flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-4 h-4" /> 
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-16 relative">
        <TutorialSidebar />

        <main className="flex-1 max-w-3xl pb-32">
          <article>
          <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-blue-600">
            <BookOpen className="h-4 w-4" /> Getting Started
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900">Tutorial: Building with CleaveDB</h1>
          <section id="section-1" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">1. Storing Documents (POUR)</h2>
            <p className="mb-4 leading-relaxed text-zinc-600">
              In CleaveDB, we insert data using the <code>POUR</code> command. Let's add a few users and products to our database. Notice how we namespace the data automatically.
            </p>
            <CodeBlock label="Insert Data">
              <span className="text-zinc-500">-- Create users</span>{"\n"}
              <span className="text-blue-400">POUR INTO</span> users <span className="text-emerald-300">"alice"</span> &#123;<span className="text-emerald-300">"name"</span>: <span className="text-emerald-300">"Alice Smith"</span>, <span className="text-emerald-300">"age"</span>: 28&#125;{"\n"}
              <span className="text-blue-400">POUR INTO</span> users <span className="text-emerald-300">"bob"</span> &#123;<span className="text-emerald-300">"name"</span>: <span className="text-emerald-300">"Bob Jones"</span>, <span className="text-emerald-300">"age"</span>: 34&#125;{"\n\n"}
              <span className="text-zinc-500">-- Create products</span>{"\n"}
              <span className="text-blue-400">POUR INTO</span> products <span className="text-emerald-300">"laptop"</span> &#123;<span className="text-emerald-300">"title"</span>: <span className="text-emerald-300">"MacBook Pro"</span>, <span className="text-emerald-300">"price"</span>: 1999&#125;{"\n"}
              <span className="text-blue-400">POUR INTO</span> products <span className="text-emerald-300">"mouse"</span> &#123;<span className="text-emerald-300">"title"</span>: <span className="text-emerald-300">"Wireless Mouse"</span>, <span className="text-emerald-300">"price"</span>: 49&#125;
            </CodeBlock>
          </section>

          <div className="flex flex-col gap-4 border-t border-zinc-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/tutorial" className="flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900">
               <ArrowLeft className="h-4 w-4" /> Previous: Overview
            </Link>
            <Link href="/tutorial/relationships" className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
              Next: Creating Relationships <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </main>
      </div>
    </div>
  );
}
