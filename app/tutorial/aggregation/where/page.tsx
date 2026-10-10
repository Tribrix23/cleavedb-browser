import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function AggregationWherePage() {
  return (
    <TutorialPageShell
      sectionTitle="Filtering with WHERE"
      previousHref="/tutorial/aggregation/count-tally"
      previousLabel="Count & tally"
      nextHref="/tutorial/aggregation/group-by"
      nextLabel="Grouping with GROUP BY"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        You often need to compute aggregate statistics over a subset of documents rather than an entire bucket. In CleaveQL, the <code>WHERE</code> clause accepts comparison operators (<code>=</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>) connected with <code>AND</code> and <code>OR</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Flexible WHERE positioning</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        In <code>DISTILL</code> queries, the <code>WHERE</code> clause can be positioned immediately after the bucket or placed at the end of the query:
      </p>
      <TutorialCodeBlock label="WHERE positioned after bucket">{`DISTILL FROM staff WHERE dept = "Eng" TOTAL age`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Or placed after the aggregation function:
      </p>
      <TutorialCodeBlock label="WHERE positioned at the end">{`DISTILL FROM staff COUNT WHERE status = "active"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Both styles execute identically in CleaveDB&apos;s AST compiler.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Numeric comparison filters</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Filter numeric ranges before tallying or computing totals:
      </p>
      <TutorialCodeBlock label="Numeric filter">{`DISTILL FROM staff WHERE age > 25 COUNT`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This counts only staff members whose <code>age</code> strictly exceeds 25.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Compound boolean logic (AND / OR)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Combine multiple criteria using standard boolean operators:
      </p>
      <TutorialCodeBlock label="Conjunctive condition with AND">{`DISTILL FROM staff WHERE dept = "Eng" AND age > 30 COUNT`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        You can also combine conditions using <code>OR</code> alongside aliases:
      </p>
      <TutorialCodeBlock label="Disjunctive condition with OR">{`DISTILL FROM staff WHERE dept = "Eng" OR age < 5 TALLY AS n`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This tallies all qualifying documents and assigns the output key to <code>&quot;n&quot;</code>.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Index acceleration</h3>
        <p>
          When you create an index on a filtered field (e.g., <code>INDEX dept ON staff</code>), <code>DISTILL</code> uses the B+Tree to pinpoint candidate records in logarithmic time, skipping unindexed full bucket scans.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
