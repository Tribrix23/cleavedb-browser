import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function SessionContextPage() {
  return (
    <TutorialPageShell
      sectionTitle="Session Context (SET)"
      previousHref="/tutorial/security/rate-limiting"
      previousLabel="Rate limiting (LIMIT)"
      nextHref="/tutorial/security/authenticate"
      nextLabel="Authenticate (AUTHENTICATE)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When clients interact with CleaveDB over TCP sockets or WebSockets, each connection maintains an isolated session state. The <strong><code>SET</code></strong> command injects arbitrary key-value variables into this active session context.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Injecting session variables</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Assign strings, numbers, or identifiers directly to session variables:
      </p>
      <TutorialCodeBlock label="Define session variables">{`SET role = "viewer"
SET tenant_id = "acme_corp"
SET max_retries = 5`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        These variables persist in memory for the duration of the client connection and are instantly available to all security policies and rate limits.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Referencing context in policies</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        In <code>ENFORCE SECURITY</code> and <code>MASK</code> statements, session variables can be referenced using either <code>my &lt;var&gt;</code> or <code>@&lt;var&gt;</code>:
      </p>
      <TutorialCodeBlock label="Evaluate session context in policies">{`-- Evaluates 'my role':
MASK "salary" ON staff IF my role = "viewer"

-- Evaluates '@tenant_id':
ENFORCE SECURITY "tenant_isolation" ON orders TO ALLOW read IF tenant = @tenant_id`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Because context is evaluated dynamically per query, changing a session variable with <code>SET</code> immediately alters which rows and fields the client is permitted to view.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Connection isolation</h3>
        <p>
          Session variables are strictly private to each connection socket. Setting <code>SET role = &quot;admin&quot;</code> in one client session has zero effect on parallel client sessions.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
