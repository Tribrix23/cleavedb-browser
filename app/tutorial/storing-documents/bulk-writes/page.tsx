import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function BulkWritesPage() {
  return (
    <TutorialPageShell
      sectionTitle="Bulk Writes"
      previousHref="/tutorial/storing-documents/creating-id"
      previousLabel="Creating ID"
      nextHref="/tutorial/storing-documents/expiring-documents"
      nextLabel="Expiring documents"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When a handful of records are ready at the same time, writing them one by one can turn a simple import into a long procession of commands. <code>POUR MANY</code> accepts an array of JSON objects and sends the whole group to one bucket in a single statement. It suits a first load of user profiles, a small catalog import, or another set of documents that belong together.
      </p>

      <TutorialCodeBlock label="Add two users together">{`POUR MANY INTO users [{"name": "A"}, {"name": "B"}]`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">How to read the batch</h3>
      <p className="mb-6 leading-relaxed text-zinc-600">
        <code>POUR MANY</code> starts the bulk write, <code>INTO users</code> chooses the shared destination, and the square brackets contain the documents to write. Each object is a separate document payload; in this example, both user records are sent to <code>users</code>. Add or remove objects in the array to match the size of the group you need to load.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Validation keeps the batch together</h3>
        <p>If the bucket has <code>GUARD</code> rules, CleaveDB checks every document before writing any of them. If even one document is rejected, the entire batch is left unwritten.</p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">When to reach for POUR MANY</h3>
      <p className="leading-relaxed text-zinc-600">
        Choose it when the documents share a destination and should pass validation as a group. If one item fails a rule, correct its fields and submit the batch again; you will not be left guessing which earlier items made it into the bucket. For records that belong in different buckets or should be written at different times, use separate POUR commands so each write has its own destination and timing.
      </p>
    </TutorialPageShell>
  );
}
