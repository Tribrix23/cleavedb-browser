import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function SubscribeDocumentPage() {
  return (
    <TutorialPageShell
      sectionTitle="Subscribe to a document"
      previousHref="/tutorial/realtime/subscribe-bucket"
      previousLabel="Subscribe to a bucket"
      nextHref="/tutorial/realtime/computed-feeds"
      nextLabel="Live computed feeds"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        While subscribing to a bucket streams all activity across a collection, many client use cases—such as user profile sync, live checkout tracking, or order status monitors—only care about changes to a <strong>single entity</strong>. CleaveDB supports fine-grained document subscriptions using <code>LISTEN TO &lt;bucket&gt; &quot;&lt;id&gt;&quot;</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Pinpoint document subscription</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Specify both the bucket name and the target document ID:
      </p>
      <TutorialCodeBlock label="Subscribe to a specific record">{`-- Listen exclusively to updates on David's profile
LISTEN TO users "david"

-- Monitor an individual document
LISTEN TO docs "1"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The WebSocket dispatcher registers a listener specifically on <code>users:david</code>. Any writes to other users (e.g., Alice or Bob) are filtered out, conserving client bandwidth and eliminating client-side filtering.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Listening to state mutations</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When an administrative process or background task updates the subscribed entity:
      </p>
      <TutorialCodeBlock label="Mutate the target document">{`CHANGE users "david" SET status TO "online", last_seen TO 1728562450`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The subscriber immediately receives an event payload:
      </p>
      <TutorialCodeBlock label="Received state change event">{`{
  "event": "CHANGE",
  "bucket": "users",
  "id": "david",
  "target": "users:david",
  "data": {
    "status": "online",
    "last_seen": 1728562450
  },
  "timestamp": 1728562450
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The payload includes the updated attributes, letting client applications update local UI components in place.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Efficiency and Security</h3>
        <p className="mb-2">
          <strong>Bandwidth Efficiency:</strong> Targeting specific documents ensures mobile devices and low-bandwidth connections do not download unwanted global activity.
        </p>
        <p>
          <strong>Security Isolation:</strong> If a document subscription is requested on a document protected by Data-Level Security (DLS), the subscription request is validated against the client&apos;s authenticated credentials before any events are streamed.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
