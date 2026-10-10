import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function MatchPage() {
  return (
    <TutorialPageShell
      sectionTitle="MATCH & VIA — Cypher-Style & Pattern Queries"
      previousHref="/tutorial/graph-traversal/trace"
      previousLabel="TRACE — walk a chain"
      nextHref="/tutorial/graph-traversal/direction-depth"
      nextLabel="Direction & depth"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In CleaveQL, graph pattern matching allows you to search for structural shapes and relationships across multiple documents and buckets. CleaveDB supports two expressive notations for pattern matching: Cypher-like ASCII arrow syntax with <code>MATCH</code>, and conversational natural language patterns with <code>LINKED VIA</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Cypher-style MATCH queries</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The <code>MATCH</code> command defines node variables as <code>(alias FROM bucket)</code> and bonds with bracketed arrow syntax <code>-[&quot;label&quot;]-&gt;</code>:
      </p>
      <TutorialCodeBlock label="Cypher-style friend lookup">{`MATCH (u FROM users)-["friend"]->(f FROM users)
WHERE f.age > 20`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This resolves subgraphs across the graph and returns all matching pairs, mapping each alias (<code>u</code> and <code>f</code>) to its respective JSON document.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Pattern traversal with LINKED VIA</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can also express pattern queries using the conversational <code>LINKED VIA</code> clause with <code>FIND PATTERN</code>. Specify each node with <code>AS alias</code> and connect them via their bond label:
      </p>
      <TutorialCodeBlock label="Pattern query using LINKED VIA">{`FIND PATTERN staff AS x LINKED VIA "manages" TO staff AS y`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Both <code>MATCH</code> and <code>LINKED VIA</code> target the same underlying graph traversal execution engine; choose whichever style reads most cleanly for your team.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Edge directions with VIA</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The <code>VIA</code> syntax supports three distinct edge orientations:
      </p>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-50">
              <th className="py-2.5 px-4 font-semibold">Direction</th>
              <th className="py-2.5 px-4 font-semibold">Syntax</th>
              <th className="py-2.5 px-4 font-semibold">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Outgoing</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">LINKED VIA &quot;manages&quot; TO staff AS y</td>
              <td className="py-2.5 px-4">x manages y (points forward)</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Incoming</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">LINKED VIA &quot;manages&quot; FROM staff AS boss</td>
              <td className="py-2.5 px-4">boss manages x (points backward)</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium text-zinc-800">Undirected</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">LINKED VIA &quot;peer&quot; WITH staff AS y</td>
              <td className="py-2.5 px-4">Mutual bond in either direction</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Multi-hop patterns across buckets</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Chain multiple relationship edges and filter by alias properties:
      </p>
      <TutorialCodeBlock label="Multi-hop chain with VIA">{`FIND PATTERN staff AS a
  LINKED VIA "manages" TO staff AS b
  LINKED VIA "mentors" TO staff AS c
  WHERE a.department = "Engineering"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Or equivalently with <code>MATCH</code>:
      </p>
      <TutorialCodeBlock label="Equivalent multi-hop MATCH query">{`MATCH (u FROM users)-["friend"]->(f FROM users)-["owns"]->(d FROM docs)
WHERE u.name = "Alice"`}</TutorialCodeBlock>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Summary: Arrow vs VIA syntax</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>MATCH arrow syntax:</strong> <code>(u FROM users)-[&quot;friend&quot;]-&gt;(f FROM users)</code> — ideal for complex subgraphs and visual graph design.</li>
          <li><strong>LINKED VIA syntax:</strong> <code>users AS u LINKED VIA &quot;friend&quot; TO users AS f</code> — ideal for conversational, readable pipeline queries.</li>
        </ul>
      </aside>
    </TutorialPageShell>
  );
}
