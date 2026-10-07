import Link from "next/link";

import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function FindingDocumentsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Finding Documents"
      previousHref="/tutorial/retrieving-documents"
      previousLabel="SCOOP overview"
      nextHref="/tutorial/retrieving-documents/filtering-results"
      nextLabel="Filtering results"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A retrieval starts by telling CleaveDB where to look. In CleaveQL, the bucket names the collection and <code>SCOOP</code> asks for its documents. The reference calls <code>FIND</code> the primary read verb and documents <code>SCOOP</code> as its alias; both spellings run the same read operation. The examples here show both once, then use <code>SCOOP</code> so the command named in this section stays visible as you learn.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Browse a bucket</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When you need the bucket’s documents, the short form is enough. CleaveQL also offers explicit forms using <code>FROM</code> and <code>EVERYTHING</code>. These make the intent especially clear in a longer query or when someone is learning the language. Each form points to the same bucket; later modifiers can narrow or shape the result.
      </p>
      <TutorialCodeBlock label="FIND and SCOOP are equivalent">{`FIND products
SCOOP products
SCOOP FROM products
SCOOP EVERYTHING FROM products`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        A broad browse is useful for a small collection, an administrative view, or as the starting point for a more specific query. In an application screen, consider adding a filter, a limit, or a field selection so the result matches what that screen actually needs. Those refinements are covered in the following lessons.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Go straight to a known document</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        If the application already knows a document’s ID, include it after the bucket name. For example, <code>SCOOP users &quot;jane&quot;</code> asks for Jane’s document in the <code>users</code> bucket. The bucket and ID together identify the document address—<code>users:jane</code>—so the same ID can identify a different document in another bucket.
      </p>
      <TutorialCodeBlock label="Retrieve a document by ID">{`SCOOP users "jane"
SCOOP products "wireless-mouse"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This form is a good fit for profile pages, order-detail screens, or any route where the application has already captured the identifier. If the ID is not known ahead of time, search the bucket by its fields instead; see <code>WHERE</code> and <code>WHOSE</code> in <Link className="text-blue-700 hover:underline" href="/tutorial/retrieving-documents/filtering-results">Filtering results</Link>.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">The read is scoped to the current tenant</h3>
        <p>
          CleaveDB namespaces documents by authenticated tenant. A query for <code>users</code> runs within the caller’s tenant boundary, so matching bucket names do not make one tenant’s documents visible to another. Read policies can further restrict which documents are returned.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
