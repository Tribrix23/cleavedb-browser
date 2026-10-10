import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function UndoGlobalRollbackPage() {
  return (
    <TutorialPageShell
      sectionTitle="UNDO — global rollback"
      previousHref="/tutorial/time-travel/rewind"
      previousLabel="REWIND — restore a document"
      nextHref="/tutorial/schema-migration"
      nextLabel="Schema Migration"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        While transactions (<code>BEGIN ... COMMIT</code>) require you to plan atomic blocks in advance, accidents in interactive shells or operational scripts often happen on live, committed writes. CleaveDB solves this with the <strong>global UNDO ledger</strong>, allowing you to audit committed mutations and roll back mistakes dynamically.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Inspecting the undo stack (UNDO SHOW)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Every write (<code>POUR</code>) and update (<code>CHANGE</code>) automatically pushes an operation record into the system <code>_undo_stack</code>. You can inspect recent operations at any time:
      </p>
      <TutorialCodeBlock label="Inspect the undo ledger">{`UNDO SHOW`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The engine returns an array of operations ordered by timestamp descending, showing the unique operation ID (<code>uid</code>), action type, target document, and previous state.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Rolling back an accidental mutation</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Consider an accidental price overwrite on a product document:
      </p>
      <TutorialCodeBlock label="Mistaken price mutation">{`POUR INTO products "1" {"price": 100}
CHANGE products "1" SET price TO 9999    -- Accidental bad price update`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Inspect the undo stack to find the target operation ID:
      </p>
      <TutorialCodeBlock label="Check undo stack">{`UNDO SHOW
-- Returns:
-- [
--   {"uid": "tester.1791248457533_7852", "action": "CHANGE", "target": "products:1", ...},
--   {"uid": "tester.1791248450123_4510", "action": "POUR",   "target": "products:1", ...}
-- ]`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Execute <code>UNDO</code> with the operation ID to roll back all mutations down to that point:
      </p>
      <TutorialCodeBlock label="Execute global rollback">{`UNDO "tester.1791248457533_7852"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB automatically restores the <code>before</code> document snapshot, returning <code>{`{"status": "ok", "message": "Successfully reverted 1 operations.", "reverted": 1}`}</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Cascading batch rollbacks</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        If an errant batch script applied multiple updates across documents, specifying an older operation ID unwinds all intermediary mutations in reverse chronological order:
      </p>
      <TutorialCodeBlock label="Multi-operation rollback">{`-- Reverts all actions performed up to the initial creation
UNDO "tester.1791248450123_4510"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The engine unwinds each step sequentially, safely cleaning the undo stack and keeping document history consistent.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Undo vs. Rollback vs. Rewind</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>
            <strong>ROLLBACK:</strong> Used strictly within active in-memory <code>BEGIN ... COMMIT</code> blocks to discard uncommitted writes.
          </li>
          <li>
            <strong>REWIND:</strong> Restores a specific document to a point-in-time timestamp (e.g. <code>REWIND &quot;staff:a&quot; TO yesterday</code>) without affecting other documents.
          </li>
          <li>
            <strong>UNDO:</strong> Rolls back committed global operations across the entire database ledger using stack IDs.
          </li>
        </ul>
      </aside>
    </TutorialPageShell>
  );
}
