import Link from "next/link";

import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function FindOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Graph & Semantic Search (FIND) — Overview"
      previousHref="/tutorial/retrieving-documents"
      previousLabel="SCOOP overview"
      nextHref="/tutorial/find/bond-lookups"
      nextLabel="Following a bond"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Some questions are about the contents of one bucket; others are about how documents connect or what an unfamiliar phrase means. CleaveQL’s <code>FIND</code> command is designed for that second kind of exploration. It follows bonds through CleaveDB’s document graph and searches text by semantic similarity, so an application can ask about paths and concepts rather than only exact field values.
      </p>

      <aside className="mb-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">SCOOP and FIND ask different questions</h3>
        <p>
          Use <Link className="text-blue-700 hover:underline" href="/tutorial/retrieving-documents">SCOOP</Link> when the request is a structured read: filter a bucket by fields, choose the returned values, sort, or summarize. Use FIND when the request needs graph traversal or semantic similarity. The guide recommends keeping each form aligned with the kind of question it expresses.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Follow a connection</h3>
      <p className="mb-6 leading-relaxed text-zinc-600">
        CleaveDB stores relationships as directed bonds between documents. A direct lookup follows one named bond from a known source; a graph pattern describes several linked steps and any conditions that the resulting path must satisfy. These forms are useful in social graphs, ownership chains, product provenance, and other data where the connection is part of the answer.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Search for an idea</h3>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Semantic FIND begins with a phrase and searches documents whose text has related meaning, even when the stored wording differs. CleaveDB creates document embeddings in the background and compares the query embedding with them. This is a natural fit for discovery and natural-language search, with the practical detail that a freshly written document may take time to appear in semantic results.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the FIND lessons</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Each topic has its own page with CleaveQL examples, an explanation of how the query works, and guidance for using it well:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li><Link className="hover:underline" href="/tutorial/find/bond-lookups">Following a bond: retrieve a document connected to a known source.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/find/graph-patterns">Graph patterns: trace multi-step paths and constrain the matching nodes.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/find/semantic-search">Semantic search: retrieve documents by similarity of meaning.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/find/historical-reads">Historical graph reads: inspect a relationship as it existed earlier.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/find/performance">Performance and edge cases: understand graph growth, indexing, and vector-search timing.</Link></li>
      </ul>
    </TutorialPageShell>
  );
}
