import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function BondHistoryPage() {
  return (
    <TutorialPageShell
      sectionTitle="Bond History (FIND HOW)"
      previousHref="/tutorial/pattern-matching/cross-bucket"
      previousLabel="Cross-bucket patterns"
      nextHref="/tutorial/aggregation"
      nextLabel="Aggregation (DISTILL)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In dynamic graphs, relationships evolve constantly—people change managers, access grants expire, and ownership transfers. Traditional databases only store the current state unless you write complex custom audit triggers. CleaveDB tracks relationship lifecycle events natively in its Write-Ahead Log (WAL) and allows you to inspect relationship drift using <strong><code>FIND HOW</code></strong>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Querying bond drift over time</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The <code>FIND HOW THE &quot;label&quot; OF &quot;document_id&quot; CHANGED BETWEEN &quot;start&quot; AND &quot;end&quot;</code> command inspects historical mutations for a specific document and relationship type:
      </p>
      <TutorialCodeBlock label="Inspect bond creation history">{`-- Create management bonds:
LINK "staff:ana" TO "staff:bob" AS "manages"
LINK "staff:ana" TO "staff:cam" AS "manages"

-- Inspect how Ana's "manages" relationships changed:
FIND HOW THE "manages" OF "staff:ana" CHANGED BETWEEN "yesterday" AND "tomorrow"`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        CleaveDB returns the sequence of relationship events recorded in the timeline:
      </p>
      <TutorialCodeBlock label="Result payload">{`[
  { "action": "LINK", "target": "staff:bob" },
  { "action": "LINK", "target": "staff:cam" }
]`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Tracking bond deletions (SEVER)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When a bond is removed with <code>SEVER</code>, the deletion event is also appended to the historical ledger:
      </p>
      <TutorialCodeBlock label="Severing a bond and re-checking history">{`-- Sever Ana's management of Cam:
SEVER "staff:ana" FROM "staff:cam" AS "manages"

-- Query the full historical interval:
FIND HOW THE "manages" OF "staff:ana" CHANGED BETWEEN "2000-01-01" AND "2999-01-01"`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        The returned history now includes the <code>SEVER</code> event alongside the original creations:
      </p>
      <TutorialCodeBlock label="Audit trail with SEVER event">{`[
  { "action": "LINK", "target": "staff:bob" },
  { "action": "LINK", "target": "staff:cam" },
  { "action": "SEVER", "target": "staff:cam" }
]`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Time window expressions</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The <code>BETWEEN</code> clause accepts both natural language offsets and explicit ISO-8601 timestamps:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li><code>&quot;yesterday&quot; AND &quot;tomorrow&quot;</code>: relative window around current server time.</li>
        <li><code>&quot;2026-01-01&quot; AND &quot;2026-12-31&quot;</code>: calendar year inspection.</li>
        <li><code>&quot;2026-10-01T08:00:00Z&quot; AND &quot;2026-10-01T17:00:00Z&quot;</code>: precise operational shift window.</li>
      </ul>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Enterprise auditability and forensics</h3>
        <p>
          Because <code>FIND HOW</code> reads directly from the immutable timeline log, the record cannot be tampered with or overwritten by application updates. This makes it ideal for security auditing (tracking who gained access to what), forensic investigation, and organizational tracking.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
