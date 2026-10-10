import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ConditionalBondsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Conditional Bonds"
      previousHref="/tutorial/relationships/mutual-bonds"
      previousLabel="Mutual bonds"
      nextHref="/tutorial/relationships/expiring-bonds"
      nextLabel="Expiring bonds"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In complex security, access control, and dynamic workflow systems, a relationship should only be navigable when specific business conditions are satisfied. CleaveDB supports <strong>Conditional Bonds</strong>—edges that remain dormant until document attributes meet specified criteria.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Configuring a conditional edge</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Append an <code>IF</code> condition inspecting properties on the <code>source</code> or <code>target</code> document:
      </p>
      <TutorialCodeBlock label="Conditional access bond">{`LINK "users:alice" TO "files:secret_doc" AS "can_read"
  IF target clearance IS "public"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        As long as <code>secret_doc</code> has <code>&quot;clearance&quot;: &quot;public&quot;</code>, the bond is active. If the document is updated and clearance changes to <code>&quot;restricted&quot;</code>, the edge immediately becomes dormant.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Querying conditional relationships</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Standard graph traversal queries automatically evaluate bond predicates during path resolution:
      </p>
      <TutorialCodeBlock label="Querying navigable bonds">{`FIND "can_read" OF "users:alice"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        If the target&apos;s condition fails, the edge is pruned during traversal, returning 0 results without requiring custom application-level permission checks.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Instant reactivation on CHANGE</h3>
        <p>
          You do not need to re-link conditional bonds when document values change. If a document is updated with <code>CHANGE</code> or <code>UPDATE</code> to satisfy the predicate, the edge activates immediately on the very next query.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
