import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function PipelineOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Pipeline (PIPE) — Overview"
      previousHref="/tutorial/aggregation/named-results"
      previousLabel="Named results (AS)"
      nextHref="/tutorial/pipeline/chaining-stages"
      nextLabel="Chaining stages"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In complex analytical workflows, data transformations are rarely solved in a single isolated step. Rather than running separate queries and stitching results together in your application layer, CleaveQL introduces the <strong><code>PIPE</code></strong> command for multi-stage stream processing directly within the engine.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Zero intermediate materialization</h3>
        <p>
          Unlike relational pipelines that dump intermediate query results into temporary tables or swap to disk, CleaveDB&apos;s <code>PIPE</code> processes records as an in-memory streaming DAG (Directed Acyclic Graph). Each <code>THEN</code> stage feeds filtered and transformed records into the next stage with zero allocation overhead.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Pipeline structure</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Every pipeline starts with <code>PIPE FROM &lt;bucket&gt;</code>, followed by one or more stages linked by the <code>THEN</code> keyword:
      </p>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-50">
              <th className="py-2.5 px-4 font-semibold">Stage</th>
              <th className="py-2.5 px-4 font-semibold">Canonical syntax</th>
              <th className="py-2.5 px-4 font-semibold">Pipeline role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Filter</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">THEN WHERE age &gt; 20</td>
              <td className="py-2.5 px-4">Filters stream by boolean conditions</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Sort</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">THEN ARRANGED BY age GOING DOWN</td>
              <td className="py-2.5 px-4">Sorts stream ascending (<code>UP</code>) or descending (<code>DOWN</code>)</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Limit</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">THEN LIMIT 3</td>
              <td className="py-2.5 px-4">Caps the maximum records emitted</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Project</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">THEN SHOW name, age</td>
              <td className="py-2.5 px-4">Selects and yields specific fields</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium text-zinc-800">Group &amp; Aggregate</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">THEN GROUP BY city TALLY AS n</td>
              <td className="py-2.5 px-4">Partitions stream and computes reductions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the Pipeline topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Learn how to compose flexible analytical pipelines using CleaveQL:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/pipeline/chaining-stages">
            Chaining stages: connect multiple processing stages using THEN and write-after-pipe chains.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/pipeline/filter-sort">
            Filter &amp; sort stages: combine WHERE filters, ARRANGED BY ordering, and LIMIT windows.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/pipeline/group-aggregate">
            Group &amp; aggregate stages: partition streams with GROUP BY and compute multi-metric reductions.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
