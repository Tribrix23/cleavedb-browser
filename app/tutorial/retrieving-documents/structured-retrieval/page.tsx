import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function StructuredRetrievalPage() {
  return (
    <TutorialPageShell
      sectionTitle="Structured Retrieval"
      previousHref="/tutorial/retrieving-documents"
      previousLabel="SCOOP overview"
      nextHref="/tutorial/retrieving-documents/filtering-results"
      nextLabel="Filtering results"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        SCOOP retrieves documents from a bucket by following the shape of the question: name the data set, optionally state which records qualify, then request the result you want. It is declarative, like a well-written instruction to a librarian: describe the shelf and the records you need, and CleaveDB plans how to return them.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Read a bucket</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        A bucket is the collection named in the query. <code>SCOOP EVERYTHING FROM</code> makes a full-bucket read explicit, while <code>SCOOP</code> followed by the bucket is the concise form. Begin broadly when you truly need the collection; add conditions, a limit, or a field projection when the caller needs a smaller answer.
      </p>
      <TutorialCodeBlock label="Read a bucket">{`SCOOP EVERYTHING FROM users
SCOOP users`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Both statements request the users collection. The explicit form is helpful in examples and longer query expressions because it spells out what is being retrieved. The concise form is easy to read in day-to-day queries. Either can be extended with the filters and result-shaping options in the lessons that follow.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Address one known document</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When the application already knows a document ID, supply it with the bucket. For example, a profile route may already have Jane’s ID, so it can ask for <code>users</code> and <code>&quot;jane&quot;</code> directly. The bucket and ID together form the document address; an ID by itself is interpreted within its bucket.
      </p>
      <TutorialCodeBlock label="Read documents by ID">{`SCOOP users "jane"
SCOOP products "wireless-mouse"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Use a direct ID lookup for a profile, order detail, or any application route that already carries the key. If all you know is a field value, use <code>WHERE</code> or <code>WHOSE</code> instead; if you need several documents, query the bucket and let conditions narrow the result.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">What happens behind the query</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveQL turns the statement into a structured request. When a query uses an indexed field in <code>WHERE</code> or <code>WHOSE</code>, the planner can use that index to narrow the search. Without an applicable index, it evaluates the bucket’s documents. The requested filters are applied before ordering and projection, so the final response can be focused on the records and fields the application asked for.
      </p>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This is why the query should say what the application needs: a selective condition can avoid unnecessary document reads, while <code>YIELD</code> can keep the returned payload small. SCOOP describes the answer, and CleaveDB chooses the available path for producing it.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">A read stays within the caller’s tenant</h3>
        <p>
          The authenticated tenant scopes the bucket lookup. Bucket names can be reused across tenants while CleaveDB keeps their documents isolated according to tenant rules; read policies further determine which documents the caller can see.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
