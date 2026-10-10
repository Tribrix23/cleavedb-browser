import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function PatternMatchingOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Pattern Matching — Overview"
      previousHref="/tutorial/graph-traversal/semantic-pathfinding"
      previousLabel="Semantic pathfinding"
      nextHref="/tutorial/pattern-matching/basics"
      nextLabel="FIND PATTERN basics"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        While simple graph traversals like <code>FOLLOW</code> and <code>TRACE</code> begin at a single known document, complex domain questions often describe an entire multi-node structural pattern across different buckets and edge labels. CleaveQL introduces <strong><code>FIND PATTERN</code></strong> for declarative subgraph matching and <strong><code>FIND HOW</code></strong> for auditing relationship drift over time.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Declarative conversational syntax</h3>
        <p>
          Instead of writing complex recursive joins or cryptic graph query code, CleaveQL lets you describe relationships naturally: alias each node with <code>AS alias</code> and connect them using <code>LINKED VIA &quot;label&quot;</code> with directional prepositions (<code>TO</code>, <code>FROM</code>, and <code>WITH</code>).
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Core Pattern Matching primitives</h3>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Node Aliasing:</strong> Define node variables within buckets (e.g., <code>staff AS x</code> or <code>IN staff AS x</code>) to reference and filter their properties in <code>WHERE</code> clauses.
        </li>
        <li>
          <strong className="text-zinc-800">Bonds via LINKED VIA:</strong> Connect nodes by relationship label using <code>LINKED VIA &quot;label&quot;</code>.
        </li>
        <li>
          <strong className="text-zinc-800">Directional Prepositions:</strong> Control edge flow explicitly:
          <ul className="mt-1 list-circle space-y-1 pl-6 text-sm">
            <li><code>TO</code> (outgoing &rarr;): the left node targets the right node.</li>
            <li><code>FROM</code> (incoming &larr;): the right node targets the left node.</li>
            <li><code>WITH</code> (undirected &harr;): matches mutual or two-way relationships.</li>
          </ul>
        </li>
        <li>
          <strong className="text-zinc-800">Cross-Bucket Chains:</strong> Seamlessly stitch relationships across different collections, such as users, orders, and products.
        </li>
        <li>
          <strong className="text-zinc-800">Bond Drift History (FIND HOW):</strong> Query the chronological timeline of when relationships were established (<code>LINK</code>) or destroyed (<code>SEVER</code>) within any time window.
        </li>
      </ul>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the Pattern Matching topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Step through the tutorials below to learn canonical CleaveQL pattern matching:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/pattern-matching/basics">
            FIND PATTERN basics: declare node aliases, link via bond labels, and apply filters with WHERE.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/pattern-matching/edge-directions">
            Edge directions: control traversal orientation using TO, FROM, and WITH.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/pattern-matching/cross-bucket">
            Cross-bucket patterns: trace complex multi-hop relationships across multiple distinct buckets.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/pattern-matching/bond-history">
            Bond history (FIND HOW): inspect how relationship bonds change and drift across historical timestamps.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
