import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function EnforcePoliciesPage() {
  return (
    <TutorialPageShell
      sectionTitle="Enforce Security Policies"
      previousHref="/tutorial/security"
      previousLabel="Overview"
      nextHref="/tutorial/security/masking"
      nextLabel="Field masking (MASK)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        The <strong><code>ENFORCE SECURITY</code></strong> command defines access rules for documents within a bucket. It evaluates conditions against document fields, session context variables (like <code>my role</code> or <code>@user_id</code>), and graph bond relationships.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Basic policy declaration</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Name the policy, bind it to a target bucket, designate the operation scope (<code>read</code>, <code>write</code>, or <code>all</code>), and declare the predicate:
      </p>
      <TutorialCodeBlock label="Role-based admin access">{`ENFORCE SECURITY "adm" ON docs TO ALLOW all IF my role = "admin"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        You can also use the keyword form <code>ENFORCE SECURITY POLICY</code> or the alias <code>SHAPE POLICY</code> interchangeably.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Read vs. write policy behavior</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB handles read and write evaluations with different semantics tailored for security:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-zinc-600">
        <li>
          <strong className="text-zinc-800">Read Policies:</strong> If a read condition fails, the document is silently omitted from <code>FIND</code> and <code>SCOOP</code> results—preventing callers from inferring the existence of confidential records.
        </li>
        <li>
          <strong className="text-zinc-800">Write Policies:</strong> If a write condition fails on <code>POUR</code> or <code>CHANGE</code>, the operation immediately aborts with an error, preserving database integrity.
        </li>
      </ul>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Attribute-based comparison</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Gate access based on document attributes or user IDs:
      </p>
      <TutorialCodeBlock label="Security clearance level">{`ENFORCE SECURITY POLICY "lvl" ON docs TO ALLOW read IF level < 3`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Or bind writes to document ownership:
      </p>
      <TutorialCodeBlock label="Owner-only write gate">{`ENFORCE SECURITY "own" ON docs TO ALLOW write IF owner = @user_id`}</TutorialCodeBlock>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Graph-Based Access Control (GBAC)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Because CleaveDB is a native graph database, access control can traverse relationships in real time:
      </p>
      <TutorialCodeBlock label="Graph-based relationship check">{`ENFORCE SECURITY "owner_only" ON "documents" TO ALLOW read IF bonded as "owner" to my user_id`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The engine evaluates whether an active bond exists between the document and the caller&apos;s ID before granting read access.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Kernel-level evaluation</h3>
        <p>
          Security policies are verified before documents are serialized into response buffers, eliminating timing side-channels and data leakage across multi-tenant workloads.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
