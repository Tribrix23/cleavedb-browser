import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function BasicBondsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Basic Bonds"
      previousHref="/tutorial/relationships"
      previousLabel="LINK overview"
      nextHref="/tutorial/relationships/mutual-bonds"
      nextLabel="Mutual bonds"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A basic bond is a directed relationship pointing from a source document to a target document. In CleaveQL, bonds can connect documents within the same bucket or span across completely different buckets.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Creating a directed bond</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>LINK</code> with <code>TO</code> and assign a semantic relationship label using <code>AS</code>:
      </p>
      <TutorialCodeBlock label="Link two users">{`LINK "users:jane" TO "users:juan" AS "friend"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This creates a directed edge labeled <code>&quot;friend&quot;</code> from Jane to Juan. You can query Jane&apos;s friends using <code>FIND &quot;friend&quot; OF &quot;users:jane&quot;</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Cross-bucket bonds</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Bonds naturally link records between disparate collections without requiring foreign key schemas:
      </p>
      <TutorialCodeBlock label="Link an order to a customer">{`LINK "orders:ord_901" TO "users:jane" AS "purchased_by"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The relationship lives directly on the document graph, allowing instantaneous traversal between orders and user accounts.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Multi-target linking with ANY</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can connect a source document to several targets simultaneously using <code>TO ANY(...)</code>:
      </p>
      <TutorialCodeBlock label="Link to multiple tags">{`LINK "users:jane" TO ANY("tag:sql", "tag:rust", "tag:ai") AS "skill"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB provisions graph pointers to each listed document in an atomic batch.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Document addressing format</h3>
        <p>
          Documents in bond statements can be referenced using the qualified <code>&quot;bucket:id&quot;</code> string syntax, or using space-separated arguments (e.g., <code>users &quot;jane&quot;</code>).
        </p>
      </aside>
    </TutorialPageShell>
  );
}
