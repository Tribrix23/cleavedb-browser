import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function NestedScoopQueriesPage() {
  return (
    <TutorialPageShell
      sectionTitle="Nested SCOOP Queries"
      previousHref="/tutorial/retrieving-documents/summaries-and-totals"
      previousLabel="Summaries and totals"
      nextHref="/tutorial/retrieving-documents/meaning-search"
      nextLabel="Meaning search"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Sometimes the condition for one bucket depends on what another bucket says. Rather than fetch both collections and join them in application code, SCOOP can evaluate a second SCOOP inside a condition. The inner query supplies the values the outer query should use, keeping the relationship between the two steps close to the data request.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Use a subquery to define the match set</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Consider orders that store a customer ID, while customer status lives in the <code>users</code> bucket. First select the IDs of active users, then use that result to decide which orders qualify. The nested statement sits inside <code>IN (...)</code>, where its projected <code>gid</code> values become the candidate IDs for the outer query.
      </p>
      <TutorialCodeBlock label="Select orders belonging to active users">{`SCOOP orders WHERE customer_id IN (
  SCOOP users WHOSE status IS "active" YIELD gid
)`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Read it from the inside out. The inner query selects users whose status is active and yields only their document IDs. The outer query keeps orders whose <code>customer_id</code> appears in that ID set. The application can ask one coherent question—orders for active users—without manually passing the intermediate IDs between separate reads.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Keep nested queries readable</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Nested queries are easiest to maintain when each level has one clear role: the inner SCOOP identifies a set of values, and the outer SCOOP retrieves the documents that refer to those values. Project only the field needed by the outer condition. If the logic becomes hard to explain in one sentence, split it into named application steps or reconsider whether a direct relationship model would express it more clearly.
      </p>
      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">The benefit is clarity at the request boundary</h3>
        <p>
          The nested form keeps the selection rule beside the query that consumes it. It can reduce application-side plumbing, but a readable query still matters: choose selective conditions and yield only the values the outer request needs.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
