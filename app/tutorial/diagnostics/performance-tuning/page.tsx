import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function PerformanceTuningPage() {
  return (
    <TutorialPageShell
      sectionTitle="Performance tuning workflow"
      previousHref="/tutorial/diagnostics/peer-attention"
      previousLabel="PEER INTO ATTENTION"
      nextHref="/tutorial/cluster"
      nextLabel="Distributed Cluster"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In production systems containing millions of documents, ad-hoc full-table scans and unindexed sorting severely degrade response times and waste CPU cycles. CleaveDB provides a canonical 4-step tuning workflow using <strong><code>PEER INTO COST</code></strong>, <strong><code>INDEX</code></strong>, and calibrated execution analysis.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">The 4-step tuning cycle</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Follow this iterative pattern whenever designing queries for large buckets:
      </p>

      <div className="mb-8 space-y-6">
        {/* Step 1 */}
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
              1
            </span>
            <h4 className="font-semibold text-zinc-900">Profile cost before execution</h4>
          </div>
          <p className="mb-3 text-sm text-zinc-600">
            Inspect the raw query cost to determine whether the storage engine will perform a sequential full-bucket scan:
          </p>
          <TutorialCodeBlock label="Step 1: Inspect cost">{`PEER INTO COST ( FIND logs WHERE level = "error" ARRANGED BY timestamp )`}</TutorialCodeBlock>
          <p className="mt-3 text-sm text-zinc-600">
            The engine reveals an unindexed full scan and costly in-memory quicksort:
          </p>
          <TutorialCodeBlock label="Unoptimized diagnostics">{`{
  "scan_type": "FULL_BUCKET_SCAN",
  "estimated_docs_scanned": 50000,
  "filter_selectivity": 0.12,
  "sort_in_memory": true,
  "estimated_ms": 65,
  "suggestions": [
    "Create INDEX logs ON (level, timestamp) to avoid full scan and eliminate in-memory sort",
    "Add LIMIT to cap memory usage"
  ]
}`}</TutorialCodeBlock>
        </div>

        {/* Step 2 */}
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800">
              2
            </span>
            <h4 className="font-semibold text-zinc-900">Create the recommended index</h4>
          </div>
          <p className="mb-3 text-sm text-zinc-600">
            Apply the index statement suggested by the cost model. To satisfy both filtering and sorting without an in-memory sort, build a compound index on both fields:
          </p>
          <TutorialCodeBlock label="Step 2: Build compound index">{`INDEX logs ON (level, timestamp)`}</TutorialCodeBlock>
          <p className="mt-3 text-sm text-zinc-600">
            CleaveDB builds a balanced B+Tree indexing the key tuple <code>(level, timestamp)</code>.
          </p>
        </div>

        {/* Step 3 */}
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
              3
            </span>
            <h4 className="font-semibold text-zinc-900">Re-verify the execution plan</h4>
          </div>
          <p className="mb-3 text-sm text-zinc-600">
            Run <code>PEER INTO COST</code> a second time to ensure the optimizer now selects the newly created B+Tree:
          </p>
          <TutorialCodeBlock label="Step 3: Verify index plan">{`PEER INTO COST ( FIND logs WHERE level = "error" ARRANGED BY timestamp )`}</TutorialCodeBlock>
          <p className="mt-3 text-sm text-zinc-600">
            The diagnostic report confirms optimal execution:
          </p>
          <TutorialCodeBlock label="Optimized diagnostics">{`{
  "scan_type": "INDEX_SCAN",
  "estimated_docs_scanned": 9000,
  "filter_selectivity": 0.12,
  "sort_in_memory": false,
  "has_applicable_index": true,
  "estimated_ms": 1,
  "suggestions": [
    "Query is optimal"
  ]
}`}</TutorialCodeBlock>
        </div>

        {/* Step 4 */}
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-800">
              4
            </span>
            <h4 className="font-semibold text-zinc-900">Execute the optimal query</h4>
          </div>
          <p className="mb-3 text-sm text-zinc-600">
            Run the actual query knowing that data access will complete in roughly 1 ms:
          </p>
          <TutorialCodeBlock label="Step 4: Execute query">{`FIND logs WHERE level = "error" ARRANGED BY timestamp LIMIT 50`}</TutorialCodeBlock>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Eliminating in-memory quicksort</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When a query includes <code>ARRANGED BY</code> and no index covers the sort field, the database must load all candidate records into RAM and run an <code>O(N log N)</code> quicksort:
      </p>
      <TutorialCodeBlock label="Cost of sorting">{`cost_sort = rows * log2(rows) * row_cost * 0.5`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        By defining a compound index that includes the predicate field followed by the sort field (e.g. <code>(level, timestamp)</code>), the B+Tree traverses matching entries in pre-sorted order, setting <code>sort_in_memory: false</code> and eliminating sort latency completely.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Calibrated NVMe SSD & CPU cost model</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB estimates query duration using hardware-calibrated parameters:
      </p>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Parameter</th>
              <th className="px-4 py-3">Calibration Value</th>
              <th className="px-4 py-3">Formula Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">page_cost</td>
              <td className="px-4 py-3 font-mono text-zinc-800">0.1 ms</td>
              <td className="px-4 py-3">16KB page random read from NVMe SSD</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">sequential_factor</td>
              <td className="px-4 py-3 font-mono text-zinc-800">0.33x</td>
              <td className="px-4 py-3">Sequential block reads are ~3x faster than random lookups</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">row_cost</td>
              <td className="px-4 py-3 font-mono text-zinc-800">0.001 ms</td>
              <td className="px-4 py-3">CPU overhead per row (deserialization and predicate evaluation)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">index_depth</td>
              <td className="px-4 py-3 font-mono text-zinc-800">3 levels</td>
              <td className="px-4 py-3">Standard B+Tree traversal cost (3 random page reads = 0.3 ms)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Memory protection with LIMIT</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        For buckets containing more than 1,000 documents, queries that omit <code>LIMIT</code> are flagged with <code>"Add LIMIT to cap memory usage"</code> in the diagnostics suggestions array. Always append <code>LIMIT</code> to prevent runaway client memory consumption.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Summary: Production Performance Rules</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-700">
          <li>Always profile slow queries with <code>PEER INTO COST</code> before manually adding indexes.</li>
          <li>Match compound index field orders to your <code>WHERE</code> predicates and <code>ARRANGED BY</code> clauses.</li>
          <li>Confirm <code>scan_type</code> becomes <code>INDEX_SCAN</code> and <code>sort_in_memory</code> is <code>false</code>.</li>
          <li>Cap large result streams with <code>LIMIT</code> to safeguard cluster memory.</li>
        </ul>
      </aside>
    </TutorialPageShell>
  );
}
