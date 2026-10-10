import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function AggregationOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Aggregation (DISTILL) — Overview"
      previousHref="/tutorial/pattern-matching/bond-history"
      previousLabel="Bond history (FIND HOW)"
      nextHref="/tutorial/aggregation/basic-aggregates"
      nextLabel="Sum, avg, min, max"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When querying collections at scale, returning individual documents over the network just to compute totals or statistics is slow and inefficient. CleaveQL introduces the <strong><code>DISTILL</code></strong> command to execute high-performance aggregation pipelines directly on the storage engine without materializing or transferring individual records.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">In-engine numeric reduction</h3>
        <p>
          <code>DISTILL</code> streams document fields through Rust and SIMD reduction kernels in memory. It reduces millions of records into compact scalar values or group buckets, delivering sub-millisecond analytical summaries.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Key capabilities of DISTILL</h3>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Mathematical Reductions:</strong> Compute <code>TOTAL</code>, <code>SUM</code>, <code>AVERAGE</code> (or <code>AVG</code>), <code>MIN</code>, <code>MAX</code>, and <code>SPREAD</code> (range between max and min) on numeric attributes.
        </li>
        <li>
          <strong className="text-zinc-800">Document Counting:</strong> Use <code>COUNT</code> or <code>TALLY</code> to count all documents in a bucket, or count only documents containing a specific field.
        </li>
        <li>
          <strong className="text-zinc-800">Simultaneous Multi-Metrics:</strong> Compute multiple comma-separated aggregations in a single query pass.
        </li>
        <li>
          <strong className="text-zinc-800">Selective Filtering:</strong> Filter input documents with <code>WHERE</code> clauses before reduction.
        </li>
        <li>
          <strong className="text-zinc-800">Categorical Grouping:</strong> Group records by a categorical field with <code>GROUP BY</code> and compute metrics per group.
        </li>
        <li>
          <strong className="text-zinc-800">Custom Aliases:</strong> Re-label result keys cleanly using <code>AS alias</code> for direct API consumption.
        </li>
      </ul>

      <aside className="mb-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Privacy & Security Masking</h3>
        <p>
          When document fields are redacted with <code>MASK ... IF</code> security policies, <code>FIND</code> hides the values from untrusted roles. However, <code>DISTILL</code> computes aggregate statistics across the raw storage layer without exposing individual sensitive documents.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the Aggregation topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Step through the lessons below to learn all canonical <code>DISTILL</code> aggregation forms:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/aggregation/basic-aggregates">
            Sum, avg, min, max: calculate mathematical reductions, averages, and spreads.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/aggregation/count-tally">
            Count &amp; tally: count total documents or non-null field presence with COUNT and TALLY.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/aggregation/where">
            Filtering with WHERE: constrain aggregations using comparison filters and boolean conditions.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/aggregation/group-by">
            Grouping with GROUP BY: partition bucket records into grouped buckets and calculate metrics per category.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/aggregation/named-results">
            Named results (AS): rename aggregate keys and combine multiple metrics in a single pass.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
