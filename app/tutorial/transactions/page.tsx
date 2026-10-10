import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function TransactionsOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="ACID Transactions — Overview"
      previousHref="/tutorial/security/drop-policy"
      previousLabel="Remove policies (DROP SECURITY)"
      nextHref="/tutorial/transactions/begin-commit"
      nextLabel="BEGIN & COMMIT"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In distributed systems and mission-critical applications, multi-step operations (such as balance transfers, inventory checkout, or coordinated account setups) require strict transactional consistency. CleaveDB supports full <strong>ACID Transactions</strong> powered by an in-memory <strong>Software Transactional Memory (STM)</strong> buffer and Write-Ahead Logging (WAL).
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">ACID guarantees in CleaveDB</h3>
        <p>
          Statements within a transaction buffer inside the Rust engine during execution. If any statement encounters a syntax error, guard rule violation, or security policy check failure, the engine automatically aborts and rolls back all preceding writes in the block.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Core pillars of CleaveDB transactions</h3>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">Atomicity</h4>
          <p className="text-xs text-zinc-600">
            All buffered statements in a <code>BEGIN ... COMMIT</code> block succeed together or none apply. A failure in any statement rolls back all earlier writes in that transaction.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">Consistency</h4>
          <p className="text-xs text-zinc-600">
            Write-time <code>GUARD</code> validation rules and <code>DLS</code> access policies are checked prior to commit. Any constraint violation prevents the transaction from committing.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">Isolation</h4>
          <p className="text-xs text-zinc-600">
            Transactions run in an isolated in-memory buffer via Software Transactional Memory (STM), preventing uncommitted dirty reads from being visible to parallel client connections.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">Durability</h4>
          <p className="text-xs text-zinc-600">
            Once <code>COMMIT</code> succeeds, the batched operations are flushed to disk in the append-only Write-Ahead Log (WAL) with group commit, guaranteeing durability across restarts.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the Transaction topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Review the guides below to master atomic transaction blocks in CleaveQL:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/transactions/begin-commit">
            BEGIN &amp; COMMIT: execute multi-command atomic transaction blocks and single-line chains.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/transactions/rollback">
            ROLLBACK: manually abort in-flight transactions and explore automatic failure rollbacks.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
