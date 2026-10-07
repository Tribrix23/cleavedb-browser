import React from "react";
import Link from "next/link";
import { Code2, DatabaseZap, Network, Cpu } from "lucide-react";

export default function CleaveQLSyntaxPage() {
  return (
    <>
      <div className="mb-4 text-sm font-medium text-blue-600 tracking-wide uppercase">Core Concepts</div>
      <h1 className="text-4xl font-bold text-zinc-900 mb-6 tracking-tight">CleaveQL Overview</h1>
      
      <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
        CleaveQL is the bespoke query language powering CleaveDB. It is designed from the ground up to use very easy query syntaxes. By allowing developers to write queries in plain, conversational English, it eliminates the rigid friction of traditional SQL JOINs and complex NoSQL JSON aggregates. 
      </p>
      
      <p className="text-zinc-600 mb-10 leading-relaxed">
        For a comprehensive, step-by-step guide on writing your first queries, please see the <Link href="/docs/tutorial" className="text-blue-600 font-medium hover:underline">Tutorial</Link>.
      </p>

      <div className="w-full h-px bg-zinc-100 my-10"></div>

      <h2 className="text-2xl font-semibold text-zinc-900 mb-6 tracking-tight">Architecture & Execution Flow</h2>
      <p className="text-zinc-600 mb-8 leading-relaxed">
        Under the hood, CleaveQL operates via a multi-stage compilation pipeline that translates human-readable commands into highly optimized hardware instructions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-zinc-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Code2 className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-zinc-900">1. Lexer & Parser</h3>
          </div>
          <p className="text-sm text-zinc-600 leading-relaxed">
            The Python frontend contains a custom recursive-descent parser that identifies over 150 unique token types, compiling natural language into 38 distinct Abstract Syntax Tree (AST) node structures before execution.
          </p>
        </div>
        <div className="bg-white border border-zinc-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Network className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-zinc-900">2. Security Policy Engine</h3>
          </div>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Before reaching the storage layer, the AST is evaluated by the Graph-Based Access Control (GBAC) engine, ensuring Document-Level Security (DLS) rules and field masks are dynamically enforced based on session context.
          </p>
        </div>
        <div className="bg-white border border-zinc-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <DatabaseZap className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-zinc-900 mb-3">3. Rust FFI Bridge</h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Validated AST instructions are passed via PyO3 bindings directly into the Rust storage engine, executing against a custom B+Tree, Write-Ahead Log (WAL), and CLOCK-sweep buffer pool.
          </p>
        </div>
        <div className="bg-white border border-zinc-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Cpu className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-zinc-900">4. Hardware Pushdown</h3>
          </div>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Heavy aggregation pipelines and vector similarity searches bypass standard scalar loops and are pushed directly into C++ AVX-512 SIMD registers, achieving 1-clock-cycle reductions for massive performance gains.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-zinc-900 mb-6 tracking-tight">Core Capabilities</h2>
      <div className="space-y-6 mb-12">
        <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200/60">
          <h3 className="font-semibold text-zinc-900 mb-2">Graph-Relational Traversal</h3>
          <p className="text-zinc-600 text-sm leading-relaxed">
            Unlike standard SQL which requires verbose structural mapping, CleaveQL treats relationships as native, physical edges. You describe the path you want to walk using plain language, and the database navigates the underlying pointers automatically. This eliminates the need for complex mathematical joins and drastically reduces query complexity.
          </p>
        </div>
        
        <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200/60">
          <h3 className="font-semibold text-zinc-900 mb-2">Semantic Intelligence</h3>
          <p className="text-zinc-600 text-sm leading-relaxed">
            CleaveQL is natively aware of neural embeddings. By simply querying for the "meaning" of a concept, the language processor automatically routes the request through a bundled ONNX Transformer model. This allows developers to seamlessly mix exact filtering with fuzzy, semantic intelligence without deploying any external microservices.
          </p>
        </div>

        <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200/60">
          <h3 className="font-semibold text-zinc-900 mb-2">ACID Transactions & Soft Deletions</h3>
          <p className="text-zinc-600 text-sm leading-relaxed">
            The language natively supports multi-step ACID transactions (Atomicity, Consistency, Isolation, Durability) via Software Transactional Memory (STM). Furthermore, deletion operations are safely sandboxed; soft-deletions automatically cascade through graph bonds and sit in an isolated rubbish bin until a background cron-worker permanently incinerates them.
          </p>
        </div>
      </div>

      <div className="w-full h-px bg-zinc-100 my-10"></div>

      <div className="flex justify-between items-center pt-4">
        <Link href="/docs/quick-start" className="text-sm font-medium text-zinc-500 hover:text-zinc-700 flex items-center gap-1 transition-colors">
          &larr; Quick Start
        </Link>
        <Link href="/docs/core-concepts/graph-relations" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
          Next: Graph Relations &rarr;
        </Link>
      </div>
    </>
  );
}
