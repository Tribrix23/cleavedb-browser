import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function NamedResultsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Named Results (AS) & Multi-Metrics"
      previousHref="/tutorial/aggregation/group-by"
      previousLabel="Grouping with GROUP BY"
      nextHref="/tutorial/pipeline"
      nextLabel="Pipeline (PIPE)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        By default, <code>DISTILL</code> names output keys after the aggregation function used (such as <code>&quot;total&quot;</code>, <code>&quot;avg&quot;</code>, or <code>&quot;count&quot;</code>). With the <strong><code>AS</code></strong> keyword, you can assign descriptive names to result fields and combine multiple metrics in a single comma-separated query.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Custom output aliases with AS</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Append <code>AS &lt;alias&gt;</code> directly following an aggregate expression to rename its JSON output key:
      </p>
      <TutorialCodeBlock label="Custom count alias">{`DISTILL FROM staff COUNT AS headcount`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Or for numeric totals:
      </p>
      <TutorialCodeBlock label="Custom sum alias">{`DISTILL FROM staff TOTAL age AS payroll_age`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The database serializes the payload directly using your designated keys (e.g. <code>&#123;&quot;payroll_age&quot;: 119.0&#125;</code>).
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Combining multiple metrics in one pass</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Separate multiple aggregation clauses with commas to calculate comprehensive analytical summaries simultaneously:
      </p>
      <TutorialCodeBlock label="Multi-metric summary pass">{`DISTILL FROM staff TOTAL age AS total, MIN age AS youngest, MAX age AS oldest, COUNT AS n`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB computes all four metrics concurrently in a single traversal pass through the bucket, returning:
      </p>
      <TutorialCodeBlock label="Result payload">{`{
  "total": 119.0,
  "youngest": 24,
  "oldest": 35,
  "n": 4
}`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Quoting bucket names</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Bucket names can be unquoted or double-quoted when adhering to strict SQL formatting styles:
      </p>
      <TutorialCodeBlock label="Quoted bucket identifier">{`DISTILL FROM "staff" COUNT`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Automation with scheduled tasks (EVERY)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        In production environments, <code>DISTILL</code> is frequently scheduled to generate recurring analytical snapshots:
      </p>
      <TutorialCodeBlock label="Periodic hourly distillation">{`EVERY 1 HOURS DO ( DISTILL FROM sales TOTAL price )`}</TutorialCodeBlock>

      <aside className="mt-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Error handling</h3>
        <p>
          If an unrecognized aggregation function is passed, CleaveDB rejects the query with an informative error message: <code>Unknown aggregation: &lt;NAME&gt;</code>.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
