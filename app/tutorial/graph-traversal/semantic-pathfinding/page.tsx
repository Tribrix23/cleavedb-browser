import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function SemanticPathfindingPage() {
  return (
    <TutorialPageShell
      sectionTitle="Semantic Pathfinding"
      previousHref="/tutorial/graph-traversal/direction-depth"
      previousLabel="Direction & depth"
      nextHref="/tutorial/pattern-matching"
      nextLabel="Pattern Matching"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Traditional graph databases traverse paths purely symbolically—matching exact edge labels with no semantic understanding of the data inside nodes. Vector databases search semantic meaning, but lack structural relationships. CleaveDB pioneers <strong>Neuro-Symbolic Semantic Pathfinding</strong> by blending both paradigms into a single query execution engine.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Concept-guided graph traversal</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use <code>GUIDED BY MEANING</code> to steer a traversal toward documents with relevant semantic context:
      </p>
      <TutorialCodeBlock label="Navigate paths guided by meaning">{`FOLLOW "users:alice" THROUGH "interests"
  GUIDED BY MEANING "cloud infrastructure"
  LIMIT 5`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Rather than returning every linked interest uniformly, CleaveDB evaluates the neural cosine similarity of each adjacent node against the concept <code>&quot;cloud infrastructure&quot;</code> and prioritizes the most conceptually relevant paths.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Hardware-accelerated SIMD pruning</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can attach confidence cutoffs using <code>THRESHOLD</code> to prune non-relevant branches early:
      </p>
      <TutorialCodeBlock label="Prune traversal branches using threshold">{`TRACE "projects", "topics" FROM "users:alice"
  GUIDED BY "machine learning"
  THRESHOLD 0.75`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        At each hop, CleaveDB’s Rust engine executes the C++ <code>_mm512_dp_ps</code> AVX-512 SIMD vector dot-product in hardware. Branches with cosine similarity below 0.75 are discarded in a single clock cycle, eliminating graph explosions before they occur.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Embedded ONNX Transformer</h3>
        <p>
          Semantic queries do not require calling third-party API endpoints or external vector services. CleaveDB runs an optimized, quantized ONNX Transformer model in-process, ensuring lightning-fast embedding generation during graph navigation.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
