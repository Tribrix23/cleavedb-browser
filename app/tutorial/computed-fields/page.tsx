import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function ComputedFieldsOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Computed Fields (ENRICH) — Overview"
      previousHref="/tutorial/realtime/computed-feeds"
      previousLabel="Live computed feeds"
      nextHref="/tutorial/computed-fields/virtual-fields"
      nextLabel="Virtual fields"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In traditional database design, derived values (such as full names, sales tax, profit margins, or age classifications) create an architectural dilemma: either waste disk space storing redundant denormalized fields, or duplicate calculation logic across every web and mobile client application. CleaveDB solves this with <strong>Computed Virtual Fields (<code>ENRICH</code>)</strong>.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Zero-storage runtime evaluation</h3>
        <p>
          Enrichment rules are saved to the internal <code>_enrichments</code> registry. When documents are scanned by <code>FIND</code> or broadcast via <code>LISTEN</code>, the query engine evaluates the formula in an isolated sandbox, dynamically injecting the calculated fields without modifying raw disk pages.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">The Three Pillars of ENRICH</h3>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">1. Virtual Fields</h4>
          <p className="text-xs text-zinc-600">
            Synthesize new attributes on the fly that act as native fields for reads, filtering, and aggregation.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">2. Expressions &amp; Formulas</h4>
          <p className="text-xs text-zinc-600">
            Combine string concatenation (<code>CONCAT</code>), arithmetic calculations, and boolean comparisons.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">3. Enrichment with Masking</h4>
          <p className="text-xs text-zinc-600">
            Pair virtual fields with <code>MASK</code> to dynamically redact calculated values based on session roles.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Key Benefits</h3>
      <ul className="mb-8 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Single Source of Calculation:</strong> Define business logic (e.g. tax formula or discount rate) once in the database rather than across multiple client apps.
        </li>
        <li>
          <strong className="text-zinc-800">First-Class Queryability:</strong> Filter directly using computed fields in <code>WHERE</code> clauses (e.g. <code>WHERE is_adult = true</code>).
        </li>
        <li>
          <strong className="text-zinc-800">Streaming Integration:</strong> Out-of-the-box support for WebSocket broadcasts—live subscribers receive pre-calculated values instantly.
        </li>
      </ul>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore Computed Field Topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Step through the lessons below to master virtual field declarations in CleaveQL:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/computed-fields/virtual-fields">
            Virtual fields: declare dynamic fields using ENRICH and query them transparently.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/computed-fields/expressions">
            Expressions &amp; formulas: utilize CONCAT, arithmetic operations, and boolean logic.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/computed-fields/enrichment-masking">
            Enrichment with masking: combine virtual attributes with dynamic Data-Level Security (DLS).
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
