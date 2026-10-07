import Link from "next/link";

import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function RetrievingDocumentsOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Retrieving Documents (SCOOP) — Overview"
      previousHref="/tutorial/storing-documents"
      previousLabel="POUR overview"
      nextHref="/tutorial/retrieving-documents/structured-retrieval"
      nextLabel="Structured retrieval"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        <code>SCOOP</code> is CleaveQL’s structured read command: it retrieves documents from a bucket, applies conditions to their fields, and shapes the result for the application. Think of it as asking a well-organized archive a precise question. You choose the collection, describe what qualifies, then decide whether you need complete documents, a few selected fields, or a compact summary.
      </p>

      <p className="mb-6 leading-relaxed text-zinc-600">
        The closest SQL comparison is <code>SELECT</code>. A SQL query selects rows from a table; a SCOOP query selects JSON documents from a bucket. The familiar ideas remain—filters, ordering, projections, limits, and summaries—but CleaveQL speaks in buckets and flexible documents. Documents in a bucket need not all have identical fields, so the query can focus on the fields that matter to the question at hand.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Build a query from the question</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Begin with the bucket, such as <code>users</code> or <code>products</code>. Use <code>WHERE</code> for comparisons and combined conditions, <code>WHOSE</code> for a direct exact-field match, or <code>MATCHING</code> when the desired document should match a JSON shape. A request can be as broad as <code>SCOOP EVERYTHING FROM users</code>, or as focused as <code>SCOOP users WHERE age &gt; 21</code>. The command stays declarative: it describes the records you want rather than a step-by-step procedure for finding them.
      </p>

      <p className="mb-8 leading-relaxed text-zinc-600">
        Once the matching documents are clear, decide what the caller needs back. <code>YIELD</code> selects fields, <code>ARRANGED BY</code> sorts the result, and <code>LIMIT</code> caps its size. These modifiers can be combined: a catalog can return the names and email addresses of users in a chosen order, or show only the first page of products that match a filter. The goal is a result shaped for its destination, not extra data the screen will immediately discard.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Use summaries when a list is not the answer</h3>
      <p className="mb-8 leading-relaxed text-zinc-600">
        SCOOP can answer common analytical questions directly. <code>THE TALLY</code> counts documents; <code>ONLY UNIQUE</code> finds distinct field values; <code>THE HIGHEST</code> and <code>THE LOWEST</code> rank documents by a field; <code>THE FIRST</code> and <code>THE LAST</code> return a chosen number from the result; and <code>THE TOTAL</code> with <code>GROUPED BY</code> can sum values by category. A dashboard that needs an employee count or revenue by region can request that answer without asking the application to collect every source document first.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Keep structured search expressive</h3>
      <p className="mb-8 leading-relaxed text-zinc-600">
        A SCOOP query can also match a structured JSON template with <code>MATCHING</code>, nest another SCOOP inside a condition, or use the explicit <code>MEANING</code> modifier when semantic similarity needs to work alongside structured filters. <code>AS OF</code> asks for a historical view. Together, these options let an application build a query around its actual task while keeping the main shape readable: choose a bucket, state the criteria, and request the result in the form that will be useful.
      </p>

      <aside className="mb-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">How CleaveDB works through a SCOOP request</h3>
        <p>
          The query is parsed into a structured request. CleaveDB can use an available index for fields referenced by <code>WHERE</code> or <code>WHOSE</code>; if there is no applicable index, it evaluates the bucket’s documents. It then applies the requested filtering, ordering, and field projection. Selecting only the fields the caller needs keeps the returned payload focused, while indexes can make common filters more efficient.
        </p>
      </aside>

      <p className="mb-8 leading-relaxed text-zinc-600">
        Retrieval follows the same tenant and access boundaries as the rest of CleaveDB. The authenticated tenant scopes the bucket, read rules determine which documents are visible, and field masks can remove protected values from the returned JSON. A query describes what the application wants; CleaveDB still decides what that caller is permitted to receive.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the SCOOP topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Each lesson focuses on one part of structured retrieval, with separate CleaveQL examples and guidance on when to use it:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/structured-retrieval">Structured retrieval: choose a bucket and fetch a document or collection.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/filtering-results">Filtering results: compare fields, combine conditions, and match JSON shapes.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/shaping-results">Sorting and choosing fields: order, limit, and project the returned documents.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/summaries-and-totals">Summaries and totals: count, rank, find unique values, and aggregate by category.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/nested-queries">Nested SCOOP queries: use one structured query inside another.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/meaning-search">Meaning search: add semantic matching to a structured query.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/historical-reads">Historical reads: query data as of an earlier point in time.</Link></li>
      </ul>
    </TutorialPageShell>
  );
}
