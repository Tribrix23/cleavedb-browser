import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function SeverBondsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Removing Bonds (SEVER)"
      previousHref="/tutorial/relationships/confidence-affinity"
      previousLabel="Confidence & affinity"
      nextHref="/tutorial/graph-traversal"
      nextLabel="Graph Traversal"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When an association between two entities ends—such as unfriending a user, revoking a member&apos;s role, or removing an assigned tag—you can destroy the relationship edge using the <code>SEVER</code> command (aliased as <code>UNLINK</code>).
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Severing a specific labeled bond</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To remove a single named relationship while leaving any other connections between the documents intact:
      </p>
      <TutorialCodeBlock label="Sever a specific relationship">{`SEVER "users:jane" FROM "users:juan" AS "friend"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This detaches only the <code>&quot;friend&quot;</code> edge pointing from Jane to Juan. If Jane and Juan also share a <code>&quot;co_worker&quot;</code> bond, that edge remains fully functional.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Severing all connections between two documents</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To eradicate all graph edges connecting two entities regardless of their labels:
      </p>
      <TutorialCodeBlock label="Destroy all bonds between documents">{`SEVER "users:jane" FROM "users:juan"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB scans and removes every active graph pointer between the two specified records in a single atomic pass.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Documents remain untouched</h3>
        <p>
          Unlike <code>DRAIN</code> or <code>INCINERATE</code>, which modify or delete document records, <code>SEVER</code> only destroys the relationship edges between them. Both documents continue to exist in their respective buckets with all of their data intact.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
