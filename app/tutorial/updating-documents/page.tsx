import Link from "next/link";

import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function UpdatingDocumentsOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Updating Documents — Overview"
      previousHref="/tutorial/find/performance"
      previousLabel="Performance and edge cases"
      nextHref="/tutorial/updating-documents/single-fields"
      nextLabel="Updating single fields"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        <code>CHANGE</code> and <code>UPDATE</code> are CleaveDB’s commands for modifying existing documents. If you are used to SQL, they operate directly on flexible JSON documents within buckets rather than fixed table columns. An update statement targets one or more documents and updates specified fields in place while leaving the rest of the document untouched.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">In-place mutations preserve graph bonds</h3>
        <p>
          Updating document properties with <code>CHANGE</code> or <code>UPDATE</code> modifies document fields without disturbing existing relationships. Graph edges created with <code>LINK</code> stay connected to the target document, so you do not need to re-link bonds when changing document attributes.
        </p>
      </aside>

      <p className="mb-6 leading-relaxed text-zinc-600">
        Unlike replacing an entire record with a fresh write, these commands apply targeted mutations. You specify which bucket and document to modify, identify the fields that should be altered using <code>SET</code>, and supply the new values. This makes it straightforward to update a user&apos;s email address, adjust an inventory balance, or update a status flag without transmitting or rewriting the entire JSON payload.
      </p>

      <p className="mb-6 leading-relaxed text-zinc-600">
        CleaveQL supports several forms of document updates depending on your workload: targeting an explicit document ID, mutating multiple attributes simultaneously, matching a group of records with <code>WHERE</code> or <code>WHOSE</code> conditions, using the familiar <code>UPDATE</code> command, or injecting dynamic values computed from nested <code>SCOOP</code> sub-queries.
      </p>

      <aside className="mb-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">SQL perspective</h3>
        <p>
          In traditional SQL, <code>UPDATE users SET status = &apos;active&apos; WHERE id = &apos;jane&apos;</code> modifies columns defined in a schema. In CleaveQL, both <code>CHANGE users &quot;jane&quot; SET status = &quot;active&quot;</code> and <code>UPDATE users &quot;jane&quot; SET status = &quot;active&quot;</code> work directly on schema-flexible JSON documents. You can add new fields on the fly, update nested object paths, and preserve existing document structure without migration scripts or schema alterations.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">How CleaveDB processes updates</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When an update executes, CleaveDB evaluates the statement through its multi-stage pipeline:
      </p>
      <ul className="mb-8 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Security and Tenant Boundaries:</strong> Document-Level Security (DLS) policies and Graph-Based Access Control (GBAC) verify that the authenticated session has permission to mutate the matched records within their tenant namespace.
        </li>
        <li>
          <strong className="text-zinc-800">WAL &amp; Buffer Pool:</strong> Changes are written to the Write-Ahead Log (WAL) and committed into the CLOCK-sweep buffer pool, guaranteeing ACID durability.
        </li>
        <li>
          <strong className="text-zinc-800">Index Synchronization:</strong> If an updated field is covered by a B+Tree index, the index is refreshed immediately.
        </li>
        <li>
          <strong className="text-zinc-800">Background Semantic Re-indexing:</strong> If text fields configured for semantic search are altered, CleaveDB queues the updated text for background vector re-embedding using the built-in ONNX Transformer model.
        </li>
      </ul>

      <p className="mb-8 leading-relaxed text-zinc-600">
        Use <code>POUR</code> when you first insert records, <code>FIND</code> or <code>SCOOP</code> to query them, <code>CHANGE</code> or <code>UPDATE</code> to evolve their data over time, and <code>DRAIN</code> when records should be safely soft-deleted. The lessons below cover each updating pattern with clear CleaveQL examples.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the updating topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Each lesson provides practical examples and best practices for updating data in CleaveDB:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/updating-documents/single-fields">
            Updating single fields: modify a specific attribute on an identified document or condition match.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/updating-documents/multiple-fields">
            Updating multiple fields: update several properties or nested paths in a single atomic operation.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/updating-documents/sub-query-injection">
            Sub-query injection: compute dynamic update values or target sets using nested SCOOP statements.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/updating-documents/update">
            The UPDATE: use the SQL-compatible UPDATE command for modifying documents.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
