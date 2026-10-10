import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function CoordinatorPage() {
  return (
    <TutorialPageShell
      sectionTitle="Go coordinator"
      previousHref="/tutorial/cluster/raft"
      previousLabel="Raft consensus"
      nextHref="/tutorial/cluster/cluster-queries"
      nextLabel="CLUSTER queries"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        To achieve horizontal read scalability without placing coordinating strain on Python or Rust runtime threads, CleaveDB ships with a dedicated <strong>Go Distributed Coordinator</strong> (<code>coordinator.exe</code>). It is an ultra-fast, high-concurrency microservice specialized in Scatter-Gather query dispatching and streaming K-Way result merging.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Coordinator architecture</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The coordinator sits between client interfaces (such as <code>cleaveshell</code>) and physical storage shards:
      </p>
      <TutorialCodeBlock label="Scatter-Gather topology">{`Client / Shell ──▶ Go Coordinator (:8305) ──▶ Concurrent Goroutines ──▶ [Shard 1, Shard 2, Shard N] ──▶ K-Way Min-Heap Merge`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Incoming queries are accepted over TCP port <code>8305</code>, fanned out concurrently to all configured shard instances, and reassembled before being returned to the client.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Key architectural features</h3>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <h4 className="mb-1 font-semibold text-zinc-900">Pure Go (Zero CGO)</h4>
          <p className="text-sm text-zinc-600">
            Statically compiled with <code>CGO_ENABLED=0</code> into a single standalone 5 MB binary. It requires no external C/C++ runtimes or DLLs, preventing conflicts with Python, PyO3, or AVX SIMD libraries.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <h4 className="mb-1 font-semibold text-zinc-900">Goroutine Scatter-Gather</h4>
          <p className="text-sm text-zinc-600">
            Dispatches queries to dozens of cluster shards in parallel using lightweight Go routines bounded by context cancellation deadlines (<code>context.WithTimeout</code>).
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <h4 className="mb-1 font-semibold text-zinc-900">Deduplication by Global ID (gid)</h4>
          <p className="text-sm text-zinc-600">
            When shards return document arrays, the coordinator deduplicates records matching the same global document identifier (<code>gid</code>) and aggregates total document counts.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <h4 className="mb-1 font-semibold text-zinc-900">O(N log K) Min-Heap Merge</h4>
          <p className="text-sm text-zinc-600">
            Implements a priority queue min-heap (<code>coordinator/src/merge.go</code>) that streams pre-sorted partitions from <i>K</i> shards without loading entire datasets into memory.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Automatic boot integration</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When you run <code>cleavedb_server.py</code>, it automatically looks for <code>coordinator.exe</code> and launches it in the background on port <code>8305</code> with all active shard addresses:
      </p>
      <TutorialCodeBlock label="Server auto-launch snippet">{`# Automatically boot the Go Coordinator
coord_paths = ["coordinator.exe", os.path.join("coordinator", "coordinator.exe")]
go_coord_path = next((p for p in coord_paths if os.path.exists(p)), None)
if go_coord_path:
    coord_port = args.port + 4
    subprocess.Popen([go_coord_path, f"-port={coord_port}", f"-shards={shards_arg}"])`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        You do not need to manually manage separate coordinator processes during standard multi-node deployments.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Manual / standalone execution</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        In custom production or containerized environments, you can run the coordinator as an independent microservice:
      </p>
      <TutorialCodeBlock label="Launch standalone coordinator">{`coordinator.exe -port=8305 -shards="127.0.0.1:8300,192.168.1.10:8300,192.168.1.11:8300" -timeout=5`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The flags specify the listening port (default <code>8305</code>), a comma-separated list of backend CleaveDB TCP shard addresses, and the per-query timeout in seconds.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Health checks and ping telemetry</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Verify that the coordinator is active and inspect its known shard topology by sending a JSON ping:
      </p>
      <TutorialCodeBlock label="Ping payload">{`{"action": "ping"}`}</TutorialCodeBlock>
      <p className="mt-3 mb-4 text-sm text-zinc-600">
        The coordinator responds with its current operational state:
      </p>
      <TutorialCodeBlock label="Coordinator health response">{`{
  "status": "ok",
  "role": "coordinator",
  "shards": [
    "127.0.0.1:8300",
    "192.168.1.10:8300",
    "192.168.1.11:8300"
  ],
  "version": "4.0.0"
}`}</TutorialCodeBlock>

      <aside className="mt-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Zero Runtime Overhead</h3>
        <p>
          Because the coordinator is compiled into a standalone static binary without CGO, it handles thousands of simultaneous client connections with minimal memory overhead, leaving all server memory available for NVMe buffer caches and AVX SIMD execution.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
