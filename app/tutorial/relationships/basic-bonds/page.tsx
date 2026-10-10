import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function BasicBondsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Basic Bonds (BOND)"
      previousHref="/tutorial/relationships"
      previousLabel="Relationships overview"
      nextHref="/tutorial/relationships/document-links"
      nextLabel="Document & URL links"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A graph bond is a directed, semantic relationship pointing from an existing source document to an existing target document. In CleaveQL, bonds can connect documents within the same bucket or span across completely different buckets, and are stored in the dedicated <code>_bonds</code> catalog.
      </p>

      <aside className="mb-6 rounded-lg border border-amber-200 bg-amber-50/70 p-4 leading-relaxed text-zinc-700">
        <h4 className="mb-1 font-semibold text-amber-950 text-sm">Label is Required on BOND</h4>
        <p className="text-xs text-amber-900/90">
          <code>BOND</code> <strong>always requires</strong> an explicit relationship label via <code>AS &quot;&lt;label&gt;&quot;</code> (e.g. <code>AS &quot;friend&quot;</code>). Omitting <code>AS</code> causes CleaveDB to reject the statement with an error directing you to use <code>LINK</code> for unlabelled document links.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Creating a directed bond</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>BOND</code> with <code>TO</code> and assign a semantic relationship label using <code>AS</code>:
      </p>
      <TutorialCodeBlock label="Bond two users">{`BOND "users:jane" TO "users:juan" AS "friend"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This creates a directed graph edge labeled <code>&quot;friend&quot;</code> from Jane to Juan. You can query Jane&apos;s friends using <code>FIND &quot;friend&quot; OF &quot;users:jane&quot;</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Cross-bucket bonds</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Bonds naturally link records between disparate collections without requiring foreign key schemas or junction tables:
      </p>
      <TutorialCodeBlock label="Bond an order to a customer">{`BOND "orders:ord_901" TO "users:jane" AS "purchased_by"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The relationship lives directly in the document graph index, allowing instantaneous traversal between orders and user accounts.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Multi-target bonding</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can connect a source document to several targets simultaneously using comma-separated targets or <code>TO ANY(...)</code>:
      </p>
      <TutorialCodeBlock label="Bond to multiple targets">{`-- Comma-separated targets
BOND "users:jane" TO "users:juan", "users:pedro" AS "knows"

-- Using ANY(...)
BOND "users:jane" TO ANY("tag:sql", "tag:rust", "tag:ai") AS "skill"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB provisions graph pointers to each listed document in an atomic batch.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Existence validation</h3>
        <p>
          Both source and target buckets and documents must exist prior to creating the bond. Attempting to bond to or from a non-existent document or bucket will return a validation error.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
