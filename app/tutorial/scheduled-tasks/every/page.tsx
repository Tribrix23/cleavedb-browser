import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function EveryRepeatingTasksPage() {
  return (
    <TutorialPageShell
      sectionTitle="EVERY — repeating tasks"
      previousHref="/tutorial/scheduled-tasks"
      previousLabel="Overview"
      nextHref="/tutorial/scheduled-tasks/triggers"
      nextLabel="ON ... RUN — triggers"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        CleaveDB includes a built-in scheduler that executes CleaveQL commands on a repeating interval. Using the <strong><code>EVERY</code></strong> keyword, you can automate database maintenance, rollup reporting, data expirations, and background schema migrations without relying on external cron utilities.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Syntax and time intervals</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The <code>EVERY</code> statement accepts standard time units (<code>SECONDS</code>, <code>MINUTES</code>, <code>HOURS</code>, or daily calendar triggers):
      </p>
      <TutorialCodeBlock label="General EVERY syntax">{`EVERY <n> SECONDS DO ( <CleaveQL command> )
EVERY <n> MINUTES DO ( <CleaveQL command> )
EVERY <n> HOURS DO ( <CleaveQL command> )
EVERY DAY AT MIDNIGHT DO ( <CleaveQL command> )`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The command inside the parentheses <code>(...)</code> can be any valid CleaveQL query or transaction block, including reads, aggregates, mutations, or maintenance operations.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Periodic analytics and rollup reporting</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Combine <code>EVERY</code> with <code>DISTILL</code> to automatically compute metrics and audit financial records on a recurring basis:
      </p>
      <TutorialCodeBlock label="Scheduled financial aggregation">{`EVERY 1 HOURS DO ( DISTILL FROM sales TOTAL price )`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This query executes every hour against the storage engine, delivering freshly aggregated revenue totals without keeping long-running client connections open.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Automated garbage collection &amp; cleanup</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Safely manage temporary session records and purge recycled documents from the <code>_rubbish</code> bin:
      </p>
      <TutorialCodeBlock label="Session eviction and rubbish emptying">{`-- Drain expired sessions every 5 minutes
EVERY 5 MINUTES DO ( DRAIN sessions WHERE expired = true )

-- Empty the _rubbish recycling bin every night
EVERY DAY AT MIDNIGHT DO ( INCINERATE EVERYTHING FROM _rubbish )`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        By orchestrating <code>DRAIN</code> and <code>INCINERATE</code> at predictable intervals, system storage stays lean without manual operational overhead.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Continuous migration and graph healing</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Background jobs can also run zero-downtime schema migrations or graph integrity repairs:
      </p>
      <TutorialCodeBlock label="Periodic migration and HEAL routine">{`-- Mark aging accounts as stale every 30 minutes
EVERY 30 MINUTES DO ( MIGRATE users FROM {"status":"old"} TO {"status":"stale"} )

-- Perform graph pointer healing every hour
EVERY 1 HOUR DO ( HEAL ALL )`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Running <code>HEAL ALL</code> verifies graph forward/reverse references and rebuilds any dangling vector embedding pointers.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">How the Cron Worker operates</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>Storage:</strong> Active jobs are persisted to the hidden <code>_cron</code> system bucket with interval timestamps.</li>
          <li><strong>Worker Cycle:</strong> The asynchronous server daemon sweeps registered cron tasks every 5 seconds.</li>
          <li><strong>Execution Criteria:</strong> When <code>(current_time - last_run) &gt;= interval</code>, the query triggers within an administrative context.</li>
        </ul>
      </aside>
    </TutorialPageShell>
  );
}
