import Link from "next/link";

import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function GraphTraversalOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Graph Traversal — Overview"
      previousHref="/tutorial/relationships/sever"
      previousLabel="Removing bonds (SEVER)"
      nextHref="/tutorial/graph-traversal/follow"
      nextLabel="FOLLOW — explore neighbours"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Once relationships between documents are established with <code>LINK</code>, the real power of a graph database lies in navigation. CleaveDB provides native graph traversal primitives that follow physical bond pointers directly in memory, bypassing the costly multi-table joins and recursive Common Table Expressions (CTEs) required by traditional databases.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Pointer-speed graph navigation</h3>
        <p>
          Bonds in CleaveDB are physical memory pointers managed by the Rust storage engine. Traversing relationships—whether jumping a single hop or walking deep multi-tiered dependency trees—executes at raw memory dereference speed, maintaining sub-millisecond query latency.
        </p>
      </aside>

      <p className="mb-6 leading-relaxed text-zinc-600">
        CleaveQL offers several expressive traversal paradigms tailored for different analytical and operational questions:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Neighborhood Exploration (FOLLOW):</strong> Performs a Breadth-First Search (BFS) to discover all connected documents within a given radius.
        </li>
        <li>
          <strong className="text-zinc-800">Sequential Chains (TRACE):</strong> Walks an explicit ordered sequence of bond types (e.g., manager &rarr; mentor &rarr; team).
        </li>
        <li>
          <strong className="text-zinc-800">Pattern Syntax (MATCH &amp; VIA):</strong> Employs Cypher-style ASCII graph notation (<code>(u FROM users)-[&quot;friend&quot;]-&gt;(f FROM users)</code>) and conversational edge traversal (<code>LINKED VIA &quot;label&quot; TO/FROM/WITH</code>).
        </li>
        <li>
          <strong className="text-zinc-800">Direction &amp; Depth Controls:</strong> Restricts graph walks by edge orientation (<code>OUTGOING</code>, <code>INCOMING</code>, or <code>BOTH</code>) and sets maximum traversal horizons.
        </li>
        <li>
          <strong className="text-zinc-800">Neuro-Symbolic Pathfinding:</strong> Blends symbolic graph traversal with neural transformer embeddings, dynamically pruning branches that do not match semantic concepts using AVX-512 SIMD instructions.
        </li>
      </ul>

      <aside className="mb-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">SQL perspective</h3>
        <p>
          In relational databases, querying networks like social connections or bill-of-materials hierarchies requires complex <code>WITH RECURSIVE</code> queries with self-joins that quickly bottleneck under load. In CleaveQL, commands like <code>FOLLOW</code> and <code>TRACE</code> describe the path declaratively, and the engine executes the walk in constant time per hop.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the Graph Traversal topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Each lesson provides practical CleaveQL queries and guidance for navigating document graphs:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/graph-traversal/follow">
            FOLLOW — explore neighbours: discover local network clusters using BFS traversal.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/graph-traversal/trace">
            TRACE — walk a chain: step through ordered multi-hop relationship sequences.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/graph-traversal/match">
            MATCH &amp; VIA — Cypher &amp; pattern queries: query subgraphs using Cypher ASCII arrows and conversational LINKED VIA patterns.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/graph-traversal/direction-depth">
            Direction &amp; depth: constrain traversal orientation and horizon limits.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/graph-traversal/semantic-pathfinding">
            Semantic pathfinding: guide graph walks using neural vector embeddings and SIMD hardware acceleration.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
