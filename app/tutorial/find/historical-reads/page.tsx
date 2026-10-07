import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function FindHistoricalReadsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Historical Graph Reads"
      previousHref="/tutorial/find/semantic-search"
      previousLabel="Semantic search"
      nextHref="/tutorial/find/performance"
      nextLabel="Performance and edge cases"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A relationship can change over time, and an investigation may need to know what was connected before that change. FIND supports <code>AS OF</code> on relationship reads, so CleaveDB can return the connected documents as they were at an earlier time. Use a relative expression such as <code>yesterday</code> for a readable report or a timestamp when the application needs a specific point.
      </p>

      <TutorialCodeBlock label="Read a relationship as of yesterday">{`FIND "friend" OF "users:jane" AS OF "yesterday"`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Include dormant conditional bonds</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        A conditional bond can exist as a candidate before its condition becomes active. Add <code>CANDIDATE</code> when you need to inspect those dormant connections as part of a relationship query. This can help explain which possible relationship is waiting on a condition, rather than showing only the currently active graph.
      </p>
      <TutorialCodeBlock label="Inspect candidate relationships">{`FIND CANDIDATE "cond" OF "users:jane"`}</TutorialCodeBlock>

      <p className="mb-8 leading-relaxed text-zinc-600">
        Historical reads change the time context of the lookup; candidate traversal changes which conditional bonds are considered. Neither form edits a document or activates a bond. Relationship results are de-duplicated by target document, and documents drained into <code>_rubbish</code> are not returned.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Treat the result as a point-in-time view</h3>
        <p>
          An <code>AS OF</code> query answers what the relationship looked like at the requested time. The current graph may be different; use an ordinary relationship lookup when the application needs the present state.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
