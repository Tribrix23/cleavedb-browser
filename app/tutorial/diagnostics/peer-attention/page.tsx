import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function PeerAttentionPage() {
  return (
    <TutorialPageShell
      sectionTitle="PEER INTO ATTENTION"
      previousHref="/tutorial/diagnostics/peer-cost"
      previousLabel="PEER INTO COST"
      nextHref="/tutorial/diagnostics/performance-tuning"
      nextLabel="Performance tuning workflow"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        CleaveDB integrates native Transformer attention layers directly into its hybrid document-graph engine. The <strong><code>PEER INTO ATTENTION</code></strong> diagnostic command inspects the operational health, hardware acceleration, execution providers, and tensor dimensions of the integrated Semantic Relevance Attention (SRA) subsystem.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Syntax and command</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Run the standalone diagnostic statement in any CleaveQL session:
      </p>
      <TutorialCodeBlock label="Inspect attention engine status">{`PEER INTO ATTENTION`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This operation returns instantaneous metadata from the ONNX Runtime session without executing any document scans or disk I/O.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Structured telemetry response</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When the AI acceleration subsystem is online, <code>PEER INTO ATTENTION</code> returns a comprehensive telemetry object:
      </p>
      <TutorialCodeBlock label="Attention diagnostics report">{`{
  "status": "ok",
  "attention_stats": {
    "model": "all-MiniLM-L6-v2",
    "onnx_version": "1.16.0",
    "providers": [
      "CPUExecutionProvider"
    ],
    "input_names": [
      "input_ids",
      "attention_mask",
      "token_type_ids"
    ],
    "output_names": [
      "last_hidden_state"
    ],
    "dim": 384,
    "hw_acceleration": "CPUExecutionProvider",
    "custom_metadata": {}
  }
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The response confirms that the neural transformer is loaded in memory and ready to calculate dense semantic embeddings.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Diagnostic fields breakdown</h3>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Value / Format</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">model</td>
              <td className="px-4 py-3 font-mono text-zinc-800">all-MiniLM-L6-v2</td>
              <td className="px-4 py-3">Quantized 8-bit Transformer model bundled directly in CleaveDB</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">dim</td>
              <td className="px-4 py-3 font-mono text-zinc-800">384</td>
              <td className="px-4 py-3">Output vector embedding dimensionality used for cosine similarity ranking</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">providers</td>
              <td className="px-4 py-3 font-mono text-zinc-800">["CPUExecutionProvider"]</td>
              <td className="px-4 py-3">Active runtime backends; leverages AVX and AVX-512 SIMD vector extensions</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">input_names</td>
              <td className="px-4 py-3 font-mono text-zinc-800">input_ids, attention_mask, token_type_ids</td>
              <td className="px-4 py-3">Expected input tensor signatures fed by the embedded tokenizer</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">output_names</td>
              <td className="px-4 py-3 font-mono text-zinc-800">last_hidden_state</td>
              <td className="px-4 py-3">Transformer hidden states pooled to produce normalized 1D sentence vectors</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">hw_acceleration</td>
              <td className="px-4 py-3 font-mono text-zinc-800">CPUExecutionProvider / CUDA</td>
              <td className="px-4 py-3">Primary hardware execution provider currently handling tensor operations</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Bundled offline architecture</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Unlike databases that rely on external third-party embedding APIs (introducing network latency and API token costs), CleaveDB bundles its quantized 8-bit model (~22 MB) directly inside the <code>attention/model/</code> directory.
      </p>
      <ul className="mb-8 list-inside list-disc space-y-2 text-zinc-600">
        <li><strong>100% Offline:</strong> No internet connectivity or remote API calls required during indexing or search.</li>
        <li><strong>Zero API Latency:</strong> Embeddings are computed in microseconds via local CPU SIMD vector units.</li>
        <li><strong>Mean Pooling & Normalization:</strong> Raw output tensors undergo automated mean pooling and L2 normalization to compute dot-product cosine similarity.</li>
      </ul>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Graceful fallback mode</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        If optional machine learning dependencies (such as ONNX Runtime or tokenizers) are absent from the host environment, CleaveDB degrades gracefully to exact keyword matching without failing database queries:
      </p>
      <TutorialCodeBlock label="Offline fallback state">{`{
  "status": "ok",
  "attention_stats": {
    "status": "offline",
    "reason": "Missing ML dependencies"
  }
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        In fallback mode, standard document storage, ACID transactions, and graph traversals continue uninterrupted.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Health Check Best Practice</h3>
        <p>
          Include <code>PEER INTO ATTENTION</code> in your deployment liveness and readiness probes to confirm hardware acceleration (AVX-512) and model readiness before routing semantic search queries to cluster shards.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
