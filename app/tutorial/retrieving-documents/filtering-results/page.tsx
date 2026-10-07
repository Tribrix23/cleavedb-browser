import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function FilteringResultsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Filtering Results"
      previousHref="/tutorial/retrieving-documents/structured-retrieval"
      previousLabel="Structured retrieval"
      nextHref="/tutorial/retrieving-documents/shaping-results"
      nextLabel="Sorting and choosing fields"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A structured query becomes useful when its conditions match the way the application thinks about its data. CleaveQL gives SCOOP three ways to express those conditions: <code>WHERE</code> compares field values, <code>WHOSE</code> states an exact field match in plain language, and <code>MATCHING</code> describes a JSON shape to match. Choose the form that makes the rule easiest to read and maintain.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Compare values with WHERE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Place a field, comparison, and value after <code>WHERE</code>. SCOOP supports equality and inequality (<code>=</code>, <code>!=</code>) plus the numeric comparisons <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, and <code>&lt;=</code>. Combine conditions with <code>AND</code> when all must hold, or <code>OR</code> when either condition qualifies. This is the everyday way to narrow a large bucket to a useful set.
      </p>
      <TutorialCodeBlock label="Combine structured conditions">{`SCOOP users WHERE age > 21
SCOOP users WHERE age > 21 AND city = "Manila"
SCOOP users WHERE age < 20 OR city = "Cebu"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The first query asks for adults over the chosen age threshold. The second adds a city requirement, so both conditions must match. The third widens the result: a user qualifies by being under 20 or by living in Cebu. These small operators let one query express a clear rule instead of retrieving every document and repeating the same checks in application code.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">State an exact match with WHOSE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        For a direct equality-style question, <code>WHOSE</code> reads naturally: “SCOOP users whose name is Jane.” It works well when the field and its exact value are the whole condition, such as a known status, department, or profile name.
      </p>
      <TutorialCodeBlock label="Match an exact field">{`SCOOP users WHOSE name IS "Jane"
SCOOP employees WHOSE department IS "Design"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Use <code>WHOSE</code> to make a simple exact match easy to scan. Reach for <code>WHERE</code> when the comparison is numeric, uses a different operator, or needs multiple conditions. Both forms help SCOOP target documents before it shapes the returned set.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Match a JSON template</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        <code>MATCHING</code> lets a query describe a JSON template. Use it when the shape and values of a small object communicate the desired document more clearly than separate field clauses—for example, a city value or a combination of known attributes.
      </p>
      <TutorialCodeBlock label="Match a JSON shape">{`SCOOP users MATCHING {"city": "Manila"}
SCOOP products MATCHING {"category": "Books", "available": true}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Keep the template focused on the fields that define the match. Use <code>WHERE</code> for comparisons and boolean logic; use <code>MATCHING</code> when a compact JSON pattern is the clearest description of the record you want.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Filters do not change access</h3>
        <p>
          These clauses describe which documents the query asks for. CleaveDB still applies the authenticated tenant boundary and the bucket’s read rules before returning documents or fields to the caller.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
