import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ChainingStagesPage() {
  return (
    <TutorialPageShell
      sectionTitle="Chaining Stages"
      previousHref="/tutorial/pipeline"
      previousLabel="Overview"
      nextHref="/tutorial/pipeline/filter-sort"
      nextLabel="Filter & sort stages"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In CleaveQL, the <strong><code>THEN</code></strong> keyword links transformation stages into a coherent stream. Each stage consumes records produced by the prior stage, applies its transformation, and forwards the results onward.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Anatomy of a complete pipeline</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can chain filtering, sorting, pagination, and projection together in a single readable command:
      </p>
      <TutorialCodeBlock label="Four-stage processing pipeline">{`PIPE FROM users
  THEN WHERE age > 20
  THEN ARRANGED BY age GOING DOWN
  THEN LIMIT 3
  THEN SHOW name, age`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Here is what happens during execution:
      </p>
      <ol className="mb-8 list-decimal space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li><code>PIPE FROM users</code>: Streams records from the <code>users</code> bucket into the pipeline.</li>
        <li><code>THEN WHERE age &gt; 20</code>: Discards documents where <code>age &lt;= 20</code>.</li>
        <li><code>THEN ARRANGED BY age GOING DOWN</code>: Orders surviving records in descending order of age.</li>
        <li><code>THEN LIMIT 3</code>: Halts the stream after the top 3 items are emitted.</li>
        <li><code>THEN SHOW name, age</code>: Strips all internal metadata and other document fields, returning only <code>name</code> and <code>age</code>.</li>
      </ol>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Immediate post-write pipelines</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB allows executing a <code>PIPE</code> query immediately following a write command (like <code>POUR</code>) on the exact same line. This lets you insert a document and immediately query the updated dataset in one atomic roundtrip:
      </p>
      <TutorialCodeBlock label="Insert and pipe on one line">{`POUR INTO emp "z1" {"name": "Zed", "age": 50, "dept": "IT"} PIPE FROM emp THEN WHERE age > 45 THEN SHOW name`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This pattern is common for command-query operations where a client needs to confirm the state of the bucket right after creating a record.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Compositional flexibility</h3>
        <p>
          You are not constrained to a fixed order of operations. Stages can be sequenced according to your domain requirements—filter first to reduce row count early, or project late to preserve fields required for intermediate group calculations.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
