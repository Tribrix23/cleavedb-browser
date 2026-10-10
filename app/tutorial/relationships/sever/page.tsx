import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function SeverBondsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Removing Relationships (SEVER & UNLINK)"
      previousHref="/tutorial/relationships/confidence-affinity"
      previousLabel="Confidence & affinity"
      nextHref="/tutorial/graph-traversal"
      nextLabel="Graph Traversal"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When an association between two entities ends—such as unfriending a user, revoking a member&apos;s role, or removing an external URL reference—CleaveDB provides dedicated commands for each relationship engine: <strong><code>SEVER</code></strong> for graph bonds in <code>_bonds</code>, and <strong><code>UNLINK</code></strong> for document and URL links in <code>_links</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">1. SEVER — Removing Graph Bonds</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>SEVER</code> to remove graph edges between documents. You can target a single named label or destroy all bonds between the pair:
      </p>
      <TutorialCodeBlock label="Sever graph bonds">{`-- Remove a specific labeled edge
SEVER "users:jane" FROM "users:juan" AS "friend"

-- Remove ALL bonds between Jane and Juan regardless of label
SEVER "users:jane" FROM "users:juan"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        When a specific label is severed, any other bonds between the two documents (such as <code>&quot;co_worker&quot;</code>) remain completely intact.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">2. UNLINK — Removing Document &amp; URL Links</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>UNLINK</code> to detach structural document pointers or external web URLs from <code>_links</code>:
      </p>
      <TutorialCodeBlock label="Unlink documents and URLs">{`-- Remove a document link
UNLINK "users:jane" FROM "users:juan"

-- Remove a specific labelled link
UNLINK "users:jane" FROM "users:juan" AS "mentor"

-- Remove an external web URL reference
UNLINK "users:jane" FROM "https://github.com/jane"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        <code>UNLINK</code> specifically targets records in the <code>_links</code> catalog without disturbing semantic graph edges in <code>_bonds</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">3. Integrity Healing (HEAL)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        If documents are permanently deleted with <code>INCINERATE</code> or external references break, use <code>HEAL</code> to automatically clean up orphaned edges:
      </p>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-xs">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-2.5">Scope</th>
              <th className="px-4 py-2.5">Command</th>
              <th className="px-4 py-2.5">Effect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white font-mono text-zinc-700">
            <tr>
              <td className="px-4 py-2 font-sans font-medium text-zinc-900">Bonds only</td>
              <td className="px-4 py-2 text-blue-600">HEAL BONDS</td>
              <td className="px-4 py-2 font-sans text-zinc-600">Removes edges whose source or target document no longer exists in <code>_bonds</code></td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-sans font-medium text-zinc-900">Links only</td>
              <td className="px-4 py-2 text-emerald-600">HEAL LINKS</td>
              <td className="px-4 py-2 font-sans text-zinc-600">Removes links whose source or target document no longer exists in <code>_links</code></td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-sans font-medium text-zinc-900">Full repair</td>
              <td className="px-4 py-2 text-purple-600">HEAL ALL</td>
              <td className="px-4 py-2 font-sans text-zinc-600">Audits and heals both bonds and links, plus secondary index integrity</td>
            </tr>
          </tbody>
        </table>
      </div>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Documents remain untouched</h3>
        <p>
          Unlike <code>DRAIN</code> or <code>INCINERATE</code>, which soft-delete or permanently purge document contents, <code>SEVER</code> and <code>UNLINK</code> only destroy the relationship pointers. The documents themselves continue to exist with all attributes fully intact.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
