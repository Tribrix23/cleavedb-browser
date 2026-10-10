import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function AuthenticatePage() {
  return (
    <TutorialPageShell
      sectionTitle="Authenticate (AUTHENTICATE)"
      previousHref="/tutorial/security/session-context"
      previousLabel="Session context (SET)"
      nextHref="/tutorial/security/drop-policy"
      nextLabel="Remove policies"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        The <strong><code>AUTHENTICATE</code></strong> command sets or switches the active user identity for the current session. In CleaveDB, this user context governs access control policies, rate limits, audit logs, and multi-tenant namespace isolation.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Setting caller identity</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Authenticate using a plain username string or a bucket-qualified document identifier:
      </p>
      <TutorialCodeBlock label="Authenticate session">{`AUTHENTICATE AS "david"`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Or with the qualified document notation:
      </p>
      <TutorialCodeBlock label="Qualified document identity">{`AUTHENTICATE AS "users:david"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Once authenticated, the session adopts the identity <code>david</code>. Any policy evaluating <code>@user_id</code> or matching bond ownership (e.g. <code>bonded as &quot;owner&quot; to my user_id</code>) uses this identity automatically.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">System impact of authentication</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Switching the authenticated user alters several core database behaviors:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Security Gate Resolution:</strong> DLS policies automatically re-evaluate permissions against the new user ID.
        </li>
        <li>
          <strong className="text-zinc-800">Rate Limits:</strong> The session binds to the rate limit quota configured for the user&apos;s assigned role.
        </li>
        <li>
          <strong className="text-zinc-800">Audit Trail Attribution:</strong> When <code>AUDITED</code> buckets record modifications, the <code>tenant</code> and <code>user</code> fields in the <code>_audit_*</code> records record the active caller.
        </li>
        <li>
          <strong className="text-zinc-800">Webhook Context:</strong> Outgoing Change Data Capture (CDC) HTTP requests include the user identity in event payloads.
        </li>
      </ul>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Developer mode & system buckets</h3>
        <p>
          Internal collections starting with an underscore (like <code>_rubbish</code> and <code>_audit_orders</code>) are hidden from standard authenticated users. Accessing or clearing system logs requires authenticating with the developer master password.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
