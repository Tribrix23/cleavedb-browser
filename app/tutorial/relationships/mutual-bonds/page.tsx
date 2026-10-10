import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function MutualBondsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Mutual Bonds"
      previousHref="/tutorial/relationships/document-links"
      previousLabel="Document & URL links"
      nextHref="/tutorial/relationships/conditional-bonds"
      nextLabel="Conditional bonds"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In many social and collaborative domains, relationships are symmetric: if Jane is Pedro&apos;s teammate, Pedro is also Jane&apos;s teammate. Rather than issuing two separate statements, CleaveQL provides the <code>AND ... AS MUTUAL</code> clause.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Creating a bidirectional mutual bond</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Connect two documents symmetrically using <code>AND</code> and <code>AS MUTUAL &quot;&lt;label&gt;&quot;</code>:
      </p>
      <TutorialCodeBlock label="Create a mutual co-worker relationship">{`BOND "users:jane" AND "users:pedro" AS MUTUAL "co_worker"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB provisions dual edges atomically in the graph layer: one from Jane to Pedro, and one from Pedro to Jane, both labeled <code>&quot;co_worker&quot;</code> in <code>_bonds</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Querying from either direction</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Traversing the bond yields the symmetric counterpart regardless of which entity anchors the query:
      </p>
      <TutorialCodeBlock label="Find mutual co-workers">{`FIND "co_worker" OF "users:jane"
FIND "co_worker" OF "users:pedro"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Both queries return the counterpart document without requiring bidirectional join tables or reverse edge indexes.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Atomic lifecycle consistency</h3>
        <p>
          Mutual bonds are created together in a single transaction. Both documents must exist in their respective buckets before creation, or the entire operation is rejected.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
