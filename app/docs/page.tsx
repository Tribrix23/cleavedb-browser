import React from "react";
import Link from "next/link";

export default function DocsIntroductionPage() {
  return (
    <>
      <div className="mb-4 text-sm font-medium text-blue-600 tracking-wide uppercase">Getting Started</div>
      <h1 className="text-4xl font-bold text-zinc-900 mb-6 tracking-tight">Introduction</h1>
      <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
        Welcome to the CleaveDB documentation. CleaveDB is a hyper-fast graph and vector database built in Rust, designed to be queried in plain English.
      </p>

      <h2 className="text-2xl font-semibold text-zinc-900 mb-4 tracking-tight">Why CleaveDB?</h2>
      <p className="text-zinc-600 leading-relaxed mb-6">
        Traditional databases force you to choose between strict relational schemas, opaque graph networks, or disconnected vector search engines. CleaveDB unifies all three into a single, high-performance engine powered by Rust and AVX-512 extensions.
      </p>
      <p className="text-zinc-600 leading-relaxed mb-6">
        By eliminating traditional SQL JOINs and replacing them with native graph bonds, CleaveDB allows developers to traverse complex relationships conversationally, drastically reducing backend friction.
      </p>
      
      <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-6 mt-10">
        <h3 className="font-semibold text-zinc-900 mb-2">Key Features</h3>
        <ul className="space-y-3 text-sm text-zinc-600 list-disc list-inside">
          <li><strong>Native Graph-Relational Links:</strong> Documents are linked natively through ~10 functional Graph "Bonds" (unlimited depth, multi-hop traversals).</li>
          <li><strong>Rust Storage Engine:</strong> Built from scratch (No SQLite, No RocksDB).</li>
          <li><strong>AVX-512 SIMD Extensions:</strong> Vector math runs on bare metal extensions.</li>
          <li><strong>Real Neural Transformer Embeddings:</strong> Quantized ONNX model running inside the same process.</li>
          <li><strong>Document-Level Security (DLS):</strong> Native GBAC and RBAC security policies.</li>
        </ul>
      </div>

      <div className="w-full h-px bg-zinc-100 my-10"></div>

      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-zinc-400">Last updated: Today</div>
        <Link href="/docs/installation" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
          Next: Installation & Build &rarr;
        </Link>
      </div>
    </>
  );
}
