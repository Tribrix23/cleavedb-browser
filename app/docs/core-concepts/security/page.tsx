/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import { ArrowRight, EyeOff, Fingerprint, KeyRound, Layers3, ShieldCheck } from "lucide-react";

const codeBlock = "rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-5 font-mono text-sm leading-7 text-zinc-200 overflow-x-auto whitespace-pre";

function CodeBlock({ children, label = "CleaveQL" }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-sm">
      <div className="border-b border-zinc-800 px-5 py-3 text-xs font-medium tracking-wide text-zinc-500">{label}</div>
      <pre className={codeBlock}><code>{children}</code></pre>
    </div>
  );
}

function ConceptCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">{icon}</span>
        <h3 className="font-semibold tracking-tight text-zinc-900">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-zinc-600">{children}</div>
    </div>
  );
}

export default function DocumentSecurityPage() {
  return (
    <article>
      <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-blue-600">
        <ShieldCheck className="h-4 w-4" /> Core Concepts
      </div>
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900">Document Security (DLS)</h1>
      <p className="mb-8 text-lg leading-relaxed text-zinc-600">
        CleaveDB combines automatic tenant isolation with document and field-level policies. Access rules are evaluated in the query interpreter before results are returned to a client.
      </p>

      <div className="mb-12 rounded-2xl border border-blue-100 bg-blue-50/70 p-6 md:p-8">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm"><Layers3 className="h-5 w-5" /></div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Two security layers</h2>
        </div>
        <p className="leading-relaxed text-zinc-600">
          <strong className="text-zinc-800">Tenant isolation</strong> separates each user’s documents, bonds, and policies. <strong className="text-zinc-800">Security policies</strong> further control which actions or fields are available within that tenant. Tenant isolation applies even to a developer superuser operating in another user’s session.
        </p>
      </div>

      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">Automatic tenant isolation</h2>
      <p className="mb-5 leading-relaxed text-zinc-600">
        Documents are namespaced with the authenticated user’s tenant ID. Reads are filtered at the engine level on every scan, so an ordinary query only returns data belonging to the current tenant.
      </p>
      <CodeBlock label="Tenant namespace example">
        <span className="text-zinc-500"># David writes a document</span>{"\n"}
        <span className="text-blue-400">POUR INTO</span> products <span className="text-emerald-300">"laptop"</span> &#123;<span className="text-emerald-300">"price"</span>: 999&#125;{"\n"}
        <span className="text-zinc-500"># Stored with David's tenant namespace: products:david.laptop</span>{"\n\n"}
        <span className="text-zinc-500"># John runs the same bucket scan</span>{"\n"}
        <span className="text-blue-400">FIND</span> products{"\n"}
        <span className="text-zinc-500"># John's result does not include David's document</span>
      </CodeBlock>
      <div className="mb-14 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">
        <strong>Important:</strong> tenant isolation is not a substitute for application-level authorization. Authenticate each connection with the intended user account and define policies for the additional access rules your application requires.
      </div>

      <img 
        src="/dls.png" 
        alt="Document Level Security" 
        className="w-full h-auto rounded-2xl border border-zinc-200/80 shadow-sm mb-12"
      />

      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">Policy controls</h2>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Use <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm text-zinc-800">ENFORCE SECURITY</code> for action authorization and <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm text-zinc-800">SHAPE POLICY</code> for read filtering. Conditions can refer to the current user, role, document fields, or graph bonds.
      </p>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <ConceptCard icon={<KeyRound className="h-5 w-5" />} title="Role-based (RBAC)">
          Check a session role before allowing an operation, such as limiting report writes to admins.
        </ConceptCard>
        <ConceptCard icon={<Fingerprint className="h-5 w-5" />} title="Graph-based (GBAC)">
          Use a live graph bond to authorize access, such as requiring the requester to be linked as the document owner.
        </ConceptCard>
        <ConceptCard icon={<ShieldCheck className="h-5 w-5" />} title="Field and context rules">
          Compare document fields with session context, for example restricting reads to the user’s department.
        </ConceptCard>
      </div>

      <CodeBlock>
        <span className="text-zinc-500">-- Allow reads when the requester is bonded as the owner</span>{"\n"}
        <span className="text-blue-400">ENFORCE SECURITY</span> <span className="text-emerald-300">"owner_only"</span> <span className="text-purple-400">ON</span> <span className="text-emerald-300">"documents"</span>{"\n"}
        <span className="text-purple-400">TO ALLOW</span> read <span className="text-pink-400">IF</span> bonded <span className="text-pink-400">as</span> <span className="text-emerald-300">"owner"</span> <span className="text-purple-400">to</span> my user_id{"\n\n"}
        <span className="text-zinc-500">-- Restrict report writes to admins</span>{"\n"}
        <span className="text-blue-400">ENFORCE SECURITY</span> <span className="text-emerald-300">"role_gate"</span> <span className="text-purple-400">ON</span> <span className="text-emerald-300">"reports"</span>{"\n"}
        <span className="text-purple-400">TO ALLOW</span> write <span className="text-pink-400">IF</span> my role = <span className="text-emerald-300">"admin"</span>{"\n\n"}
        <span className="text-zinc-500">-- Only expose employees in the user's department</span>{"\n"}
        <span className="text-blue-400">SHAPE POLICY</span> <span className="text-emerald-300">"dept_filter"</span> <span className="text-purple-400">ON</span> <span className="text-emerald-300">"employees"</span>{"\n"}
        <span className="text-purple-400">FOR READ USING</span> department <span className="text-pink-400">IS</span> @user_department
      </CodeBlock>

      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">Dynamic field masking</h2>
      <p className="mb-5 leading-relaxed text-zinc-600">
        Mask sensitive fields conditionally based on the session. Masked fields are removed from the JSON response rather than merely hidden in the UI, so they are not sent over the wire to the client.
      </p>
      <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-relaxed text-emerald-900">
        <EyeOff className="mt-0.5 h-5 w-5 shrink-0" />
        <p><strong>Server-side effect:</strong> clients receive no value for a field that was removed by masking. Do not rely on client-side presentation logic as the protection boundary.</p>
      </div>
      <CodeBlock>
        <span className="text-zinc-500">-- Hide salary from users who are not admins</span>{"\n"}
        <span className="text-blue-400">MASK</span> <span className="text-emerald-300">"salary"</span> <span className="text-purple-400">ON</span> <span className="text-emerald-300">"employees"</span> <span className="text-pink-400">IF</span> my role <span className="text-pink-400">IS NOT</span> <span className="text-emerald-300">"admin"</span>{"\n\n"}
        <span className="text-zinc-500">-- Hide patient SSNs from users who are not doctors</span>{"\n"}
        <span className="text-blue-400">MASK</span> <span className="text-emerald-300">"ssn"</span> <span className="text-purple-400">ON</span> <span className="text-emerald-300">"patients"</span> <span className="text-pink-400">IF</span> my role <span className="text-pink-400">IS NOT</span> <span className="text-emerald-300">"doctor"</span>{"\n\n"}
        <span className="text-zinc-500">-- Context-based mask</span>{"\n"}
        <span className="text-blue-400">SHAPE MASK</span> email <span className="text-purple-400">ON</span> users <span className="text-purple-400">USING</span> role <span className="text-pink-400">IS NOT</span> @role
      </CodeBlock>

      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900">Session context and policy lifecycle</h2>
      <p className="mb-5 leading-relaxed text-zinc-600">
        Policies can compare conditions against session values. Set the relevant user or role context for the session, and authenticate as the intended account before running protected queries.
      </p>
      <CodeBlock>
        <span className="text-blue-400">SET</span> user = <span className="text-emerald-300">"alice"</span>{"\n"}
        <span className="text-blue-400">SET</span> role = <span className="text-emerald-300">"admin"</span>{"\n"}
        <span className="text-blue-400">AUTHENTICATE AS</span> <span className="text-emerald-300">"bob"</span>
      </CodeBlock>
      <p className="mb-5 leading-relaxed text-zinc-600">Remove a policy when it is no longer needed with <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm text-zinc-800">DROP SECURITY</code>:</p>
      <CodeBlock>
        <span className="text-blue-400">DROP SECURITY</span> <span className="text-emerald-300">"owner_only"</span> <span className="text-purple-400">ON</span> <span className="text-emerald-300">"documents"</span>{"\n"}
        <span className="text-blue-400">DROP SECURITY</span> <span className="text-emerald-300">"salary"</span> <span className="text-purple-400">ON</span> <span className="text-emerald-300">"employees"</span>
      </CodeBlock>

      <div className="mb-12 overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full border-collapse text-left text-sm text-zinc-600">
          <thead className="bg-zinc-50 text-zinc-900">
            <tr><th className="px-4 py-3 font-semibold">Condition pattern</th><th className="px-4 py-3 font-semibold">Example</th><th className="px-4 py-3 font-semibold">What it checks</th></tr>
          </thead>
          <tbody>
            <tr className="border-t border-zinc-100"><td className="px-4 py-3 font-medium text-zinc-800">RBAC</td><td className="px-4 py-3 font-mono text-xs">IF my role = "admin"</td><td className="px-4 py-3">Session role against a literal</td></tr>
            <tr className="border-t border-zinc-100"><td className="px-4 py-3 font-medium text-zinc-800">GBAC</td><td className="px-4 py-3 font-mono text-xs">IF bonded as "owner" to my user_id</td><td className="px-4 py-3">A graph bond between document and session user</td></tr>
            <tr className="border-t border-zinc-100"><td className="px-4 py-3 font-medium text-zinc-800">Field match</td><td className="px-4 py-3 font-mono text-xs">department IS @user_department</td><td className="px-4 py-3">A document field against session context</td></tr>
            <tr className="border-t border-zinc-100"><td className="px-4 py-3 font-medium text-zinc-800">Context match</td><td className="px-4 py-3 font-mono text-xs">@role != "viewer"</td><td className="px-4 py-3">A context value against a literal</td></tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-zinc-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/docs/core-concepts/graph-relations" className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900">← Previous: Graph Relations</Link>
        <Link href="/docs/deployment/architecture" className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">Architecture <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </article>
  );
}
