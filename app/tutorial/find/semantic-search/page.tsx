import Link from "next/link";

import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function FindSemanticSearchPage() {
  return (
    <TutorialPageShell
      sectionTitle="Semantic Search"
      previousHref="/tutorial/find/graph-patterns"
      previousLabel="Graph patterns"
      nextHref="/tutorial/find/historical-reads"
      nextLabel="Historical graph reads"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Keyword search expects the user’s words to resemble the words stored in a document. Semantic search starts with an idea instead. A person looking for “a rainy day” may be interested in documents about storms, wet weather, or a quiet afternoon indoors—even if those exact words never appear together. FIND’s quoted-phrase <code>IN</code> form asks CleaveDB to retrieve documents by similarity of meaning.
      </p>

      <TutorialCodeBlock label="Search articles by meaning">{`FIND "a rainy day" IN articles`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">How the similarity search works</h3>
      <p className="mb-6 leading-relaxed text-zinc-600">
        CleaveDB creates dense vector embeddings from document text fields using its bundled ONNX model. A background worker processes those embeddings after a document is written. For a semantic query, the model turns the search phrase into a vector, CleaveDB compares it with the stored vectors using cosine similarity, and the closest results are ranked by semantic distance. The result can surface related content even when it does not share the query’s exact keywords.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Account for indexing time and thresholds</h3>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Embedding generation happens in the background, so semantic search is eventually consistent: a newly written document may be available to a structured read before its vector is ready. The short FIND form ranks available matches but does not accept an inline similarity threshold. When the request needs hard field conditions or an explicit threshold alongside meaning, use the guided semantic form documented under <Link className="text-blue-700 hover:underline" href="/tutorial/retrieving-documents/meaning-search">SCOOP meaning search</Link>.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">When this form is a good fit</h3>
        <p>
          Use semantic search for discovery, recommendations, and natural-language search when the idea matters more than the exact phrasing. Use a structured field condition when the application requires a strict rule such as a particular status, category, or numeric range.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
