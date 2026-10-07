import Link from "next/link";

import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function RetrievingDocumentsOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Retrieving Documents (SCOOP) — Overview"
      previousHref="/tutorial/storing-documents"
      previousLabel="POUR overview"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Once a document has been written, the next question is what you need from it. CleaveDB answers with <code>SCOOP</code>, its command for retrieving documents and shaping results. The CleaveQL reference names <code>FIND</code> as the primary read verb and <code>SCOOP</code> as its alias, so both spellings perform the same read operation. This tutorial uses <code>SCOOP</code> in its examples so you can see the command named in this section in action.
      </p>

      <p className="mb-8 leading-relaxed text-zinc-600">
        Think of a bucket as a shelf of documents. Sometimes you want the whole shelf; sometimes you want one familiar ID, a handful that meet a condition, the highest values, or only a few fields for a screen. SCOOP lets a query start broad and become more precise as you add the question’s details.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Start with the documents you need</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        A query begins by identifying a bucket. <code>SCOOP users</code> asks for documents in <code>users</code>. Add an ID when you know exactly which document you want, as in <code>SCOOP users &quot;jane&quot;</code>. When you are looking for a group, narrow it with <code>WHERE</code> conditions—for example, select users whose age is greater than 20, or combine an age condition with a city using <code>AND</code> or <code>OR</code>. For a direct exact-field question, <code>WHOSE name IS &quot;Jane&quot;</code> reads naturally as “find the document whose name is Jane.”
      </p>

      <p className="mb-8 leading-relaxed text-zinc-600">
        A useful retrieval usually needs more than a match. Sort the results with <code>ARRANGED BY</code> (or its documented sorting aliases), cap the number with <code>LIMIT</code>, and use <code>YIELD</code> or <code>SHOW</code> when the caller needs only selected fields. For instance, a product listing can find books, arrange them by price from highest to lowest, return the first five, and show just the title and price. The query then returns a deliberate view of the data instead of making the application sift through an unnecessarily large result.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Ask for an answer, not just a list</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        SCOOP can summarize a bucket when a screen or workflow needs a quick answer. <code>THE TALLY</code> counts matching documents; <code>ONLY UNIQUE</code> returns distinct values for a field, such as the departments represented among employees. <code>THE HIGHEST</code> and <code>THE LOWEST</code> bring back the top or bottom records by a chosen field, while <code>THE FIRST</code> and <code>THE LAST</code> request a number of documents from either end. When a total is more useful than individual records, <code>THE TOTAL</code> can sum a field and <code>GROUPED BY</code> can organize that sum—for example, revenue by region.
      </p>

      <p className="mb-8 leading-relaxed text-zinc-600">
        These forms turn common follow-up work into part of the query: counting users, finding the most expensive items, listing distinct categories, or totaling sales by region. You can still combine supported filters and result-shaping modifiers with a query, so the answer can be scoped to the same conditions as the records you would otherwise retrieve.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Search by words, meaning, and connection</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Not every useful search begins with a known field value. <code>MENTIONING</code> looks for text containing a keyword or phrase, which helps when you know a word appears in a document but do not want to build a field-by-field filter. <code>MEANING</code> searches by semantic similarity: describe the idea you want in ordinary language, and CleaveDB uses its ONNX Transformer-based vector search to find documents with related meaning. This is useful when a person searching a catalog or knowledge base knows what they mean, but not the exact wording stored in the documents.
      </p>

      <p className="mb-4 leading-relaxed text-zinc-600">
        Documents can also be retrieved through the relationships between them. A related-document query follows a named bond from a source document; a multi-hop query follows a chain, such as asking which people Jane’s manager knows. <code>CANDIDATE</code> includes dormant conditional bonds when you need to inspect possible relationships, and <code>AS OF</code> lets a query look at relationships as they existed at a past time. The returned related documents are de-duplicated by target document.
      </p>

      <p className="mb-8 leading-relaxed text-zinc-600">
        There are two practical boundaries to remember: a multi-hop relationship chain is followed from the relationship nearest the bucket first, and documents moved to <code>_rubbish</code> by <code>DRAIN</code> are not returned by SCOOP. These details help explain why a graph query may return a different set than simply searching every document in a bucket.
      </p>

      <aside className="mb-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">SQL perspective</h3>
        <p>
          If you know SQL, CleaveQL’s <code>FIND</code> command (also written <code>SCOOP</code>) fills a role similar to <code>SELECT</code>: it reads data, while <code>WHERE</code> filters it. CleaveQL uses <code>ARRANGED BY</code> for sorting, <code>LIMIT</code> to cap results, and <code>YIELD</code> or <code>SHOW</code> to choose fields. The comparison is a starting point, not a one-to-one translation: SQL selects rows from tables, while CleaveQL retrieves flexible JSON documents from buckets and can follow document relationships directly. CleaveDB’s graph lookups, semantic search, and historical queries are part of that document-oriented workflow.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Results follow CleaveDB’s data boundaries</h3>
      <p className="mb-8 leading-relaxed text-zinc-600">
        A SCOOP query only returns documents the authenticated user is allowed to read. CleaveDB applies the bucket’s read rules, so a document hidden by a security policy will not appear in the result. Field masks can also remove protected fields from the JSON returned to the application. Documents are namespaced by tenant as well, keeping one tenant’s data within its own boundary even when another tenant uses the same bucket name. Retrieval therefore respects the same security and tenancy rules as the rest of the database.
      </p>

      <aside className="mb-8 rounded-lg border border-zinc-200 bg-zinc-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">A note on planned query forms</h3>
        <p>
          The README also lists <code>MATCHING</code> for JSON template matching and <code>WITH</code>/<code>INCLUDE</code> for eagerly retrieving related documents, but marks them as upcoming. They are not presented here as ready-to-run examples; check the current CleaveQL reference for their availability in the version you use.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Where SCOOP fits in the workflow</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        <Link className="text-blue-700 hover:underline" href="/tutorial/storing-documents">POUR</Link> gives a document its home; <code>SCOOP</code> brings it back when the application needs it. From there, the result can be displayed, summarized, searched semantically, or used as the starting point for a relationship lookup. If the application later needs to edit selected fields, CleaveQL’s <code>CHANGE</code> command handles that next step. In practice, the query grows from the question: choose the bucket or source document, express what qualifies, then decide how much of the answer the caller needs.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the SCOOP topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Each lesson gives a different kind of question its own space, with CleaveQL examples and guidance on when that form is useful:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/finding-documents">Finding documents: browse a bucket or fetch a document by its ID.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/filtering-results">Filtering results: narrow a search with field conditions and exact matches.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/shaping-results">Sorting and choosing fields: order results, cap their number, and return only useful fields.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/summaries-and-totals">Summaries and totals: count, compare, find unique values, and add grouped totals.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/text-and-meaning">Text and meaning search: look for words or search by semantic similarity.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/related-documents">Related documents: follow a direct bond or a multi-step relationship chain.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/retrieving-documents/historical-queries">History and candidate bonds: inspect past results and dormant conditional relationships.</Link></li>
      </ul>
    </TutorialPageShell>
  );
}
