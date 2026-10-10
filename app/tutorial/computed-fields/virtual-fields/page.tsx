import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function VirtualFieldsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Virtual fields"
      previousHref="/tutorial/computed-fields"
      previousLabel="Overview"
      nextHref="/tutorial/computed-fields/expressions"
      nextLabel="Expressions & formulas"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Virtual fields allow you to inject calculated properties into documents at query time without altering the stored JSON records on disk. Once declared with <strong><code>ENRICH</code></strong>, virtual attributes behave exactly like stored fields across reads, filters, and aggregations.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Declaration syntax</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Bind one or more computed expressions to a target bucket using <code>WITH ... AS</code>:
      </p>
      <TutorialCodeBlock label="General ENRICH syntax">{`ENRICH <bucket> WITH <field_name> AS <expression>

-- Multiple fields in a single statement
ENRICH items WITH margin AS price - cost, status AS "active"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Enrichment rules persist in the system catalog and immediately apply to all existing and future documents in that bucket.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Querying enriched documents</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When you run <code>FIND</code>, the database engine computes the virtual attributes during document retrieval:
      </p>
      <TutorialCodeBlock label="Retrieve document with virtual fields">{`-- 1. Store a user with separate name fields
POUR INTO users "u1" {"first": "Jane", "last": "Doe"}

-- 2. Define the virtual full_name field
ENRICH users WITH full_name AS CONCAT(first, " ", last)

-- 3. Query the document
FIND users "u1"`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        The output document transparently includes the synthesized attribute:
      </p>
      <TutorialCodeBlock label="Evaluated document output">{`{
  "first": "Jane",
  "last": "Doe",
  "full_name": "Jane Doe"
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Notice that <code>full_name</code> was never persisted to the raw database files, saving storage and preventing synchronization bugs when names are updated.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Filtering with WHERE</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can use computed fields directly in filter conditions:
      </p>
      <TutorialCodeBlock label="Filter by virtual attribute">{`FIND users WHERE full_name = "Jane Doe"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The query engine evaluates the formula for each candidate record and applies the comparison predicate seamlessly.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Aggregating enriched attributes (DISTILL)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Virtual fields can be passed into aggregate functions:
      </p>
      <TutorialCodeBlock label="Aggregate computed attributes">{`ENRICH sales WITH tax AS price * 0.20
DISTILL FROM sales TOTAL tax`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The aggregation pipeline streams through the computed tax values, calculating the grand total without requiring a dedicated tax column in the database table.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Update Propagation</h3>
        <p>
          Because virtual fields are computed dynamically, changing an underlying stored field (e.g. updating <code>price</code> via <code>CHANGE</code>) immediately updates the derived field (e.g. <code>tax</code>) on subsequent queries without running update triggers or batch recalculations.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
