import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ConditionalBondsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Conditional Bonds"
      previousHref="/tutorial/relationships/mutual-bonds"
      previousLabel="Mutual bonds"
      nextHref="/tutorial/relationships/expiring-bonds"
      nextLabel="Expiring bonds"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In complex security, access control, and dynamic workflow systems, a relationship should only be navigable when specific business conditions are satisfied. CleaveDB supports <strong>Conditional Bonds</strong>—graph edges that remain dormant until document attributes meet specified criteria.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Configuring a conditional edge</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Append an <code>IF</code> condition after <code>AS &quot;&lt;label&gt;&quot;</code> inspecting properties on the target or source document:
      </p>
      <TutorialCodeBlock label="Conditional access bond">{`BOND "users:alice" TO "files:secret_doc" AS "can_read"
  IF clearance = "public"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        As long as <code>secret_doc</code> has <code>&quot;clearance&quot;: &quot;public&quot;</code>, the bond is live. If the document is updated and clearance changes to <code>&quot;restricted&quot;</code>, the edge immediately becomes dormant.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Checking target vs source attributes</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can inspect fields on either end of the relationship:
      </p>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-xs">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Condition Syntax</th>
              <th className="px-4 py-3">Evaluated Against</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white font-mono text-zinc-700">
            <tr>
              <td className="px-4 py-2.5 text-pink-600">IF status = &quot;active&quot;</td>
              <td className="px-4 py-2.5 font-sans">Target document field (default)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-pink-600">ONLY WHEN status IS &quot;active&quot;</td>
              <td className="px-4 py-2.5 font-sans">Target document field (synonym)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-pink-600">IF source role IS &quot;admin&quot;</td>
              <td className="px-4 py-2.5 font-sans">Source document field</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-pink-600">IF my role = &quot;admin&quot;</td>
              <td className="px-4 py-2.5 font-sans">Source document field</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-pink-600">IF their role = &quot;user&quot;</td>
              <td className="px-4 py-2.5 font-sans">Target document field</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Querying live vs dormant bonds</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Standard graph traversal queries automatically filter out dormant bonds. To inspect dormant edges without activating them, use <code>FIND CANDIDATE</code>:
      </p>
      <TutorialCodeBlock label="Querying navigable vs candidate bonds">{`-- Normal traversal: returns active bonds only
FIND "can_read" OF "users:alice"

-- Candidate check: returns dormant bonds whose conditions are currently unmet
FIND CANDIDATE "can_read" OF "users:alice"`}</TutorialCodeBlock>

      <aside className="mt-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Instant reactivation on CHANGE</h3>
        <p>
          You do not need to recreate conditional bonds when documents mutate. If a document is updated with <code>CHANGE</code> to satisfy the predicate, the edge activates immediately on the very next query. Note: conditions are a <code>BOND</code> feature and are not permitted on <code>LINK</code>.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
