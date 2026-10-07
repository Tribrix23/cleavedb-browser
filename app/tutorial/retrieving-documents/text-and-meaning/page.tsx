import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function TextAndMeaningSearchPage() {
  return (
    <TutorialPageShell
      sectionTitle="Text and Meaning Search"
      previousHref="/tutorial/retrieving-documents/summaries-and-totals"
      previousLabel="Summaries and totals"
      nextHref="/tutorial/retrieving-documents/related-documents"
      nextLabel="Related documents"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A search box often begins with a phrase, not a field name. Someone browsing a catalog may remember “wireless headphones” without knowing which document field stores that description. CleaveQL offers two ways to search beyond an exact field comparison: <code>MENTIONING</code> looks for words in text, while <code>MEANING</code> looks for related ideas.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Find text that mentions a phrase</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>MENTIONING</code> when you have a word or phrase that may appear in the document text. The reference describes it as full-text keyword substring search. It suits a help center, catalog, or notes collection when a person remembers a term and wants documents that mention it, even if they do not know the exact field to filter.
      </p>
      <TutorialCodeBlock label="Search document text">{`SCOOP products MENTIONING "wireless headphones"
SCOOP articles MENTIONING "account recovery" LIMIT 10`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The phrase is the search clue. Use a structured filter such as <code>WHERE category = &quot;Audio&quot;</code> when the requirement is a known field value; use <code>MENTIONING</code> when the words themselves are the useful clue.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Search for an idea with MEANING</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        A semantic search is useful when the person’s wording may differ from the wording stored in the documents. <code>MEANING</code> compares the idea in the query with document meaning using CleaveDB’s ONNX Transformer-based vector search. It is a natural fit for discovery: describe what you want, then let the search surface documents that are related in meaning rather than requiring an exact shared keyword.
      </p>
      <TutorialCodeBlock label="Search by semantic similarity">{`SCOOP products MEANING "something warm for cold weather" LIMIT 3`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This query asks for products related to the idea of warmth in cold weather, even if those exact words are not present in every product description. <code>LIMIT</code> keeps the result focused on a small set to inspect or display.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Pick the search that matches the clue</h3>
      <p className="leading-relaxed text-zinc-600">
        Choose <code>MENTIONING</code> when a phrase or keyword is the clue and you want text that contains it. Choose <code>MEANING</code> when the user can describe the idea but may not know the stored wording. Both retrieve documents from a bucket, and both can be followed by result-shaping modifiers such as <code>LIMIT</code> so the answer fits the application view.
      </p>
    </TutorialPageShell>
  );
}
