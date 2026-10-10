import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function BeginCommitPage() {
  return (
    <TutorialPageShell
      sectionTitle="BEGIN & COMMIT"
      previousHref="/tutorial/transactions"
      previousLabel="Overview"
      nextHref="/tutorial/transactions/rollback"
      nextLabel="ROLLBACK"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        The <strong><code>BEGIN</code></strong> and <strong><code>COMMIT</code></strong> commands delimit an atomic transaction block. Operations inside the block are buffered in memory and committed together as a single atomic unit.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Multi-statement transaction block</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>BEGIN TRANSACTION</code> (or simply <code>BEGIN</code>) to initiate the buffer, execute write statements, and finalize with <code>COMMIT</code>:
      </p>
      <TutorialCodeBlock label="Coordinated multi-document write">{`BEGIN TRANSACTION
POUR INTO users "alice" {"money": 50}
POUR INTO users "bob" {"money": 150}
COMMIT`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Both documents (<code>alice</code> and <code>bob</code>) enter the database simultaneously. If an error occurs on the second write, the first write is not persisted.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Single-line chained transactions</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        In CleaveQL, multiple commands can be chained on a single line. This allows sending an entire atomic transaction block in a single network roundtrip:
      </p>
      <TutorialCodeBlock label="Single-line transaction chain">{`BEGIN POUR INTO users "t1" {"name": "T1"} POUR INTO users "t2" {"name": "T2"} COMMIT`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Sending transaction blocks as a single command string eliminates network latency roundtrips between individual operations.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Mixing documents, bonds, and updates</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        A single transaction can compose document creation (<code>POUR</code>), graph bond creation (<code>BOND</code>), and document mutations (<code>CHANGE</code>):
      </p>
      <TutorialCodeBlock label="Composite multi-paradigm transaction">{`BEGIN POUR INTO mix "m3" {"v": 3} BOND "mix:m3" TO "mix:m1" AS "tx" CHANGE mix "m3" SET v TO 4 COMMIT`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The document creation, graph bond establishment, and field update all commit in unison.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Write-Ahead Log atomicity</h3>
        <p>
          Upon receiving <code>COMMIT</code>, CleaveDB writes the entire buffered batch as a single atomic record to the Write-Ahead Log. Even in the event of an abrupt power failure immediately after commit, the database will reconstruct all transaction statements intact during startup recovery.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
