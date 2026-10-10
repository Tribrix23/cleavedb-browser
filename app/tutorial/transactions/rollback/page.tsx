import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function RollbackPage() {
  return (
    <TutorialPageShell
      sectionTitle="ROLLBACK"
      previousHref="/tutorial/transactions/begin-commit"
      previousLabel="BEGIN & COMMIT"
      nextHref="/tutorial/scheduled-tasks"
      nextLabel="Scheduled Tasks & Triggers"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When an unrecoverable validation error occurs, or business logic requires canceling an in-flight operation, <strong><code>ROLLBACK</code></strong> discards all uncommitted modifications from the Software Transactional Memory buffer.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Manual rollback</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Issuing <code>ROLLBACK</code> cancels all buffered writes in the current transaction block:
      </p>
      <TutorialCodeBlock label="Aborted write transaction">{`BEGIN POUR INTO users "t3" {"name": "T3"} ROLLBACK`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Verifying the state with a subsequent lookup confirms that the document was never written:
      </p>
      <TutorialCodeBlock label="Verify aborted write">{`FIND users "t3"
-- Returns: 0 documents (empty result)`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Because the transaction was aborted prior to <code>COMMIT</code>, the Write-Ahead Log remains completely clean of the discarded operations.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Automatic rollback on errors</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You do not always need to trigger <code>ROLLBACK</code> manually. CleaveDB automatically initiates an internal rollback if any statement in a transaction triggers an error:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Guard Rule Violations:</strong> If a document fails a bucket&apos;s <code>GUARD</code> schema (such as a missing required key or out-of-range value), the entire transaction aborts.
        </li>
        <li>
          <strong className="text-zinc-800">Security Policy Rejections:</strong> If a write fails an active <code>ENFORCE SECURITY</code> policy rule, all prior writes in that block roll back.
        </li>
        <li>
          <strong className="text-zinc-800">Syntax or Type Errors:</strong> Malformed commands immediately cancel the pending transaction.
        </li>
      </ul>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Transaction scope vs. Global Undo</h3>
        <p>
          In CleaveDB&apos;s Software Transactional Memory (STM) implementation, <code>ROLLBACK</code> reverts buffered <code>POUR</code> and <code>POUR MANY</code> writes. For global historical reversions of persisted <code>CHANGE</code> or <code>LINK</code> mutations outside of transactions, use CleaveDB&apos;s global timeline rollback commands: <strong><code>UNDO</code></strong> and <strong><code>REWIND</code></strong>.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
