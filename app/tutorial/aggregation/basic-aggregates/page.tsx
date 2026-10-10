import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function BasicAggregatesPage() {
  return (
    <TutorialPageShell
      sectionTitle="Sum, Avg, Min, Max & Spread"
      previousHref="/tutorial/aggregation"
      previousLabel="Overview"
      nextHref="/tutorial/aggregation/count-tally"
      nextLabel="Count & tally"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        The <code>DISTILL</code> command provides built-in statistical and mathematical reduction functions that operate directly across numeric fields stored in a bucket.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Supported mathematical functions</h3>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-zinc-900 bg-zinc-50">
              <th className="py-2.5 px-4 font-semibold">Aggregation</th>
              <th className="py-2.5 px-4 font-semibold">Canonical syntax</th>
              <th className="py-2.5 px-4 font-semibold">Default result key</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Total / Sum</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">DISTILL FROM staff TOTAL age</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">&quot;total&quot;</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Sum (alias)</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">DISTILL FROM staff SUM age</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">&quot;sum&quot;</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Average</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">DISTILL FROM staff AVERAGE age</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">&quot;average&quot;</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Average (short)</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">DISTILL FROM staff AVG age</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">&quot;avg&quot;</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Minimum</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">DISTILL FROM staff MIN age</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">&quot;min&quot;</td>
            </tr>
            <tr className="border-b border-zinc-100">
              <td className="py-2.5 px-4 font-medium text-zinc-800">Maximum</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">DISTILL FROM staff MAX age</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">&quot;max&quot;</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium text-zinc-800">Spread (max − min)</td>
              <td className="py-2.5 px-4 font-mono text-xs text-blue-600">DISTILL FROM staff SPREAD age</td>
              <td className="py-2.5 px-4 font-mono text-xs text-zinc-700">&quot;spread&quot;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Total and Sum examples</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Both <code>TOTAL</code> and <code>SUM</code> sum numeric values. The key returned in the output JSON matches the keyword you invoked:
      </p>
      <TutorialCodeBlock label="Compute total sum">{`DISTILL FROM staff TOTAL age`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Returns a single JSON object: <code>&#123;&quot;total&quot;: 119.0&#125;</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Average calculations</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        CleaveDB supports conversational forms (<code>AVERAGE OF age</code>, <code>AVERAGE age</code>) or the concise <code>AVG age</code>:
      </p>
      <TutorialCodeBlock label="Compute arithmetic mean">{`DISTILL FROM staff AVERAGE OF age`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Returns: <code>&#123;&quot;average&quot;: 29.75&#125;</code>.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Minimum, Maximum, and Spread</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        <code>SPREAD</code> calculates the difference between the highest and lowest values (<code>max − min</code>) in a single pass:
      </p>
      <TutorialCodeBlock label="Extremes and spread">{`DISTILL FROM staff MIN age, MAX age, SPREAD age`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Returns: <code>&#123;&quot;min&quot;: 24, &quot;max&quot;: 35, &quot;spread&quot;: 11&#125;</code>.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Type handling</h3>
        <p>
          All statistical reduction functions (sum, avg, min, max, spread) filter out non-numeric values automatically. If no documents match or the target bucket is empty, CleaveDB returns <code>[]</code> with count <code>0</code>.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
