import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function IncineratePage() {
  return (
    <TutorialPageShell
      sectionTitle="Hard Delete (INCINERATE)"
      previousHref="/tutorial/deleting-recovering/salvage"
      previousLabel="Restore (SALVAGE)"
      nextHref="/tutorial/deleting-recovering/drop-restore"
      nextLabel="Drop & restore buckets"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When records must be permanently obliterated—such as fulfilling GDPR/CCPA privacy deletion requests, pruning stale metrics, or purging the rubbish bin to reclaim disk space—CleaveQL provides the <code>INCINERATE</code> command.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Permanently delete a document</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To permanently destroy a record directly from a bucket:
      </p>
      <TutorialCodeBlock label="Permanently destroy a record">{`INCINERATE users "jane"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This purges Jane&apos;s record from the storage engine&apos;s B+Tree, Write-Ahead Log (WAL), and memory cache. It cannot be salvaged or recovered.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Purging the rubbish bin</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Rather than keeping soft-deleted documents indefinitely, automated maintenance jobs or administrators can incinerate records that have passed their retention period:
      </p>
      <TutorialCodeBlock label="Purge expired items from rubbish">{`INCINERATE FROM _rubbish WHERE deleted_at < 1700000000`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This frees disk space occupied by aged documents while preserving recently drained records for active recovery windows.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Permanently removing graph edges</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When a document is incinerated, all incoming and outgoing graph bonds attached to that document are permanently severed from the database graph. The pointers are purged from memory, ensuring complete structural integrity.
      </p>

      <aside className="rounded-lg border border-red-200 bg-red-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-red-950">Caution: Irreversible operation</h3>
        <p>
          Unlike <code>DRAIN</code>, which is fully reversible with <code>SALVAGE</code>, <code>INCINERATE</code> permanently destroys the data on disk and unlinks all neural vector representations. Use it only when permanent eradication is intended.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
