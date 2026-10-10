import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function GuardRulesPage() {
  return (
    <TutorialPageShell
      sectionTitle="GUARD — Validation Rules"
      previousHref="/tutorial/bucket-configuration/shape"
      previousLabel="SHAPE — configure buckets"
      nextHref="/tutorial/bucket-configuration/index"
      nextLabel="INDEX — speed up lookups"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        CleaveDB is a flexible document database, but production systems still require data integrity. The <strong><code>GUARD</code></strong> command establishes write-time validation rules enforced directly by the engine before writes enter the Write-Ahead Log.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Defining validation rules</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Combine field requirements, numeric constraints, and enumeration checks using commas:
      </p>
      <TutorialCodeBlock label="Define guard rules">{`GUARD people WITH name IS REQUIRED, age >= 0, role IN ("admin", "user")`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Any subsequent write (via <code>POUR</code> or <code>CHANGE</code>) that violates these rules is immediately aborted with a detailed error.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Supported rule types</h3>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-50">
              <th className="py-2.5 px-4 font-semibold">Rule type</th>
              <th className="py-2.5 px-4 font-semibold">Canonical syntax</th>
              <th className="py-2.5 px-4 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Field presence</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">name IS REQUIRED</td>
              <td className="py-2.5 px-4">Field must exist and cannot be omitted</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Field absence</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">nick IS NOT REQUIRED</td>
              <td className="py-2.5 px-4">Field is optional or explicitly disallowed</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Comparison bounds</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">age &gt;= 0</td>
              <td className="py-2.5 px-4">Enforces numeric thresholds (supports <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>, <code>=</code>, <code>!=</code>)</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Enumeration list</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">role IN (&quot;admin&quot;, &quot;user&quot;)</td>
              <td className="py-2.5 px-4">Value must match one of the listed strings</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium text-zinc-800">Data type assertion</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">age IS TYPE number</td>
              <td className="py-2.5 px-4">Enforces strict primitive type (e.g. <code>number</code>, <code>string</code>, <code>boolean</code>)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Enforcement and error reporting</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Violating operations fail cleanly without corrupting existing records:
      </p>
      <TutorialCodeBlock label="Missing required field error">{`-- Attempt to write document missing 'name':
POUR INTO people "p2" {"age": 5, "role": "user"}

-- Engine response:
-- Guard violation on 'people': 'name' is required`}</TutorialCodeBlock>
      <p className="mb-6 leading-relaxed text-zinc-600">
        Similarly, out-of-bounds numbers are intercepted before commit:
      </p>
      <TutorialCodeBlock label="Numeric bound violation">{`-- Attempt to write invalid negative age:
POUR INTO people "p3" {"name": "Neg", "age": -1, "role": "user"}

-- Engine response:
-- Guard violation on 'people': 'age' must be >= 0`}</TutorialCodeBlock>

      <aside className="mt-8 rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Additive guard evolution</h3>
        <p>
          Executing additional <code>GUARD</code> statements on the same bucket adds new rules to the active validation set rather than resetting existing ones.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
