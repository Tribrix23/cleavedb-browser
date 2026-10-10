import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function TimeTravelOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Time Travel & Undo — Overview"
      previousHref="/tutorial/scheduled-tasks/webhooks-cdc"
      previousLabel="Webhooks for CDC"
      nextHref="/tutorial/time-travel/as-of"
      nextLabel="AS OF — historical reads"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In traditional relational and document stores, an accidental <code>UPDATE</code> or bad script permanently overwrites data unless an engineer restores a backup snapshot. CleaveDB solves this with <strong>temporal versioning</strong> and native <strong>Time Travel</strong> built directly into the storage engine.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">MVCC History Ledger</h3>
        <p>
          When a bucket is configured with <code>AUDITED</code> or <code>VERSIONED</code>, every document mutation shadows a historical snapshot into <code>_history_&lt;bucket&gt;</code> and records an entry in the system <code>_undo_stack</code>. This gives you microsecond-precise point-in-time querying and reversible operations.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Three Pillars of Temporal Operations</h3>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">1. AS OF (Historical Reads)</h4>
          <p className="text-xs text-zinc-600">
            Query documents and graph bonds as they existed at a specific timestamp or relative moment (e.g. <code>AS OF yesterday</code>) without modifying current state.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">2. REWIND (Document Restore)</h4>
          <p className="text-xs text-zinc-600">
            Revert an individual document to an earlier snapshot (e.g. <code>REWIND &quot;staff:a&quot; TO &quot;10 minutes ago&quot;</code>) while keeping graph bonds intact.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">3. UNDO (Global Rollback)</h4>
          <p className="text-xs text-zinc-600">
            Inspect the global operation ledger with <code>UNDO SHOW</code> and roll back operations down to a specific transaction ID without prior transaction locks.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Prerequisites for Time Travel</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To enable temporal snapshots, configure target buckets with version tracking:
      </p>
      <ul className="mb-8 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">SHAPE BUCKET &lt;bucket&gt; VERSIONED:</strong> Automatically maintains previous versions of documents on every write or update.
        </li>
        <li>
          <strong className="text-zinc-800">SHAPE BUCKET &lt;bucket&gt; AUDITED:</strong> Logs full audit diffs (author, before/after payloads, timestamps) to enable <code>REWIND</code>.
        </li>
      </ul>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore Time Travel Topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Select a guide below to learn how to query and restore past data in CleaveQL:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/time-travel/as-of">
            AS OF — historical reads: execute point-in-time document and graph queries across relative and absolute timestamps.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/time-travel/rewind">
            REWIND — restore a document: revert an altered document back to a past state using MVCC history snapshots.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/time-travel/undo">
            UNDO — global rollback: audit recent writes via UNDO SHOW and revert accidental mutations instantly.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
