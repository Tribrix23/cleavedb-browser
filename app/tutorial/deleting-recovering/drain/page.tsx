import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function DrainPage() {
  return (
    <TutorialPageShell
      sectionTitle="Soft Delete (DRAIN)"
      previousHref="/tutorial/deleting-recovering"
      previousLabel="Deleting & Recovering overview"
      nextHref="/tutorial/deleting-recovering/salvage"
      nextLabel="Restore (SALVAGE)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        The <code>DRAIN</code> command performs a safe, reversible soft delete. Instead of instantly erasing files from disk, CleaveDB moves the targeted documents into an isolated system collection called <code>_rubbish</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Drain a document by ID</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To soft delete a specific document, pass the bucket name and the document ID:
      </p>
      <TutorialCodeBlock label="Soft delete a single user">{`DRAIN users "jane"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Jane&apos;s record is immediately removed from standard lookups. Any future <code>SCOOP users WHERE id = &quot;jane&quot;</code> or graph traversals through Jane will treat the record as nonexistent.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Drain matching documents with WHERE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can soft delete groups of records matching conditional criteria:
      </p>
      <TutorialCodeBlock label="Soft delete filtered orders">{`DRAIN orders WHERE status = "cancelled" AND created_at < 1704067200`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        All matching orders are moved to the rubbish bin in a single atomic transaction.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Inspecting the rubbish bin</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Administrators and authorized services can inspect soft-deleted records directly by querying the <code>_rubbish</code> collection:
      </p>
      <TutorialCodeBlock label="View drained documents">{`SCOOP _rubbish WHERE original_bucket = "users"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Each entry in <code>_rubbish</code> retains its original payload, document ID, deletion timestamp, and provenance metadata so it can be audited or restored later.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Relationship cascade behavior</h3>
        <p>
          If graph bonds were established with cascade rules (e.g., <code>LINK ... CASCADE</code>), draining a parent document automatically suspends connected child edges, preventing orphaned pointers during graph traversal.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
