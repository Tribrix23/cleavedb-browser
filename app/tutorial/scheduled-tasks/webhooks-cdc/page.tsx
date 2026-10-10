import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function WebhooksCdcPage() {
  return (
    <TutorialPageShell
      sectionTitle="Webhooks for CDC"
      previousHref="/tutorial/scheduled-tasks/triggers"
      previousLabel="ON ... RUN — triggers"
      nextHref="/tutorial/time-travel"
      nextLabel="Time Travel & Undo"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In event-driven architectures, downstream systems (such as search indexes, notification dispatchers, cache invalidators, and third-party APIs) must react to database writes in real time. Rather than running cumbersome Kafka or Debezium clusters, CleaveDB provides <strong>native Change Data Capture (CDC) via HTTP Webhooks</strong>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Configuring a webhook</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Register an automated event hook on any bucket using the <code>SHAPE WEBHOOK</code> command:
      </p>
      <TutorialCodeBlock label="Registering a CDC webhook">{`SHAPE WEBHOOK "user_created" ON users WHEN action = "POUR" POST TO "https://api.example.com/hooks"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Whenever a new document enters the <code>users</code> bucket via <code>POUR</code>, CleaveDB dispatches an HTTP POST request containing the event metadata and document payload.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Supported lifecycle actions</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Webhooks can listen to any phase of the document lifecycle:
      </p>
      <div className="mb-6 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Trigger Event</th>
              <th className="px-4 py-3">Use Case</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-blue-600">POUR</td>
              <td className="px-4 py-3">New document inserted</td>
              <td className="px-4 py-3">Send welcome emails, initialize profile caches</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-amber-600">CHANGE</td>
              <td className="px-4 py-3">Fields modified or updated</td>
              <td className="px-4 py-3">Sync inventory, notify billing services</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono font-medium text-rose-600">DRAIN</td>
              <td className="px-4 py-3">Document moved to rubbish bin</td>
              <td className="px-4 py-3">Purge user storage, invalidate session tokens</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Auditing registered webhooks</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Inspect all active webhook listeners across your buckets using <code>SHOW WEBHOOKS</code>:
      </p>
      <TutorialCodeBlock label="List registered webhooks">{`SHOW WEBHOOKS`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Returns an array containing each listener&apos;s name, target bucket, subscribed action type, and remote destination URL.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">HTTP payload format</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB transmits standard JSON payloads directly to your endpoint:
      </p>
      <TutorialCodeBlock label="Dispatched webhook payload">{`{
  "event": "POUR",
  "bucket": "users",
  "id": "u42",
  "data": {
    "name": "Jordan Lee",
    "tier": "enterprise"
  },
  "timestamp": 1728561230,
  "tenant": "default"
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The <code>tenant</code> key automatically inherits the current authenticated user context from <code>AUTHENTICATE AS</code>.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Non-blocking background delivery</h3>
        <p>
          Webhook requests are buffered in an asynchronous background queue managed by the server runtime. If your endpoint is temporarily unreachable, the database does not block client queries; deliveries are retried using exponential backoff without slowing down transaction throughput.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
