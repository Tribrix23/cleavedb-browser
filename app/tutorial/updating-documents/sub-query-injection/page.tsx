import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function SubQueryInjectionPage() {
  return (
    <TutorialPageShell
      sectionTitle="Sub-query Injection"
      previousHref="/tutorial/updating-documents/multiple-fields"
      previousLabel="Updating multiple fields"
      nextHref="/tutorial/deleting-recovering"
      nextLabel="Deleting & Recovering"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In real-world applications, the documents you want to update—or the values you want to assign to them—often depend on data located in another bucket. CleaveQL allows you to embed <code>SCOOP</code> queries directly inside a <code>CHANGE</code> statement, eliminating the need to write multi-step orchestration logic in your application layer.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Targeting documents via sub-query</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When you need to update documents based on properties stored elsewhere, embed a nested <code>SCOOP</code> inside your <code>WHERE</code> condition:
      </p>
      <TutorialCodeBlock label="Update orders for banned customers">{`CHANGE orders SET status = "flagged" WHERE customer_id IN (
  SCOOP users WHOSE status IS "banned" YIELD gid
)`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The inner query runs first, yielding the document IDs (<code>gid</code>) of all banned users. The outer <code>CHANGE</code> statement then matches orders whose <code>customer_id</code> is found in that list and updates their <code>status</code> to <code>&quot;flagged&quot;</code> in a single coordinated operation.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Computing field values from sub-queries</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can also use a nested <code>SCOOP</code> expression directly in the <code>SET</code> clause to populate a computed or aggregate value:
      </p>
      <TutorialCodeBlock label="Inject computed aggregate into a document">{`CHANGE accounts "acc_901" SET total_orders = (
  SCOOP orders WHERE account_id = "acc_901" YIELD THE TALLY
)`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Here, CleaveDB evaluates the count of matching orders directly in the engine and injects the result into the <code>total_orders</code> attribute of account <code>&quot;acc_901&quot;</code> without shipping intermediate counts back to your web service.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Best practices for injected sub-queries</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To maintain optimal performance when using sub-queries inside updates:
      </p>
      <ul className="mb-8 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Index the join fields:</strong> Ensure that foreign-key fields like <code>customer_id</code> or <code>account_id</code> have index definitions on their respective buckets.
        </li>
        <li>
          <strong className="text-zinc-800">Narrow the inner query:</strong> Always use selective filters on the inner <code>SCOOP</code> query to keep the set of candidate IDs as compact as possible.
        </li>
        <li>
          <strong className="text-zinc-800">Yield only required fields:</strong> Use <code>YIELD gid</code> or target single scalar aggregations to avoid transferring extraneous document payloads in memory.
        </li>
      </ul>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Tenant isolation is preserved</h3>
        <p>
          Both the outer <code>CHANGE</code> mutation and the inner <code>SCOOP</code> evaluation run within the caller&apos;s authenticated tenant boundary. A sub-query cannot inspect or mutate records across tenant partitions.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
