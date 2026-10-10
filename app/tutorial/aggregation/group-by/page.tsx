import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function GroupByPage() {
  return (
    <TutorialPageShell
      sectionTitle="Grouping with GROUP BY"
      previousHref="/tutorial/aggregation/where"
      previousLabel="Filtering with WHERE"
      nextHref="/tutorial/aggregation/named-results"
      nextLabel="Named results (AS)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When analyzing data partitioned across categories (such as departments, roles, regions, or statuses), <code>GROUP BY</code> segments documents by a designated attribute and computes aggregates independently for each partition.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Basic GROUP BY aggregation</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Specify the grouping field with <code>GROUP BY &lt;field&gt;</code> before your aggregation expressions:
      </p>
      <TutorialCodeBlock label="Group by department and sum age">{`DISTILL FROM staff GROUP BY dept TOTAL age AS total_age`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Unlike scalar aggregations that return a single JSON object, <code>GROUP BY</code> queries return an array of objects—one for each distinct grouping value:
      </p>
      <TutorialCodeBlock label="Result payload">{`[
  { "dept": "Eng", "total_age": 63.0 },
  { "dept": "Ops", "total_age": 56.0 }
]`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Grouping with counts and averages</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Count members per department or compute average metrics:
      </p>
      <TutorialCodeBlock label="Count headcount per group">{`DISTILL FROM staff GROUP BY dept COUNT AS n`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Or compute average values across groups:
      </p>
      <TutorialCodeBlock label="Average salary/age per department">{`DISTILL FROM staff GROUP BY dept AVERAGE age`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Multi-metric group aggregations</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Calculate multiple statistics simultaneously within each group:
      </p>
      <TutorialCodeBlock label="Simultaneous total and average per role">{`DISTILL FROM staff GROUP BY role TOTAL age AS total, AVERAGE age AS avg`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This yields entries containing the grouping key, the total sum, and the average per role in one scan.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Combining GROUP BY with WHERE filters</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Filter records before grouping to omit unwanted rows from group totals:
      </p>
      <TutorialCodeBlock label="Filter within groups">{`DISTILL FROM staff GROUP BY dept WHERE age > 25 COUNT AS n`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        You can also place the <code>WHERE</code> clause at the end of the query:
      </p>
      <TutorialCodeBlock label="WHERE placed at the end">{`DISTILL FROM staff GROUP BY dept TOTAL age AS t WHERE status = "active"`}</TutorialCodeBlock>

      <aside className="mt-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Engine execution plan</h3>
        <p>
          CleaveDB uses an in-memory hash partition table in Rust for <code>GROUP BY</code>. Documents stream into hash buckets, updating accumulation registers without requiring sorting passes or intermediate disk spooling.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
