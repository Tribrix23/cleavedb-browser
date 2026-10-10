import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ClusterQueriesPage() {
  return (
    <TutorialPageShell
      sectionTitle="CLUSTER queries"
      previousHref="/tutorial/cluster/coordinator"
      previousLabel="Go coordinator"
      nextHref="/tutorial/cluster/scatter"
      nextLabel="SCATTER writes"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In the interactive <code>cleaveshell</code> CLI and application drivers, prefixing queries with <strong><code>CLUSTER</code></strong> transparently routes requests through the Go Coordinator on port <code>8305</code>. The coordinator fans out the statement across all cluster shards in parallel and returns a consolidated, deduplicated result.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Inspecting cluster topology</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Before issuing distributed read queries, verify coordinator connectivity and active shard membership using <code>CLUSTER STATUS</code>:
      </p>
      <TutorialCodeBlock label="Check cluster status">{`CLUSTER STATUS`}</TutorialCodeBlock>
      <p className="mt-3 mb-4 text-sm text-zinc-600">
        The coordinator responds with its current operational status, role, and registered TCP shard endpoints:
      </p>
      <TutorialCodeBlock label="Topology output">{`{
  "status": "ok",
  "role": "coordinator",
  "shards": [
    "127.0.0.1:8300",
    "192.168.1.10:8300",
    "192.168.1.11:8300"
  ],
  "version": "4.0.0"
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This confirms that all three storage nodes are active and reachable by the coordinator.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Distributed query execution</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To scatter a query across all shards simultaneously, prefix the CleaveQL statement with <code>CLUSTER</code>:
      </p>
      <TutorialCodeBlock label="Distributed filter query">{`CLUSTER SCOOP FROM users WHERE age > 21`}</TutorialCodeBlock>
      <div className="my-4">
        <TutorialCodeBlock label="Distributed search with sorting">{`CLUSTER FIND products WHERE category = "electronics" ARRANGED BY price`}</TutorialCodeBlock>
      </div>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Each shard evaluates the query against its local data partition, and the coordinator assembles the resulting documents into a single unified JSON array.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Under the hood: Scatter-Gather lifecycle</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When <code>cleaveshell</code> receives a <code>CLUSTER</code> query:
      </p>
      <ol className="mb-8 list-inside list-decimal space-y-3 text-zinc-600">
        <li>
          <strong className="text-zinc-900">TCP Handshake:</strong> The client establishes a socket connection to <code>127.0.0.1:8305</code>.
        </li>
        <li>
          <strong className="text-zinc-900">Payload Envelope:</strong> The query is packaged into a structured JSON envelope:
          <div className="my-2">
            <TutorialCodeBlock label="Dispatched request payload">{`{
  "action": "scatter_gather",
  "query": "SCOOP FROM users WHERE age > 21",
  "auth": {
    "username": "admin",
    "password": ""
  }
}`}</TutorialCodeBlock>
          </div>
        </li>
        <li>
          <strong className="text-zinc-900">Concurrent Fan-Out:</strong> The coordinator spawns concurrent Goroutines (one per shard), each with a 5-second deadline context.
        </li>
        <li>
          <strong className="text-zinc-900">Deduplication & Merge:</strong> Documents are deduplicated by global identifier (<code>gid</code>), result counts are summed, and items are sorted if an arrangement key was specified.
        </li>
      </ol>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Fault tolerance and partial results</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        If an individual shard experiences network failure or a timeout during query execution, the coordinator returns available documents from healthy shards and embeds failure diagnostics:
      </p>
      <TutorialCodeBlock label="Partial response with shard error">{`[
  {
    "status": "error",
    "message": "shard 192.168.1.11:8300 error: dial failed",
    "count": 420,
    "documents": [
      { "gid": "users:101", "name": "Alice", "age": 28 },
      { "gid": "users:204", "name": "Bob", "age": 34 }
    ]
  }
]`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This allows analytical systems to continue functioning and degrade gracefully even under partial network partitions.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Single-Node vs. Cluster Performance</h3>
        <p>
          For queries targeting a single known document by ID (e.g. <code>FIND users &quot;1&quot;</code>), direct TCP connections to the local node avoid network hops. Use <code>CLUSTER</code> when performing aggregations, cross-partition filters, or full-bucket scoops across large sharded datasets.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
