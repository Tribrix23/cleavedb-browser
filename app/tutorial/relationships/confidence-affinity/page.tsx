import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ConfidenceAffinityPage() {
  return (
    <TutorialPageShell
      sectionTitle="Confidence & Affinity"
      previousHref="/tutorial/relationships/cascade"
      previousLabel="Cascade on delete"
      nextHref="/tutorial/relationships/sever"
      nextLabel="Removing relationships (SEVER & UNLINK)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Real-world relationships are not always binary true-or-false flags. Recommendation systems, fraud detection models, and social affinity graphs require weighted edges that quantify the strength, confidence, or probability of a connection. CleaveDB supports floating-point weights natively on graph bonds via <code>WITH CONFIDENCE</code> and <code>WITH AFFINITY</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Attaching confidence and affinity scores</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Assign floating-point scores between <code>0.0</code> and <code>1.0</code> to any bond statement:
      </p>
      <TutorialCodeBlock label="Bond with confidence and affinity">{`-- Confidence score (e.g. recommendation probability)
BOND "users:alice" TO "products:p12" AS "recommended" WITH CONFIDENCE 0.9

-- Affinity score (e.g. social closeness)
BOND "users:alice" TO "users:bob" AS "collaborator" WITH AFFINITY 0.8

-- Combining both scores on a single bond
BOND "emp:e1" TO "emp:e2" AS "colleague" WITH CONFIDENCE 0.9 WITH AFFINITY 0.7`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The weights are stored directly in the physical graph edge index in <code>_bonds</code>, allowing fast sorting and filtering during traversal.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Filtering traversals by threshold</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Query graph paths that meet or exceed a confidence cutoff using <code>GUIDED THRESHOLD</code>:
      </p>
      <TutorialCodeBlock label="Traverse high-confidence recommendations">{`FIND "recommended" OF "users:alice" GUIDED THRESHOLD 0.8`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB prunes edges with weights below 0.8 at the hardware vector register layer, returning only top-tier recommendations.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Neuro-symbolic graph integration</h3>
        <p>
          Confidence weights can be combined with CleaveDB’s ONNX Transformer vector search, allowing developers to blend symbolic graph affinity with semantic embedding cosine similarity in a single query. Note: weight modifiers are exclusive to <code>BOND</code> and are rejected on <code>LINK</code>.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
