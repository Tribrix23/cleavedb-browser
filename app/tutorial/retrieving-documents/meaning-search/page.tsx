import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ScoopMeaningSearchPage() {
  return (
    <TutorialPageShell
      sectionTitle="Meaning Search"
      previousHref="/tutorial/retrieving-documents/nested-queries"
      previousLabel="Nested SCOOP queries"
      nextHref="/tutorial/retrieving-documents/historical-reads"
      nextLabel="Historical reads"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A structured filter is precise when the application knows the field and value it needs. Discovery often starts differently: a person knows the idea they want, but not the exact words stored in a document. SCOOP supports an explicit <code>MEANING</code> modifier for semantic search, so that request can sit alongside the bucket and any structured conditions.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Describe the idea in ordinary language</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB uses its ONNX Transformer vector-search engine to compare the query’s meaning with document embeddings. Use this when exact keyword matching would be too brittle—for instance, someone searching a recipe archive for a delicious slice of pizza may not know whether the stored title says “pizza,” “margherita,” or “tomato and mozzarella.” The semantic request can surface related descriptions even when their wording differs.
      </p>
      <TutorialCodeBlock label="Search articles by meaning">{`SCOOP articles MEANING "a delicious slice of pizza"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        When documents are written, CleaveDB generates embeddings from their text fields through a background worker. Because that work is asynchronous, a newly written document may become available to semantic search after its embedding has been produced; a regular structured read can see the document earlier.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Combine meaning with hard conditions</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Semantic similarity and exact requirements answer different parts of a search. If the result must satisfy a structured condition as well as relate to an idea, keep the hard rule in the query and state the meaning request explicitly. For tighter relevance, the reference describes a guided meaning search with a similarity threshold.
      </p>
      <TutorialCodeBlock label="Combine a filter and semantic threshold">{`SCOOP articles WHERE status = "published" MEANING "pizza"
SCOOP articles GUIDED BY MEANING "pizza" THRESHOLD 0.8`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        In the first form, only published articles qualify while semantic similarity helps select related content. The guided form makes a threshold part of the request; the example uses <code>0.8</code> as a relevance cutoff. Choose semantic search when the user’s idea is more stable than the exact phrase, and use ordinary field filters when the application needs a strict rule.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">A semantic result is ranked by meaning</h3>
        <p>
          Semantic search compares vectors and orders matches by their distance from the query. Use a structured condition for exact business rules, and use the semantic modifier to broaden discovery to documents with related meaning.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
