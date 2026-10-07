import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ExpiringDocumentsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Expiring Documents"
      previousHref="/tutorial/storing-documents/bulk-writes"
      previousLabel="Bulk writes"
      nextHref="/tutorial/storing-documents/login-secrets"
      nextLabel="Login secrets"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        A session token has a useful life; a verification code has a much shorter one. For records that should not remain available indefinitely, add <code>EXPIRES IN</code> to the POUR statement. This sets a time-to-live (TTL) on the document when it is written. Give the duration as a number and one supported unit: <code>SECONDS</code>, <code>MINUTES</code>, <code>HOURS</code>, or <code>DAYS</code>.
      </p>

      <TutorialCodeBlock label="Session and verification code lifetimes">{`POUR INTO sessions "token_123" {"user": "alice"} EXPIRES IN 5 MINUTES
POUR INTO verification RANDOM {"code": 5555} EXPIRES IN 24 HOURS`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Read the examples</h3>
      <p className="mb-6 leading-relaxed text-zinc-600">
        The first line stores Alice’s session under the ID <code>token_123</code> and gives it a five-minute lifetime. The second creates a verification document with a generated ID and a 24-hour lifetime. In both cases, the expiry duration belongs to that specific document write; choose it to match how long that particular piece of data should be useful.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Choose the lifetime deliberately</h3>
        <p>Use seconds or minutes for brief-lived values, and hours or days for data with a longer window. CleaveDB records a hidden <code>_expires_at</code> timestamp; the server’s background worker checks for expired documents every five seconds and removes them automatically. You do not need a separate cleanup query. A very long TTL defeats the point of temporary data, while a very short one can expire a record before its intended use.</p>
      </aside>
    </TutorialPageShell>
  );
}
