import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function RateLimitingPage() {
  return (
    <TutorialPageShell
      sectionTitle="Rate Limiting (LIMIT)"
      previousHref="/tutorial/security/masking"
      previousLabel="Field masking (MASK)"
      nextHref="/tutorial/security/session-context"
      nextLabel="Session context (SET)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        To protect cluster resources against scraping, runaway background loops, or denial-of-service traffic, CleaveDB provides role-based query throttling via <strong><code>LIMIT</code></strong>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Setting query quotas per minute</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Specify the query volume, time window (per minute), and target role:
      </p>
      <TutorialCodeBlock label="Throttle viewer role">{`LIMIT 100 QUERIES PER MINUTE FOR "viewer"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        If an authenticated user with role <code>viewer</code> exceeds 100 queries within any rolling 60-second window, subsequent requests are rejected immediately with a <code>429 Rate limit exceeded</code> error.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Strict throttling and complete blocks</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can assign different allowances for administrative or unauthenticated roles:
      </p>
      <TutorialCodeBlock label="Throttling and blocking">{`-- Restrict heavy administrative actions:
LIMIT 5 QUERIES PER MINUTE FOR admin

-- Block guest requests entirely:
LIMIT 0 QUERIES PER MINUTE FOR "guest"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Setting the quota to <code>0</code> prevents any query execution for that role.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Connection-level enforcement</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Rate limits are tracked in memory by the server&apos;s connection worker. Both TCP client sockets and persistent WebSocket connection loops check quota buckets prior to AST parsing, ensuring blocked queries consume virtually zero engine CPU.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Multi-tenant protection</h3>
        <p>
          Combined with <code>AUTHENTICATE</code> and session context, rate limits prevent a single noisy tenant or unauthorized guest from degrading query latency for other users on the cluster.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
