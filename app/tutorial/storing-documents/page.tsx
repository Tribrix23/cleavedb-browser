import Link from "next/link";

import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function StoringDocumentsOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Storing Documents (POUR) — Overview"
      previousHref="/tutorial"
      previousLabel="Introduction"
      nextHref="/tutorial/storing-documents/creating-id"
      nextLabel="Creating ID"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        <code>POUR</code> is CleaveDB’s command for creating and writing documents. If you are used to SQL, it fills a role similar to <code>INSERT</code>, but CleaveDB stores flexible JSON documents in named buckets rather than requiring every record to follow a fixed table schema. A POUR write places a document in a bucket and associates it with an ID.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Buckets are created automatically</h3>
        <p>If a POUR targets a bucket that does not exist yet, CleaveDB creates the bucket when it writes the document.</p>
      </aside>

      <p className="mb-6 leading-relaxed text-zinc-600">
        The JSON object holds a document’s fields. Documents in the same bucket can contain different fields, so you can store the attributes that make sense for each record without forcing every kind of data into one rigid shape. CleaveDB namespaces documents by the authenticated tenant, keeping users’ data isolated according to the database’s tenant rules. That means the same bucket name can be used by different tenants while CleaveDB applies the appropriate data boundaries.
      </p>

      <p className="mb-6 leading-relaxed text-zinc-600">
        A typical write follows a simple rhythm: choose where the document belongs, decide how it should be addressed, then provide its JSON data. From there, CleaveQL gives you several variations for the job at hand: create one document, let CleaveDB choose an ID, send a batch, set an expiry, register an account secret, or write into a nested field. Each variation is still part of the POUR family, so the shape of the data workflow stays familiar even when the details change.
      </p>

      <aside className="mb-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">SQL perspective</h3>
        <p>
          In traditional SQL, <code>INSERT INTO</code> adds a row to a table. In CleaveQL, <code>POUR INTO</code> writes a JSON document to a bucket and can assign an ID as part of that write. The concepts are related, but documents can have flexible fields, and CleaveDB represents relationships directly with commands such as <code>LINK</code>.
        </p>
      </aside>

      <p className="mb-8 leading-relaxed text-zinc-600">
        POUR is the start of the document’s journey, not the end of it. Use <code>FIND</code> to retrieve what you wrote, <code>CHANGE</code> to edit selected fields later, and <code>LINK</code> to connect that document to another one. The pages below walk through each POUR variation with examples, so you can pick the right one without memorizing the whole command reference first.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the POUR options</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Each option has its own page with details based on the CleaveQL command reference:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li><Link className="hover:underline" href="/tutorial/storing-documents/creating-id">Creating ID: use an explicit or generated ID, and name a bucket.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/storing-documents/bulk-writes">Bulk writes: create multiple documents with POUR MANY.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/storing-documents/expiring-documents">Expiring documents: set a time-to-live.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/storing-documents/login-secrets">Login secrets: create an account entry with WITH SECRET.</Link></li>
        <li><Link className="hover:underline" href="/tutorial/storing-documents/nested-fields">Nested fields: write JSON into an existing document.</Link></li>
      </ul>
    </TutorialPageShell>
  );
}
