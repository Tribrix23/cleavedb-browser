import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function HistoricalScoopReadsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Historical Reads"
      previousHref="/tutorial/retrieving-documents/meaning-search"
      previousLabel="Meaning search"
      nextHref="/tutorial/find"
      nextLabel="Graph & Semantic Search (FIND)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Sometimes the useful answer is not what a document says now, but what it said at an earlier point. SCOOP supports <code>AS OF</code> for a historical read, using a timestamp or a supported relative time such as <code>yesterday</code>. This lets an application inspect an earlier view while leaving the current document untouched.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Ask for an earlier view</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Place <code>AS OF</code> after the bucket and provide the point in time to inspect. A relative expression is convenient for a human-facing report; a timestamp is appropriate when an application needs a precise historical moment. You can keep ordinary structured conditions on the same request to focus the past view on the records relevant to the question.
      </p>
      <TutorialCodeBlock label="Read a bucket as of yesterday">{`SCOOP EVERYTHING FROM users AS OF "yesterday"
SCOOP users WHERE status = "active" AS OF "2025-04-01T00:00:00Z"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The first query requests the users bucket as it appeared yesterday. The second applies a status condition to a timestamped view. Historical reads are useful for audits, support investigations, and interfaces that need to explain how data looked before a later update.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Read history without changing the present</h3>
      <p className="mb-8 leading-relaxed text-zinc-600">
        <code>AS OF</code> changes the time context of the read, not the stored record. Use it when the question is “what was true then?” For current state, leave the modifier out. As with every SCOOP query, the caller’s tenant and read permissions still define which historical data is available to return.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Choose a clear time expression</h3>
        <p>
          Use the timestamp format supported by the database deployment when precision matters. Relative forms such as <code>yesterday</code> are readable in examples and reports; make the intended time zone and point in time explicit when an application depends on exact boundaries.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
