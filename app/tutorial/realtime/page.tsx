import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function RealtimeOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Real-time Pub/Sub (LISTEN) — Overview"
      previousHref="/tutorial/schema-migration/suggest-bonds"
      previousLabel="SUGGEST BONDS"
      nextHref="/tutorial/realtime/subscribe-bucket"
      nextLabel="Subscribe to a bucket"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Modern interactive applications—such as live collaborative editors, instant messaging, financial tickers, and multi-user dashboards—require immediate updates when data changes. Instead of maintaining external message brokers like Redis Pub/Sub or third-party web socket services, CleaveDB turns directly into a <strong>real-time event broker</strong> using <strong><code>LISTEN</code></strong>.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Native WebSocket runtime on port 8301</h3>
        <p>
          CleaveDB runs a dedicated, high-throughput WebSocket listener alongside its primary TCP engine. When client connections authenticate and issue <code>LISTEN</code>, any <code>POUR</code>, <code>CHANGE</code>, or <code>LINK</code> event in the engine immediately broadcasts JSON diffs to all subscribed clients.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Three Subscription Models</h3>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">1. Bucket Subscriptions</h4>
          <p className="text-xs text-zinc-600">
            Stream all write and modification events occurring anywhere within an entire bucket (e.g. <code>LISTEN TO chat</code>).
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">2. Document Subscriptions</h4>
          <p className="text-xs text-zinc-600">
            Listen exclusively to changes targeting a specific document ID (e.g. <code>LISTEN TO users &quot;david&quot;</code>).
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">3. Live Computed Feeds</h4>
          <p className="text-xs text-zinc-600">
            Combine <code>ENRICH</code> with <code>LISTEN</code> to push documents with pre-computed formulas and virtual metrics on write.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Real-Time Architecture Highlights</h3>
      <ul className="mb-8 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Direct In-Engine Dispatch:</strong> Mutation events are intercepted inside the query execution cycle, ensuring sub-millisecond broadcast latency.
        </li>
        <li>
          <strong className="text-zinc-800">Connection-Level DLS Enforcement:</strong> Broadcasted events automatically honor Data-Level Security (DLS) policies matching the connected client&apos;s authenticated role.
        </li>
        <li>
          <strong className="text-zinc-800">Multi-Client Scaling:</strong> Lightweight asynchronous event dispatchers support thousands of concurrent connected subscribers without database performance degradation.
        </li>
      </ul>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the Real-Time Topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Review the guides below to build reactive real-time architectures:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/realtime/subscribe-bucket">
            Subscribe to a bucket: listen to all insertions and modifications within a target collection.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/realtime/subscribe-document">
            Subscribe to a document: pinpoint subscriptions to monitor an individual entity&apos;s state transitions.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/realtime/computed-feeds">
            Live computed feeds: stream dynamically transformed records combining ENRICH and LISTEN.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
