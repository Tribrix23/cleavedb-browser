import Link from "next/link";

import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function CreatingRelationshipsOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Creating Relationships (LINK) — Overview"
      previousHref="/tutorial/deleting-recovering/drop-restore"
      previousLabel="Drop & restore buckets"
      nextHref="/tutorial/relationships/basic-bonds"
      nextLabel="Basic bonds"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In traditional relational databases, connecting data across different tables requires foreign keys, junction tables, and expensive multi-table <code>JOIN</code> operations. CleaveDB replaces this friction with native graph relationships known as <strong>Bonds</strong>. Using the <code>LINK</code> command, documents in any bucket can be directly connected with rich, semantically labeled edges.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Zero-cost relationship traversals</h3>
        <p>
          Bonds are physical graph pointers within CleaveDB’s memory and storage engine. Traversing from one document to another happens at pointer-dereference speed, avoiding the quadratic overhead of relational Cartesian joins even across millions of connected entities.
        </p>
      </aside>

      <p className="mb-6 leading-relaxed text-zinc-600">
        Bonds in CleaveDB are far more capable than standard graph edges. Rather than being mere static links, bonds are richly configurable objects with functional attributes:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Directionality &amp; Mutuality:</strong> Create one-way directed edges or symmetric bidirectional bonds with a single statement.
        </li>
        <li>
          <strong className="text-zinc-800">Conditional Activation:</strong> Define dormant edges that activate only when source or target document attributes satisfy specific criteria.
        </li>
        <li>
          <strong className="text-zinc-800">Lifecycle &amp; TTL:</strong> Assign time-to-live expirations that automatically sever temporary access or guest relationships.
        </li>
        <li>
          <strong className="text-zinc-800">Exclusivity:</strong> Guarantee single active assignments (such as primary account owner or active subscription tier).
        </li>
        <li>
          <strong className="text-zinc-800">Weights &amp; Confidence:</strong> Attach floating-point weights (0.0 to 1.0) for recommendation engines, affinity graphs, and neuro-symbolic search.
        </li>
      </ul>

      <aside className="mb-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">SQL perspective</h3>
        <p>
          In SQL, connecting a user to an organization requires defining foreign keys or an intermediary <code>user_organizations</code> table, and reading it requires <code>SELECT ... FROM users JOIN user_organizations ON ... JOIN organizations ON ...</code>. In CleaveQL, <code>LINK &quot;users:jane&quot; TO &quot;orgs:acme&quot; AS &quot;member&quot;</code> stores the connection natively, and <code>FIND &quot;member&quot; OF &quot;users:jane&quot;</code> retrieves it instantly.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the LINK relationship topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Each lesson provides practical CleaveQL examples covering the complete relationship toolkit:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/basic-bonds">
            Basic bonds: connect two documents with directed semantic labels.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/mutual-bonds">
            Mutual bonds: create symmetric, bidirectional connections in both directions.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/conditional-bonds">
            Conditional bonds: create dormant edges that activate based on document field values.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/expiring-bonds">
            Expiring bonds: set automatic time-to-live expirations on temporary relationships.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/exclusive-bonds">
            Exclusive bonds: enforce single-edge constraints per label and source document.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/cascade">
            Cascade on delete: configure automatic deletion cascades when source documents are drained.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/confidence-affinity">
            Confidence &amp; affinity: attach probabilistic scores and affinity weights to graph edges.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/relationships/sever">
            Removing bonds (SEVER): disconnect specific labeled edges or unlink documents completely.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
