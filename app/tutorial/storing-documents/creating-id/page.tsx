import Link from "next/link";

import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function CreatingIdPage() {
  return (
    <TutorialPageShell
      sectionTitle="Creating ID"
      previousHref="/tutorial/storing-documents"
      previousLabel="POUR overview"
      nextHref="/tutorial/storing-documents/bulk-writes"
      nextLabel="Bulk writes"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Every document needs two coordinates: a bucket to group it with similar records, and an ID to pick out one record from that group. A user profile might live in the <code>users</code> bucket under the ID <code>jane</code>, giving it the readable address <code>users:jane</code>. When you use <code>POUR</code>, choose an ID your application can recognize, or let CleaveDB generate one when the data arrives without a natural key.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Use an ID your application already knows</h3>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Put the ID after the bucket name when there is already a stable identifier to use—a username, an order number, or a key from another system. This is useful when you expect to look up the document by that same value later: Jane’s profile remains <code>users:jane</code>, easy for both the application and its developers to recognize. The bucket name may be unquoted or quoted; both forms in this example target <code>users</code>.
      </p>
      <TutorialCodeBlock label="Choose document IDs">{`POUR INTO users "jane" {"name": "Jane", "age": 25, "city": "Manila"}
POUR INTO "users" "pedro" {"name": "Pedro"}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Read the first line in three parts: <code>users</code> is the destination bucket, <code>"jane"</code> is the chosen document ID, and the JSON object is Jane’s data. The second line does the same for Pedro, with quotation marks around the bucket name. CleaveQL uses the bucket and ID together as the document address; the ID alone is only unique within its bucket.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Let CleaveDB generate an ID</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Some records arrive without a natural key. A click event, a log entry, or an incoming message still needs its own document address, even when the application has no useful ID to supply. Put <code>RANDOM</code> where the ID would normally go; CleaveDB generates a cryptographic 64-bit hexadecimal ID for the document. Your application can send the event it observed and leave the key creation to the database.
      </p>
      <TutorialCodeBlock label="Generate an ID">{`POUR INTO events RANDOM {"type": "click", "page": "/home"}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Here, <code>events</code> names the destination, <code>RANDOM</code> asks CleaveDB to supply the ID, and the JSON describes what happened. Use an explicit ID when it carries meaning or must match an existing key; use <code>RANDOM</code> when you simply need CleaveDB to give each new document its own address.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Name the bucket</h3>
      <p className="leading-relaxed text-zinc-600">
        The bucket follows <code>INTO</code> and tells CleaveDB where the document belongs. Choose a name that makes the collection’s purpose obvious: <code>users</code> for profiles, <code>events</code> for activity, or <code>products</code> for a catalog. You can begin writing without a setup step; if the bucket does not exist, CleaveDB creates it as part of the POUR. See the <Link className="text-blue-700 hover:underline" href="/tutorial/storing-documents">POUR overview</Link> for more about buckets and document storage.
      </p>
    </TutorialPageShell>
  );
}
