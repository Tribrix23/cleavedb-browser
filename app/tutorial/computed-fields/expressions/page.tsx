import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function ExpressionsFormulasPage() {
  return (
    <TutorialPageShell
      sectionTitle="Expressions & formulas"
      previousHref="/tutorial/computed-fields/virtual-fields"
      previousLabel="Virtual fields"
      nextHref="/tutorial/computed-fields/enrichment-masking"
      nextLabel="Enrichment with masking"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        CleaveDB&apos;s expression engine provides rich support for string manipulation, mathematical calculations, and boolean predicates, enabling sophisticated data transformations at the database kernel level.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Supported expression types</h3>
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 font-semibold text-zinc-900">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Operators / Functions</th>
              <th className="px-4 py-3">Example Expression</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white text-zinc-600">
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">String Joining</td>
              <td className="px-4 py-3 font-mono text-blue-600">CONCAT(), +</td>
              <td className="px-4 py-3 font-mono text-xs">CONCAT(first, &quot; &quot;, last)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Arithmetic</td>
              <td className="px-4 py-3 font-mono text-blue-600">+, -, *, /</td>
              <td className="px-4 py-3 font-mono text-xs">(celsius * 9/5) + 32</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Financial Math</td>
              <td className="px-4 py-3 font-mono text-blue-600">Multiplication, Subtraction</td>
              <td className="px-4 py-3 font-mono text-xs">margin AS price - cost</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Boolean Predicate</td>
              <td className="px-4 py-3 font-mono text-blue-600">&gt;=, &lt;=, ==, !=</td>
              <td className="px-4 py-3 font-mono text-xs">is_adult AS age &gt;= 18</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-zinc-900">Constant Value</td>
              <td className="px-4 py-3 font-mono text-blue-600">Literals</td>
              <td className="px-4 py-3 font-mono text-xs">status AS &quot;active&quot;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">1. String operations (CONCAT)</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Combine multiple strings, field references, and delimiter literals:
      </p>
      <TutorialCodeBlock label="String concatenation">{`ENRICH users WITH full_name AS CONCAT(first, " ", last)
ENRICH addresses WITH formatted AS street + ", " + city + " " + zip`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        If any operand is missing or null, the expression safely handles the missing key without failing the query.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">2. Numeric calculations and unit conversion</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Execute mathematical formulas across multiple numeric document fields:
      </p>
      <TutorialCodeBlock label="Temperature conversion formula">{`ENRICH sensors WITH fahrenheit AS (celsius * 9/5) + 32`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Calculate business metrics such as net profit margin:
      </p>
      <TutorialCodeBlock label="Profit margin calculation">{`ENRICH inventory WITH margin AS price - cost, markup_pct AS ((price - cost) / cost) * 100`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The calculated properties evaluate synchronously during result projection.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">3. Boolean flags and classifications</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Generate dynamic boolean flags based on document field thresholds:
      </p>
      <TutorialCodeBlock label="Eligibility and threshold flags">{`-- Check adult age status
ENRICH users WITH is_adult AS age >= 18

-- Flag stock alerts
ENRICH products WITH in_stock AS quantity > 0, low_stock AS quantity <= 5`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        You can subsequently run indexed queries like <code>FIND users WHERE is_adult = true</code>.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Evaluation Sandboxing</h3>
        <p>
          CleaveDB evaluates expressions in a sandboxed runtime environment. Document variables are scoped through an isolated dictionary, preventing access to dangerous global functions or system internals.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
