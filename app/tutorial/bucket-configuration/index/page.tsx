import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function IndexLookupsPage() {
  return (
    <TutorialPageShell
      sectionTitle="INDEX — Speed Up Lookups"
      previousHref="/tutorial/bucket-configuration/guard"
      previousLabel="GUARD — validation rules"
      nextHref="/tutorial/bucket-configuration/describe-show"
      nextLabel="DESCRIBE & SHOW"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        By default, primary lookups by document ID (like <code>FIND users &quot;jane&quot;</code>) resolve in $O(1)$ constant time. For arbitrary property filters (like <code>WHERE age &gt; 30</code> or <code>WHERE dept = &quot;Eng&quot;</code>), CleaveDB maintains secondary B+Tree indexes created via <strong><code>INDEX</code></strong>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Creating a single-field index</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Index a single field to accelerate equality and range queries:
      </p>
      <TutorialCodeBlock label="Single-field index">{`INDEX age ON emp`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        You can also use the parenthesized bucket-first syntax if you prefer:
      </p>
      <TutorialCodeBlock label="Bucket-first syntax">{`INDEX emp ON (age)`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Both forms construct a persistent B+Tree over the specified attribute in the background.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Composite multi-field indexes</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When queries filter or sort across multiple attributes simultaneously, declare a composite index across comma-separated keys:
      </p>
      <TutorialCodeBlock label="Composite index">{`INDEX dept, age ON emp`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Or equivalently:
      </p>
      <TutorialCodeBlock label="Composite index with parentheses">{`INDEX staff ON (dept, role)`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Composite indexes accelerate queries that match the leading prefix of the indexed tuple (e.g. filtering by <code>dept</code>, or filtering by both <code>dept</code> and <code>age</code>).
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Verifying active indexes</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        List all active indexes across your buckets using <code>SHOW INDEXES</code>:
      </p>
      <TutorialCodeBlock label="List indexes">{`SHOW INDEXES`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Returns a JSON payload with the total count and index specifications: <code>&#123;&quot;count&quot;: 2, &quot;data&quot;: [...]&#125;</code>.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Index maintenance overhead</h3>
        <p>
          B+Tree indexes in CleaveDB update atomically inside the Write-Ahead Log commit loop. Running <code>INDEX</code> twice on the same field creates a duplicate entry, so verify with <code>SHOW INDEXES</code> before re-indexing.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
