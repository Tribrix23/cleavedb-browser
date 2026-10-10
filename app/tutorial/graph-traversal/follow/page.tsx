import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function FollowPage() {
  return (
    <TutorialPageShell
      sectionTitle="FOLLOW — Explore Neighbours"
      previousHref="/tutorial/graph-traversal"
      previousLabel="Graph Traversal overview"
      nextHref="/tutorial/graph-traversal/trace"
      nextLabel="TRACE — walk a chain"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When analyzing networks—such as discovering mutual connections, identifying clustered team members, or surveying a product catalog—you often want to inspect the entire local neighborhood surrounding a document. The <code>FOLLOW</code> command performs an optimized Breadth-First Search (BFS) through specified bond types.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore neighbours through a bond</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To discover all documents reachable through a specific bond label:
      </p>
      <TutorialCodeBlock label="Explore direct and indirect reports">{`FOLLOW "users:ana" THROUGH "manages"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB starts at Ana&apos;s record, traverses every outgoing <code>&quot;manages&quot;</code> bond, and returns a flattened collection of all reachable staff documents.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Multi-hop exploration with depth and limits</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Control how far the BFS explores and cap the returned payload:
      </p>
      <TutorialCodeBlock label="Multi-hop neighborhood search">{`FOLLOW "users:ana" THROUGH "manages" DIRECTION BOTH DEPTH 3 LIMIT 10`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This explores up to 3 hops away in both directions (managers and reports) and returns the first 10 matching entities without risking memory exhaustion.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Automatic cycle detection</h3>
        <p>
          In cyclic graphs (where A links to B and B links back to A), CleaveDB maintains a visited bitset in memory during BFS execution. Nodes are never re-evaluated or returned twice, preventing infinite traversal loops.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
