import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function HistoricalQueriesPage() {
  return (
    <TutorialPageShell
      sectionTitle="History and Candidate Bonds"
      previousHref="/tutorial/retrieving-documents/related-documents"
      previousLabel="Related documents"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Some questions are about the present; others ask what a record or connection looked like earlier. CleaveQL’s <code>AS OF</code> modifier lets a query request a historical view using a timestamp or a supported relative time such as <code>yesterday</code>. It is especially helpful when an application needs to understand how connected data looked before a later change.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Read a past view</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Attach <code>AS OF</code> to the query and provide the time to inspect. The command reference demonstrates this on a relationship lookup, asking for the documents connected by a bond as of yesterday. A timestamp can be used when the application needs a particular point in time.
      </p>
      <TutorialCodeBlock label="Read a relationship as of yesterday">{`SCOOP "friend" OF "users:jane" AS OF "yesterday"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Historical retrieval is useful for reviewing a past state, investigating how a relationship changed, or displaying an earlier view to an authorized user. The time expression tells CleaveDB which historical point the query should represent; it does not change the current document.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Inspect a conditional relationship</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Some bonds are conditional and may be dormant until their condition becomes true. Ordinary relationship traversal follows active connections; use <code>CANDIDATE</code> when you need to include the dormant conditional bonds in a graph lookup. This is useful for examining possible connections or understanding why a relationship is not active yet.
      </p>
      <TutorialCodeBlock label="Include dormant conditional bonds">{`SCOOP CANDIDATE "cond" OF "users:jane"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        <code>CANDIDATE</code> changes which conditional bonds are considered for the lookup. It does not activate them; it asks the read to include candidate connections while retrieving the related documents.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Two result details to keep in mind</h3>
        <p>
          Relationship results are de-duplicated by target document. Documents drained into <code>_rubbish</code> are not returned by SCOOP. These rules apply when reading current or historical graph connections, so a traversal reflects CleaveDB’s retrieval and visibility boundaries.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
