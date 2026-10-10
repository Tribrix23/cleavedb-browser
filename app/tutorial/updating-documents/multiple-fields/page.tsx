import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function UpdatingMultipleFieldsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Updating Multiple Fields"
      previousHref="/tutorial/updating-documents/single-fields"
      previousLabel="Updating single fields"
      nextHref="/tutorial/updating-documents/sub-query-injection"
      nextLabel="Sub-query injection"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When an event in your application requires several attributes to change simultaneously—such as upgrading a subscriber&apos;s plan, updating contact information, or marking an item as shipped with tracking info—you can update multiple fields in a single <code>CHANGE</code> statement.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Comma-separated field assignments</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Chain multiple assignments after <code>SET</code> separated by commas:
      </p>
      <TutorialCodeBlock label="Update several properties simultaneously">{`CHANGE users "jane" SET status = "verified", plan = "pro", updated_at = 1712750400`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        In this example, CleaveDB updates Jane&apos;s <code>status</code>, <code>plan</code>, and <code>updated_at</code> timestamp together in a single atomic operation. Other fields remain untouched.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Mixing top-level and nested fields</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can mutate top-level fields and deep nested paths in the same statement:
      </p>
      <TutorialCodeBlock label="Update top-level and nested object properties">{`CHANGE users "jane" SET email = "jane@cleavedb.io", profile.bio = "Database Architect", profile.verified = true`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This allows complex document evolution without needing to re-fetch the document, edit the JSON client-side, and push the entire document back.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Batch updating multiple fields with WHERE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When migrating data or updating categories across a bucket, combine multiple field updates with a filter:
      </p>
      <TutorialCodeBlock label="Update multiple fields on filtered documents">{`CHANGE subscriptions WHERE tier = "legacy" SET tier = "starter", auto_renew = false, migration_status = "completed"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Every record matching the filter is modified with all three values, maintaining consistency across the entire matched cohort.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Atomic execution guarantees</h3>
        <p>
          All field mutations in a <code>CHANGE</code> command are executed as an atomic unit within the engine. If any field update violates a bucket <code>GUARD</code> validation rule or tenant policy, the entire operation is rolled back, leaving the document in its previous state.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
