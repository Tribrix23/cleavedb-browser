import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ExclusiveBondsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Exclusive Bonds"
      previousHref="/tutorial/relationships/expiring-bonds"
      previousLabel="Expiring bonds"
      nextHref="/tutorial/relationships/cascade"
      nextLabel="Cascade on delete"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In many domain models, a document can only hold one active relationship of a given type at any time. For example, a user may only have one &quot;primary payment method&quot; or one &quot;active team role&quot;. Rather than manually severing old bonds before creating new ones, CleaveQL offers <code>AS EXCLUSIVELY</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Enforcing an exclusive bond</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>AS EXCLUSIVELY</code> with your relationship label:
      </p>
      <TutorialCodeBlock label="Assign an exclusive role">{`LINK "users:bob" TO "roles:lead" AS EXCLUSIVELY "assigned_role"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        If Bob previously had an <code>&quot;assigned_role&quot;</code> bond pointing to another role document, CleaveDB severs that previous bond atomically before establishing the new edge to <code>roles:lead</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Switching primary resources</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Exclusive bonds simplify status toggling and primary pointer management across collections:
      </p>
      <TutorialCodeBlock label="Update primary payment card">{`LINK "users:jane" TO "cards:card_774" AS EXCLUSIVELY "primary_card"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Guarantees that Jane never has multiple primary cards, preventing race conditions without requiring application-side locks.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Atomic replacement guarantee</h3>
        <p>
          The detachment of old edges and creation of the new exclusive bond occur inside an atomic transaction. If creation of the new link fails, the existing relationship remains intact.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
