import React from "react";
import Link from "next/link";
import { Server, ArrowLeft, Network, Copy, Check } from "lucide-react";

export default function ScalingShardingPage() {
  return (
    <article>
      <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-blue-600">
        <Server className="h-4 w-4" /> Deployment
      </div>
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900">Scaling & Sharding</h1>
      <p className="mb-8 text-lg leading-relaxed text-zinc-600">
        As your data grows, CleaveDB seamlessly scales horizontally across multiple instances using its built-in distributed Go coordinator.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">The Go Coordinator</h2>
        <p className="mb-4 leading-relaxed text-zinc-600">
          While the core database engine is written in Rust to squeeze every drop of performance from single-node hardware, the cluster orchestration is handled by a robust Go coordinator. This separation of concerns allows the Rust engine to focus entirely on parsing, planning, and executing queries with memory-safe speed, while the Go coordinator focuses on:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-600 mb-4">
          <li><strong>Cluster Topology Management:</strong> Discovering nodes, tracking health, and maintaining cluster state.</li>
          <li><strong>Query Routing:</strong> Directing queries to the appropriate shards that contain the necessary tenant data.</li>
          <li><strong>Fault Tolerance:</strong> Automatically promoting replicas and rerouting traffic if a primary node fails.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">Tenant-Aware Sharding</h2>
        <p className="mb-4 leading-relaxed text-zinc-600">
          Unlike traditional databases that shard purely by random hashes, CleaveDB leverages <strong>Tenant Isolation</strong> for highly optimized data locality. Because all documents and graph bonds are scoped by tenant (e.g. <code>products:david.laptop</code>), the coordinator can guarantee that all data belonging to a single tenant lives on the same shard.
        </p>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 mb-4">
          <p className="text-sm text-blue-900 flex items-center gap-2 font-medium mb-2">
            <Network className="w-4 h-4" /> Why Tenant-Aware Sharding?
          </p>
          <p className="text-sm text-blue-800 leading-relaxed">
            By keeping a tenant's entire document collection and graph relationships on a single physical node, multi-hop graph traversals (using <code>FOLLOW</code>) execute locally in memory. This eliminates the need for expensive cross-node network calls during complex graph queries.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">Deploying a Cluster</h2>
        <p className="mb-4 leading-relaxed text-zinc-600">
          To start a multi-node cluster, you first initialize a coordinator node, and then attach worker nodes pointing to the coordinator's address.
        </p>
        
        <div className="mb-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-sm">
          <div className="border-b border-zinc-800 px-5 py-3 text-xs font-medium tracking-wide text-zinc-500">Terminal - Coordinator</div>
          <pre className="px-5 py-5 font-mono text-sm leading-7 text-zinc-200 overflow-x-auto"><code><span className="text-zinc-500"># Start the main cluster coordinator</span>{"\n"}<span className="text-blue-400">cleavedb</span> --role coordinator --bind 0.0.0.0:8300</code></pre>
        </div>

        <div className="mb-8 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-sm">
          <div className="border-b border-zinc-800 px-5 py-3 text-xs font-medium tracking-wide text-zinc-500">Terminal - Workers</div>
          <pre className="px-5 py-5 font-mono text-sm leading-7 text-zinc-200 overflow-x-auto"><code><span className="text-zinc-500"># Start worker nodes and point them to the coordinator</span>{"\n"}<span className="text-blue-400">cleavedb</span> --role worker --coordinator 10.0.0.50:8300{"\n"}<span className="text-blue-400">cleavedb</span> --role worker --coordinator 10.0.0.50:8300</code></pre>
        </div>
      </section>

      <div className="flex flex-col gap-4 border-t border-zinc-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/docs/deployment/architecture" className="flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900">
           <ArrowLeft className="h-4 w-4" /> Previous: Architecture
        </Link>
      </div>
    </article>
  );
}
