import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function WebhooksPage() {
  return (
    <TutorialPageShell
      sectionTitle="Webhooks for Change Data Capture (CDC)"
      previousHref="/tutorial/bucket-configuration/describe-show"
      previousLabel="DESCRIBE & SHOW"
      nextHref="/tutorial/security"
      nextLabel="Security & Access Control"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In event-driven architectures, downstream systems often need to react instantly to database updates. Instead of deploying complex external CDC infrastructure (like Apache Kafka, Debezium, or polling workers), CleaveDB includes native HTTP <strong><code>WEBHOOK</code></strong> event dispatch built directly into the storage engine.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Registering a webhook</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Register an event trigger with <code>SHAPE WEBHOOK</code>, naming the webhook, binding it to a target bucket, and specifying the trigger action and HTTP endpoint:
      </p>
      <TutorialCodeBlock label="Register insert webhook">{`SHAPE WEBHOOK "user_created" ON users WHEN action = "POUR" POST TO "https://api.example.com/hooks"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Whenever a document is inserted into the <code>users</code> bucket via <code>POUR</code>, CleaveDB dispatches an asynchronous HTTP POST payload containing the affected document and session metadata directly to your webhook handler.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Trigger actions</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Webhooks can be hooked into any write-phase mutation lifecycle:
      </p>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-50">
              <th className="py-2.5 px-4 font-semibold">Action</th>
              <th className="py-2.5 px-4 font-semibold">Example registration</th>
              <th className="py-2.5 px-4 font-semibold">Event trigger</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">POUR</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">WHEN action = &quot;POUR&quot;</td>
              <td className="py-2.5 px-4">New document creation</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">CHANGE</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">WHEN action = &quot;CHANGE&quot;</td>
              <td className="py-2.5 px-4">Field updates and document modifications</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">DRAIN</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">WHEN action = &quot;DRAIN&quot;</td>
              <td className="py-2.5 px-4">Document deletion or recycling to rubbish</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Listing registered webhooks</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Audit all registered webhooks using <code>SHOW WEBHOOKS</code>:
      </p>
      <TutorialCodeBlock label="List webhooks">{`SHOW WEBHOOKS`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Returns a list of all active listeners, target endpoints, and bound event filters: <code>&#123;&quot;count&quot;: 1, &quot;data&quot;: [...]&#125;</code>.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Asynchronous reliability</h3>
        <p>
          Webhook requests are buffered in an asynchronous background queue managed by the Rust runtime. If your endpoint is temporarily unreachable, the database does not block client transactions and retries deliveries with exponential backoff.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
