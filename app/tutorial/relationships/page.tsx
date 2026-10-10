import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function CreatingRelationshipsOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Relationships & References (BOND & LINK) — Overview"
      previousHref="/tutorial/deleting-recovering/drop-restore"
      previousLabel="Drop & restore buckets"
      nextHref="/tutorial/relationships/basic-bonds"
      nextLabel="Basic bonds (BOND)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In traditional relational databases, connecting data across different tables requires foreign keys, junction tables, and expensive multi-table <code>JOIN</code> operations. CleaveDB replaces this friction with native graph relationships and references.
      </p>

      <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-zinc-900">Two Distinct Connection Mechanisms</h3>
        <p className="mb-4 text-sm leading-relaxed text-zinc-600">
          CleaveDB provides two distinct relationship mechanisms with different architectures, semantics, and storage engines:
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4">
            <h4 className="mb-1 font-semibold text-blue-950">1. Graph Bonds (<code>BOND</code>)</h4>
            <p className="text-xs leading-relaxed text-zinc-600">
              Rich semantic graph edges stored in <code>_bonds</code>. A bond <strong>requires an explicit relationship label</strong> via <code>AS &quot;&lt;label&gt;&quot;</code> (e.g. <code>AS &quot;friend&quot;</code>). Supports weights, conditions, TTL, mutual connections, and cascading deletes. Removed with <code>SEVER</code>.
            </p>
          </div>
          <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
            <h4 className="mb-1 font-semibold text-emerald-950">2. Document Links (<code>LINK</code>)</h4>
            <p className="text-xs leading-relaxed text-zinc-600">
              Direct structural document pointers or external URL references stored in <code>_links</code>. Relationship label is optional (defaults to <code>&quot;linked&quot;</code>). Can reference external web URLs (<code>https://...</code>). Cannot take graph modifiers. Removed with <code>UNLINK</code>.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-xs">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Feature</th>
              <th className="px-4 py-3 text-blue-700"><code>BOND</code> (Graph Relationship)</th>
              <th className="px-4 py-3 text-emerald-700"><code>LINK</code> (Document / URL Reference)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-2.5 font-medium text-zinc-900">Primary Purpose</td>
              <td className="px-4 py-2.5">Semantic graph relationships with meaning (edges)</td>
              <td className="px-4 py-2.5">Direct document / external URL references</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-zinc-900">Relationship Label</td>
              <td className="px-4 py-2.5 font-semibold text-blue-800">Required via <code>AS &quot;&lt;label&gt;&quot;</code></td>
              <td className="px-4 py-2.5 text-emerald-800">Optional (defaults to <code>&quot;linked&quot;</code>)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-zinc-900">Internal Storage</td>
              <td className="px-4 py-2.5 font-mono text-zinc-700">_bonds</td>
              <td className="px-4 py-2.5 font-mono text-zinc-700">_links</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-zinc-900">External Web URLs</td>
              <td className="px-4 py-2.5 text-zinc-400">No (internal documents only)</td>
              <td className="px-4 py-2.5 text-emerald-700 font-medium">Yes (<code>https://...</code>)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-zinc-900">Weights &amp; Modifiers</td>
              <td className="px-4 py-2.5 text-zinc-800"><code>WITH</code>, <code>IF</code>, <code>EXPIRING</code>, <code>EXCLUSIVELY</code></td>
              <td className="px-4 py-2.5 text-zinc-400">No (rejected by parser)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-zinc-900">Removal Command</td>
              <td className="px-4 py-2.5 font-mono text-rose-600">SEVER &lt;doc1&gt; FROM &lt;doc2&gt;</td>
              <td className="px-4 py-2.5 font-mono text-rose-600">UNLINK &lt;doc1&gt; FROM &lt;doc2&gt;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <aside className="mb-6 rounded-lg border border-amber-200 bg-amber-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-amber-950">Strict Existence Validation</h3>
        <p className="text-sm text-amber-900/90">
          CleaveDB validates that both source and target documents exist before creating bonds or links (external URLs are validated as URLs). Creating ghost edges on non-existent buckets or documents is strictly rejected.
        </p>
      </aside>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Zero-cost relationship traversals</h3>
        <p>
          Bonds are physical graph pointers within CleaveDB’s memory and storage engine. Traversing from one document to another happens at pointer-dereference speed, avoiding the quadratic overhead of relational Cartesian joins even across millions of connected entities.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the relationship &amp; reference topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Each lesson provides practical CleaveQL examples covering the complete relationship and reference toolkit:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/basic-bonds">
            Basic bonds (BOND): connect documents with required directed semantic labels.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/document-links">
            Document &amp; URL links (LINK): lightweight document references and external web URLs.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/mutual-bonds">
            Mutual bonds: create symmetric, bidirectional connections in both directions.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/conditional-bonds">
            Conditional bonds: create dormant edges that activate based on document field values.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/expiring-bonds">
            Expiring bonds: set automatic time-to-live expirations on temporary relationships.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/exclusive-bonds">
            Exclusive bonds: enforce single-edge constraints per label and source document.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/cascade">
            Cascade on delete: configure automatic deletion cascades when source documents are drained.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/confidence-affinity">
            Confidence &amp; affinity: attach probabilistic scores and affinity weights to graph edges.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/sever">
            Removing relationships (SEVER &amp; UNLINK): dedicated removal commands and healing.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
