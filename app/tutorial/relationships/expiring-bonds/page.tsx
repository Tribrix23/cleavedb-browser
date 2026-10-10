import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ExpiringBondsPage() {
  return (
    <TutorialPageShell
      sectionTitle="Expiring Bonds"
      previousHref="/tutorial/relationships/conditional-bonds"
      previousLabel="Conditional bonds"
      nextHref="/tutorial/relationships/exclusive-bonds"
      nextLabel="Exclusive bonds"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Temporary permissions, guest invites, trial subscriptions, and short-lived tokens often require relationships that expire automatically after a set duration. CleaveDB supports native TTL (time-to-live) expiration on graph edges via <code>EXPIRING IN</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Setting a time-bound bond</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Specify a TTL duration using standard time units (<code>SECONDS</code>, <code>MINUTES</code>, <code>HOURS</code>, or <code>DAYS</code>):
      </p>
      <TutorialCodeBlock label="Grant temporary access">{`LINK "users:guest" TO "rooms:conf_a" AS "access" EXPIRING IN 4 HOURS`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        CleaveDB timestamps the edge and records its expiration deadline in the graph catalog.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Short-lived session bonds</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Expiring bonds are ideal for associating session tokens with active accounts:
      </p>
      <TutorialCodeBlock label="Session authentication bond">{`LINK "sessions:sess_99" TO "users:jane" AS "active_session" EXPIRING IN 30 MINUTES`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Traversals verifying active sessions will immediately treat the edge as expired once the 30-minute threshold passes.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Automatic background garbage collection</h3>
        <p>
          Expired bonds are ignored during traversals immediately upon reaching their deadline. In the background, CleaveDB&apos;s asynchronous graph cleaner severs expired edge records and reclaims memory without pausing active queries.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
