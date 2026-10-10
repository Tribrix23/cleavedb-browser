import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function DocumentLinksPage() {
  return (
    <TutorialPageShell
      sectionTitle="Document & URL Links (LINK)"
      previousHref="/tutorial/relationships/basic-bonds"
      previousLabel="Basic bonds (BOND)"
      nextHref="/tutorial/relationships/mutual-bonds"
      nextLabel="Mutual bonds"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        While <code>BOND</code> creates semantic, weighted, and lifecycle-managed graph relationships, <strong><code>LINK</code></strong> is CleaveDB&apos;s lightweight mechanism for direct structural document references and external web resource links. Links are stored in the dedicated <code>_links</code> collection.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Unlabelled document links</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Unlike <code>BOND</code>, a relationship label is <strong>optional</strong> on <code>LINK</code>. If omitted, the label automatically defaults to <code>&quot;linked&quot;</code>:
      </p>
      <TutorialCodeBlock label="Direct document link">{`LINK "users:jane" TO "users:juan"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        You can also supply an optional custom label when desired: <code>LINK &quot;users:jane&quot; TO &quot;users:juan&quot; AS &quot;mentor&quot;</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">External URL references</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        <code>LINK</code> uniquely supports external HTTP and HTTPS URLs as targets, enabling documents to reference remote API endpoints, GitHub profiles, or web resources:
      </p>
      <TutorialCodeBlock label="Link to external web resource">{`LINK "users:jane" TO "https://github.com/jane"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        External URLs are validated as syntactically correct URLs and are exempt from local bucket existence checks.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Inspecting and finding links</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Query all links in the database or inspect outgoing links from a specific document:
      </p>
      <TutorialCodeBlock label="Inspect links">{`-- List all document and URL links in the database
SHOW LINKS

-- Show all links originating from Jane
FIND LINKS OF "users:jane"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        This returns link records from <code>_links</code> showing target IDs or URLs.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Removing links with UNLINK</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Links are removed using the <strong><code>UNLINK</code></strong> command:
      </p>
      <TutorialCodeBlock label="Remove links">{`-- Unlink two documents
UNLINK "users:jane" FROM "users:juan"

-- Unlink an external URL
UNLINK "users:jane" FROM "https://github.com/jane"`}</TutorialCodeBlock>

      <aside className="mt-8 rounded-lg border border-amber-200 bg-amber-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-amber-950">LINK vs BOND modifiers</h3>
        <p className="text-sm text-amber-900/90">
          Modifiers such as <code>WITH CONFIDENCE</code>, <code>IF</code> conditions, and <code>EXPIRING IN</code> TTL are <strong>not supported</strong> on <code>LINK</code>. Attempting to use them will result in a parser error directing you to use <code>BOND</code> instead.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
