import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function CrossBucketPatternsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Cross-Bucket Patterns"
      previousHref="/tutorial/pattern-matching/edge-directions"
      previousLabel="Edge directions"
      nextHref="/tutorial/pattern-matching/bond-history"
      nextLabel="Bond history (FIND HOW)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In relational databases, querying across different tables requires foreign key constraints, index lookups, and multi-table joins. In CleaveDB, document bonds are bucket-qualified memory pointers (e.g. <code>&quot;staff:ana&quot;</code> to <code>&quot;places:mnl&quot;</code>). <code>FIND PATTERN</code> traverses seamlessly across different bucket collections without schema barriers.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Connecting two different buckets</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Consider a relationship between staff members and geographic places:
      </p>
      <TutorialCodeBlock label="Cross-bucket bond and pattern">{`-- Bond staff member to a location:
BOND "staff:ana" TO "places:mnl" AS "lives_in"

-- Query across buckets:
FIND PATTERN staff AS s LINKED VIA "lives_in" TO places AS p`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB inspects the <code>staff</code> bucket, dereferences the <code>lives_in</code> bond pointer into the <code>places</code> bucket, and returns paired subgraphs: <code>s = Ana</code>, <code>p = Manila</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Multi-bucket relationship chains</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can chain multiple distinct buckets along a single path:
      </p>
      <TutorialCodeBlock label="Three-bucket chain">{`FIND PATTERN users AS u
  LINKED VIA "purchased" TO orders AS o
  LINKED VIA "contains" TO products AS p
  WHERE p.category = "Electronics" AND u.country = "PH"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Here, CleaveDB steps through three completely separate buckets (<code>users</code>, <code>orders</code>, and <code>products</code>). The query optimizer filters candidates by selective conditions on any bucket in the chain and walks intermediate bond pointers with zero join overhead.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Heterogeneous mixed links</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Because CleaveDB bonds are polymorphic, different documents within the same bucket can bond to entirely different target buckets under the same or different labels:
      </p>
      <TutorialCodeBlock label="Mixed relationships chain">{`FIND PATTERN staff AS a
  LINKED VIA "manages" TO staff AS b
  LINKED VIA "assigned_to" TO projects AS prj
  WHERE prj.status = "active"`}</TutorialCodeBlock>

      <aside className="mt-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Why cross-bucket traversal is instant</h3>
        <p>
          Unlike SQL query planners that must estimate table cardinality and select nested loops vs hash joins, CleaveDB stores raw 64-bit target document offsets directly in the bond structure. Hops between different buckets execute at memory dereference speed.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
