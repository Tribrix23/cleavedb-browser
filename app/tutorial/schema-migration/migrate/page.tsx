import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function MigrateReshapeDocumentsPage() {
  return (
    <TutorialPageShell
      sectionTitle="MIGRATE — reshape documents"
      previousHref="/tutorial/schema-migration"
      previousLabel="Overview"
      nextHref="/tutorial/schema-migration/heal"
      nextLabel="HEAL — repair integrity"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        The <strong><code>MIGRATE</code></strong> command rewrites every document matching a <code>FROM</code> template into a new <code>TO</code> template across an entire bucket. By capturing attributes with placeholder variables (<code>$1</code>, <code>$2</code>), you can rename fields, duplicate values, or upgrade schemas without locking the database.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Basic syntax and pattern capturing</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Define the source JSON structure and target JSON layout:
      </p>
      <TutorialCodeBlock label="General MIGRATE syntax">{`MIGRATE <bucket> FROM <src_pattern> TO <dst_pattern>`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Values matched by <code>$1</code>, <code>$2</code> in the <code>FROM</code> object are reused in the corresponding positions of the <code>TO</code> object.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Common migration patterns</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Here are the standard schema reshaping workflows supported by CleaveDB:
      </p>
      <TutorialCodeBlock label="Field renaming, duplication, and tagging">{`-- 1. Rename a field from 'fname' to 'first'
MIGRATE users FROM {"fname":"$1"} TO {"first":"$1"}

-- 2. Copy a single field into two separate attributes
MIGRATE users FROM {"lname":"$1"} TO {"last":"$1", "surname":"$1"}

-- 3. Add a schema version tag to all existing profiles
MIGRATE users FROM {"first":"$1"} TO {"first":"$1", "tag":"v2"}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Unmentioned fields in the documents (such as <code>age</code>, <code>email</code>, or nested sub-documents) are preserved untouched.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Selective status migrations</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can also use <code>MIGRATE</code> to transition records matching specific literal values:
      </p>
      <TutorialCodeBlock label="Value-matching batch migration">{`-- Migrate legacy accounts to stale status
MIGRATE users FROM {"status":"old"} TO {"status":"stale"}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Only documents where <code>status === &quot;old&quot;</code> are updated. Documents with any other status value remain unmodified.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Composing migrations with queries &amp; distill</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Because <code>MIGRATE</code> maintains full document and graph integrity, queries and aggregations immediately reflect the transformed structure:
      </p>
      <TutorialCodeBlock label="Reshape then aggregate">{`-- Insert a test profile
POUR INTO users "u1" {"fname":"Al", "lname":"Bo", "age":32}

-- Reshape the name field
MIGRATE users FROM {"fname":"$1"} TO {"first":"$1"}

-- Verify the new field
FIND users
-- Output: {"first": "Al", "lname": "Bo", "age": 32, "_version": 2}

-- Distill aggregations remain fully operational
DISTILL FROM users TOTAL age`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Each migrated document has its <code>_version</code> counter bumped by 1.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Execution rules</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>Omission Safety:</strong> Documents that do not contain the keys specified in the <code>FROM</code> template are ignored.</li>
          <li><strong>Non-blocking:</strong> The migration runs in the background, allowing incoming client queries to proceed without table-lock latency.</li>
          <li><strong>Bucket Identifier:</strong> The bucket name can be written with or without quotes (e.g. <code>MIGRATE users</code> or <code>MIGRATE &quot;users&quot;</code>).</li>
        </ul>
      </aside>
    </TutorialPageShell>
  );
}
