import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function UpdatingSingleFieldsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Updating Single Fields"
      previousHref="/tutorial/updating-documents"
      previousLabel="CHANGE overview"
      nextHref="/tutorial/updating-documents/multiple-fields"
      nextLabel="Updating multiple fields"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In many application workflows, you only need to modify one property of a record—such as updating an account status, incrementing an inventory level, or setting a user preference. The simplest form of <code>CHANGE</code> pairs an identified document with a single <code>SET</code> assignment.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Update a field on an identified document</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Specify the target bucket, the document ID, and the field you wish to update using <code>SET</code>:
      </p>
      <TutorialCodeBlock label="Update status on a specific user">{`CHANGE users "jane" SET status = "active"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB locates the document with ID <code>&quot;jane&quot;</code> in the <code>users</code> bucket, updates the <code>status</code> property to <code>&quot;active&quot;</code>, and persists the update immediately. Any other fields in Jane&apos;s record—such as email, name, or metadata—remain completely unchanged.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Updating numerical fields</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Numerical values such as stock counts, prices, or counters can be set directly:
      </p>
      <TutorialCodeBlock label="Update inventory stock count">{`CHANGE products "prod_402" SET stock = 42`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The new numeric value replaces the existing field value in place, triggering index updates if <code>stock</code> has an associated B+Tree index.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Update nested single fields</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can reach into nested JSON objects using dot-notation:
      </p>
      <TutorialCodeBlock label="Modify a nested field path">{`CHANGE users "jane" SET profile.preferences.theme = "dark"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This navigates down Jane&apos;s <code>profile.preferences</code> object and updates only the <code>theme</code> property, keeping sibling properties like <code>language</code> or <code>notifications</code> intact.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Conditional single-field updates</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can also apply single-field updates across multiple documents matching a filter using <code>WHERE</code>:
      </p>
      <TutorialCodeBlock label="Batch update documents matching a condition">{`CHANGE orders WHERE status = "pending" SET status = "processing"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Every order document in the bucket where <code>status</code> equals <code>&quot;pending&quot;</code> is updated to <code>&quot;processing&quot;</code> in an atomic transaction.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Dynamic field creation</h3>
        <p>
          If the field passed to <code>SET</code> does not yet exist on the document, CleaveDB automatically creates it. Because CleaveDB is schema-flexible, you do not need to issue an alter table or schema migration before storing new attributes.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
