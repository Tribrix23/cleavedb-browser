import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function FindBondLookupsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Following a Bond"
      previousHref="/tutorial/find"
      previousLabel="FIND overview"
      nextHref="/tutorial/find/graph-patterns"
      nextLabel="Graph patterns"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Documents can be connected by named, directed relationships called bonds. A bond lookup starts from a document the application already knows, follows one label, and returns the connected document. It is a direct way to answer a question such as “Who manages John?” without making the application inspect relationship records and then issue a second lookup itself.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Name the relationship and its source</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Put the bond label after <code>FIND</code> and give its source document as a bucket-and-ID address. In the example, <code>employees:john</code> is the source and <code>manager</code> is the connection CleaveDB should follow.
      </p>
      <TutorialCodeBlock label="Retrieve John’s manager">{`FIND "manager" OF "employees:john"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        A relationship query is most useful when the starting document is already known and the application wants the document or documents on the other side of one named bond. It keeps the relationship in the database’s graph model rather than asking application code to reconstruct it from hidden storage details.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">What CleaveDB does with the lookup</h3>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Bonds are kept in CleaveDB’s internal <code>_bonds</code> collection with source, target, and label information. For a direct lookup, the engine matches the source address and label, obtains the target document ID, and retrieves that target document. The relationship record is an implementation detail; your query can stay focused on the source and the connection you mean.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">The bond is a path, not permission</h3>
        <p>
          Following a relationship does not grant access to its target. The caller’s tenant scope and read rules still apply to the documents returned by CleaveDB.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
