import Link from "next/link";

import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function DeletingRecoveringOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Deleting & Recovering — Overview"
      previousHref="/tutorial/updating-documents/update"
      previousLabel="The UPDATE"
      nextHref="/tutorial/deleting-recovering/drain"
      nextLabel="Soft delete (DRAIN)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In a modern hybrid database, removing records involves more than dropping a row from a table. Documents are connected to other records through graph bonds, indexed in high-dimensional vector spaces for semantic search, and scoped by strict tenant boundaries. CleaveDB provides a tiered data removal and recovery lifecycle that keeps deletion safe, reversible, and graph-aware.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Soft deletion by default</h3>
        <p>
          CleaveDB emphasizes safety. Rather than permanently destroying data on the first command, <code>DRAIN</code> moves records into an isolated <code>_rubbish</code> bin. Drained records are immediately excluded from active queries, yet remain fully recoverable using <code>SALVAGE</code> until permanently purged.
        </p>
      </aside>

      <p className="mb-6 leading-relaxed text-zinc-600">
        When an application removes a document, CleaveDB coordinates the mutation across all storage subsystems:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Query Exclusion:</strong> Standard <code>SCOOP</code> and <code>FIND</code> queries immediately stop returning drained records.
        </li>
        <li>
          <strong className="text-zinc-800">Graph Bond Cascading:</strong> Graph relationships attached to drained documents are temporarily deactivated, preventing traversal queries from walking into dead nodes.
        </li>
        <li>
          <strong className="text-zinc-800">Vector Index Hygiene:</strong> Drained documents are masked from neural semantic searches so irrelevant or deleted text does not surface in AI lookups.
        </li>
      </ul>

      <aside className="mb-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">SQL perspective</h3>
        <p>
          In traditional relational databases, <code>DELETE FROM users WHERE id = &apos;jane&apos;</code> permanently erases data unless you manually engineer soft-delete columns (like <code>is_deleted = true</code>) and add filtering clauses to every subsequent query. In CleaveQL, soft-deletion is a first-class engine feature: <code>DRAIN</code> manages the isolation automatically, and <code>SALVAGE</code> can restore records with a single command.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">The Deletion &amp; Recovery Lifecycle</h3>
      <div className="mb-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <h4 className="font-semibold text-zinc-900">1. DRAIN (Soft Delete)</h4>
          <p className="text-sm text-zinc-600 mt-1">
            Moves identified documents to the rubbish bin. Use for everyday record removal where rollback or audit recovery might be needed.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <h4 className="font-semibold text-zinc-900">2. SALVAGE (Restoration)</h4>
          <p className="text-sm text-zinc-600 mt-1">
            Pulls soft-deleted documents back from <code>_rubbish</code> into active buckets, re-activating their fields and graph bonds seamlessly.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <h4 className="font-semibold text-zinc-900">3. INCINERATE (Hard Delete)</h4>
          <p className="text-sm text-zinc-600 mt-1">
            Permanently obliterates documents from disk, Write-Ahead Logs (WAL), and vector stores. Once incinerated, data cannot be recovered.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <h4 className="font-semibold text-zinc-900">4. DROP &amp; RESTORE BUCKET</h4>
          <p className="text-sm text-zinc-600 mt-1">
            Applies soft-deletion and restoration at the entire collection level, letting you take buckets offline or revive them en masse.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the Deleting &amp; Recovering topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Each lesson provides practical examples and query syntax for managing document lifecycles:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/deleting-recovering/drain">
            Soft delete (DRAIN): safely remove documents and cascade graph relationships to the rubbish bin.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/deleting-recovering/salvage">
            Restore (SALVAGE): recover soft-deleted documents and re-enable their active bonds.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/deleting-recovering/incinerate">
            Hard delete (INCINERATE): permanently purge records from the storage engine and reclaim disk space.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/deleting-recovering/drop-restore">
            Drop &amp; restore buckets: manage bucket-level decommissioning and recovery workflows.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
