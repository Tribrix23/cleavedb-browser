import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react";

import { TutorialSidebar } from "@/components/ui/tutorial-sidebar";

export default function TutorialPage() {
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
          <section id="section-0" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">Introduction to CleaveDB</h2>
            <p className="mb-6 leading-relaxed text-zinc-600">
              Welcome to the CleaveDB tutorial. CleaveDB is a next-generation, high-performance hybrid database that brings together the best aspects of document stores, graph databases, and vector search engines into a single, unified architecture. Designed from the ground up for the AI era, it eliminates the need to stitch together multiple disparate systems.
            </p>
            <p className="mb-6 leading-relaxed text-zinc-600">
              Unlike traditional relational databases that require rigid schemas and expensive JOIN operations, CleaveDB embraces a flexible document model. Data is stored in isolated tenant namespaces, ensuring that multi-tenant applications remain secure and performant. Relationships between data points are handled through native graph bonds, allowing you to traverse complex connections instantly without the overhead of junction tables.
            </p>
            <p className="mb-6 leading-relaxed text-zinc-600">
              Furthermore, CleaveDB is built with native AI capabilities. It features an embedded ONNX Transformer model that automatically generates high-dimensional vector embeddings for your data. This allows you to perform deep semantic searches, understanding the meaning behind the text rather than just matching exact keywords, all within the same query execution pipeline.
            </p>
            <p className="leading-relaxed text-zinc-600">
              In this tutorial, we will explore how to model data, establish connections, and query information efficiently using CleaveQL, our conversational query language designed for developer ergonomics and extreme performance.
            </p>
          </section>

          <div className="flex flex-col gap-4 border-t border-zinc-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/docs/core-concepts/cleaveql" className="flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900">
               <ArrowLeft className="h-4 w-4" /> Go back to Docs
            </Link>
            <Link href="/tutorial/storing-documents" className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
              Next: Storing Documents <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </main>
      </div>
    </div>
  );
}
