import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ConfidenceAffinityPage() {
  return (
    <TutorialPageShell
      sectionTitle="Confidence & Affinity"
      previousHref="/tutorial/relationships/cascade"
      previousLabel="Cascade on delete"
      nextHref="/tutorial/relationships/sever"
      nextLabel="Removing bonds (SEVER)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Real-world relationships are not always binary true-or-false flags. Recommendation systems, fraud detection models, and social affinity graphs require weighted edges that quantify the strength, confidence, or probability of a connection. CleaveDB supports floating-point weights natively via <code>WITH CONFIDENCE</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Attaching a confidence score</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Assign a floating-point score between <code>0.0</code> and <code>1.0</code> to any relationship:
      </p>
      <TutorialCodeBlock label="Link with recommendation confidence">{`LINK "users:alice" TO "products:p12" AS "recommended" WITH CONFIDENCE 0.9`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The weight is stored directly in the physical graph edge index, allowing fast sorting and filtering during traversal.
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
          Confidence weights can be combined with CleaveDB’s ONNX Transformer vector search, allowing developers to blend symbolic graph affinity with semantic embedding cosine similarity in a single query.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
