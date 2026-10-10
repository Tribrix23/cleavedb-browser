import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function GroupAggregateStagesPage() {
  return (
    <TutorialPageShell
      sectionTitle="Group & Aggregate Stages"
      previousHref="/tutorial/pipeline/filter-sort"
      previousLabel="Filter & sort stages"
      nextHref="/tutorial/bucket-configuration"
      nextLabel="Bucket Configuration"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In addition to standard filtering and projection, CleaveDB allows powerful group-and-aggregate stages inside a pipeline. The output of an aggregation stage is itself a stream of structured records that can be further sorted, limited, or transformed by downstream <code>THEN</code> clauses.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Multi-metric group aggregation</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Group documents by an attribute and compute multiple statistical metrics in one pass:
      </p>
      <TutorialCodeBlock label="Department-level group aggregation">{`PIPE FROM emp
  THEN GROUP BY dept
    TALLY AS n,
    MIN OF age AS youngest,
    MAX OF age AS oldest,
    AVERAGE OF age AS avg`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This groups all employee records by department and emits structured summary objects containing the count, minimum age, maximum age, and average age per department.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Sorting by computed aggregate aliases</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Because stages feed forward into the next stage, you can sort and limit by the <em>computed aliases</em> produced during aggregation:
      </p>
      <TutorialCodeBlock label="Top 5 revenue regions">{`PIPE FROM orders
  THEN WHERE status = "completed"
  THEN GROUP BY region TOTAL OF revenue AS region_total
  THEN ARRANGED BY region_total GOING DOWN
  THEN LIMIT 5`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Notice how <code>ARRANGED BY region_total GOING DOWN</code> directly targets the alias created by the preceding <code>TOTAL OF revenue AS region_total</code> stage, and <code>THEN LIMIT 5</code> yields the top 5 highest-revenue regions.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Supported aggregate functions in PIPE</h3>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-50">
              <th className="py-2.5 px-4 font-semibold">Function</th>
              <th className="py-2.5 px-4 font-semibold">Syntax pattern</th>
              <th className="py-2.5 px-4 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Count / Tally</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">TALLY AS n</td>
              <td className="py-2.5 px-4">Counts documents matching the partition</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Total / Sum</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">TOTAL OF price AS total_price</td>
              <td className="py-2.5 px-4">Sums numeric values</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Average</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">AVERAGE OF score AS avg_score</td>
              <td className="py-2.5 px-4">Calculates arithmetic mean</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Minimum / Maximum</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">MIN OF age AS min_a, MAX OF age AS max_a</td>
              <td className="py-2.5 px-4">Calculates extreme values</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium text-zinc-800">Spread</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">SPREAD OF latency AS latency_range</td>
              <td className="py-2.5 px-4">Calculates the difference between max and min</td>
            </tr>
          </tbody>
        </table>
      </div>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Comparing PIPE with DISTILL</h3>
        <p>
          While <code>DISTILL</code> is designed for quick scalar calculations across an entire bucket, <code>PIPE</code> is built for composable multi-stage pipelines where intermediate outputs need subsequent filtering, multi-metric grouping, ordering, and pagination in a single query pass.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
