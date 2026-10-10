import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ScatterWritesPage() {
  return (
    <TutorialPageShell
      sectionTitle="SCATTER writes"
      previousHref="/tutorial/cluster/cluster-queries"
      previousLabel="CLUSTER queries"
      nextHref="/tutorial/forecasting"
      nextLabel="Forecasting (FORECAST)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In a multi-node deployment, writing data to a single node requires synchronization so other shards reflect the new state. CleaveDB provides the <strong><code>SCATTER</code></strong> command keyword to broadcast document creations and updates across cluster shards through the Go Coordinator.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Broadcasting document writes</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Prefix any standard mutation statement with <code>SCATTER</code> to dispatch it across all configured cluster shards:
      </p>
      <TutorialCodeBlock label="Scatter write statement">{`SCATTER POUR INTO products "item_42" {"name": "Widget", "price": 99.95}`}</TutorialCodeBlock>
      <p className="mt-3 mb-8 text-sm text-zinc-600">
        The coordinator sends the mutation concurrently to every active shard node, ensuring data availability across the entire cluster topology.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Scattering document modifications</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can also broadcast document property modifications, virtual field recalibrations, or graph links:
      </p>
      <TutorialCodeBlock label="Scatter update statement">{`SCATTER CHANGE products "item_42" SET price TO 89.95`}</TutorialCodeBlock>
      <div className="my-4">
        <TutorialCodeBlock label="Scatter relationship bonding">{`SCATTER BOND "users:1" TO "products:item_42" AS "purchased"`}</TutorialCodeBlock>
      </div>
      <p className="mb-8 leading-relaxed text-zinc-600">
        All shards apply the modification simultaneously, keeping read replicas and edge graph indexes synchronized.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Sharding and partitioning models</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB supports two primary deployment topologies for distributed writes:
      </p>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <h4 className="mb-1 font-semibold text-zinc-900">Broadcast Replication</h4>
          <p className="text-sm text-zinc-600">
            Every shard maintains a full copy of the dataset. <code>SCATTER POUR</code> ensures all nodes persist the document. Read queries can execute against any node with zero network hops.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <h4 className="mb-1 font-semibold text-zinc-900">Hash Partitioning (gid % N)</h4>
          <p className="text-sm text-zinc-600">
            For datasets larger than a single machine&apos;s NVMe capacity, documents are partitioned by hashing the global ID (<code>gid_of(key) % N_shards</code>). Reads fan out via <code>CLUSTER SCOOP</code> and assemble in the coordinator.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Verifying cluster writes</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        After executing a scattered write, verify that the document is accessible across the cluster using <code>CLUSTER SCOOP</code>:
      </p>
      <TutorialCodeBlock label="Verify scattered write">{`CLUSTER SCOOP FROM products WHERE price < 100`}</TutorialCodeBlock>
      <p className="mt-3 mb-4 text-sm text-zinc-600">
        The coordinator queries all shards, deduplicates the document by its unique <code>gid</code>, and returns the unified state:
      </p>
      <TutorialCodeBlock label="Deduplicated response">{`[
  {
    "status": "ok",
    "count": 1,
    "documents": [
      {
        "gid": "products:item_42",
        "name": "Widget",
        "price": 89.95
      }
    ]
  }
]`}</TutorialCodeBlock>

      <aside className="mt-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Best Practice: High-Availability Writes</h3>
        <p>
          For critical production transactions requiring mathematical consistency guarantees, route writes through the <strong>Raft consensus endpoint</strong> (WebSocket / HTTP). Use <strong><code>SCATTER</code></strong> for high-throughput operational broadcasts and cross-shard fan-out when working in distributed shell environments.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
