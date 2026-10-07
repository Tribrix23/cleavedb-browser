import React from "react";
import Link from "next/link";
import { BrainCircuit, Cpu } from "lucide-react";

export default function VectorEmbeddingsPage() {
  return (
    <>
      <div className="mb-4 text-sm font-medium text-blue-600 tracking-wide uppercase">Core Concepts</div>
      <h1 className="text-4xl font-bold text-zinc-900 mb-6 tracking-tight">Vector Embeddings</h1>
      
      <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
        Modern AI applications require semantic similarity search, but managing a separate vector database introduces network latency and synchronization nightmares. CleaveDB solves this by embedding a native ONNX Transformer directly into the database engine.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-sm">
          <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center mb-4">
            <BrainCircuit className="w-5 h-5 text-zinc-700" />
          </div>
          <h3 className="font-semibold text-zinc-900 mb-2">Zero-Dependency ONNX</h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            You do not need to call external APIs (like OpenAI) to vectorize strings. The database natively embeds text on <code>POUR</code> and natively embeds prompts on <code>FIND MEANING</code> using a bundled Transformer model.
          </p>
        </div>
        <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-sm">
          <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center mb-4">
            <Cpu className="w-5 h-5 text-zinc-700" />
          </div>
          <h3 className="font-semibold text-zinc-900 mb-2">Hardware SIMD Vectorization</h3>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Cosine similarity calculations run at the bare-metal hardware level. By leveraging C++ AVX-512 intrinsic instructions (<code>_mm512_dp_ps</code>), CleaveDB compares thousands of high-dimensional vectors in a single clock cycle.
          </p>
        </div>
      </div>

      <img 
        src="/vd.png" 
        alt="Vector Embeddings Architecture" 
        className="w-full h-auto rounded-2xl border border-zinc-200/80 shadow-sm mb-4"
      />

      <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-6 tracking-tight">Semantic Querying (MEANING)</h2>
      <p className="text-lg text-zinc-600 mb-4 leading-relaxed">
        Retrieving semantically similar documents is as simple as using the <code>MEANING</code> keyword. CleaveQL allows you to specify a floating-point <code>THRESHOLD</code> to filter out low-confidence matches. Because the ONNX model is deeply integrated with the query parser, there is no need to join against an external vector index. 
      </p>
      <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
        When a query containing the <code>MEANING</code> keyword reaches the execution engine, the natural language prompt is first tokenized using a bundled BPE (Byte-Pair Encoding) tokenizer. The tokens are then fed through the native ONNX Transformer model in real-time to generate a dense embedding vector. The Rust storage layer then performs a highly optimized nearest-neighbor scan across the bucket, utilizing advanced indexing structures (such as HNSW - Hierarchical Navigable Small World graphs) to bypass exhaustive linear scanning. This allows the database to instantly return documents that conceptually match the user's intent, even if they share zero exact keywords with the prompt.
      </p>

      <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-6 tracking-tight">Auto-Embedding on POUR</h2>
      <p className="text-lg text-zinc-600 mb-4 leading-relaxed">
        Because the ONNX Transformer is embedded directly in the storage engine, you don't need to manually calculate embeddings in your application layer. When you insert or upsert a document using the <code>POUR</code> command, CleaveDB automatically vectorizes the text fields in the background during the transaction lifecycle, ensuring your data and embeddings are always perfectly synchronized.
      </p>
      <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
        To prevent heavy machine-learning workloads from blocking the primary Write-Ahead Log (WAL), the embedding process is decoupled into a dedicated asynchronous worker pool. When a document is written to disk, its raw text fields are queued in an in-memory lock-free ring buffer. The background workers consume these text chunks, pass them through the Transformer model, and silently update the document's hidden vector metadata in the HNSW index. This architecture guarantees that high-throughput ingestion pipelines remain unaffected by the computational overhead of deep learning inference.
      </p>

      <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-6 tracking-tight">Hybrid Search (Exact + Semantic)</h2>
      <p className="text-lg text-zinc-600 mb-4 leading-relaxed">
        Vector search is rarely used in isolation. CleaveDB allows you to seamlessly combine exact scalar filtering (like matching specific IDs, dates, or boolean categories) with fuzzy semantic matching in a single execution phase. The engine handles the complex logic of intersecting exact B-Tree lookups with high-dimensional vector similarities automatically.
      </p>
      <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
        Under the hood, the query optimizer employs a sophisticated Cost-Based Optimizer (CBO) to determine the most efficient execution path. If the exact scalar filters are highly selective (e.g., matching a single user ID), the engine will execute the B-Tree lookup first, retrieving a tiny subset of candidate documents. It then performs a brute-force SIMD cosine similarity scan only on those candidates, bypassing the vector index entirely. Conversely, if the scalar filters are broad, the engine will traverse the HNSW vector index first, applying the scalar constraints as post-filtering conditions during the graph walk. This dynamic execution strategy guarantees sub-millisecond latencies regardless of data distribution.
      </p>

      <div className="w-full h-px bg-zinc-100 my-10"></div>

      <div className="flex justify-between items-center pt-4">
        <Link href="/docs/core-concepts/graph-relations" className="text-sm font-medium text-zinc-500 hover:text-zinc-700 flex items-center gap-1 transition-colors">
          &larr; Graph Relations
        </Link>
        <Link href="/docs/core-concepts/security" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
          Next: Document Security (DLS) &rarr;
        </Link>
      </div>
    </>
  );
}
