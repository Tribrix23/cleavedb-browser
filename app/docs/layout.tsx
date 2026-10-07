import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { DocsSidebar } from "@/components/ui/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
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

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-16 relative">
        <DocsSidebar />

        {/* Dynamic Content */}
        <main className="flex-1 max-w-3xl pb-32">
          {children}
        </main>
      </div>
    </div>
  );
}
