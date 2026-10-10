import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function EdgeDirectionsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Edge Directions"
      previousHref="/tutorial/pattern-matching/basics"
      previousLabel="FIND PATTERN basics"
      nextHref="/tutorial/pattern-matching/cross-bucket"
      nextLabel="Cross-bucket patterns"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In real graphs, relationships have directionality. CleaveQL uses natural English prepositions—<strong><code>TO</code></strong>, <strong><code>FROM</code></strong>, and <strong><code>WITH</code></strong>—to specify the traversal orientation of each bond in a <code>FIND PATTERN</code> query.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Direction syntax overview</h3>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-50">
              <th className="py-2.5 px-4 font-semibold">Direction</th>
              <th className="py-2.5 px-4 font-semibold">Syntax clause</th>
              <th className="py-2.5 px-4 font-semibold">Relationship meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Outgoing (&rarr;)</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">LINKED VIA &quot;manages&quot; TO staff AS y</td>
              <td className="py-2.5 px-4"><code>x</code> manages <code>y</code> (source points to target)</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Incoming (&larr;)</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">LINKED VIA &quot;manages&quot; FROM staff AS boss</td>
              <td className="py-2.5 px-4"><code>boss</code> manages <code>x</code> (target points back to source)</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium text-zinc-800">Undirected (&harr;)</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">LINKED VIA &quot;peer&quot; WITH staff AS y</td>
              <td className="py-2.5 px-4">Mutual bond in either direction</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">1. Outgoing bonds (TO)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>TO</code> when the left document is the source that originated the bond:
      </p>
      <TutorialCodeBlock label="Outgoing pattern">{`FIND PATTERN staff AS x LINKED VIA "manages" TO staff AS y`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This resolves all relationships where <code>x</code> points directly to <code>y</code> with label <code>&quot;manages&quot;</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">2. Incoming bonds (FROM)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>FROM</code> when you want to look backward along an incoming edge:
      </p>
      <TutorialCodeBlock label="Incoming pattern">{`FIND PATTERN staff AS x LINKED VIA "manages" FROM staff AS boss`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Here, CleaveDB finds who manages <code>x</code> by walking incoming <code>&quot;manages&quot;</code> bonds back to the manager document aliased as <code>boss</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">3. Mutual / Undirected bonds (WITH)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When documents are connected with mutual bonds (e.g., <code>BOND &quot;staff:ana&quot; AND &quot;staff:eve&quot; AS MUTUAL &quot;peer&quot;</code>), use <code>WITH</code> to match in both directions:
      </p>
      <TutorialCodeBlock label="Undirected pattern with mutual bonds">{`-- Setup mutual bond:
BOND "staff:ana" AND "staff:eve" AS MUTUAL "peer"

-- Query both orientations:
FIND PATTERN staff AS x LINKED VIA "peer" WITH staff AS y`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This query returns symmetric pairs from both perspectives (e.g. <code>x = ana, y = eve</code> and <code>x = eve, y = ana</code>).
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Directional clarity in domain logic</h3>
        <p>
          Selecting the right preposition guarantees clear queries. For hierarchical or directed relationships like reporting chains or purchase orders, use <code>TO</code> or <code>FROM</code>. For symmetric links like partnerships, coworkers, or friendships, use <code>WITH</code>.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
