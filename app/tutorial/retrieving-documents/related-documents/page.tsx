import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function RelatedDocumentsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Related Documents"
      previousHref="/tutorial/retrieving-documents/text-and-meaning"
      previousLabel="Text and meaning search"
      nextHref="/tutorial/retrieving-documents/historical-queries"
      nextLabel="History and candidate bonds"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A document can point to other documents through CleaveDB relationships, called bonds. SCOOP can follow those bonds during a read, so the application can ask for the connected people or records directly instead of first retrieving an ID and stitching the next lookup together itself. This is the read-side companion to creating relationships with <code>LINK</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Follow one named bond</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Name the relationship and give the source document address to retrieve its related targets. The label describes the connection to follow; the source address combines a bucket and document ID. For example, if <code>users:jane</code> has a bond labeled <code>crush</code>, the query asks for documents connected through that bond.
      </p>
      <TutorialCodeBlock label="Retrieve documents through a bond">{`SCOOP "crush" OF "users:jane"
SCOOP RELATED "friend" FROM "users:jane"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The first line is the direct bond form. The reference also documents the second <code>RELATED ... FROM ...</code> form as a legacy spelling. When writing new examples, prefer the direct form so the relationship label and source are easy to see at a glance.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Follow a chain across documents</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        A multi-hop query follows more than one relationship in a single request. Consider asking, “Whom does Jane’s boss know?” The chain begins at Jane, follows the <code>boss</code> relationship, then follows <code>knows</code> from that person. Read the expression from right to left: the relationship nearest the bucket is followed first.
      </p>
      <TutorialCodeBlock label="Follow a multi-hop relationship">{`SCOOP THE knows OF THE boss OF users "jane"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Multi-hop traversal is useful when an answer lives beyond the first connection—for example, a team member’s manager’s group, or a customer’s account’s owner. CleaveDB de-duplicates related results by target document, so the same target reached through more than one path appears once in the result.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">A relationship query still observes visibility</h3>
        <p>
          A bond provides a path to another document; it does not bypass the caller’s read permissions. CleaveDB applies its security rules to documents returned by retrieval, and documents in <code>_rubbish</code> after <code>DRAIN</code> are not included.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
