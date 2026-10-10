import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function TheUpdatePage() {
  return (
    <TutorialPageShell
      sectionTitle="The UPDATE Command"
      previousHref="/tutorial/updating-documents/sub-query-injection"
      previousLabel="Sub-query injection"
      nextHref="/tutorial/deleting-recovering"
      nextLabel="Deleting & Recovering"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In addition to <code>CHANGE</code>, CleaveQL natively supports the <code>UPDATE</code> command. If you come from a relational SQL background, <code>UPDATE</code> offers immediate familiarity while operating directly on flexible JSON documents within CleaveDB buckets.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Direct document update</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can target a specific document by its bucket and ID:
      </p>
      <TutorialCodeBlock label="Update a user by ID">{`UPDATE users "jane" SET status = "active"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This updates the <code>status</code> property on Jane&apos;s document in place. Existing graph bonds, tenant namespaces, and untouched properties are fully preserved.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Updating multiple fields with UPDATE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Set multiple fields simultaneously with comma-separated assignments:
      </p>
      <TutorialCodeBlock label="Update multiple fields">{`UPDATE users "jane" SET status = "verified", plan = "pro", updated_at = 1712750400`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        All field updates are processed atomically through CleaveDB&apos;s Write-Ahead Log (WAL).
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Conditional updates with WHERE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>WHERE</code> to update every document meeting specific criteria across a bucket:
      </p>
      <TutorialCodeBlock label="Conditional batch update">{`UPDATE orders WHERE status = "pending" SET status = "processing"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Every document satisfying the <code>WHERE</code> clause is updated in an atomic transaction.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Sub-queries inside UPDATE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Embed nested <code>SCOOP</code> queries directly within your <code>UPDATE</code> condition:
      </p>
      <TutorialCodeBlock label="Update using nested sub-query">{`UPDATE orders SET status = "flagged" WHERE customer_id IN (
  SCOOP users WHOSE status IS "banned" YIELD gid
)`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The sub-query resolves the candidate user IDs, and the outer <code>UPDATE</code> modifies all corresponding order records seamlessly.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">CHANGE vs UPDATE in CleaveDB</h3>
        <p>
          In CleaveQL, both <code>CHANGE</code> and <code>UPDATE</code> share the same high-performance execution engine, transactional guarantees, and Document-Level Security policies. You can use whichever keyword best suits your team&apos;s preferences or application conventions.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
