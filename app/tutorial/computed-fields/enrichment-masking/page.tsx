import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function EnrichmentMaskingPage() {
  return (
    <TutorialPageShell
      sectionTitle="Enrichment with masking"
      previousHref="/tutorial/computed-fields/expressions"
      previousLabel="Expressions & formulas"
      nextHref="/tutorial/diagnostics"
      nextLabel="Query Diagnostics (PEER)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        When building secure, multi-tenant applications, computed fields often calculate sensitive indicators—such as credit scores, executive compensation tiers, or internal risk ratings. CleaveDB seamlessly unifies <strong><code>ENRICH</code></strong> with <strong><code>MASK</code></strong> to enable <strong>Virtual Redaction</strong>.
      </p>

      <aside className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-1 font-semibold text-zinc-900">Virtual Redaction principle</h3>
        <p>
          You can compute a virtual attribute and then declare Data-Level Security (DLS) masking policies directly on that computed field. Privileged roles see the live calculation, while untrusted or guest sessions receive masked values without leaking sensitive business logic.
        </p>
      </aside>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Configuring virtual redaction</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        First, declare the computed field. Second, apply a role-conditioned mask rule:
      </p>
      <TutorialCodeBlock label="Virtual field with dynamic masking">{`-- 1. Compute age eligibility
ENRICH users WITH is_adult AS age >= 18

-- 2. Redact the computed field for guests
MASK "is_adult" ON users IF my role = "guest"

-- 3. Query records
FIND users WHERE is_adult = true`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The query engine filters on the true boolean value (<code>is_adult = true</code>), but when formatting the output for a connection with <code>my role = &quot;guest&quot;</code>, the field value is replaced with <code>&quot;[MASKED]&quot;</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Protecting financial calculations</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Consider an e-commerce platform computing profit margins that should only be visible to financial analysts:
      </p>
      <TutorialCodeBlock label="Financial margin masking">{`-- Compute profit margin on products
ENRICH products WITH margin AS price - wholesale_cost

-- Mask margin from public shoppers and guest viewers
MASK "margin" ON products IF my role = "viewer"`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When an unprivileged user queries products:
      </p>
      <TutorialCodeBlock label="Output for viewer role">{`{
  "name": "Mechanical Keyboard",
  "price": 120,
  "margin": "[MASKED]"
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Administrators and managers querying the same database see the raw calculated number (e.g. <code>45</code>).
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Revoking masks on computed fields</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Just like stored fields, security masks on virtual attributes can be revoked at any time using <code>DROP SECURITY</code>:
      </p>
      <TutorialCodeBlock label="Revoke mask policy">{`DROP SECURITY "is_adult" ON users`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The mask is cleared and subsequent queries return the unmodified computed value.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Security In-Depth</h3>
        <p>
          Because Data-Level Security policies are evaluated directly inside CleaveDB&apos;s AST interpreter prior to data serialization, masked fields are never sent over the network, completely preventing accidental client-side data leaks.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
