import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Link as LinkIcon, Waypoints, Network, Activity } from "lucide-react";

export default function GraphRelationsPage() {
  return (
    <>
      <div className="mb-4 text-sm font-medium text-blue-600 tracking-wide uppercase">Core Concepts</div>
      <h1 className="text-4xl font-bold text-zinc-900 mb-6 tracking-tight">Graph Relations</h1>
      
      <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
        Unlike traditional SQL databases that rely on expensive mathematical <code>JOIN</code> operations across tables, CleaveDB natively treats document relationships as physical graph edges (Bonds). Bonds are not just static pointers; they are richly configurable objects with functional attributes, enabling high-performance, unlimited-depth traversals.
      </p>

      <div className="mb-16 rounded-2xl overflow-hidden border border-zinc-200 shadow-md">
        <Image 
          src="/grp.png" 
          alt="Graph Relations Overview" 
          width={1200} 
          height={600} 
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
            <LinkIcon className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Creating Bonds (LINK)</h2>
        </div>
        
        <p className="text-zinc-600 mb-6 leading-relaxed">
          The <code>LINK</code> command (aliased as <code>BOND</code>) is used to establish relationships between two distinct documents, even if they reside in completely different buckets. Every bond can be assigned a semantic string label.
        </p>

        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800 mb-8">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">CleaveQL</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-zinc-500">/* Standard Directed Bond */</span><br/>
<span className="text-blue-400">LINK</span> <span className="text-emerald-300">"users:jane"</span> <span className="text-purple-400">TO</span> <span className="text-emerald-300">"users:juan"</span> <span className="text-amber-400">AS</span> <span className="text-emerald-300">"friend"</span><br/><br/>

<span className="text-zinc-500">/* Bidirectional (Mutual) Bond */</span><br/>
<span className="text-blue-400">LINK</span> <span className="text-emerald-300">"users:jane"</span> <span className="text-purple-400">AND</span> <span className="text-emerald-300">"users:pedro"</span> <span className="text-amber-400">AS MUTUAL</span> <span className="text-emerald-300">"co_worker"</span><br/><br/>

<span className="text-zinc-500">/* Multi-Target Graphing */</span><br/>
<span className="text-blue-400">LINK</span> <span className="text-emerald-300">"users:jane"</span> <span className="text-purple-400">TO ANY</span>(<span className="text-emerald-300">"tag:sql"</span>, <span className="text-emerald-300">"tag:rust"</span>) <span className="text-amber-400">AS</span> <span className="text-emerald-300">"skill"</span>
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-zinc-900 mb-4 tracking-tight">Bond Modifiers</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-sm text-zinc-600 border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-100/50">
                <th className="py-3 px-4 font-semibold rounded-tl-lg">Modifier</th>
                <th className="py-3 px-4 font-semibold">Syntax</th>
                <th className="py-3 px-4 font-semibold rounded-tr-lg">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-4 font-medium text-zinc-800">Exclusive</td>
                <td className="py-3 px-4 font-mono text-pink-600 bg-pink-50 rounded">EXCLUSIVELY</td>
                <td className="py-3 px-4">Expires/removes all prior active bonds with the same source and label.</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-4 font-medium text-zinc-800">Cascade</td>
                <td className="py-3 px-4 font-mono text-amber-600 bg-amber-50 rounded">ON DELETE CASCADE</td>
                <td className="py-3 px-4">If the source document is drained, the target is automatically drained.</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-4 font-medium text-zinc-800">Weights</td>
                <td className="py-3 px-4 font-mono text-purple-600 bg-purple-50 rounded">WITH CONFIDENCE 0.9</td>
                <td className="py-3 px-4">Attaches probabilistic or affinity floating-point weights to the edge (0.0 - 1.0).</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-zinc-800">TTL Expiry</td>
                <td className="py-3 px-4 font-mono text-emerald-600 bg-emerald-50 rounded">EXPIRING IN n HOURS</td>
                <td className="py-3 px-4">Creates an ephemeral time-bound edge that is automatically severed by the Cron GC.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Conditional Bonds (Dormant Edges)</h2>
        </div>
        
        <p className="text-zinc-600 mb-6 leading-relaxed">
          Bonds can be configured to only activate when specific JSON fields within the source or target documents meet certain criteria. If the condition fails, the bond becomes "dormant" (invisible to standard traversal). If the document is later updated (<code>CHANGE</code>) to satisfy the condition, the bond instantly reactivates.
        </p>

        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">CleaveQL</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-blue-400">LINK</span> <span className="text-emerald-300">"users:alice"</span> <span className="text-purple-400">TO</span> <span className="text-emerald-300">"files:secret_doc"</span> <span className="text-amber-400">AS</span> <span className="text-emerald-300">"can_read"</span> <br/>
&nbsp;&nbsp;<span className="text-pink-400">IF</span> target clearance <span className="text-pink-400">IS</span> <span className="text-emerald-300">"public"</span><br/><br/>

<span className="text-zinc-500">/* If the file clearance changes to "private", this query returns 0 results */</span><br/>
<span className="text-blue-400">FIND</span> <span className="text-emerald-300">"can_read"</span> <span className="text-amber-400">OF</span> <span className="text-emerald-300">"users:alice"</span>
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
            <Waypoints className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Graph Traversal</h2>
        </div>
        
        <p className="text-zinc-600 mb-6 leading-relaxed">
          Traversing the graph requires no complex syntax. You can walk a single hop, or trace N-hops deep conversationally.
        </p>

        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800 mb-8">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">CleaveQL</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-zinc-500">/* Single Hop Traversal */</span><br/>
<span className="text-blue-400">FIND</span> <span className="text-emerald-300">"friend"</span> <span className="text-amber-400">OF</span> <span className="text-emerald-300">"users:alice"</span><br/><br/>

<span className="text-zinc-500">/* Multi-Hop Deep Traversal (Reading right-to-left) */</span><br/>
<span className="text-blue-400">FIND THE</span> knows <span className="text-amber-400">OF THE</span> boss <span className="text-amber-400">OF</span> users <span className="text-emerald-300">"jane"</span><br/><br/>

<span className="text-zinc-500">/* Explicit Multi-Hop Trace */</span><br/>
<span className="text-blue-400">TRACE</span> <span className="text-emerald-300">"manages"</span>, <span className="text-emerald-300">"mentors"</span> <span className="text-amber-400">FROM</span> <span className="text-emerald-300">"users:ana"</span>
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-zinc-900 mb-4 tracking-tight">Broad Neighborhood Exploration (FOLLOW)</h3>
        <p className="text-zinc-600 mb-6 leading-relaxed">
          Use the <code>FOLLOW</code> command to perform a Breadth-First Search (BFS) across the local neighborhood of a document, returning a flattened list of all reachable nodes.
        </p>
        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-blue-400">FOLLOW</span> <span className="text-emerald-300">"users:ana"</span> <span className="text-amber-400">THROUGH</span> <span className="text-emerald-300">"manages"</span> <span className="text-pink-400">DIRECTION BOTH DEPTH</span> 3 <span className="text-pink-400">LIMIT</span> 10
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
            <Network className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Pattern Matching Subgraphs</h2>
        </div>
        
        <p className="text-zinc-600 mb-6 leading-relaxed">
          For advanced queries, CleaveDB supports structural subgraph pattern matching. Instead of chaining hops manually, you define the exact shape of the graph you are looking for across multiple buckets, and CleaveDB will resolve the entire subgraph at once.
        </p>

        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">CleaveQL</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-zinc-500">/* Who does Ana manage that also mentors someone? */</span><br/>
<span className="text-blue-400">FIND PATTERN</span> staff <span className="text-amber-400">AS</span> a <span className="text-amber-400">LINKED VIA</span> <span className="text-emerald-300">"manages"</span> <span className="text-purple-400">TO</span> staff <span className="text-amber-400">AS</span> b <span className="text-amber-400">LINKED VIA</span> <span className="text-emerald-300">"mentors"</span> <span className="text-purple-400">TO</span> staff <span className="text-amber-400">AS</span> c<br/><br/>

<span className="text-zinc-500">/* Find which staff live in a specific geographic place bucket */</span><br/>
<span className="text-blue-400">FIND PATTERN</span> staff <span className="text-amber-400">AS</span> s <span className="text-amber-400">LINKED VIA</span> <span className="text-emerald-300">"lives_in"</span> <span className="text-purple-400">TO</span> places <span className="text-amber-400">AS</span> p
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
            <LinkIcon className="w-5 h-5 text-blue-600 rotate-45" />
          </div>
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Destroying Bonds (SEVER)</h2>
        </div>
        
        <p className="text-zinc-600 mb-6 leading-relaxed">
          The <code>SEVER</code> command (aliased as <code>UNLINK</code>) is used to destroy graph edges between documents. You can remove a specific labeled edge, or sever all edges entirely.
        </p>

        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">CleaveQL</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-zinc-500">/* Remove a specific labeled bond */</span><br/>
<span className="text-blue-400">SEVER</span> <span className="text-emerald-300">"users:jane"</span> <span className="text-purple-400">FROM</span> <span className="text-emerald-300">"users:juan"</span> <span className="text-amber-400">AS</span> <span className="text-emerald-300">"friend"</span><br/><br/>

<span className="text-zinc-500">/* Destroy ALL bonds between the two documents regardless of label */</span><br/>
<span className="text-blue-400">SEVER</span> <span className="text-emerald-300">"users:jane"</span> <span className="text-purple-400">FROM</span> <span className="text-emerald-300">"users:juan"</span>
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl p-8 mb-16 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-xl shadow-sm flex items-center justify-center">
            <Network className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-blue-950 tracking-tight">Neuro-Symbolic Semantic Pathfinding</h2>
        </div>
        
        <p className="text-blue-900/80 mb-6 leading-relaxed">
          Graph databases traverse relationships symbolically, but they possess zero semantic understanding. Vector databases find conceptually similar data but are entirely flat. CleaveDB seamlessly merges Graph Edge Traversal with the ONNX Transformer.
        </p>
        
        <p className="text-blue-900/80 mb-6 leading-relaxed">
          At each hop of a BFS graph traversal, the Rust FFI engine computes the <code>_mm512_dp_ps</code> vector cosine similarity between the prompt's embedding and the adjacent nodes' embeddings. It dynamically prunes branches of the graph that do not match the semantic concept in a single CPU clock cycle, preventing BFS explosions and yielding highly intelligent, context-aware paths.
        </p>

        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">CleaveQL</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-blue-400">FOLLOW</span> <span className="text-emerald-300">"users:alice"</span> <span className="text-amber-400">THROUGH</span> <span className="text-emerald-300">"friend"</span> <span className="text-pink-400">GUIDED BY MEANING</span> <span className="text-emerald-300">"machine learning experts"</span> <span className="text-pink-400">THRESHOLD</span> 0.75 <span className="text-pink-400">DEPTH</span> 6
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 mb-16 shadow-sm">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-6 tracking-tight">Summary</h2>
        <p className="text-zinc-600 leading-relaxed">
          CleaveDB transforms rigid relational <code>JOIN</code>s into conversational graph traversal. By utilizing the <code>LINK</code> command, developers can map complex architectures with rich attributes like expiration TTLs and cascading deletes. Querying these relationships requires zero mathematical logic—you simply ask the database to walk the chain via <code>FIND</code>, explore the neighborhood with <code>FOLLOW</code>, or pattern-match massive subgraphs entirely in plain English. And with Neuro-Symbolic Semantic Pathfinding, the database intelligently prunes graph walks using real-time Transformer AI models.
        </p>
      </div>

      <div className="w-full h-px bg-zinc-100 my-10"></div>

      <div className="flex justify-between items-center pt-4">
        <Link href="/docs/core-concepts/cleaveql" className="text-sm font-medium text-zinc-500 hover:text-zinc-700 flex items-center gap-1 transition-colors">
          &larr; CleaveQL Syntax
        </Link>
        <Link href="/docs/core-concepts/vector-embeddings" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
          Next: Vector Embeddings &rarr;
        </Link>
      </div>
    </>
  );
}
