import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function SummariesAndTotalsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Summaries and Totals"
      previousHref="/tutorial/retrieving-documents/shaping-results"
      previousLabel="Sorting and choosing fields"
      nextHref="/tutorial/retrieving-documents/nested-queries"
      nextLabel="Nested SCOOP queries"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Some requests do not need a document-by-document list. A dashboard may need the number of active users; a manager may want the five highest salaries; an analyst may need the values represented across departments. SCOOP includes summary modes for these common questions, so the query can return a compact answer instead of sending the whole bucket to application code.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Count, distinguish, and compare</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        <code>THE TALLY</code> returns a document count. <code>ONLY UNIQUE</code> asks for distinct values of a field, such as the departments present in a bucket. <code>THE HIGHEST</code> and <code>THE LOWEST</code> return a requested number of documents ranked by a field, useful for finding top salaries, highest prices, or the least costly options. Conditions such as <code>WHERE</code> can scope the records counted or compared.
      </p>
      <TutorialCodeBlock label="Count, find distinct values, and rank records">{`SCOOP THE TALLY OF users
SCOOP ONLY UNIQUE department FROM employees
SCOOP THE HIGHEST 5 salary FROM employees
SCOOP THE LOWEST 3 price FROM products`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        These forms are useful for dashboards and decision points: a count can answer “how many?”, unique values can populate a category list, and ranked results can bring the extremes into view. The result is still a SCOOP response, but its shape reflects the question—count, distinct values, or ranked documents.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Take a slice from either end</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        <code>THE FIRST</code> and <code>THE LAST</code> request a specified number of documents. They can help retrieve a short sample or a segment of a result. If “first” means newest, oldest, or otherwise meaningful to the application, pair the request with an explicit ordering rule so the intended sequence is clear.
      </p>
      <TutorialCodeBlock label="Retrieve a short segment">{`SCOOP THE FIRST 10 FROM logs
SCOOP THE LAST 2 FROM users`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        A size on its own says how many records you want; ordering gives that size meaning. A timeline, for example, should define its time order before interpreting a “first” or “last” slice as older or newer activity.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Add a field and group the result</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        <code>THE TOTAL</code> sums a numeric field, and <code>GROUPED BY</code> organizes that sum by another field. This is a concise way to compare totals across regions, departments, or other categories without first retrieving every matching sale into application code. For a dedicated analytics workflow, CleaveDB also documents <code>DISTILL</code>; grouped SCOOP totals are handy when the aggregate belongs beside ordinary document retrieval.
      </p>
      <TutorialCodeBlock label="Total sales by region">{`SCOOP THE TOTAL revenue FROM sales GROUPED BY region`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Here, <code>revenue</code> is the value being added and <code>region</code> is the category that divides the total. If you are used to SQL, this resembles a grouped aggregate, though it uses CleaveQL’s document and bucket vocabulary. Apply conditions when the total should represent only a particular subset of the data.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Choose the question first</h3>
        <p>
          Use <code>TALLY</code> for a count, <code>UNIQUE</code> for the set of distinct field values, <code>HIGHEST</code> or <code>LOWEST</code> for ranked documents, and <code>TOTAL</code> with <code>GROUPED BY</code> when you need sums by category. Each form returns a different kind of answer, so choose the one that matches what the caller actually needs to display or decide.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
