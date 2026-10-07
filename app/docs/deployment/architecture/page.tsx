import React from "react";
import Link from "next/link";
import { Server, Cpu, Database, Network, Shield, ArrowLeft, ArrowRight } from "lucide-react";

export default function ArchitecturePage() {
  return (
    <article>
      <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-blue-600">
        <Server className="h-4 w-4" /> Deployment
      </div>
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-zinc-900">CleaveDB 3.9.0 Architecture</h1>
      <p className="mb-8 text-xl text-zinc-500 font-medium">Hybrid Relational - Document - Graph with Transformer Attention</p>

      <p className="mb-8 text-lg leading-relaxed text-zinc-600">
        CleaveDB is engineered from the ground up for extreme performance. It completely bypasses traditional embedded storage engines in favor of a bespoke, high-performance Rust core, seamlessly bridged with a distributed Go coordinator, Python/PyO3 interpreter, and native ONNX transformers.
      </p>

      <img 
        src="/arc.png" 
        alt="CleaveDB 3.9.0 System Architecture" 
        className="w-full h-auto rounded-2xl border border-zinc-200/80 shadow-sm mb-16"
      />

      <div className="space-y-16 mb-16">
        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">Clients & Connection Handling</h2>
          <p className="mb-4 leading-relaxed text-zinc-600">
            CleaveDB supports a wide variety of clients communicating through different protocols. The primary entry points are the <strong>TCP Client (port 8300)</strong>, <strong>WebSocket Client (port 8301)</strong>, and the <strong>HTTP REST API (port 8302)</strong>. Official SDKs are provided for Python and Node.js (via npm).
          </p>
          <p className="leading-relaxed text-zinc-600">
            All connections flow through a unified authentication and connection handling layer before reaching the core server.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">TCP Server (cleavedb_server.py)</h2>
          <p className="mb-4 leading-relaxed text-zinc-600">
            The frontend TCP server manages the connection lifecycle and security context. Key responsibilities include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-600">
            <li><strong>Auth & Session Mgmt:</strong> Validating credentials and establishing user sessions with full context.</li>
            <li><strong>Multi-Tenant:</strong> Ensuring all requests operate within the correct, isolated tenant namespace.</li>
            <li><strong>Cron Worker:</strong> Handling scheduled asynchronous background tasks.</li>
            <li><strong>DLS (Policy Engine):</strong> Intercepting and enforcing Document-Level Security rules dynamically.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">Query Interpreter & CleaveQL Engine</h2>
          <p className="mb-4 leading-relaxed text-zinc-600">
            Queries are passed from the TCP server to the <strong>Query Interpreter</strong> (powered by Python + PyO3), which bridges the gap to the core <strong>CleaveQL Engine</strong>. The query execution flows through five distinct stages:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-zinc-600 mb-6">
            <li><strong>Parse:</strong> The Parser builds an Abstract Syntax Tree (AST) from the CleaveQL string.</li>
            <li><strong>Plan:</strong> The Optimizer generates an efficient execution plan based on cost.</li>
            <li><strong>Execute:</strong> Executor workers run the plan against the storage engine.</li>
            <li><strong>Filter (Policies):</strong> The Policy Evaluator applies DLS filtering (e.g. dynamic masking, field rules).</li>
            <li><strong>Return Results:</strong> The final, properly secured payload is returned to the client.</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-zinc-900">Backend Services</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-zinc-900 mb-3 flex items-center gap-2"><Server className="w-5 h-5 text-zinc-500" /> Go Coordinator</h3>
              <p className="text-sm text-zinc-600 mb-4">Distributed multi-shard management.</p>
              <ul className="text-sm text-zinc-500 space-y-1.5 list-disc pl-5">
                <li>Cluster management</li>
                <li>Fault tolerance</li>
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-zinc-900 mb-3 flex items-center gap-2"><Database className="w-5 h-5 text-zinc-500" /> Rust Storage Engine</h3>
              <p className="text-sm text-zinc-600 mb-4">The custom high-performance core.</p>
              <ul className="text-sm text-zinc-500 space-y-1.5 list-disc pl-5">
                <li>AVX-512 / AVX2 (C++)</li>
                <li>B+Tree / LSM hybrid</li>
                <li>WAL + Compression</li>
                <li>Page cache + Buffer pool</li>
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-zinc-900 mb-3 flex items-center gap-2"><Network className="w-5 h-5 text-zinc-500" /> Vector & AI</h3>
              <p className="text-sm text-zinc-600 mb-4">Native semantic capabilities.</p>
              <ul className="text-sm text-zinc-500 space-y-1.5 list-disc pl-5">
                <li>Transformer embeddings</li>
                <li>ONNX Runtime (~22MB RAM model)</li>
                <li>Semantic search</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">Storage Layer</h2>
          <p className="mb-4 leading-relaxed text-zinc-600">
            The foundational storage layer handles all physical persistence and indexing:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-zinc-600">
            <li><strong>Documents:</strong> Namespaced strictly by tenant (e.g., <code>products:david.laptop</code>) to ensure isolated, controlled access.</li>
            <li><strong>Graph Bonds:</strong> Native functional relationships connecting documents (e.g., owner, friend, bond) to enable JOIN-free traversal.</li>
            <li><strong>Indexes & Vectors:</strong> Fast retrieval structures including B+Tree and HNSW-like vector indexes for high-speed similarity search.</li>
            <li><strong>Metadata:</strong> Internal schema and system data.</li>
          </ul>
        </section>
        
        <section className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-8 md:p-10">
          <h2 className="mb-5 text-2xl font-semibold tracking-tight text-emerald-900 flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-600" />
            Security (DLS) in Action
          </h2>
          <p className="mb-6 leading-relaxed text-emerald-800 text-lg">
            The Document-Level Security engine operates synchronously with the Query Interpreter to guarantee that sensitive data is protected at the engine level. It enforces:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="list-disc pl-6 space-y-2 text-emerald-800">
              <li>Tenant Isolation</li>
              <li>RBAC (Role Based) & GBAC (Graph Based)</li>
              <li>Field Rules & Dynamic Masking</li>
            </ul>
            <ul className="list-disc pl-6 space-y-2 text-emerald-800">
              <li>Strict Policy filtering</li>
              <li>Session Context evaluation</li>
              <li>Complete removal of sensitive data (not just hiding it)</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-4 border-t border-zinc-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/docs/core-concepts/security" className="flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900">
           <ArrowLeft className="h-4 w-4" /> Previous: Document Security
        </Link>
        <Link href="/docs/deployment/scaling" className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
          Scaling & Sharding <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
