import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function DirectionDepthPage() {
  return (
    <TutorialPageShell
      sectionTitle="Direction & Depth"
      previousHref="/tutorial/graph-traversal/match"
      previousLabel="MATCH & VIA — Cypher & pattern queries"
      nextHref="/tutorial/graph-traversal/semantic-pathfinding"
      nextLabel="Semantic pathfinding"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In dense graphs, traversing without constraints can quickly trigger an exponential path explosion. CleaveDB gives you fine-grained control over edge orientation using <code>DIRECTION</code> and maximum traversal distance using <code>DEPTH</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Edge directionality</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can configure the traversal engine to follow edges outward, inward, or symmetrically:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800"><code>DIRECTION OUTGOING</code>:</strong> Follows only edges pointing away from the anchor document (default).
        </li>
        <li>
          <strong className="text-zinc-800"><code>DIRECTION INCOMING</code>:</strong> Follows edges pointing into the anchor document (e.g., find who follows Ana).
        </li>
        <li>
          <strong className="text-zinc-800"><code>DIRECTION BOTH</code>:</strong> Traverses edges bidirectionally regardless of edge orientation.
        </li>
      </ul>

      <TutorialCodeBlock label="Incoming follower query">{`FOLLOW "users:ana" THROUGH "follows" DIRECTION INCOMING DEPTH 1`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This locates all users who have an outgoing <code>&quot;follows&quot;</code> bond pointing into Ana&apos;s record.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Setting depth horizons</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Cap the number of hops using <code>DEPTH</code> to prevent runaway traversals:
      </p>
      <TutorialCodeBlock label="Depth-bounded neighborhood query">{`FOLLOW "users:ana" THROUGH "collaborates" DIRECTION BOTH DEPTH 2 LIMIT 25`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The BFS traversal stops exploring paths that exceed 2 hops, returning up to 25 documents within Ana&apos;s immediate two-degree circle.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Performance best practice</h3>
        <p>
          Always specify a reasonable <code>DEPTH</code> and <code>LIMIT</code> when querying <code>DIRECTION BOTH</code> in highly connected graphs to keep intermediate state bounded in memory.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
