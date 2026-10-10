import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function DiagnosticsOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Query Diagnostics (PEER) — Overview"
      previousHref="/tutorial/computed-fields/enrichment-masking"
      previousLabel="Enrichment with masking"
      nextHref="/tutorial/diagnostics/peer-cost"
      nextLabel="PEER INTO COST"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In high-scale production databases, diagnosing slow queries, avoiding accidental full scans, and verifying neural hardware acceleration are critical for reliability. CleaveDB provides <strong><code>PEER</code></strong>—a built-in diagnostic and profiling engine that analyzes query plans and AI telemetry without executing mutations.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Non-destructive query profiling</h3>
        <p>
          Similar to <code>EXPLAIN</code> in traditional relational engines, <code>PEER</code> inspects statements, calculates estimated I/O and CPU execution costs, and recommends targeted secondary indexes without modifying underlying documents or committing writes.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">The Diagnostic Toolkit</h3>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">1. PEER INTO COST</h4>
          <p className="text-xs text-zinc-600">
            Profile query execution costs, inspect scan types (<code>FULL_BUCKET_SCAN</code> vs. <code>INDEX_SCAN</code>), and receive automated index recommendations.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">2. PEER INTO ATTENTION</h4>
          <p className="text-xs text-zinc-600">
            Inspect neural search status, ONNX runtime providers, Transformer model health, and 384-dimensional vector embedding telemetry.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">3. Performance Tuning</h4>
          <p className="text-xs text-zinc-600">
            Follow the canonical 4-step workflow to verify query bottlenecks, generate missing B-tree indexes, and eliminate in-memory sorting.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Calibrated I/O + CPU Cost Model</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB evaluates query cost using a calibrated NVMe SSD performance model:
      </p>
      <ul className="mb-8 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Page I/O:</strong> Estimates 16KB page reads across B+Tree traversals and sequential storage sweeps.
        </li>
        <li>
          <strong className="text-zinc-800">CPU Evaluation:</strong> Accounts for deserialization, predicate comparisons, and in-memory sort penalties (<code>O(N log N)</code>).
        </li>
        <li>
          <strong className="text-zinc-800">Automated Remediation:</strong> Emits ready-to-run <code>INDEX</code> statements when queries lack index coverage.
        </li>
      </ul>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore Diagnostic Guides</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Choose a topic below to inspect and tune CleaveDB query execution:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/diagnostics/peer-cost">
            PEER INTO COST: estimate I/O latency, selectivity, and scan modes before running expensive queries.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/diagnostics/peer-attention">
            PEER INTO ATTENTION: inspect neural Transformer embedding status and hardware acceleration.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/diagnostics/performance-tuning">
            Performance tuning workflow: practical guide to converting slow full scans into sub-millisecond index lookups.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
