import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function HealRepairIntegrityPage() {
  return (
    <TutorialPageShell
      sectionTitle="HEAL — repair integrity"
      previousHref="/tutorial/schema-migration/migrate"
      previousLabel="MIGRATE — reshape documents"
      nextHref="/tutorial/schema-migration/suggest-bonds"
      nextLabel="SUGGEST BONDS"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Over time, high-throughput systems experience orphaned references, corrupted secondary index entries, or dangling graph edges following hard deletes. The <strong><code>HEAL</code></strong> command performs automated consistency audits and cleans up broken pointers across the storage engine.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Repair variants</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB offers targeted repair scopes depending on the operational requirement:
      </p>
      <div className="mb-6 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Variant</th>
              <th className="px-4 py-3">Syntax</th>
              <th className="px-4 py-3">Repair Effect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Bonds only</td>
              <td className="px-4 py-3 font-mono text-blue-600">HEAL BONDS</td>
              <td className="px-4 py-3">Removes bonds whose source or target document no longer exists in _bonds</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Links only</td>
              <td className="px-4 py-3 font-mono text-emerald-600">HEAL LINKS</td>
              <td className="px-4 py-3">Removes links whose source or target document no longer exists in _links</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Secondary indexes</td>
              <td className="px-4 py-3 font-mono text-blue-600">HEAL INDEXES</td>
              <td className="px-4 py-3">Rebuilds secondary indexes from primary document data</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Full system repair</td>
              <td className="px-4 py-3 font-mono text-purple-600">HEAL ALL</td>
              <td className="px-4 py-3">Heals bonds, links, secondary indexes, and structural inconsistencies</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Cleaning up ghost bonds (HEAL BONDS)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When a document is permanently purged from the recycling bin via <code>INCINERATE</code>, existing bonds pointing to that deleted document become orphaned ghost bonds. <code>HEAL BONDS</code> detects and prunes them automatically:
      </p>
      <TutorialCodeBlock label="Clean up orphaned relationships">{`-- Run after bulk incinerations or migrations
HEAL BONDS`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This ensures graph traversals (<code>FOLLOW</code> and <code>MATCH</code>) never traverse into non-existent nodes.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Automating HEAL via cron</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        In production environments, you can schedule periodic self-healing using the built-in scheduler:
      </p>
      <TutorialCodeBlock label="Scheduled hourly repair">{`EVERY 1 HOUR DO ( HEAL ALL )`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The background cron worker sweeps the database and guarantees graph consistency without manual database administrator intervention.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Zero data loss guarantee</h3>
        <p>
          <code>HEAL</code> is non-destructive. It only removes references to documents that have already ceased to exist. Valid records, intact bonds, and current documents are never modified or removed.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
