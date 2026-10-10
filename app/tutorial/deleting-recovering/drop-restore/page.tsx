import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function DropRestoreBucketsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Drop & Restore Buckets"
      previousHref="/tutorial/deleting-recovering/incinerate"
      previousLabel="Hard delete (INCINERATE)"
      nextHref="/tutorial/relationships"
      nextLabel="Creating Relationships (LINK)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In addition to managing individual records, CleaveDB provides bucket-level lifecycle commands. When decommissioning a service, archiving historical datasets, or migrating between environments, you can take entire buckets offline and restore them when needed.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Soft drop an entire bucket</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To take a bucket and all its contained documents offline:
      </p>
      <TutorialCodeBlock label="Drop a bucket">{`DROP BUCKET staging_logs`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        A dropped bucket is marked as inactive. Subsequent reads and writes targeting the bucket will return an error, but the underlying data remains safely stored in the engine for disaster recovery.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Restore a dropped bucket</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To bring a dropped bucket back online with all its original records intact:
      </p>
      <TutorialCodeBlock label="Restore a dropped bucket">{`RESTORE BUCKET staging_logs`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB re-activates the bucket partition, re-attaches its B+Tree indexes, and restores normal read and write availability immediately.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Permanently incinerating a bucket</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To permanently obliterate an entire bucket and free all associated disk storage:
      </p>
      <TutorialCodeBlock label="Permanently purge an entire bucket">{`INCINERATE BUCKET deprecated_v1`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This operation irreversibly removes the bucket schema, validation guards, all member documents, vector indices, and graph pointers.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Tenant scoping</h3>
        <p>
          Bucket drop and restore operations are strictly scoped to the authenticated tenant. Dropping a bucket named <code>logs</code> only deactivates the current tenant&apos;s bucket, leaving other tenants completely unaffected.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
