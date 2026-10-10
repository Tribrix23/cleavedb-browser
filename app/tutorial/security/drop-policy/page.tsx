import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function DropPolicyPage() {
  return (
    <TutorialPageShell
      sectionTitle="Remove Policies (DROP SECURITY)"
      previousHref="/tutorial/security/authenticate"
      previousLabel="Authenticate (AUTHENTICATE)"
      nextHref="/tutorial/transactions"
      nextLabel="ACID Transactions"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When organizational roles change, API permissions evolve, or debugging requires temporary clearance, existing security rules and field masks can be revoked using <strong><code>DROP SECURITY</code></strong>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Dropping an access control policy</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        To delete a named security policy from a bucket, specify the policy name and target bucket:
      </p>
      <TutorialCodeBlock label="Remove security policy">{`DROP SECURITY "lvl" ON docs`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The policy rule is removed from the bucket&apos;s active policy catalog, and subsequent queries on <code>docs</code> no longer enforce that clearance condition.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Removing a field mask</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Dynamic field masks registered via <code>MASK</code> are also removed using <code>DROP SECURITY</code> targeting the masked field name:
      </p>
      <TutorialCodeBlock label="Remove field mask">{`DROP SECURITY "secret" ON docs`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Once dropped, the <code>secret</code> field is returned in full JSON payloads for all callers whose read access is otherwise permitted.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Immediate cluster-wide effect</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Because CleaveDB evaluates DLS policies dynamically inside the AST interpreter:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>No database reload or cache invalidation step is necessary.</li>
        <li>Active client connections immediately reflect the policy removal on their very next query.</li>
        <li>Audit logs retain the historical record of policy creation and removal for compliance auditing.</li>
      </ul>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Zero-downtime governance</h3>
        <p>
          Managing access policies via CleaveQL commands rather than static configuration files enables infrastructure-as-code automation, where deployment scripts migrate and update permissions without taking the cluster offline.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
