import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function ScheduledTasksOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Scheduled Tasks & Triggers — Overview"
      previousHref="/tutorial/transactions/rollback"
      previousLabel="ROLLBACK"
      nextHref="/tutorial/scheduled-tasks/every"
      nextLabel="EVERY — repeating tasks"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Traditional database stacks require an assortment of external tooling—such as system cron daemons, Celery queues, Airflow workflows, and Kafka/Debezium CDC pipelines—just to handle periodic cleanup, aggregated reports, and event propagation. CleaveDB eliminates this architectural sprawl with <strong>native, kernel-level automation</strong>.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">In-engine automation runtime</h3>
        <p>
          CleaveDB manages schedules and event hooks directly inside the database process. Background cron tasks are recorded in the internal <code>_cron</code> bucket and monitored by a persistent async worker loop, while triggers live in <code>_triggers</code> with recursion protection against cascading loops.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">The Three Pillars of Automation</h3>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">1. Repeating Tasks (EVERY)</h4>
          <p className="text-xs text-zinc-600">
            Schedule recurring queries (interval cleanups, nightly health checks, periodic distill rollups) using human-readable cron expressions like <code>EVERY 5 MINUTES DO (...)</code>.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">2. Database Triggers (ON ... RUN)</h4>
          <p className="text-xs text-zinc-600">
            Execute reactive CleaveQL operations when documents are inserted or modified, with dynamic key interpolation (<code>$gid</code>, <code>$amount</code>).
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">3. Webhooks for CDC</h4>
          <p className="text-xs text-zinc-600">
            Publish real-time Change Data Capture payloads to external HTTP endpoints on writes, updates, and deletes without configuring message queues.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Execution Safety &amp; Isolation</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Every automated routine in CleaveDB is subject to the database engine&apos;s safety guarantees:
      </p>
      <ul className="mb-8 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Recursion Depth Protection:</strong> Triggers maintain an execution context counter (<code>trigger_depth</code>) capped at 5. Any circular trigger relationship is halted before causing stack overflow panics.
        </li>
        <li>
          <strong className="text-zinc-800">Transactional Atomicity:</strong> When triggered within an active <code>BEGIN ... COMMIT</code> block, trigger errors immediately roll back uncommitted parent mutations.
        </li>
        <li>
          <strong className="text-zinc-800">Audit Attribution:</strong> Scheduled tasks execute with authenticated session context and append execution records into the system audit log.
        </li>
      </ul>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the Automation Topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Follow the sections below to configure automated routines in CleaveDB:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/scheduled-tasks/every">
            EVERY — repeating tasks: configure recurring cron intervals for maintenance, schema migrations, and analytics.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/scheduled-tasks/triggers">
            ON ... RUN — triggers: create reactive event listeners that fire on document writes with dynamic field interpolation.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/scheduled-tasks/webhooks-cdc">
            Webhooks for CDC: stream real-time JSON event mutations directly to HTTP endpoints without message brokers.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
