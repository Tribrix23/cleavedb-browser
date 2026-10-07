import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function FilteringResultsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Filtering Results"
      previousHref="/tutorial/retrieving-documents/finding-documents"
      previousLabel="Finding documents"
      nextHref="/tutorial/retrieving-documents/shaping-results"
      nextLabel="Sorting and choosing fields"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A bucket may hold far more documents than one screen or workflow needs. Filtering lets the query describe which records belong in the answer, so the application receives a relevant set rather than a shelf emptied onto the floor. CleaveQL provides <code>WHERE</code> for comparisons and <code>WHOSE</code> for a readable exact-field match.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Compare fields with WHERE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Put a field, comparison operator, and value after <code>WHERE</code>. The supported comparisons include equals (<code>=</code>), not equals (<code>!=</code>), greater or less than (<code>&gt;</code>, <code>&lt;</code>), and their inclusive forms (<code>&gt;=</code>, <code>&lt;=</code>). For instance, a shop can show electronics above a price threshold, while a people search can select users below an age threshold.
      </p>
      <TutorialCodeBlock label="Filter by one or more conditions">{`SCOOP products WHERE price > 50
SCOOP products WHERE price > 50 AND category = "Electronics"
SCOOP users WHERE age < 20 OR city = "Cebu"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Join conditions with <code>AND</code> when every condition should be true, or with <code>OR</code> when either condition is enough. This lets one query express a practical rule—for example, show products that are both expensive enough and in a chosen category, or users who are young or live in a particular city.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Use WHOSE for an exact match</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When the question is simply “which document has this exact field value?”, <code>WHOSE</code> provides an English-like form. It is especially easy to scan when the field and value are the heart of the search, such as locating a profile by name or all records for one department.
      </p>
      <TutorialCodeBlock label="Match an exact field value">{`SCOOP users WHOSE name IS "Jane"
SCOOP employees WHOSE department IS "Design"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        <code>WHOSE</code> and <code>WHERE</code> both narrow a document search, but they frame the request differently: use <code>WHOSE</code> for a direct equality-style question, and <code>WHERE</code> when the filter needs comparisons or several conditions. Once the matching records are selected, <code>LIMIT</code> and sorting can shape how many are returned and in what order.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Keep filters aligned with access rules</h3>
        <p>
          A filter describes which documents the query asks for; it does not grant permission to read them. CleaveDB still applies the caller’s bucket read rules, and documents blocked by those rules are not exposed in the result.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
