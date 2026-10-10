import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function SalvagePage() {
  return (
    <TutorialPageShell
      sectionTitle="Restore (SALVAGE)"
      previousHref="/tutorial/deleting-recovering/drain"
      previousLabel="Soft delete (DRAIN)"
      nextHref="/tutorial/deleting-recovering/incinerate"
      nextLabel="Hard delete (INCINERATE)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Accidental deletions happen. Whether caused by an application bug or an erroneous query, CleaveDB provides the <code>SALVAGE</code> command to restore soft-deleted records directly from the <code>_rubbish</code> bin back into their original buckets.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Restore a document by ID</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To restore a specific drained document, specify the bucket and document ID:
      </p>
      <TutorialCodeBlock label="Restore a single user">{`SALVAGE users "jane"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB locates Jane&apos;s record in <code>_rubbish</code>, validates that no conflicting record with the same ID has been created in the meantime, and restores the document back to active status in the <code>users</code> bucket.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Restoring filtered documents</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can restore batches of soft-deleted documents matching a query condition:
      </p>
      <TutorialCodeBlock label="Restore matching records">{`SALVAGE orders WHERE status = "cancelled"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Every drained order document meeting the filter is restored simultaneously within an atomic transaction.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Reactivating graph relationships</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When a document is salvaged, CleaveDB automatically reactivates any dormant graph bonds that were suspended during the <code>DRAIN</code> step. Subsequent graph traversal queries (<code>FIND</code>, <code>FOLLOW</code>, and <code>TRACE</code>) can once again traverse through the restored node.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Semantic index re-activation</h3>
        <p>
          Restoring a document unmasks its vector embeddings in the neural search index, making the document discoverable again in semantic similarity queries without requiring full re-embedding.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
