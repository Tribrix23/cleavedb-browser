import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function CascadeOnDeletePage() {
  return (
    <TutorialPageShell
      sectionTitle="Cascade on Delete"
      previousHref="/tutorial/relationships/exclusive-bonds"
      previousLabel="Exclusive bonds"
      nextHref="/tutorial/relationships/confidence-affinity"
      nextLabel="Confidence & affinity"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When modeling parent-child hierarchies—such as an order and its line items, or an article and its attachments—deleting the parent document should often delete the dependent child entities as well. CleaveQL enables this behavior using <code>ON DELETE CASCADE</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Configuring a cascading bond</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Append <code>ON DELETE CASCADE</code> to your <code>LINK</code> command:
      </p>
      <TutorialCodeBlock label="Cascade order items on deletion">{`LINK "orders:ord_1" TO "line_items:item_1" AS "contains" ON DELETE CASCADE`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        If <code>&quot;orders:ord_1&quot;</code> is subsequently soft-deleted with <code>DRAIN</code>, CleaveDB automatically cascades the soft-deletion to <code>&quot;line_items:item_1&quot;</code>, moving both records into <code>_rubbish</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Cascading recovery with SALVAGE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Cascade rules also operate during recovery workflows:
      </p>
      <TutorialCodeBlock label="Restore order and cascaded items">{`SALVAGE orders "ord_1"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB recognizes the cascade metadata, restoring the parent order alongside all its linked child line items and reactivating the bonds between them.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Deep cascade trees</h3>
        <p>
          Cascading bonds can form multi-tier trees (e.g. Workspace &rarr; Projects &rarr; Tasks). CleaveDB traverses the entire dependency hierarchy to cleanly drain or incinerate child documents without leaving orphaned records.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
