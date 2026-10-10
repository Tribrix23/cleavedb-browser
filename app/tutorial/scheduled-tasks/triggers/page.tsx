import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function TriggersPage() {
  return (
    <TutorialPageShell
      sectionTitle="ON ... RUN — triggers"
      previousHref="/tutorial/scheduled-tasks/every"
      previousLabel="EVERY — repeating tasks"
      nextHref="/tutorial/scheduled-tasks/webhooks-cdc"
      nextLabel="Webhooks for CDC"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Database triggers allow you to execute reactive CleaveQL operations automatically when documents are written or modified. Using the <strong><code>ON ... RUN</code></strong> statement, you can create automated audit entries, generate cross-bucket notifications, or mirror data synchronously.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Trigger definition syntax</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        A trigger binds an event (such as <code>POUR</code>) on a target bucket to an executable query string:
      </p>
      <TutorialCodeBlock label="General trigger syntax">{`ON POUR INTO <bucket> RUN '<CleaveQL query>'`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The query inside the single quotes is evaluated dynamically whenever a matching document is written.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Dynamic field interpolation</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Inside the trigger query string, CleaveDB automatically replaces dollar-prefixed variables with values from the incoming document:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <code>$gid</code>: Resolves to the unique document ID or global key (e.g. <code>purchases:p101</code>).
        </li>
        <li>
          <code>$field_name</code>: Resolves to any top-level JSON key present in the inserted payload (e.g. <code>$item</code>, <code>$price</code>, <code>$customer_id</code>).
        </li>
      </ul>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Audit trail generation</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        A classic use case is writing a synchronized audit ledger entry every time a purchase is recorded:
      </p>
      <TutorialCodeBlock label="Synchronous audit logging trigger">{`ON POUR INTO purchases RUN 'POUR INTO audit "$gid" {"action": "item_purchased", "item": "$item"}'`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When an application writes a new purchase:
      </p>
      <TutorialCodeBlock label="Incoming transaction">{`POUR INTO purchases "p99" {"item": "Quantum Keyboard", "price": 149.99}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The database engine automatically executes the interpolated query, creating <code>audit:p99</code> with <code>{`{"action": "item_purchased", "item": "Quantum Keyboard"}`}</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Automated notification dispatch</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Triggers can also seed workflow queues, such as order fulfillment or downstream indexing jobs:
      </p>
      <TutorialCodeBlock label="Order fulfillment queue">{`ON POUR INTO orders RUN 'POUR INTO notifications "$gid" {"status": "pending_fulfillment", "total": "$total"}'`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This guarantees that the secondary record is created in the same database engine lifecycle as the primary write.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Built-in recursion &amp; error safeguards</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>
            <strong>Recursion Guard:</strong> CleaveDB tracks a <code>trigger_depth</code> counter in the execution context. If triggers trigger each other in a loop, execution is aborted at depth <strong>5</strong>, preventing stack overflows.
          </li>
          <li>
            <strong>Transaction Rollback:</strong> If the triggered query fails (e.g., due to a <code>GUARD</code> constraint violation on the secondary bucket), the primary write also fails and rolls back.
          </li>
          <li>
            <strong>Internal Registry:</strong> Active triggers are registered in the internal <code>_triggers</code> bucket.
          </li>
        </ul>
      </aside>
    </TutorialPageShell>
  );
}
