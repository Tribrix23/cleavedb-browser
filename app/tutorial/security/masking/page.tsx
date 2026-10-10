import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function FieldMaskingPage() {
  return (
    <TutorialPageShell
      sectionTitle="Field Masking (MASK)"
      previousHref="/tutorial/security/enforce"
      previousLabel="Enforce security policies"
      nextHref="/tutorial/security/rate-limiting"
      nextLabel="Rate limiting (LIMIT)"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        In many healthcare, financial, and enterprise domains, users need access to documents without seeing sensitive fields (such as salaries, credit cards, or social security numbers). Rather than creating duplicated redacted views or blocking document access completely, CleaveDB provides <strong>Dynamic Field Masking</strong> via <strong><code>MASK</code></strong>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Masking sensitive fields</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Specify the field name, target bucket, and condition under which the field should be stripped from query outputs:
      </p>
      <TutorialCodeBlock label="Role-based salary redaction">{`MASK "salary" ON staff IF my role = "viewer"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        When an authenticated viewer executes <code>FIND staff</code>, the document is returned in full, but the <code>salary</code> key is stripped from the JSON response before leaving the database.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Negative role conditions</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Use negative conditions (<code>IS NOT</code> or <code>!=</code>) to permit only specific privileged roles:
      </p>
      <TutorialCodeBlock label="Strict patient SSN protection">{`MASK "ssn" ON "patients" IF my role IS NOT "doctor"`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Anyone other than authenticated doctors will receive patient records with the <code>ssn</code> field completely omitted.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Attribute-based masking</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can also mask fields based on attributes within the document itself:
      </p>
      <TutorialCodeBlock label="Clearance level threshold">{`MASK "secret" ON docs IF level > 3`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Documents with high clearance levels automatically redact their confidential sections when queried.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Interaction with DISTILL aggregates</h3>
        <p>
          While <code>MASK</code> strips fields from individual <code>FIND</code> results, <code>DISTILL</code> continues to compute aggregate metrics (such as <code>DISTILL FROM staff AVERAGE salary</code>) across the underlying storage engine without leaking individual data.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
