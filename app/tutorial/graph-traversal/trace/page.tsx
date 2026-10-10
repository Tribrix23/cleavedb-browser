import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function TracePage() {
  return (
    <TutorialPageShell
      sectionTitle="TRACE — Walk a Chain"
      previousHref="/tutorial/graph-traversal/follow"
      previousLabel="FOLLOW — explore neighbours"
      nextHref="/tutorial/graph-traversal/match"
      nextLabel="MATCH & VIA — Cypher & pattern queries"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        While <code>FOLLOW</code> explores an entire neighborhood across one bond type, real business queries often follow an exact sequence of heterogeneous relationships: for example, find who is managed by the person who mentors Ana, or find the manufacturer of an item purchased by Jane. The <code>TRACE</code> command steps through ordered edge chains.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Walking an explicit multi-hop path</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        List relationship labels in sequence following <code>TRACE</code>:
      </p>
      <TutorialCodeBlock label="Trace an ordered relationship path">{`TRACE "manages", "mentors" FROM "users:ana"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB starts at Ana, walks outgoing <code>&quot;manages&quot;</code> bonds to intermediate staff members, and from each intermediate member walks outgoing <code>&quot;mentors&quot;</code> bonds to return the final target documents.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Conversational chain syntax with FIND</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can also express multi-hop chains conversationally in plain English using <code>FIND ... OF THE</code>:
      </p>
      <TutorialCodeBlock label="Conversational multi-hop query">{`FIND THE knows OF THE boss OF users "jane"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Read from right to left: locate Jane, find Jane&apos;s boss, and then retrieve everyone known by that boss.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Early path pruning</h3>
        <p>
          If an intermediate step in a <code>TRACE</code> chain yields no matching bonds, CleaveDB terminates that branch immediately, preventing wasted lookups and guaranteeing high throughput.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
