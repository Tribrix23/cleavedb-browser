import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function AsOfHistoricalReadsPage() {
  return (
    <TutorialPageShell
      sectionTitle="AS OF — historical reads"
      previousHref="/tutorial/time-travel"
      previousLabel="Overview"
      nextHref="/tutorial/time-travel/rewind"
      nextLabel="REWIND — restore a document"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        The <strong><code>AS OF</code></strong> clause allows you to run point-in-time queries against historical states of your database. Instead of inspecting only the current live records, you can rewind your perspective to see what documents and graph bonds looked like at any earlier moment.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Historical document queries</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Append <code>AS OF</code> to any <code>FIND</code> or <code>SCOOP</code> statement using relative or absolute time expressions:
      </p>
      <TutorialCodeBlock label="Point-in-time document read">{`-- Read logs as they existed yesterday
FIND EVERYTHING FROM logs AS OF yesterday

-- Query documents using an exact UNIX epoch timestamp
FIND products AS OF "1690000000"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The engine consults the MVCC history ledger (<code>_history_&lt;bucket&gt;</code>) to reconstruct documents matching the exact snapshot at that timestamp.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Time-travel graph bonds</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Relationships in CleaveDB evolve over time. Using <code>AS OF</code> with bond queries allows auditing historical connections, past org charts, or previous friend graphs:
      </p>
      <TutorialCodeBlock label="Historical relationship traversal">{`-- Inspect Alice's friends as of yesterday
FIND "friend" OF "users:alice" AS OF yesterday

-- Check access bonds as of a specific unix timestamp
FIND "manages" OF "staff:david" AS OF "1690000000"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Even if bonds were severed or changed today, the historical query reflects the graph topology that was active at that chosen moment.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Supported timestamp formats</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The <code>AS OF</code> clause accepts versatile temporal expressions:
      </p>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Format</th>
              <th className="px-4 py-3">Example</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Relative Keyword</td>
              <td className="px-4 py-3 font-mono text-blue-600">AS OF yesterday</td>
              <td className="px-4 py-3">Evaluates to 24 hours prior to current system clock</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Relative Interval</td>
              <td className="px-4 py-3 font-mono text-blue-600">AS OF &quot;2 hours ago&quot;</td>
              <td className="px-4 py-3">Subtracts the specified duration (minutes, hours, days)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">ISO Datetime</td>
              <td className="px-4 py-3 font-mono text-blue-600">AS OF &quot;2026-10-05 14:30&quot;</td>
              <td className="px-4 py-3">Pinpoints exact calendar date and hour</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">UNIX Epoch</td>
              <td className="px-4 py-3 font-mono text-blue-600">AS OF &quot;1791191933&quot;</td>
              <td className="px-4 py-3">Microsecond-level timestamp integer string</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Historical graph walk (FOLLOW ... AS OF)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Combine depth traversals with historical timestamps to retrace entire graph neighbourhoods:
      </p>
      <TutorialCodeBlock label="Depth traversal with time travel">{`FOLLOW "users:alice" THROUGH "friend" AS OF yesterday DEPTH 2`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This query traverses 2 hops outward from Alice, traversing only bonds that were active 24 hours ago.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Auditing bond changes over time</h3>
        <p className="mb-2">
          You can inspect the complete evolution of a relationship across two timestamps using <code>HOW CHANGED BETWEEN</code>:
        </p>
        <code className="text-xs font-semibold text-blue-900">
          FIND HOW THE &quot;reports_to&quot; OF &quot;emp:e1&quot; CHANGED BETWEEN &quot;2026-01-01&quot; AND &quot;2026-10-01&quot;
        </code>
      </aside>
    </TutorialPageShell>
  );
}
