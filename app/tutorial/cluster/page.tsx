import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function ClusterOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Distributed Cluster — Overview"
      previousHref="/tutorial/diagnostics/performance-tuning"
      previousLabel="Performance tuning workflow"
      nextHref="/tutorial/cluster/raft"
      nextLabel="Raft consensus"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        CleaveDB is designed from the ground up for high availability, zero-downtime fault tolerance, and horizontal query scaling. It combines a <strong>Python-native Raft consensus</strong> engine for replicated state machines with a standalone <strong>Go Distributed Coordinator</strong> for high-concurrency Scatter-Gather query orchestration.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Dual-Engine Architecture</h3>
        <p>
          State consistency and multi-shard query throughput are decoupled into two specialized systems: Raft guarantees ACID quorum replication and automatic leader failover for writes, while the Go Coordinator dispatches parallel queries across shards and unifies results using an <code>O(N log K)</code> Min-Heap merge.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Distributed Subsystems</h3>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">1. Multi-Node Raft Consensus</h4>
          <p className="text-xs text-zinc-600">
            Powered by <code>pysyncobj</code> in <code>DistributedEngine</code>. Appends writes to a distributed Write-Ahead Log (WAL), replicates across quorum, and elects leaders dynamically upon node failure with zero data loss.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">2. Go Coordinator (coordinator.exe)</h4>
          <p className="text-xs text-zinc-600">
            A standalone 5 MB pure Go binary (zero CGO) listening on port <code>:8305</code>. Dispatches concurrent Goroutines to query shards, deduplicates documents by global ID (<code>gid</code>), and merges streaming datasets.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">3. CLUSTER Queries</h4>
          <p className="text-xs text-zinc-600">
            Execute <code>CLUSTER STATUS</code> to inspect shard topology, or use <code>CLUSTER SCOOP</code> and <code>CLUSTER FIND</code> to fan out read queries across all active cluster nodes simultaneously.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">4. SCATTER Writes</h4>
          <p className="text-xs text-zinc-600">
            Broadcast or partition write commands across multiple cluster shards using <code>SCATTER POUR</code> and <code>SCATTER CHANGE</code> to scale storage capacity horizontally.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Port Topology</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        A standard multi-node CleaveDB cluster coordinates communication across several dedicated network ports:
      </p>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Default Port</th>
              <th className="px-4 py-3">Protocol / Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">CleaveDB TCP</td>
              <td className="px-4 py-3 font-mono text-zinc-800">8300</td>
              <td className="px-4 py-3">Direct client connection & local query execution</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">CleaveDB WS</td>
              <td className="px-4 py-3 font-mono text-zinc-800">8301</td>
              <td className="px-4 py-3">WebSocket pub/sub events & real-time client feed</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">Go Coordinator</td>
              <td className="px-4 py-3 font-mono text-zinc-800">8305</td>
              <td className="px-4 py-3">High-concurrency Scatter-Gather orchestration & K-Way merge</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-zinc-900">Raft Consensus</td>
              <td className="px-4 py-3 font-mono text-zinc-800">8311</td>
              <td className="px-4 py-3">Internal peer-to-peer WAL replication & heartbeats</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore Cluster Guides</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Select a guide below to master CleaveDB distributed topology and operations:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/cluster/raft">
            Raft consensus: configure multi-node replication, quorum durability, and disaster failover.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/cluster/coordinator">
            Go coordinator: architecture of <code>coordinator.exe</code>, Goroutine scatter-gather, and Min-Heap merge.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/cluster/cluster-queries">
            CLUSTER queries: check cluster status and dispatch multi-shard reads via the coordinator.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/cluster/scatter">
            SCATTER writes: broadcast document creations and updates across the cluster topology.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
