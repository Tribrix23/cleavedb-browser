import Link from "next/link";
import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";

export default function SecurityOverviewPage() {
  return (
    <TutorialPageShell
      sectionTitle="Security & Access Control — Overview"
      previousHref="/tutorial/bucket-configuration/webhooks"
      previousLabel="Webhooks"
      nextHref="/tutorial/security/enforce"
      nextLabel="Enforce security policies"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In traditional database architectures, security rules and access gates are often implemented in fragile external application middleware. CleaveDB moves access control directly into the database engine through native <strong>Data-Level Security (DLS)</strong>—also referred to as <strong>Document Security Level (DSL) Policies</strong>.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">What is Data-Level Security (DLS)?</h3>
        <p>
          <strong>DLS (Data-Level Security)</strong> is CleaveDB&apos;s kernel-level policy engine. Every query—whether reading documents, traversing graph bonds, or mutating state—is evaluated against declarative access rules directly inside the CleaveQL AST interpreter. Unauthorized rows are filtered before reaching memory buffers, and invalid writes are rejected before entering the Write-Ahead Log.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">The DLS security triad</h3>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">GBAC</h4>
          <p className="text-xs text-zinc-600">
            <strong>Graph-Based Access Control:</strong> Determines permissions based on relationship topology—granting read or write rights only if an entity is connected by specific graph bonds (e.g., <code>bonded as &quot;owner&quot;</code>).
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">RBAC</h4>
          <p className="text-xs text-zinc-600">
            <strong>Role-Based Access Control:</strong> Compares active session roles and attributes (such as <code>my role = &quot;admin&quot;</code>) against document properties.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900">Dynamic Masking</h4>
          <p className="text-xs text-zinc-600">
            <strong>Field-Level Redaction:</strong> Instead of hiding entire documents, conditionally redacts sensitive fields (like salaries or SSNs) based on the caller&apos;s identity.
          </p>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Security command suite</h3>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-50">
              <th className="py-2.5 px-4 font-semibold">Command</th>
              <th className="py-2.5 px-4 font-semibold">Purpose</th>
              <th className="py-2.5 px-4 font-semibold">Canonical example</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">ENFORCE SECURITY</td>
              <td className="py-2.5 px-4">Declarative read/write policy gate</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">ENFORCE SECURITY &quot;adm&quot; ON docs TO ALLOW all IF my role = &quot;admin&quot;</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">MASK</td>
              <td className="py-2.5 px-4">Conditionally redact sensitive JSON fields</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">MASK &quot;salary&quot; ON staff IF my role != &quot;admin&quot;</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">LIMIT</td>
              <td className="py-2.5 px-4">Rate limiting per role per minute</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">LIMIT 100 QUERIES PER MINUTE FOR &quot;viewer&quot;</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">SET</td>
              <td className="py-2.5 px-4">Inject session context variables</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">SET role = &quot;viewer&quot;, tenant_id = &quot;acme&quot;</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">AUTHENTICATE</td>
              <td className="py-2.5 px-4">Set active caller identity</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">AUTHENTICATE AS &quot;david&quot;</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium font-mono text-xs text-blue-600">DROP SECURITY</td>
              <td className="py-2.5 px-4">Revoke or delete an existing policy rule</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">DROP SECURITY &quot;adm&quot; ON docs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Explore the Security topics</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Review each guide to implement end-to-end security in CleaveDB:
      </p>
      <ul className="list-disc space-y-2 pl-6 leading-relaxed text-blue-700">
        <li>
          <Link className="hover:underline" href="/tutorial/security/enforce">
            Enforce security policies: configure GBAC and RBAC gates on read and write operations.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/security/masking">
            Field masking (MASK): redact confidential attributes dynamically without hiding documents.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/security/rate-limiting">
            Rate limiting (LIMIT): throttle queries per minute and defend against denial-of-service spikes.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/security/session-context">
            Session context (SET): pass arbitrary variables into active client sessions for real-time policy evaluation.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/security/authenticate">
            Authenticate (AUTHENTICATE): set caller identity and enforce multi-tenant isolation.
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/tutorial/security/drop-policy">
            Remove policies: cleanly drop active security rules and field masks.
          </Link>
        </li>
      </ul>
    </TutorialPageShell>
  );
}
