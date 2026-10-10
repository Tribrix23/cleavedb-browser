import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function FilterSortStagesPage() {
  return (
    <TutorialPageShell
      sectionTitle="Filter & Sort Stages"
      previousHref="/tutorial/pipeline/chaining-stages"
      previousLabel="Chaining stages"
      nextHref="/tutorial/pipeline/group-aggregate"
      nextLabel="Group & aggregate stages"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        The most common pipeline operations involve filtering incoming records, sorting them by specific dimensions, and projecting the exact attributes required by frontend applications or microservices.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">1. Filtering with WHERE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The <code>THEN WHERE</code> stage discards any document that fails the specified criteria:
      </p>
      <TutorialCodeBlock label="Department filter stage">{`PIPE FROM emp THEN WHERE dept = "IT"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        You can use standard comparison operators (<code>=</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>) and join conditions using <code>AND</code> and <code>OR</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">2. Sorting with ARRANGED BY</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveQL uses the natural keywords <code>ARRANGED BY &lt;field&gt; GOING UP</code> (ascending) and <code>GOING DOWN</code> (descending) to sort records:
      </p>
      <TutorialCodeBlock label="Ascending sort stage">{`PIPE FROM emp
  THEN WHERE dept = "IT"
  THEN ARRANGED BY age GOING UP
  THEN SHOW name`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This selects IT employees, sorts them from youngest to oldest, and projects only their names.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">3. Windowing with LIMIT</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To construct leaderboards or paginated views, add <code>THEN LIMIT &lt;n&gt;</code> directly following a sort stage:
      </p>
      <TutorialCodeBlock label="Top 3 oldest users">{`PIPE FROM users
  THEN WHERE age > 20
  THEN ARRANGED BY age GOING DOWN
  THEN LIMIT 3
  THEN SHOW name, age`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        When a <code>LIMIT</code> follows a sort, CleaveDB uses a bounded min-heap in Rust to track only the top <code>k</code> candidates in <code>O(N log k)</code> time rather than allocating a full array sort.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">4. Field projection with SHOW</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The <code>THEN SHOW</code> stage filters output JSON objects down to only the explicitly listed keys:
      </p>
      <TutorialCodeBlock label="Project specific fields">{`PIPE FROM products THEN WHERE category = "Books" THEN SHOW title, price`}</TutorialCodeBlock>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Optimization best practice</h3>
        <p>
          Always position <code>THEN WHERE</code> as early as possible in your pipeline. By pruning records before sorting or grouping, you drastically reduce memory consumption and CPU cycles in downstream stages.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
