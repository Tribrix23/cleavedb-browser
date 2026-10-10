import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function RewindRestoreDocumentPage() {
  return (
    <TutorialPageShell
      sectionTitle="REWIND — restore a document"
      previousHref="/tutorial/time-travel/as-of"
      previousLabel="AS OF — historical reads"
      nextHref="/tutorial/time-travel/undo"
      nextLabel="UNDO — global rollback"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When an erroneous update corrupts an important document, <strong><code>REWIND</code></strong> restores that document back to the exact state it had at a specified point in time, using CleaveDB&apos;s MVCC history ledger.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Prerequisite: Audited or versioned bucket</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To restore earlier versions, the target bucket must have change logging enabled before the mutations occur:
      </p>
      <TutorialCodeBlock label="Enable audit logging">{`-- Required once before changes occur
SHAPE BUCKET staff AUDITED`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        If a bucket is not audited or versioned, CleaveDB will reject the command with: <code>No history for &apos;staff:a&apos;. Run SHAPE BUCKET staff AUDITED ...</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Restoring document state</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Issue <code>REWIND</code> with the qualified document ID (<code>bucket:id</code>) and target timestamp:
      </p>
      <TutorialCodeBlock label="Mutate and rewind document">{`-- Make a sequence of updates
CHANGE staff "a" SET age TO 36
CHANGE staff "a" SET age TO 37

-- Restore document state from 1 minute ago
REWIND "staff:a" TO "1 minutes ago"

-- Verify the restored document
FIND staff "a"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The fields of <code>staff:a</code> now match what was stored at that exact minute.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Temporal syntax variants</h3>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Variant</th>
              <th className="px-4 py-3">CleaveQL Syntax</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white font-mono text-xs text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-sans font-medium text-zinc-900">Relative Time</td>
              <td className="px-4 py-3 text-blue-600">REWIND &quot;staff:a&quot; TO &quot;10 minutes ago&quot;</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-sans font-medium text-zinc-900">Yesterday</td>
              <td className="px-4 py-3 text-blue-600">REWIND &quot;staff:a&quot; TO &quot;yesterday&quot;</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-sans font-medium text-zinc-900">ISO Datetime</td>
              <td className="px-4 py-3 text-blue-600">REWIND &quot;staff:a&quot; TO &quot;2026-10-05 14:30&quot;</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-sans font-medium text-zinc-900">Unix Timestamp</td>
              <td className="px-4 py-3 text-blue-600">REWIND &quot;staff:a&quot; TO &quot;1791191933&quot;</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-sans font-medium text-zinc-900">Current Live State</td>
              <td className="px-4 py-3 text-blue-600">REWIND &quot;staff:a&quot; TO &quot;now&quot;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Graph bonds survive rewinds</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Unlike relational cascades that break foreign keys, CleaveDB graph bonds are decoupled from document revisions. Rewinding a document modifies its internal attributes without severing incoming or outgoing bonds:
      </p>
      <TutorialCodeBlock label="Bonds persist through document rewinds">{`BOND "staff:a" TO "staff:b" AS "pal"
CHANGE staff "a" SET age TO 50
REWIND "staff:a" TO "now"

-- The graph bond remains completely intact
FIND "pal" OF "staff:a"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Any aggregations (<code>DISTILL</code>) run after the rewind instantly reflect the restored document attributes.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Key engine rules</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>Full ID Required:</strong> Always use qualified document IDs (e.g. <code>&quot;staff:a&quot;</code>, not <code>&quot;a&quot;</code>).</li>
          <li><strong>Existence Check:</strong> If the document did not exist at the target timestamp, the engine reports <code>&apos;staff:a&apos; did not exist at that time.</code> and leaves data untouched.</li>
          <li><strong>Reversible Operation:</strong> The <code>REWIND</code> operation itself appends an entry to the audit log, meaning you can rewind a document again to undo the restore.</li>
        </ul>
      </aside>
    </TutorialPageShell>
  );
}
