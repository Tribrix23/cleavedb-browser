import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function PeerIntoCostPage() {
  return (
    <TutorialPageShell
      sectionTitle="PEER INTO COST"
      previousHref="/tutorial/diagnostics"
      previousLabel="Overview"
      nextHref="/tutorial/diagnostics/peer-attention"
      nextLabel="PEER INTO ATTENTION"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Before running an expensive analytical query or write operation against a massive bucket, <strong><code>PEER INTO COST</code></strong> predicts execution overhead, analyzes scan selectivity, and provides automated indexing suggestions.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Syntax and usage</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Wrap any target query inside parentheses after <code>PEER INTO COST</code>:
      </p>
      <TutorialCodeBlock label="Profile query execution cost">{`PEER INTO COST ( FIND logs WHERE level = "error" ARRANGED BY timestamp )`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The database parses and analyzes the statement without executing the scan or returning raw document payloads.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Structured cost breakdown</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The engine returns a detailed JSON diagnostic report:
      </p>
      <TutorialCodeBlock label="Cost model response">{`{
  "status": "ok",
  "cost": {
    "scan_type": "FULL_BUCKET_SCAN",
    "estimated_docs_scanned": 50000,
    "filter_selectivity": 0.12,
    "docs_after_filter": 6000,
    "sort_in_memory": true,
    "has_applicable_index": false,
    "estimated_ms": 65,
    "suggestions": [
      "Create INDEX logs ON (level, timestamp) to avoid full scan and eliminate in-memory sort",
      "Add LIMIT to cap memory usage"
    ]
  }
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The diagnostic immediately highlights whether the query requires a sequential scan or suffers from in-memory sorting penalties.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Key metrics explained</h3>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Metric</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">scan_type</td>
              <td className="px-4 py-3"><code>FULL_BUCKET_SCAN</code> (slow disk sweep) or <code>INDEX_SCAN</code> (fast B+Tree lookup)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">filter_selectivity</td>
              <td className="px-4 py-3">Estimated fraction of documents passing filter conditions (0.001 to 1.0)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">sort_in_memory</td>
              <td className="px-4 py-3">Indicates if results must be sorted in RAM using <code>O(N log N)</code> comparisons</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">estimated_ms</td>
              <td className="px-4 py-3">Predicted query execution time calibrated against NVMe SSD I/O and CPU clock cycles</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">suggestions</td>
              <td className="px-4 py-3">Direct, executable CleaveQL index statements to optimize the query plan</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Profiling write operations</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can also profile document insertions and bulk writes:
      </p>
      <TutorialCodeBlock label="Profile write impact">{`PEER INTO COST ( POUR {"name": "Test", "role": "engineer"} INTO users )`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Reveals indexing and validation overhead prior to committing large transactional writes.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Automated Index Optimization</h3>
        <p>
          Whenever <code>scan_type</code> reports <code>FULL_BUCKET_SCAN</code>, copy the exact statement from the <code>suggestions</code> array (e.g. <code>INDEX logs ON (level)</code>) and execute it to immediately upgrade query performance.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
