import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function SchemaMigrationOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Schema Migration — Overview"
      previousHref="/tutorial/time-travel/undo"
      previousLabel="UNDO — global rollback"
      nextHref="/tutorial/schema-migration/migrate"
      nextLabel="MIGRATE — reshape documents"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In evolving production applications, data models inevitably change. Traditional databases force teams to run disruptive migration scripts with table locks or write complex application-level translation layers. CleaveDB solves this with <strong>declarative, zero-downtime schema operations</strong> built directly into CleaveQL.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Zero-downtime background execution</h3>
        <p>
          Schema evolutions in CleaveDB execute asynchronously without blocking concurrent client reads or writes. Unmatched documents remain untouched, each modified document has its <code>_version</code> counter automatically bumped, and graph bonds are preserved.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">The Schema Evolution Toolkit</h3>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">1. MIGRATE (Reshape)</h4>
          <p className="text-xs text-zinc-600">
            Declaratively transform documents across an entire bucket using pattern matching and capture variables (<code>$1</code>, <code>$2</code>).
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">2. HEAL (Repair)</h4>
          <p className="text-xs text-zinc-600">
            Clean up ghost bonds, remove orphaned references after bulk deletes, and rebuild secondary search indexes.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">3. SUGGEST BONDS</h4>
          <p className="text-xs text-zinc-600">
            Intelligently inspect document attributes and semantic vector embeddings to propose missing graph relationships.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">When to Use Each Feature</h3>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Task</th>
              <th className="px-4 py-3">Command</th>
              <th className="px-4 py-3">Benefit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Renaming or restructuring fields</td>
              <td className="px-4 py-3 font-mono text-blue-600">MIGRATE bucket FROM &lcub;...&rcub; TO &lcub;...&rcub;</td>
              <td className="px-4 py-3">Instant bulk transformation with zero downtime</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Purging dangling graph edges</td>
              <td className="px-4 py-3 font-mono text-blue-600">HEAL BONDS</td>
              <td className="px-4 py-3">Restores graph integrity without manual audits</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Discovering implicit relationships</td>
              <td className="px-4 py-3 font-mono text-blue-600">SUGGEST BONDS</td>
              <td className="px-4 py-3">Surfaces foreign keys and AI semantic links</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the Schema Topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Dive into the hands-on tutorials below:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/schema-migration/migrate">
            MIGRATE — reshape documents: rename fields, duplicate attributes, and upgrade document schemas with pattern matching.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/schema-migration/heal">
            HEAL — repair integrity: prune orphaned edges, fix ghost pointers, and rebuild indexes.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/schema-migration/suggest-bonds">
            SUGGEST BONDS: discover unlinked graph relationships using foreign key heuristics and vector similarity.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
