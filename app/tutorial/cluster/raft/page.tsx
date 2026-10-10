import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function RaftConsensusPage() {
  return (
    <TutorialPageShell
      sectionTitle="Raft consensus"
      previousHref="/tutorial/cluster"
      previousLabel="Overview"
      nextHref="/tutorial/cluster/coordinator"
      nextLabel="Go coordinator"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        CleaveDB incorporates a Python-native implementation of the <strong>Raft Consensus Algorithm</strong> powered by <code>pysyncobj</code>. It transforms standalone CleaveDB instances into a high-availability, disaster-resilient distributed state machine with automated leader election and quorum-based write replication.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Starting a 3-node Raft cluster</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To establish a high-availability cluster, launch multiple server instances specifying their client port, dedicated Raft consensus port, and list of peer addresses:
      </p>
      <TutorialCodeBlock label="Node 1 (Leader Candidate)">{`python cleavedb_server.py --port 8301 --raft-port 8311 --peers 127.0.0.1:8321,127.0.0.1:8331 --data node1`}</TutorialCodeBlock>
      <div className="my-3">
        <TutorialCodeBlock label="Node 2 (Follower / Peer)">{`python cleavedb_server.py --port 8311 --raft-port 8321 --peers 127.0.0.1:8311,127.0.0.1:8331 --data node2`}</TutorialCodeBlock>
      </div>
      <div className="mb-6">
        <TutorialCodeBlock label="Node 3 (Follower / Peer)">{`python cleavedb_server.py --port 8321 --raft-port 8331 --peers 127.0.0.1:8311,127.0.0.1:8321 --data node3`}</TutorialCodeBlock>
      </div>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Upon launch, the nodes discover each other over their assigned <code>--raft-port</code> channels, initiate heartbeat exchanges, and hold an initial leader election.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Replicated write lifecycle</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When a client issues a mutating write statement (such as <code>POUR</code>, <code>CHANGE</code>, or <code>LINK</code>):
      </p>
      <ol className="mb-8 list-inside list-decimal space-y-3 text-zinc-600">
        <li>
          <strong className="text-zinc-900">Leader Interception:</strong> The elected Raft Leader intercepts the incoming command.
        </li>
        <li>
          <strong className="text-zinc-900">Log Append:</strong> The command is serialized and appended to the distributed Write-Ahead Log (WAL) maintained in <code>journal.bin</code>.
        </li>
        <li>
          <strong className="text-zinc-900">Quorum Consensus:</strong> The leader dispatches the entry to follower nodes. Once a majority quorum (e.g. 2 out of 3 nodes) acknowledges disk persistence, the entry is marked committed.
        </li>
        <li>
          <strong className="text-zinc-900">State Machine Application:</strong> The <code>@replicated_sync</code> decorated method executes the CleaveQL statement against the local Rust/C++ storage engine simultaneously across the cluster.
        </li>
      </ol>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Zero-overhead read optimization</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        While write operations enforce quorum replication, read queries (such as <code>FIND</code>, <code>SCOOP</code>, and <code>DISTILL</code>) bypass the Raft consensus roundtrip entirely:
      </p>
      <TutorialCodeBlock label="Local read bypass">{`def execute_read(self, query: str, context: dict):
    # Reads don't need raft consensus — served directly from local engine
    interpreter = Interpreter(GLOBAL_DB, indexing_queue)
    return interpreter.execute(stmts)`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Because every node maintains an up-to-date replicated state machine, any healthy node can serve analytical reads locally at full NVMe SSD and SIMD speeds without network overhead.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Automatic failover and disaster recovery</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB clusters are designed for unattended fault tolerance:
      </p>
      <ul className="mb-8 list-inside list-disc space-y-2 text-zinc-600">
        <li><strong>Leader Crash:</strong> If the primary node experiences a crash or network partition, remaining followers detect missing heartbeats and automatically elect a new leader in milliseconds.</li>
        <li><strong>Zero Data Loss:</strong> Committed transactions are guaranteed durable across the majority quorum.</li>
        <li><strong>Node Rejoining:</strong> When a failed node recovers, it automatically replays missing log entries from <code>dump.bin</code> and synchronizes back to the cluster state.</li>
      </ul>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Network Interface Note</h3>
        <p>
          WebSocket and HTTP API endpoints automatically replicate through Raft consensus to guarantee high availability. Direct low-level TCP connections write straight to the local engine for ultra-low latency single-node benchmarking.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
